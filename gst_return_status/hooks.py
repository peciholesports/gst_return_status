from . import __version__ as app_version

app_name = "gst_return_status"
app_title = "GST Return Status"
app_publisher = "Preciholesports"
app_description = "supplier gst return details"
app_email = "rehan@preciholesports.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/gst_return_status/css/gst_return_status.css"
# app_include_js = "/assets/gst_return_status/js/gst_return_status.js"

# include js, css files in header of web template
# web_include_css = "/assets/gst_return_status/css/gst_return_status.css"
# web_include_js = "/assets/gst_return_status/js/gst_return_status.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "gst_return_status/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {"Payment Entry" : "public/js/payment_entry.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "gst_return_status.utils.jinja_methods",
#	"filters": "gst_return_status.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "gst_return_status.install.before_install"
# after_install = "gst_return_status.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "gst_return_status.uninstall.before_uninstall"
# after_uninstall = "gst_return_status.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "gst_return_status.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	"Payment Entry": {
        "before_save": "gst_return_status.gst_return.api_test"
		# "on_update": "method",
		# "on_cancel": "method",
		# "on_trash": "method"
	}
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"gst_return_status.tasks.all"
#	],
#	"daily": [
#		"gst_return_status.tasks.daily"
#	],
#	"hourly": [
#		"gst_return_status.tasks.hourly"
#	],
#	"weekly": [
#		"gst_return_status.tasks.weekly"
#	],
#	"monthly": [
#		"gst_return_status.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "gst_return_status.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "gst_return_status.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "gst_return_status.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]


# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"gst_return_status.auth.validate"
# ]
