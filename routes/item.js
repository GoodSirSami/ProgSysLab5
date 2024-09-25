class Item {
    constructor(id, name, price) {
        this.id = id;
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

    getId() {
        return this.id;
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
    addItem(id, name, price) {
        this.items.push(new Item(id, name, price));
    }
    removeItemByName(name) {
        this.items = this.items.filter(i => i.getName() !== name);
    }
    removeItemById(id) {
        this.items = this.items.filter(i => i.getId() !== id);
    }
}


module.exports = { Item, ItemList };