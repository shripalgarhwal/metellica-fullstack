import { Schema } from "mongoose";

export const CommoditySchema: Schema = new Schema({
    code: {
        required: "Enter a commodity name",
        type: String,
    },
    name: {
        type: String,
    },
});
export const CounterpartySchema: Schema = new Schema({
    code: {
        required: "Enter a Counterparty name",
        type: String,
    },
    name: {
        type: String,
    },
});
export const LocationSchema: Schema = new Schema({
    code: {
        required: "Enter a locale name",
        type: String,
    },
    name: {
        required: "Enter a location name",
        type: String,
    },
});
