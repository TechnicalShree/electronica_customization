from erpnext.support.doctype.warranty_claim.warranty_claim import WarrantyClaim
import frappe


class CustomWarrantyClaim(WarrantyClaim):
    def before_insert(self):
        frappe.logger("debug").error(["--------234------------------"])
