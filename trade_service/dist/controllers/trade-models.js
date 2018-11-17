"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.TradesSchema = new mongoose_1.Schema({
    commodity: {
        required: "Enter commodity",
        type: String,
    },
    counterparty: {
        required: "Enter counterparty",
        type: String,
    },
    id: {
        type: Number,
    },
    location: {
        required: "Enter location",
        type: String,
    },
    price: {
        required: "Enter a price",
        type: Number,
    },
    quantity: {
        required: "Enter quantity",
        type: Number,
    },
    side: {
        required: "Enter side",
        type: String,
    },
    tradeDate: {
        required: "Enter a tradeDate",
        type: String,
    },
});
