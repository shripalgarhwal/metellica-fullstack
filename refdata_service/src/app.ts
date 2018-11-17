import * as bodyParser from "body-parser";
import express from "express";

import logger from "morgan";
import * as path from "path";
import { Routes } from "./routes/ref-data-routes";

import mongoose = require("mongoose"); // import mongoose
const mongoUrl: string = "mongodb://localhost:27017/metallica";
let dbRef: any;

// import { serviceDiscovery } from "./service-discovery-config";

export class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    private port: string | number = '';
    constructor() {
        this.port = process.env.PORT || 3200;
        this.app = express();
        const httpServer = require('http').Server(this.app);
        this.config();
        // serviceDiscovery(3200)
        // .then(() => {
        //     this.routePrv.routes(this.app);
        //     DbSetup();
        //     this.mongoSetup();
        // });
        this.routePrv.routes(this.app);
        this.mongoSetup();
        this.listen(httpServer, this.port);
    }
    private config(): void {
        // add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        // configure view
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");

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
    private mongoSetup(): void {
        // connect to mongoose
        const connection: mongoose.Connection = mongoose.createConnection(mongoUrl);
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
