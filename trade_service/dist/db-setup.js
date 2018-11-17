"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose"); // import mongoose
const mongoUrl = "mongodb://localhost:27017/metallica";
let dbRef;
exports.DbSetup = () => {
    // connect to mongoose
    const connection = mongoose.createConnection(mongoUrl);
    // global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;
    connection.addListener("open", () => {
        console.log("Mongodb connected:");
        dbRef = connection;
    });
    connection.addListener("error", () => {
        console.log("Error on Mongodb connection:");
    });
    connection.addListener("close", () => {
        console.log("Mongodb connection closed:");
    });
};
exports.DbRef = () => {
    return dbRef;
};
