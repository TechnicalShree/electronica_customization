import frappe


def execute():
    add_description_of_issues()


def add_description_of_issues():
    description_of_issues = [
        {
            "issue_name": "Installation",
        },
    ]

    for issue in description_of_issues:
        try:
            # Check if translation already exists
            if not frappe.db.exists(
                "Description of Issue",
                {
                    "issue_name": issue["issue_name"],
                },
            ):
                # Create and save the new translation document
                translation_doc = frappe.get_doc(
                    {
                        "doctype": "Description of Issue",
                        "issue_name": issue["issue_name"],
                    }
                )
                translation_doc.save(ignore_permissions=True)
                frappe.db.commit()  # Commit the transaction to ensure the save is applied
        except Exception as e:
            frappe.logger("patch_exception").exception(
                f"Error adding Description of Issue: {issue}"
            )
