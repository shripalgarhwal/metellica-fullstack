import { ITrade, TradeController } from "../controllers";
import * as socketio from "socket.io";

let io: any;
const mktDataController: TradeController = new TradeController();
let tradeList: ITrade[] = [];
let intervalId: any;

export function socketConnection(httpServer: any): void {
    io = require("socket.io")(httpServer);
    io.on("connection", (socket: any) => {
        console.log("A new WebSocket connection has been established");
        socket.on('sendLiveData', function(msg: any){
            console.log('receive data from UI');
            getTradeList();            
        });        
    });
    io.on("close", (socket: any) => {
        console.log("Close WebSocket connection.");
        if (intervalId) {
            clearInterval(intervalId);
        }
    });
}
export function sendPriceNotification(tradeItem: ITrade): void {
    io.emit("receiveUpdatedPrice", tradeItem);
}

export function receiveNotification() {
    getTradeList();
}
function getTradeList(): void {
    mktDataController.getTradeList()
    .then((data: ITrade[]) => {
        tradeList = data;
        console.log("get list from db:", data);
        pushPriceChangeNotifiction();
    })
    .catch((error: any) => {
        console.log("error on commodity data:", error);
    });
}
function pushPriceChangeNotifiction(): void {
    let listCount: number = 0;
    console.log("tradeList:", tradeList);
    if(intervalId) {
        clearInterval(intervalId);
    }
    if(tradeList.length > 0) {
        intervalId = setInterval(() => {
            const tradeItem = tradeList[listCount];
            tradeItem.price = Math.floor(Math.random() * 500);
            // console.log("Trade price:", tradeItem);
            sendPriceNotification(tradeItem);
            listCount++;
            if (listCount >= tradeList.length) {
                listCount = 0;
            }
        }, 2000);
    }
}
