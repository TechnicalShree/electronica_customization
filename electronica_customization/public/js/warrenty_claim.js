frappe.ui.form.on("Warranty Claim", {
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