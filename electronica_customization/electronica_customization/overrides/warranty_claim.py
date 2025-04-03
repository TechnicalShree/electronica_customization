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


def get_permission_query_conditions_for_warrenty_claim(user):
    user = user or frappe.session.user

    user_roles = frappe.get_roles(user)

    # Allow full access for Administrator or System Manager
    if user == "Administrator" or "System Manager" in user_roles:
        return ""
    
    user_branch = frappe.get_value("Employee", {"user_id": user}, "branch")

    if "Branch Engineer" in user_roles:
        return f"""
        (
            `tabWarranty Claim`.`owner` = '{user}'
            OR
            `tabWarranty Claim`.`name` IN (
                SELECT `custom_parent_service_call`
                FROM `tabMaintenance Visit`
                WHERE `custom_assigned_engineer` = '{user}'
            )
        )
        """

    return f"""
    (
        `tabWarranty Claim`.`owner` = '{user}'
        OR
        `tabWarranty Claim`.`custom_branch` = '{user_branch}'
    )
    """
