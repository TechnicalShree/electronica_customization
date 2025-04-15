# Copyright (c) 2025, Hybrowlab and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname


class Indent(Document):
    def autoname(self):
        self.name = make_autoname(f"{self.service_call}/INDENT-.#####")

    def after_insert(self):
        user = frappe.session.user
        self.status = "Open"
        self.created_by = user
        self.created_by_employee = frappe.get_value(
            "Employee", {"user_id": user}, "name"
        )
        self.save()
