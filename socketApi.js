/**
 * @author Samuel Des Cormiers
 * @description This file contains the code for socketio.
 * @date 2024-09-30
 * @version 1.0
 */

var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection',function(socket){
    console.log('A user is connected!');
})

// socketApi.sendNotification = function() {
//     io.sockets.emit('hello', {msg: 'Hello World!'});
// }

module.exports = socketApi;