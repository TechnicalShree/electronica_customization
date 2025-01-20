frappe.ui.form.on("Warranty Claim", {
    refresh: (frm) => {
        frm.add_custom_button(__("Create Indent"), () => {
            frappe.model.open_mapped_doc({
                method: "electronica_customization.api.service_call.create_indent",
                frm: frm,
            });
        });
    },
    custom_is_installation: (frm) => {
        handleIsInstallation(frm);
    },
});

function handleIsInstallation(frm) {
    if (frm.doc.custom_is_installation) {
        frm.set_value("complaint", "Installation");
    } else {
        frm.set_value("complaint", "");
    }

    frm.refresh_field("complaint");
}
