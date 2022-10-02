frappe.ui.form.on('Payment Entry',  {
    party: function(frm) {
        if(!frm.doc.supplier_name_c){
            var gst_in;
            if(frm.doc.payment_type == "Pay" || frm.doc.party){
                frappe.call({
                    async: false,
                    method: "frappe.client.get",
                    args: {
                        "doctype": "Address",
                        "filters": {
                            'address_title': frm.doc.party // where Clause 
                        },
                        "fieldname": ['gstin'] // fieldname to be fetched
                    },
                    callback: function (res) {
                        if (res.message !== undefined) {
                            var val=res.message;
                            gst_in=val.gstin
                        }
                    } 
                });
            }
                
            if(gst_in){
            fetch(`https://gst-return-status.p.rapidapi.com/gstininfo/${gst_in}`, {
            method: 'GET',
                headers: {
                    'x-rapidapi-host': 'gst-return-status.p.rapidapi.com',
                    'x-rapidapi-key': '12482d5241mshd75c5609811436cp1ddd7fjsn97db2d38fc38',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(r => r.json())
                .then(r => {
                    //console.table(r);
                    
                    // 1.GSTIN Status
                    cur_frm.set_value('gstin_status_c',r.data.details.gstinstatus);
                    
                    // 2.Supplier Name
                    cur_frm.set_value('supplier_name_c',r.data.details.tradename);
                    
                    //Change the Colour of Active and Inactive GSTIN Status
                    if(frm.doc.gstin_status_c == "Active"){
                        frm.set_df_property('gstin_status_c', 'read_only', 0)
                        document.querySelectorAll("[data-fieldname=gstin_status_c]")[1].style.backgroundColor = '#90ee90';//green for active
                    }
                    else if(frm.doc.gstin_status_c == null){
                        frm.set_df_property('gstin_status_c', 'read_only', 0)
                        document.querySelectorAll("[data-fieldname=gstin_status_c]")[1].style.backgroundColor = '#FFC0CB';//pink for status is null
                    }
                    
                    else if(frm.doc.gstin_status_c = 'Cancelled'){
                        frm.set_df_property('gstin_status_c', 'read_only', 0)
                        document.querySelectorAll("[data-fieldname=gstin_status_c]")[1].style.backgroundColor = '#ff726f';//red for cancelled
                    }
                    else{
                        frm.set_df_property('gstin_status_c', 'read_only', 0)
                        document.querySelectorAll("[data-fieldname=gstin_status_c]")[1].style.backgroundColor = '#0000FF';//blue for else
                    }
                    
                    // 3.Priodicity
                    if(r.data.periodicity){
                        var periodicity_keys = Object.keys(r.data.periodicity);
                        var periodicity_values = Object.values(r.data.periodicity);
                        
                        //pushing names and date in temp array as Array of Array Format
                        for(var i = 0; i < periodicity_keys.length; i++){
                            if(periodicity_keys[i]=="2021-2022"){
                                cur_frm.set_value('periodicity_c',periodicity_values[i]);
                            }
                            
                        }
                    }
                    
                    //***********************************GST Return Details********************************
                    
                    //All Return Details are stored in two array As EX. Keys[] = "GSTR1-2017-2018-December" and Values[] = "08/02/2018"
                    
                    //Final Array where Return API Data is stored        
                    var temp=[];
                    
                    //First Array[Names]
                    //fetching Keys as Names Array(All keys like ex."GSTR1-2021-2022-November" are stored in this array)
                    var names=[]
                    var keys_test = Object.keys(r.data.returns);
                    for(var i in keys_test){
                        names.push(keys_test[i]);
                    }
                    //console.log(names)--------------------------------------------------------------------
                    
                    //Second Array[Date]
                    //fetching values as Date Array
                    var date=[]
                    var values_test = Object.values(r.data.returns);
                    for(var j in values_test){   
                        //declare the type of date formate in my array
                        var mydate = moment(values_test[j].dof, 'DD/MM/YYYY');
                        
                        //date format i want to change
                        date.push(moment(mydate).format("MMM DD YYYY"));
                    }
                    //console.log(date)
                    
                    //pushing Names Array and Date Array in temp array as Array of Array Format along with Substring Month and Year
                    var mon;
                    for(var i = 0; i < names.length; i++){
                        
                        //1.Substring Month
                        var str = names[i]
                        mon = str.substring(str.lastIndexOf('-') + 1);      
                        //console.log(mon)
                        
                        //2.Substring Year
                        var parts = str.split('-', 2);
                        var year = parts[1]
                        //console.log(year)
                        
                        //push four attributes
                        //1.id
                        //2.date
                        //3.month
                        //4.years
                        temp.push({id:names[i],date:date[i],month:mon,years:year}); 
                    }
                    
                    //Sorting the temp (Final Array) Desc Date Format EX. D-C or C-D for ASC
                    temp.sort(function(a, b) {
                        var c = new Date(a.date);
                        var d = new Date(b.date);
                        return d-c;
                    });
                    //console.log(temp)
                    //Extract GSTR1
                    // var gstr1=[]
                    // var gstr_string = /GSTR1/;
                    // var gstr_3b_string = /GSTR3B/
                    // for (var r in temp){
                    //     //GSTR1
                    //     if (temp[r].id.match(gstr_string)) {
                    //         gstr1.push(temp[r]);
                    //     }
                        
                    // }
                    // console.log(gstr1)
                    const months_list = ['April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December','January', 'February', 'March'];
                    const sorter = (a, b) => {
                      if(a.years !== b.years){
                          return  b.years - a.years
                      }else{
                          return  months_list.indexOf(b.month) - months_list.indexOf(a.month)
                      };
                    };
                    temp.sort(sorter);
                    //console.log(temp);
                    var gstr_1=/GSTR1/
                    var gstr_b=/GSTR3B/
                    for (var r in temp){
                        //GSTR1
                        var count=0;
                        if (temp[r].id.match(gstr_1)) {
                            console.log(temp[r].id)
                            cur_frm.set_value('gstr1_month_c',temp[r].id);
                            cur_frm.set_value('date_of_file_c',temp[r].date);
                            count++
                        }
                        
                        if(count == 1){
                            break;
                        }
                        
                    }
                    for (var e in temp){
                        //GSTR3B
                        var count=0;
                        if (temp[e].id.match(gstr_b)) {
                            cur_frm.set_value('gstr3b_c',temp[e].id);
                            cur_frm.set_value('date_of_file_cc',temp[e].date);
                            count++
                        }
                        if(count == 1){
                            break;
                        }
                    }
                   
                })
            }
            else{
                    cur_frm.set_value('gstin_status_c',null);
                    cur_frm.set_value('supplier_name_c',null);
                    cur_frm.set_value('periodicity_c',null);
                    cur_frm.set_value('gstr1_month_c',null);
                    cur_frm.set_value('date_of_file_c',null);
                    cur_frm.set_value('gstr3b_c',null);
                    cur_frm.set_value('date_of_file_cc',null);
                    frm.set_df_property('gstin_status_c', 'read_only', 1)
            }

        }
    }
});
