"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// const io = require('socket.io');
let io;
// io.on('connection', function(socket:any) {
//     console.log('A new WebSocket connection has been established');
// });
// setInterval(function() {
//   var stockprice = Math.floor(Math.random() * 1000);
//   io.emit('stock price update', stockprice);
// }, 50);
function socketConnection(app) {
    const http = require("http").Server(app);
    io = require("socket.io")(http);
    io.on("connection", (socket) => {
        console.log("A new WebSocket connection has been established");
    });
}
exports.socketConnection = socketConnection;
function socketRef() {
    return io;
}
exports.socketRef = socketRef;
