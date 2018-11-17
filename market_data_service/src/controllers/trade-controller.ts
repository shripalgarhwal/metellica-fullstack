import { ITrade } from "./trade-interface";

import { Request, Response } from "express";

import { DbRef } from "../app";

export class TradeController {
    public getTradeList() {
        const promise = new Promise((resolve: (data: any) => void, reject: () => void) => {
            const dataCollection: ITrade[] = [];
            DbRef().collection("trades").find({})
            .on("data", (data: ITrade) => {
                console.log("collecting trade from db:", data);
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
