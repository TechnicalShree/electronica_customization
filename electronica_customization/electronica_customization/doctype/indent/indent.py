# Copyright (c) 2025, Hybrowlab and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname


class Indent(Document):
    def autoname(self):
        self.name = make_autoname(f"{self.service_call}/INDENT-.#####")

    def after_insert(self):
        self.status = "Open"
        self.save()
