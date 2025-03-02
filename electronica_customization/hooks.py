app_name = "electronica_customization"
app_title = "Electronica Customization"
app_publisher = "Hybrowlab"
app_description = "Electronica Customization"
app_email = "chinmay@hybrowlabs.com"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

fixtures = [
    {
        "doctype": "Microapp Form Widget",
        "or_filters": [
            ["name", "=", "dsk62v3p17"],
            ["name", "=", "8le3mqv47e"],
            ["name", "=", "469f687une"],
            ["name", "=", "83jnup6255"],
            ["name", "=", "uus81ni2m0"],
        ],
    },
    {
        "doctype": "Funnel",
        "or_filters": [
            ["name", "=", "Installation Approval"],
            ["name", "=", "Indent Approval"],
            ["name", "=", "Quotation Approval"],
        ],
    },
]

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "electronica_customization",
# 		"logo": "/assets/electronica_customization/logo.png",
# 		"title": "Electronica Customization",
# 		"route": "/electronica_customization",
# 		"has_permission": "electronica_customization.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/electronica_customization/css/electronica_customization.css"
# app_include_js = "/assets/electronica_customization/js/electronica_customization.js"

# include js, css files in header of web template
# web_include_css = "/assets/electronica_customization/css/electronica_customization.css"
# web_include_js = "/assets/electronica_customization/js/electronica_customization.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "electronica_customization/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {
    "Item": "public/js/item.js",
    "Warranty Claim": "public/js/warrenty_claim.js",
    "Maintenance Visit": "public/js/maintenance_visit.js",
}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "electronica_customization/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "electronica_customization.utils.jinja_methods",
# 	"filters": "electronica_customization.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "electronica_customization.install.before_install"
# after_install = "electronica_customization.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "electronica_customization.uninstall.before_uninstall"
# after_uninstall = "electronica_customization.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "electronica_customization.utils.before_app_install"
# after_app_install = "electronica_customization.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "electronica_customization.utils.before_app_uninstall"
# after_app_uninstall = "electronica_customization.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "electronica_customization.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes
override_doctype_class = {
    # "ToDo": "custom_app.overrides.CustomToDo"
    "Warranty Claim": "electronica_customization.electronica_customization.overrides.warranty_claim.CustomWarrantyClaim",
    # "Item": "electronica_customization.electronica_customization.overrides.item.CustomItem",
}

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"electronica_customization.tasks.all"
# 	],
# 	"daily": [
# 		"electronica_customization.tasks.daily"
# 	],
# 	"hourly": [
# 		"electronica_customization.tasks.hourly"
# 	],
# 	"weekly": [
# 		"electronica_customization.tasks.weekly"
# 	],
# 	"monthly": [
# 		"electronica_customization.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "electronica_customization.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "electronica_customization.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
override_doctype_dashboards = {
    "Warranty Claim": "electronica_customization.config.warranty_claim_dashboard.get_data"
}

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["electronica_customization.utils.before_request"]
# after_request = ["electronica_customization.utils.after_request"]

# Job Events
# ----------
# before_job = ["electronica_customization.utils.before_job"]
# after_job = ["electronica_customization.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"electronica_customization.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

website_route_rules = [
    {"from_route": "/service/<path:app_path>", "to_route": "service"},
]
