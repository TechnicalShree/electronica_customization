def get_dashboard_data(data):
    return {
        "fieldname": "service_call",
        "non_standard_fieldnames": {"Quotation": "custom_service_call","Maintenance Visit":"custom_parent_service_call"},
        "transactions": [
            {
                "items": [
                    "Indent",
                    "Quotation",
                    "Mould Trial",
                    "Maintenance Visit",
                    "Problem Observed",
                    "Machine Inspection",
                ]
            },
        ]
    }