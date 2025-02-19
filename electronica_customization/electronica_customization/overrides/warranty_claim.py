from erpnext.support.doctype.warranty_claim.warranty_claim import WarrantyClaim
from frappe.model.naming import make_autoname
from datetime import datetime


class CustomWarrantyClaim(WarrantyClaim):
    def autoname(self):
        if not self.custom_is_installation:
            branch_code = (
                self.custom_branch[:3] if self.custom_branch else "XXX"
            ).upper()
            creation_date = datetime.today().strftime("%d-%m-%Y")
            self.name = make_autoname(f"SER/{branch_code}/{creation_date}/.#####")
        else:
            self.name = make_autoname("INST/.#####")
