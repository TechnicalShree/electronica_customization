frappe.ui.form.on('Maintenance Visit', {
    setup: (frm) => {
        handleApplyFiltersToAddress(frm);
    },
    refresh: (frm) => {
        addDefaultAddress(frm);
    },
    customer: (frm) => {
        addDefaultAddress(frm);
    }
});

async function addDefaultAddress(frm){
    if(!frm.doc.customer){
        frm.set_value('custom_customer_billing_address', "");
        frm.set_value('custom_customer_shipping_address', "");

        frm.refresh_field('custom_customer_billing_address');
        frm.refresh_field('custom_customer_shipping_address');
        return;
    }

    const address_info = await frappe.call({
        method: 'electronica_customization.api.engineer_visit.get_primary_address',
        args: {
            customer: frm.doc.customer,
        },
    })

    if(address_info?.message){
        frm.set_value('custom_customer_billing_address', address_info.message?.primary_billing_address || "");
        frm.set_value('custom_customer_shipping_address', address_info.message?.primary_shipping_address || "");

        frm.refresh_field('custom_customer_billing_address');
        frm.refresh_field('custom_customer_shipping_address');
    }
}

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

    frm.fields_dict.custom_customer_shipping_address.get_query = function (doc) {
        return {
            filters: [
                ['address_type', '=', 'Shipping'],
                ['Dynamic Link', 'link_name' , '=' , frm.doc?.customer || ''],
                ['Dynamic Link', 'link_doctype' , '=' ,'Customer'],
            ]
        };
    };
}
