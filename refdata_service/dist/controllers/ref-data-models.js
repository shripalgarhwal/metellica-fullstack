"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.CommoditySchema = new mongoose_1.Schema({
    code: {
        required: "Enter a commodity name",
        type: String,
    },
    name: {
        type: String,
    },
});
exports.CounterpartySchema = new mongoose_1.Schema({
    code: {
        required: "Enter a Counterparty name",
        type: String,
    },
    name: {
        type: String,
    },
});
exports.LocationSchema = new mongoose_1.Schema({
    code: {
        required: "Enter a locale name",
        type: String,
    },
    name: {
        required: "Enter a location name",
        type: String,
    },
});
