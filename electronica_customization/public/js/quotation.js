frappe.ui.form.on('Quotation', {
    refresh: function (frm) {
        if (!frm.doc.__islocal && !!frm.doc?.custom_is_create_so) {
            frm.add_custom_button(__("Create Sales Order"), () => {
                frappe.model.open_mapped_doc({
                    method:
                        "electronica_customization.api.quotation.create_sales_order",
                    frm: frm,
                });
            });
        }
    },
    validate: function (frm) {
        if (frm.doc.valid_till) {
            // Get today's date and compute the maximum allowed date (one month from today)
            let currentDate = frappe.datetime.get_today();
            let maxDate = frappe.datetime.add_months(currentDate, 1);

            // Convert the string dates to Date objects
            let validTillDate = new Date(frm.doc.valid_till);
            let maxDateObj = new Date(maxDate);

            // Compare the dates
            if (validTillDate > maxDateObj) {
                frappe.msgprint(__(`The Valid Till date should be within ${maxDateObj.getDate()}-${maxDateObj.getMonth() + 1}-${maxDateObj.getFullYear()} one month from today.`));
                frappe.validated = false;
            }
        }
    }
});
