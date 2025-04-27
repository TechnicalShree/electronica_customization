import frappe
from frappe import _


# electronica_customization.api.item.get_next_item_name
@frappe.whitelist()
def get_next_item_name(
    custom_product_family: str, custom_series: str, custom_model: str
) -> str:
    """
    Returns the next Item.name in the format
      00001-<family>-<series>-<model>
    for the given suffix.
    """
    # 1) sanity
    if not (custom_product_family and custom_series and custom_model):
        frappe.throw(_("All three of Product Family, Series & Model must be set"))

    # 2) build suffix
    suffix = f"{custom_product_family}-{custom_series}-{custom_model}"

    # 3) find the last matching name
    last = frappe.db.sql_list(
        """
        SELECT name
        FROM `tabItem`
        WHERE name LIKE %s
        ORDER BY name DESC
        LIMIT 1
        """,
        "%" + suffix,
    )

    # 4) compute the next sequence
    if last:
        # e.g. last[0] == "00012-IMM-Optima-o-45"
        prev_seq = int(last[0].split("-", 1)[0])
        next_seq = prev_seq + 1
    else:
        next_seq = 1

    # 5) format & return
    return f"{next_seq:05d}-{suffix}"
