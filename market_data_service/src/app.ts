import { createServer, Server } from 'http';
import * as bodyParser from "body-parser";
import socketio from "socket.io";
// import {Eureka} from "eureka-js-client";
import express from "express";

import { socketConnection } from "./services";
import { serviceDiscovery } from "./service-discovery-config";

import logger from "morgan";
import * as path from "path";

import * as Amqp from "amqp-ts";
import { receiveNotification } from './services/notifications';
import mongoose = require("mongoose"); // import mongoose
const mongoUrl: string = "mongodb://localhost:27017/metallica";
let dbRef: any;

export class App {
    public app: express.Application;
    private port: string | number = '';
    constructor() {
        this.port = process.env.PORT || 3400;
        this.app = express();
        this.dbSetup().then(() => {
            const httpServer = require('http').Server(this.app);
            socketConnection(httpServer);
            this.config();
            this.afterDbSetup();        
            this.rabbitMqSetup();
            this.listen(httpServer, this.port);
        });
        
    }
    private config(): void {
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

    public getApp(): express.Application {
        return this.app;
    }
    private dbSetup(): Promise<any> {
        const promise = new Promise((resolve: any, reject: any) => {
            // connect to mongoose
            const connection: mongoose.Connection = mongoose.createConnection(mongoUrl);
            // global.Promise = require("q").Promise;
            mongoose.Promise = global.Promise;
            connection.addListener("open", () => {
                console.log("Mongodb connected:");
                dbRef = connection;
                resolve();
            });
            connection.addListener("error", () => {
                console.log("Error on Mongodb connection:");
            });
            connection.addListener("close", () => {
                console.log("Mongodb connection closed:");
            });
        })
        return promise;
    }
    private afterDbSetup(): void {
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });
    }
    private rabbitMqSetup(): void {
        const connection = new Amqp.Connection("amqp://localhost");
        const exchange = connection.declareExchange("MetallicaNewTrade");
        const queue = connection.declareQueue("NewTradeAvail");
        queue.bind(exchange);
        queue.activateConsumer((message) => {
            if(message.getContent() === "NewTradeAvailable") {
                console.log("activateConsumer Message received: " + message.getContent());
                receiveNotification();
            }
        });
        connection.completeConfiguration().then(() => {
            console.log("Trade server rabbitMq configuration compleated:");
        });
    }
}
export const DbRef = () => {
    return dbRef;
};