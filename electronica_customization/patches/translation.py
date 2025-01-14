import frappe


def execute():
    add_translation_docs()


def add_translation_docs():
    translations = [
        {
            "language": "en",
            "source_text": "Warranty Claim",
            "translated_text": "Service Call",
        },
        {
            "language": "en",
            "source_text": "Maintenance Visit",
            "translated_text": "Engineer Visit",
        },
    ]

    for translation in translations:
        try:
            # Check if translation already exists
            if not frappe.db.exists(
                "Translation",
                {
                    "source_text": translation["source_text"],
                    "language": translation["language"],
                },
            ):
                # Create and save the new translation document
                translation_doc = frappe.get_doc(
                    {
                        "doctype": "Translation",
                        "language": translation["language"],
                        "source_text": translation["source_text"],
                        "translated_text": translation["translated_text"],
                    }
                )
                translation_doc.save(ignore_permissions=True)
                frappe.db.commit()  # Commit the transaction to ensure the save is applied
                frappe.logger().info(
                    f"Added translation: {translation['source_text']} -> {translation['translated_text']}"
                )
        except Exception as e:
            frappe.logger("patch_exception").exception(
                f"Error adding translation: {translation}"
            )
