// Helper function to set the read-only state of "custom_is_installation"
function setCustomInstallationReadOnly(frm) {
    // If the document is new (__islocal is true), allow editing; otherwise, make it read-only.
    const readOnly = frm.doc.__islocal ? 0 : 1;
    frm.set_df_property("custom_is_installation", "read_only", readOnly);
}

// Helper function to update the status field options and ensure default is "New"
function updateStatusOptions(frm) {
    let options = [];
    if (frm.doc.custom_is_installation) {
        // When custom_is_installation is true, allowed options:
        options = ["New", "Approve By Branch Manager", "Approved by HO", "Factory Approval", "Rejected", "Activated", "Dispatched", "Completed"];
    } else {
        // When custom_is_installation is false, allowed options:
        options = ["New", "Submitted for approval", "Approved", "Rejected", "Working", "Escalated", "On Hold", "Issue Resolved", "Payments Pending", "Closed"];
    }
    frm.set_df_property("status", "options", options.join("\n"));

    // Reset status to "New" if the current value is not allowed
    if (!options.includes(frm.doc.status)) {
        frm.set_value("status", "New");
    }
}

// Helper function to update the complaint field based on custom_is_installation
function handleInstallationComplaint(frm) {
    frm.set_value("complaint", frm.doc.custom_is_installation ? "Installation" : "");
    frm.refresh_field("complaint");
}

// Main event handlers for the Warranty Claim doctype
frappe.ui.form.on("Warranty Claim", {
    refresh: function (frm) {
        // Add custom button for creating indent
        frm.add_custom_button(__("Create Indent"), function () {
            frappe.model.open_mapped_doc({
                method: "electronica_customization.api.service_call.create_indent",
                frm: frm,
            });
        });

        // Set field properties and update status options on refresh
        setCustomInstallationReadOnly(frm);
        updateStatusOptions(frm);
    },

    custom_is_installation: function (frm) {
        // When custom_is_installation changes, update the complaint field and status options
        handleInstallationComplaint(frm);
        updateStatusOptions(frm);
    }
});
