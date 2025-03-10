import frappe
from frappe.model.naming import make_autoname
from datetime import datetime
from erpnext.support.doctype.warranty_claim.warranty_claim import WarrantyClaim


class CustomWarrantyClaim(WarrantyClaim):
    def autoname(self):
        if self.custom_is_installation:
            self.name = make_autoname("INST/.#####")
            return

        branch_code = (self.custom_branch[:3] if self.custom_branch else "_NA_").upper()
        creation_date = datetime.today().strftime("%d-%m-%Y")  # Keep full date
        prefix = f"SER/{branch_code}/{creation_date}/"

        # Fetch the max sequence number only (optimized query)
        last_number = (
            frappe.db.sql(
                """
                    SELECT MAX(CAST(SUBSTRING_INDEX(name, '/', -1) AS UNSIGNED))
                    FROM `tabWarranty Claim`
                    WHERE name LIKE 'SER/%'
                    LIMIT 1
                """,
                as_list=True,
            )[0][0]
            or 0
        )  # Get first row, first column; default to 0 if no records exist

        next_number = last_number + 1
        self.name = f"{prefix}{str(next_number).zfill(5)}"  # Keep 5-digit padding
