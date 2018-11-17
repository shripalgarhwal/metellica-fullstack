"use strict";
// declare function require(name: string): any;
// const eureka = require("eureka-js-client").Eureka;
Object.defineProperty(exports, "__esModule", { value: true });
// import Eureka from 'eureka-client';
const Eureka = require("eureka-client").Eureka;
function serviceDiscovery(port) {
    const promise = new Promise((resolve) => {
        const client = new Eureka({
            eureka: {
                host: "localhost",
                port: 8070,
                servicePath: "/eureka/apps/",
            },
            instance: {
                app: "trade-service",
                dataCenterInfo: {
                    "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                    name: "MyOwn",
                },
                fetchRegistry: true,
                hostName: "localhost",
                ipAddr: "127.0.0.1",
                name: "trade-service",
                port: {
                    $: port,
                    "@enabled": "true",
                },
                registerWithEureka: true,
                statusPageUrl: `http://localhost:${port}`,
                vipAddress: "trade-service",
            },
        });
        client.start((error) => {
            console.log("Node eureka started:", error);
            resolve();
        });
    });
    return promise;
}
exports.serviceDiscovery = serviceDiscovery;
