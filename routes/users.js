var express = require('express');
var router = express.Router();
var { Item, ItemList } = require('./item');

var items = new ItemList();

for (let i = 0; i < 10; i++) {
  items.addItem('Item' + i, Math.floor(Math.random() * 100));
}
console.table(items.items);

router.get('/', function(req, res, next) {
  res.render('itemsList', { title: 'Items' , items: items });
})
.post('/add', function(req, res, next) {
  items.addItem(req.body.name, req.body.price);
  res.render('itemsList', { title: 'Items' , items: items });
})
.post('/removebyid', function(req, res, next) {
  items.removeItemById(parseInt(req.body.id));
  res.render('itemsList', { title: 'Items' , items: items });
})
.post('/removebyname', function(req, res, next) {
  items.removeItemByName(req.body.name);
  res.render('itemsList', { title: 'Items' , items: items });
});

module.exports = router;