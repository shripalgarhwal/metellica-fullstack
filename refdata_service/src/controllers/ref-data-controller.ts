import { ICommodity, ICounterparty, ILocation } from "./ref-data-interface";
import { CommoditySchema, CounterpartySchema, LocationSchema } from "./ref-data-models";

import { Request, Response } from "express";

import { DbRef } from "../app";
export class RefDataController {
    public getAllCommodity() {
        const promise = new Promise((resolve: (data: ICounterparty[]) => void, reject: () => void) => {
            const dataCollection: ICommodity[] = [];
            DbRef().collection("commodity").find({})
            .on("data", (data: ICommodity) => {
                dataCollection.push(data);
            }).
            on("end", () => {
                console.log("commodity stream end:", dataCollection);
                resolve(dataCollection);
            });
        });
        return promise;
    }
    public getAllCounterparty() {
        const promise = new Promise((resolve: (data: ICounterparty[]) => void, reject: () => void) => {
            const dataCollection: ICounterparty[] = [];
            DbRef().collection("counterparty").find({})
            .on("data", (data: ICounterparty) => {
                dataCollection.push(data);
            }).
            on("end", () => {
                console.log("counterparty stream end:", dataCollection);
                resolve(dataCollection);
            });
        });
        return promise;
    }
    public getAllLocation() {
        const promise = new Promise((resolve: (data: ICounterparty[]) => void, reject: () => void) => {
            const dataCollection: ILocation[] = [];
            DbRef().collection("location").find({})
            .on("data", (data: ILocation) => {
                dataCollection.push(data);
            }).
            on("end", () => {
                console.log("location stream end:", dataCollection);
                resolve(dataCollection);
            });
        });
        return promise;
    }
}
