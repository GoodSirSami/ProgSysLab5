var express = require('express');
var router = express.Router();
var { Item, ItemList } = require('./item');

var items = new ItemList();

for (let i = 0; i < 10; i++) {
  items.addItem(i, 'Item' + i, Math.floor(Math.random() * 100));
}
console.table(items.items);

router.get('/', function(req, res, next) {
  res.render('itemsList', { title: 'Items' , items: items });
})
.post('/add', function(req, res, next) {
  var ids = findMissingNumbers(items.items.map(i => i.id));
  if (ids.length === 0) {
    ids.push(items.items[items.items.length - 1].id + 1);
  }
  items.addItem(ids[0], req.body.name, req.body.price);
  res.render('itemsList', { title: 'Items' , items: items });
})
.post('/removebyid', function(req, res, next) {
  items.removeItemById(parseInt(req.body.id));
  res.render('itemsList', { title: 'Items' , items: items });
})
.post('/removebyname', function(req, res, next) {
  items.removeItemByName(req.body.name);
  res.render('itemsList', { title: 'Items' , items: items });
})

// Fonction trouvée sur https://stackoverflow.com/questions/38460486/find-missing-numbers-in-an-array
// @param arr : tableau d'entiers
// @return tableau d'entiers manquants
function findMissingNumbers(arr) {
  var sparse = arr.reduce((sparse, i) => (sparse[i]=1,sparse), []);
  return [...sparse.keys()].filter(i => !sparse[i]);
}

module.exports = router;