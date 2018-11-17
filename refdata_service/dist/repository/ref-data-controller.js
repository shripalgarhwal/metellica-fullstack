"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_setup_1 = require("../db-setup");
// import mongoose = require("mongoose"); // import mongoose
// export const Commodity = mongoose.model("commodity", CommoditySchema);
// export const Counterparty = mongoose.model("counterparty", CounterpartySchema);
// export const Location = mongoose.model("location", LocationSchema);
class RefDataController {
    getAllCommodity() {
        const promise = new Promise((resolve, reject) => {
            const dataCollection = [];
            db_setup_1.DbRef().collection("commodity").find({})
                .on("data", (data) => {
                dataCollection.push(data);
            }).
                on("end", () => {
                console.log("commodity stream end:", dataCollection);
                resolve(dataCollection);
            });
        });
        return promise;
        // const newCommodity = new Commodity(req.body);
        // newCommodity.save((err, commodity) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(commodity);
        // });
    }
    getAllCounterparty() {
        const promise = new Promise((resolve, reject) => {
            const dataCollection = [];
            db_setup_1.DbRef().collection("counterparty").find({})
                .on("data", (data) => {
                dataCollection.push(data);
            }).
                on("end", () => {
                console.log("counterparty stream end:", dataCollection);
                resolve(dataCollection);
            });
        });
        return promise;
        // const newCounterparty = new Counterparty(req.body);
        // newCounterparty.save((err, counterparty) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(counterparty);
        // });
    }
    getAllLocation() {
        const promise = new Promise((resolve, reject) => {
            const dataCollection = [];
            db_setup_1.DbRef().collection("location").find({})
                .on("data", (data) => {
                dataCollection.push(data);
            }).
                on("end", () => {
                console.log("location stream end:", dataCollection);
                resolve(dataCollection);
            });
        });
        return promise;
        // const newLocation = new Location(req.body);
        // newLocation.save((err, location) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(location);
        // });
    }
}
exports.RefDataController = RefDataController;
