/**
 * @version 1.0
 * @file routes/item.js
 * @author Samuel Des Cormiers
 * @description This file contains the code for the item and items objects.
 * @date 2024-09-30
 */

/**
 * @class Item
 * @description This class represents an item.
 * @param {number} id The id of the item.
 * @param {string} name The name of the item.
 * @param {number} price The price of the item.
 */
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
        return this.id.toString();
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

/**
 * @class ItemList
 * @description This class represents a list of items.
 */
class ItemList {
    constructor() {
        this.items = [];
        this.lastId = 0;
    }
    addItem(name, price) {
        this.items.push(new Item(this.lastId++, name, price));
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
        this.items = this.items.filter(i => i.getId() !== id);
        if (l === this.items.length) {
            console.log('Item not found');
        }
    }
}

module.exports = { Item, ItemList };