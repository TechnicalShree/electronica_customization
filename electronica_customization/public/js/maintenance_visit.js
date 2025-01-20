frappe.ui.form.on('Maintenance Visit', {
    setup: (frm) => {
        handleApplyFiltersToAddress(frm);
    },
});

function handleApplyFiltersToAddress(frm){
    frm.fields_dict.custom_customer_billing_address.get_query = function (doc) {
        return {
            filters: [
                ['address_type', '=', 'Billing'],
                ['Dynamic Link', 'link_name' , '=' , frm.doc?.customer || ''],
                ['Dynamic Link', 'link_doctype' , '=' ,'Customer'],
            ]
        };
    };

    frm.fields_dict.custom_customer_shiping_address.get_query = function (doc) {
        return {
            filters: [
                ['address_type', '=', 'Shipping'],
                ['Dynamic Link', 'link_name' , '=' , frm.doc?.customer || ''],
                ['Dynamic Link', 'link_doctype' , '=' ,'Customer'],
            ]
        };
    };
}
