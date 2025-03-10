# Copyright (c) 2025, Hybrowlab and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class SiteReadinessNote(Document):
    def autoname(self):
        if not self.service_call:
            return

        last_number = (
            frappe.db.sql(
                """
					SELECT MAX(CAST(SUBSTRING_INDEX(name, '/', -1) AS UNSIGNED))
					FROM `tabSite Readiness Note`
					LIMIT 1
				""",
                as_list=True,
            )[0][0]
            or 0
        )  # Get first row, first column; default to 0 if no records exist

        next_number = last_number + 1
        self.name = (
            f"{self.service_call}/{str(next_number).zfill(5)}"  # Keep 5-digit padding
        )
