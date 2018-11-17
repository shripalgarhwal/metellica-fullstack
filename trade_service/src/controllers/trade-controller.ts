import { ISearchTrade } from "./trade-interface";
import { TradesSchema } from "./trade-models";

import { Request, Response } from "express";

import { DbRef } from "../app";

import { sendNewTradeAlert } from "../trade-notification";
import mongoose = require("mongoose"); // import mongoose
import { Types } from "mongoose";

export class TradeController {
    public createNewTrade(req: any) {
        const Trade = DbRef().model("trades", TradesSchema);
        console.log("create trade data on trade server:", req.body);        
        const promise = new Promise((resolve: (data: any) => void, reject: () => void) => {
            const newTrade = new Trade(req.body);
            newTrade.save((error: any, trade: any) => {
                console.log("create trade data error:", error);
                if (error) {
                    reject();
                }
                console.log("create trade data successfully:", trade);
                sendNewTradeAlert();
                resolve(trade);
            });
        });
        return promise;
    }
    public updateTrade(req: any) {
        const Trade = DbRef().collection("trades");
        console.log("trade data updated on trade server:", req.body);
        const promise = new Promise((resolve: (data: any) => void, reject: () => void) => {
            const _id = new mongoose.mongo.ObjectId(req.body._id);
            const query = {"_id": _id}            
            delete req.body._id;
            delete req.body.__v;
            const newvalues = { $set: req.body };
            console.log(query, ":trade data update search query:", newvalues);
            Trade.updateOne(query, newvalues, (error: any, trade: any) => {
                console.log("trade data update error:", error);
                if (error) {
                    reject();
                }
                console.log("trade data updated successfully:", trade);
                sendNewTradeAlert();
                resolve(trade);
            });
        });
        return promise;
    }
    public deleteTrade(req: any) {
        const Trade = DbRef().model("trades", TradesSchema);
        const promise = new Promise((resolve: (data: any) => void, reject: () => void) => {
            console.log("delete trade query param:", req.body);
            const query = {_id: req.body._id};
            Trade.deleteOne(query, (error: any, trade: any) => {
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
    public searchTrade(req: any) {
        const Trade = DbRef().model("trades", TradesSchema);
        console.log("search Trade query param:", req.body);
        const promise = new Promise((resolve: (data: any) => void, reject: () => void) => {
            Trade.find(makeSearchQueryParam(req.body), (error: any, trade: any) => {
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

function makeSearchQueryParam(reqData: ISearchTrade) {
    let query: any = {};
    if (reqData.commodity) {
        query = Object.assign({}, query, {commodity: reqData.commodity});
    }
    if (reqData.counterparty) {
        query = Object.assign({}, query, {counterparty: reqData.counterparty});
    }
    if (reqData.location) {
        query = Object.assign({}, query, {location: reqData.location});
    }
    if (reqData.buy && reqData.sell) {
        query = Object.assign({}, query, { side: { $in: ["buy", "sell"] } });
    } else if (reqData.buy) {
        query = Object.assign({}, query, { side: "buy" });
    } else if (reqData.sell) {
        query = Object.assign({}, query, { side: "sell" });
    }
    if (reqData.fromDate && reqData.toDate) {
        query = Object.assign({}, query, { tradeDate: { $gte: reqData.fromDate, $lte: reqData.toDate } });
        query.tradeDate = { $gte: reqData.fromDate, $lte: reqData.toDate };
    } else if (reqData.fromDate) {
        query = Object.assign({}, query, { tradeDate: new Date(reqData.fromDate) });
    } else if (reqData.toDate) {
        query = Object.assign({}, query, { tradeDate: new Date(reqData.toDate) });
    }
    return query;
}
