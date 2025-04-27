import frappe
from erpnext.stock.doctype.item.item import Item


class CustomItem(Item):
    def autoname(self):
        pass

        # # 1) Make sure the three parts are filled in
        # family = self.custom_product_family or frappe.throw("Set Product Family first")
        # series = self.custom_series or frappe.throw("Set Series first")
        # model  = self.custom_model  or frappe.throw("Set Model first")

        # # 2) Build the constant suffix
        # suffix = f"{family}-{series}-{model}"

        # # 3) Find the highest existing sequence for this suffix
        # last = frappe.db.sql(
        #     """
        #     SELECT name
        #     FROM `tabItem`
        #     WHERE name LIKE %s
        #     ORDER BY name DESC
        #     LIMIT 1
        #     """,
        #     (f"%-{suffix}",),
        #     as_list=True,
        # )

        # if last:
        #     # name looks like "00005-IMM-Optima-o-45"
        #     last_seq = int(last[0][0].split("-", 1)[0])
        #     next_seq = last_seq + 1
        # else:
        #     next_seq = 1

        # # 4) Zero-pad to 5 digits and assemble
        # seq_str = f"{next_seq:05d}"
        # self.name = f"{seq_str}-{suffix}"
