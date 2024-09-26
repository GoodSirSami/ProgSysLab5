class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.date = new Date();
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getDate() {
        return this.date.getFullYear().toString() + '-' + (this.date.getMonth() + 1).toString().padStart(2,0) + '-' + this.date.getDay().toString().padStart(2,0);
    }

    setName(name) {
        this.name = name;
    }

    setPrice(price) {
        this.price = price;
    }

    display() {
        console.log('Id: ${this.id} Item: ${this.name}, Price: ${this.price}, Date: ${this.getDate()}');
    }
}

class ItemList {
    constructor() {
        this.items = [];
    }
    addItem(name, price) {
        this.items.push(new Item(name, price));
    }
    removeItemByName(name) {
        var l = this.items.length;
        this.items = this.items.filter(i => i.getName() !== name);
        if (l === this.items.length) {
            console.log('Item not found');
        }
    }
    removeItemById(id) {
        var l = this.items.length;
        this.items.splice(id, 1);
        if (l === this.items.length) {
            console.log('Item not found');
        }
    }
}

module.exports = { Item, ItemList };