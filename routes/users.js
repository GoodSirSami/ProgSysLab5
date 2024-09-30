var express = require('express');
var router = express.Router();
var { io } = require('../socketApi');
var { Item, ItemList } = require('./item');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://172.17.15.116:1883');

client.on('connect', function() {
  console.log('Connected to MQTT broker');
});

client.subscribe('ITEMS/#');

var liste = new ItemList();
for (let i = 0; i < 10; i++) {
  liste.addItem('Item' + i, Math.floor(Math.random() * 100));
}

router.get('/', function(req, res, next) {
  res.render('itemsList', { title: 'Items' , items: liste });
});

io.on('connection', function(socket) {
  socket.on('add', function(data) {
    client.publish('ITEMS/WEB/NEW', JSON.stringify({id: liste.items.length, name: data.name, price: data.price, date: new Date() }));
  });
  socket.on('removebyid', function(data) {
    client.publish('ITEMS/WEB/REMOVE/ID', JSON.stringify({id: data.id}));
  });
  socket.on('removebyname', function(data) {
    client.publish('ITEMS/WEB/REMOVE/NAME', JSON.stringify({name: data.name}));
  });
});

client.on('message', function(topic, message) {
  switch (topic) {
  case 'ITEMS/WEB/NEW':
  case 'ITEMS/MODULE/NEW':
    var data = JSON.parse(message);
    liste.addItem(data.name, data.price);
    break;
  case 'ITEMS/WEB/REMOVE/ID':
  case 'ITEMS/MODULE/REMOVE/ID':
    var data = JSON.parse(message);
    liste.removeItemById(data.id);
    break;
  case 'ITEMS/WEB/REMOVE/NAME':
  case 'ITEMS/MODULE/REMOVE/NAME':
    var data = JSON.parse(message);
    liste.removeItemByName(data.name);
    break;
  default:
    console.log('No handler for topic %s', topic);
    break;
  }
  var str = '';
  liste.items.forEach((item, index) => {
    str += '<tr><td>' + index + '</td><td>' + item.getDate() + '</td><td>' + item.getName() + '</td><td>' + item.getPrice() + '$</td></tr>';
  });
  io.sockets.emit('itemsChanged', str);
});

module.exports = router;