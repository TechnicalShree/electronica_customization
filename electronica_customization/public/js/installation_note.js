frappe.ui.form.on('Installation Note', {
    refresh: function (frm) {
        if (!frm.doc.__islocal && frm.doc?.items?.length && frm.doc?.items?.length > 0) {
            frm.add_custom_button(__("Create Serial No"), () => {
                frappe.model.open_mapped_doc({
                    method:
                        "electronica_customization.api.installation_note.create_serial_no",
                    frm: frm,
                });
            });
        }
        toggle_items_add_row(frm);
    },
    validate: function (frm) {
        // Check if both dates are present
        if (frm.doc.inst_date && frm.doc.custom_invoice_date) {
            // Using frappe.datetime.get_diff returns the difference in days:
            // a negative value means inst_date is earlier than custom_invoice_date
            if (frappe.datetime.get_diff(frm.doc.inst_date, frm.doc.custom_invoice_date) < 0) {
                frappe.msgprint(__("Installation Date cannot be less than Invoice Date."));
                frappe.validated = false;
            }
        }
    }
});

// Helper function to toggle the Add Row button in the Installation Item child table
function toggle_items_add_row(frm) {
    let child_count = frm.doc.items ? frm.doc.items.length : 0;
    // When a row exists (or more than one), hide the Add Row button; otherwise, show it.
    frm.fields_dict.items.grid.wrapper.find('.grid-add-row').toggle(child_count === 0);
}

// Optionally, refresh the add row status when a row is removed or added
frappe.ui.form.on("Installation Note Item", {
    // When a new child is added, refresh the parent form view
    items_add: function (frm) {
        toggle_items_add_row(frm);
    },
    // When a row is removed, update the button visibility accordingly
    items_remove: function (frm) {
        toggle_items_add_row(frm);
    }
});
