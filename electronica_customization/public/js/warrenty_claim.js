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
        options = ["Installtion Call", "Call in Progress", "Site Readiness", "Machine Inspection And Installtion", "Mould Trial", "Customer Training", "Problem Observed", "Installation Completed"];
    } else {
        // When custom_is_installation is false, allowed options:
        options = ["New", "Submitted for approval", "Approved", "Rejected", "Working", "Escalated", "On Hold", "Issue Resolved", "Payments Pending", "Closed"];
    }
    frm.set_df_property("status", "options", options.join("\n"));

    // Reset status to "New" if the current value is not allowed
    if (!options.includes(frm.doc.status)) {
        frm.set_value("status", frm.doc.custom_is_installation ? "Installtion Call" : "New");
    }
}

function updateServiceCallFields(frm) {
    if (!!frm.doc?.custom_is_installation) return

    let warranty_amc_status = "Out of Warranty"; // Default status
    const today = frappe.datetime.get_today();

    // Check if within warranty period
    if (frm.doc.custom_warranty_start_date && frm.doc.warranty_expiry_date) {
        if (today >= frm.doc.custom_warranty_start_date && today <= frm.doc.warranty_expiry_date) {
            warranty_amc_status = "Under Warranty";
        }
    }

    // Check if within AMC period (overrides warranty if applicable)
    if (warranty_amc_status != "Under Warranty" && frm.doc.custom_amc_start_date && frm.doc.amc_expiry_date) {
        if (today >= frm.doc.custom_amc_start_date && today <= frm.doc.amc_expiry_date) {
            warranty_amc_status = "Under AMC";
        } else if (today > frm.doc.amc_expiry_date) {
            warranty_amc_status = "Out of AMC";
        }
    }

    // If neither warranty nor AMC is active, default to "Out of Warranty"
    if (warranty_amc_status === "Out of Warranty" && frm.doc.amc_expiry_date && today > frm.doc.amc_expiry_date) {
        warranty_amc_status = "Out of AMC";
    }

    frm.set_value("warranty_amc_status", warranty_amc_status);
    frm.set_value("custom_warranty__amc_status", warranty_amc_status);

    frm.refresh_field("warranty_amc_status");
    frm.refresh_field("custom_warranty__amc_status");
}

// Helper function to update the complaint field based on custom_is_installation
function handleInstallationComplaint(frm) {
    frm.set_value("complaint", !!frm.doc.custom_is_installation ? "" : frm.doc?.complaint || null);
    frm.refresh_field("complaint");

    frm.fields_dict.complaint.get_query = function () {
        return {
            filters: [
                ['category', !!frm.doc.custom_is_installation ? '=' : '!=', "Installation"]
            ]
        };
    };
    handleSubIssueCategory(frm);
}

function handleSubIssueCategory(frm) {
    frm.fields_dict.custom_issue_type.get_query = function () {
        return {
            filters: [
                ['category', '=', frm.doc.complaint]
            ]
        };
    };
}

function updateBillingDetails(frm) {
    frappe.call({
        method: "electronica_customization.api.engineer_visit.get_primary_billing_details",
        args: {
            customer: frm.doc.customer
        },
        callback: function (response) {
            if (!!response?.message?.state) {
                frm.set_value("custom_billing_state", response.message.state);
            }
            else {
                frm.set_value("custom_billing_state", "");
            }

            if (!!response?.message?.city) {
                frm.set_value("custom_billing_city", response.message.city);
            }
            else {
                frm.set_value("custom_billing_city", "");
            }

            frm.refresh_field("custom_billing_city");
            frm.refresh_field("custom_billing_state");
        }
    })
}

// Main event handlers for the Warranty Claim doctype
frappe.ui.form.on("Warranty Claim", {
    setup: async function (frm) {
        frm.fields_dict.serial_no.get_query = function (doc) {
            return {
                filters: [
                    ['custom_customer_code', '=', frm.doc?.customer || ""]
                ]
            };
        };
    },
    validate: function (frm) {
        console.log("custom_checklist_attached", frm.doc.custom_checklist_attached);
        if (frm.doc.status === "Site Readiness") {
            if (!frm.doc.custom_checklist_attached) {
                frm.set_value("custom_checklist_attached", 1);
            }

            if (!frm.attachments.get_attachments().length) {
                frappe.msgprint(__('Checklist attachment is mandatory when "Checklist Attached" is checked.'));
                frappe.validated = false;
            }
        }
    },
    refresh: function (frm) {
        frm.remove_custom_button(__("Create Engineer Visit"));
        if (!frm.doc.__islocal) {
            if (frappe.user.has_role("Branch Head")) {
                frm.add_custom_button(__("Create Engineer Visit"), () => {
                    frappe.model.open_mapped_doc({
                        method:
                            "support_management.support_management.doctype.service_call.service_call.create_engineer_visit",
                        frm: frm,
                    });
                });
            }

            // Add custom buttons
            frm.add_custom_button(__("Quotation"), function () {
                frappe.model.open_mapped_doc({
                    method: "electronica_customization.api.service_call.create_quotation",
                    frm: frm,
                });
            }, 'Create');
            frm.add_custom_button(__("Problem Observed"), function () {
                frappe.model.open_mapped_doc({
                    method: "electronica_customization.api.service_call.create_problem_observed",
                    frm: frm,
                });
            }, 'Create');
        }

        // Set field properties and update status options on refresh
        setCustomInstallationReadOnly(frm);
        handleInstallationComplaint(frm);
        updateStatusOptions(frm);

    },
    customer: function (frm) {
        frm.set_value("serial_no", "");
        frm.set_value("complaint", "");

        frm.refresh_field("serial_no");
        frm.refresh_field("complaint");

        updateServiceCallFields(frm);
        updateBillingDetails(frm);
    },
    complaint: function (frm) {
        frm.set_value("custom_issue_type", "");
        frm.refresh_field("custom_issue_type");

        handleSubIssueCategory(frm);
    },

    serial_no: function (frm) {
        updateServiceCallFields(frm);
    },
    custom_is_installation: function (frm) {
        handleInstallationComplaint(frm);
        updateStatusOptions(frm);
    },
    custom_warranty_start_date: function (frm) {
        updateServiceCallFields(frm);
    },
    warranty_expiry_date: function (frm) {
        updateServiceCallFields(frm);
    },
    custom_amc_start_date: function (frm) {
        updateServiceCallFields(frm);
    },
    amc_expiry_date: function (frm) {
        updateServiceCallFields(frm);
    },
});
