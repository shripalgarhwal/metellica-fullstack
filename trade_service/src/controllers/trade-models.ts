import { Schema } from "mongoose";

export const TradesSchema: Schema = new Schema({
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
