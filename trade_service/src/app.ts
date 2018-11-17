import * as bodyParser from "body-parser";
import express from "express";

import logger from "morgan";
import * as path from "path";
import { Routes } from "./routes/trade-routes";
import { serviceDiscovery } from "./service-discovery-config";
import { configMq } from "./trade-notification";
import mongoose = require("mongoose"); // import mongoose
const mongoUrl: string = "mongodb://localhost:27017/metallica";
let dbRef: any;

export class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    private port: string | number = '';
    constructor() {
        this.port = process.env.PORT || 3300;
        this.app = express();
        const httpServer = require('http').Server(this.app);
        this.config();
        // serviceDiscovery(3300)
        // .then(() => {
        //     this.routePrv.routes(this.app);
        // });
        this.routePrv.routes(this.app);
        this.dbSetup();
        this.listen(httpServer, this.port);
        configMq();
    }
    private config(): void {
        // mount logger
        this.app.use(logger("dev"));

        // mount json form parser
        this.app.use(bodyParser.json());

        // mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));
    }
    private listen(httpServer: any, port: string | number): void {
        httpServer.listen(port, function(){
            console.log('listening on *:' + port);
        });
    }
    private dbSetup(): void {
        // connect to mongoose
        const connection: mongoose.Connection = mongoose.createConnection(mongoUrl);
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
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });
    }
}
export const DbRef = () => {
    return dbRef;
};