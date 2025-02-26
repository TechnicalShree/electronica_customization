from frappe import _


def get_data(data):
    return {
        "fieldname": "service_call",
        "non_standard_fieldnames": {
            "Quotation": "custom_service_call",
            "Maintenance Visit": "custom_parent_service_call",
        },
        "transactions": [
            {
                "label": _("Service Forms"),
                "items": [
                    "Mould Trial",
                    "Problem Observed",
                    "Machine Inspection",
                    "Customer Training",
                ],
            },
            {"label": _("Material Requests"), "items": ["Indent"]},
            {"label": _("Service Visits"), "items": ["Maintenance Visit"]},
        ],
    }
