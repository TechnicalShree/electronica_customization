

from erpnext.stock.doctype.item.item import Item


class CustomItem(Item):
    def autoname(self):
        self.name = self.item_code