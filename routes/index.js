var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');

client.subscribe('listeItems');

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
