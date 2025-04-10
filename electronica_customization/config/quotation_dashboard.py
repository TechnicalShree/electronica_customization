from frappe import _


def get_data(data):
    return {
        "fieldname": "custom_quotation",
        "transactions": [
            {
                "label": _(""),
                "items": [
                    "Sales Order",
                ],
            },
        ],
    }
