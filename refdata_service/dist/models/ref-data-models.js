"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const Schema = mongoose.Schema;
exports.CommoditySchema = new Schema({
    commodityName: {
        required: "Enter a commodity name",
        type: String,
    },
});
exports.CounterpartySchema = new Schema({
    counterpartyName: {
        required: "Enter a Counterparty name",
        type: String,
    },
});
exports.LocationSchema = new Schema({
    locationName: {
        required: "Enter a location name",
        type: String,
    },
});
