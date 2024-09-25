var express = require('express');
var router = express.Router();
var { Item, ItemList } = require('./item');

var items = new ItemList();

for (let i = 0; i < 10; i++) {
  items.addItem(i, 'Item' + i, Math.floor(Math.random() * 100));
}
console.table(items.items);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('itemsList', { title: 'Items' , items: items });
})
.post('/add', function(req, res, next) {
  items.addItem(items.items.length, req.body.name, req.body.price);
  res.render('itemsList', { title: 'Items' , items: items });
});

module.exports = router;
