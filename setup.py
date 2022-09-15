from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in gst_return_status/__init__.py
from gst_return_status import __version__ as version

setup(
	name="gst_return_status",
	version=version,
	description="supplier gst return details",
	author="Preciholesports",
	author_email="rehan@preciholesports.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
