frappe.ui.form.on("Serial No", {
    refresh: (frm) => {
        handleAMCDetails(frm);
        handleAMCDateValidation(frm);
    },
    validate: (frm) => {
        handleValidation(frm);
    },
    custom_amc_start_date: (frm) => {
        handleAMCDateValidation(frm);
    },
    amc_expiry_date: (frm) => {
        handleAMCDateValidation(frm);
    },
    warranty_expiry_date: (frm) => {
        handleAMCDateValidation(frm);
        handleClearAMCDetails(frm);
    }
});

function handleClearAMCDetails(frm) {
    const is_clear_amc = !!frm.doc?.warranty_expiry_date && frm.doc.warranty_expiry_date >= frappe.datetime.get_today();
    frm.set_value("custom_amc_start_date", is_clear_amc ? "" : frm.doc.custom_amc_start_date);
    frm.set_value("amc_expiry_date", is_clear_amc ? "" : frm.doc.amc_expiry_date);

    frm.refresh_field("custom_amc_start_date");
    frm.refresh_field("amc_expiry_date");
}

function handleAMCDetails(frm) {
    const is_hidden = !!frm.doc?.__islocal || (frm.doc?.warranty_expiry_date && frm.doc.warranty_expiry_date >= frappe.datetime.get_today())

    frm.set_df_property("custom_amc_start_date", "hidden", is_hidden);
    frm.set_df_property("amc_expiry_date", "hidden", is_hidden);
}

function handleAMCDateValidation(frm) {
    const is_amc_end_date_required = !!frm.doc?.custom_amc_start_date;
    frm.set_df_property("amc_expiry_date", "reqd", is_amc_end_date_required);

    const is_amc_start_date_required = !!frm.doc?.amc_expiry_date;
    frm.set_df_property("custom_amc_start_date", "reqd", is_amc_start_date_required);
}

function handleValidation(frm) {
    // Validate that custom_warranty_start_date is less than warranty_expiry_date
    if (frm.doc.custom_warranty_start_date && frm.doc.warranty_expiry_date) {
        // Using frappe.datetime.get_diff returns the difference in days.
        if (frappe.datetime.get_diff(frm.doc.warranty_expiry_date, frm.doc.custom_warranty_start_date) <= 0) {
            frappe.msgprint(__("Custom Warranty Start Date must be less than Warranty Expiry Date"));
            frappe.validated = false;
        }
    }

    // Validate AMC dates when custom_amc_start_date is provided
    if (frm.doc.custom_amc_start_date) {
        // AMC Expiry Date is mandatory if AMC Start Date is set
        if (!frm.doc.amc_expiry_date) {
            frappe.msgprint(__("AMC Expiry Date is mandatory when AMC Start Date is set"));
            frappe.validated = false;
        } else {
            // Validate that custom_amc_start_date is less than amc_expiry_date
            if (frappe.datetime.get_diff(frm.doc.amc_expiry_date, frm.doc.custom_amc_start_date) <= 0) {
                frappe.msgprint(__("Custom AMC Start Date must be less than AMC Expiry Date"));
                frappe.validated = false;
            }
        }
        // Validate that custom_amc_start_date starts after warranty_expiry_date (if warranty_expiry_date exists)
        if (frm.doc.warranty_expiry_date) {
            if (frappe.datetime.get_diff(frm.doc.custom_amc_start_date, frm.doc.warranty_expiry_date) <= 0) {
                frappe.msgprint(__("Custom AMC Start Date must be after Warranty Expiry Date"));
                frappe.validated = false;
            }
        }
    }
}
