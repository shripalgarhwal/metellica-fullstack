"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trade_models_1 = require("./trade-models");
const db_setup_1 = require("../db-setup");
class TradeController {
    createNewTrade(req) {
        const Trade = db_setup_1.DbRef().model("trade", trade_models_1.TradesSchema);
        console.log("create trade data on trade server:", req.body);
        const promise = new Promise((resolve, reject) => {
            const newTrade = new Trade(req.body);
            newTrade.save((error, trade) => {
                console.log("create trade data error:", error);
                if (error) {
                    reject();
                }
                console.log("create trade data successfully:", trade);
                resolve(trade);
            });
        });
        return promise;
    }
    updateTrade(req) {
        const Trade = db_setup_1.DbRef().model("trade", trade_models_1.TradesSchema);
        console.log("create trade data on trade server:", req.body);
        const promise = new Promise((resolve, reject) => {
            const query = { __id: req.body.__id };
            Trade.update(query, req.body, (error, trade) => {
                console.log("trade data update error:", error);
                if (error) {
                    reject();
                }
                console.log("trade data updated successfully:", trade);
                resolve(trade);
            });
        });
        return promise;
    }
    deleteTrade(req) {
        const Trade = db_setup_1.DbRef().model("trade", trade_models_1.TradesSchema);
        const promise = new Promise((resolve, reject) => {
            console.log("delete trade query param:", req.body);
            const query = { _id: req.body._id };
            Trade.deleteOne(query, (error, trade) => {
                console.log("remove trade data error:", error);
                if (error) {
                    reject();
                }
                console.log("removed trade data successfully:", trade.result);
                resolve(trade.result);
            });
        });
        return promise;
    }
    searchTrade(req) {
        const Trade = db_setup_1.DbRef().model("trade", trade_models_1.TradesSchema);
        console.log("search Trade query param:", req.body);
        const promise = new Promise((resolve, reject) => {
            Trade.find(makeSearchQueryParam(req.body), (error, trade) => {
                console.log("search trade data error:", error);
                if (error) {
                    reject();
                }
                console.log("searched trade data successfully:", trade);
                resolve(trade);
            });
        });
        return promise;
    }
}
exports.TradeController = TradeController;
function makeSearchQueryParam(reqData) {
    let query = {};
    if (reqData.commodity) {
        query = Object.assign({}, query, { commodity: reqData.commodity });
    }
    if (reqData.counterparty) {
        query = Object.assign({}, query, { counterparty: reqData.counterparty });
    }
    if (reqData.location) {
        query = Object.assign({}, query, { location: reqData.location });
    }
    if (reqData.buy && reqData.sell) {
        query = Object.assign({}, query, { side: { $in: ["buy", "sell"] } });
    }
    else if (reqData.buy) {
        query = Object.assign({}, query, { side: "buy" });
    }
    else if (reqData.sell) {
        query = Object.assign({}, query, { side: "sell" });
    }
    if (reqData.fromDate && reqData.toDate) {
        query = Object.assign({}, query, { tradeDate: { $gte: reqData.fromDate, $lte: reqData.toDate } });
        query.tradeDate = { $gte: reqData.fromDate, $lte: reqData.toDate };
    }
    else if (reqData.fromDate) {
        query = Object.assign({}, query, { tradeDate: new Date(reqData.fromDate) });
    }
    else if (reqData.toDate) {
        query = Object.assign({}, query, { tradeDate: new Date(reqData.toDate) });
    }
    return query;
}
