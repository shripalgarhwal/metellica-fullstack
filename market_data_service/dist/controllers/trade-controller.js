"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_setup_1 = require("../services/db-setup");
class TradeController {
    getTradeList() {
        // const Trade = DbRef().model("trade", TradesSchema);
        const promise = new Promise((resolve, reject) => {
            const dataCollection = [];
            db_setup_1.DbRef().collection("trade").find({})
                .on("data", (data) => {
                dataCollection.push(data);
            }).
                on("end", () => {
                console.log("commodity stream end:", dataCollection);
                resolve(dataCollection);
            });
        });
        return promise;
    }
}
exports.TradeController = TradeController;
