import frappe


def execute():
    add_issue_categories()


def add_issue_categories():
    description_of_issues = [
        {
            "category": "Installation",
        },
    ]

    for issue in description_of_issues:
        try:
            # Check if translation already exists
            if not frappe.db.exists(
                "Issue Category",
                {
                    "category": issue["category"],
                },
            ):
                # Create and save the new translation document
                translation_doc = frappe.get_doc(
                    {
                        "doctype": "Issue Category",
                        "category": issue["category"],
                    }
                )
                translation_doc.save(ignore_permissions=True)
                frappe.db.commit()  # Commit the transaction to ensure the save is applied
        except Exception as e:
            frappe.logger("patch_exception").exception(
                f"Error adding Issue Category: {issue}"
            )
