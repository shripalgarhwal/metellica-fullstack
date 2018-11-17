"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
let io;
const mktDataController = new controllers_1.TradeController();
let tradeList = [];
let intervalId;
function socketConnection(app) {
    const http = require("http").Server(app);
    io = require("socket.io")(http);
    io.on("connection", (socket) => {
        console.log("A new WebSocket connection has been established");
        getTradeList();
        pushPriceChangeNotifiction();
    });
    io.on("close", (socket) => {
        console.log("Close WebSocket connection.");
        if (intervalId) {
            clearInterval(intervalId);
        }
    });
}
exports.socketConnection = socketConnection;
function sendPriceNotification(tradeItem) {
    io.emit("stock price update", tradeItem);
}
exports.sendPriceNotification = sendPriceNotification;
function receiveNotification() {
    getTradeList();
}
exports.receiveNotification = receiveNotification;
function getTradeList() {
    mktDataController.getTradeList()
        .then((data) => {
        tradeList = data;
    })
        .catch((error) => {
        console.log("error on commodity data:", error);
    });
}
function pushPriceChangeNotifiction() {
    let listCount = 0;
    intervalId = setInterval(() => {
        const tradeItem = tradeList[listCount];
        tradeItem.price = Math.floor(Math.random() * 500);
        console.log("Trade price:", tradeItem);
        sendPriceNotification(tradeItem);
        listCount++;
        if (listCount >= tradeList.length) {
            listCount = 0;
        }
    }, 500);
}
