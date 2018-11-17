"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eureka = require("eureka-js-client").Eureka;
function serviceDiscovery(port) {
    const client = new eureka({
        eureka: {
            host: "localhost",
            port: 8070,
            servicePath: "/eureka/apps/",
        },
        instance: {
            app: "ref-data",
            dataCenterInfo: {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                name: "MyOwn",
            },
            fetchRegistry: true,
            hostName: "localhost",
            ipAddr: "127.0.0.1",
            name: "ref-data",
            port: {
                $: port,
                "@enabled": "true",
            },
            registerWithEureka: true,
            statusPageUrl: `http://localhost:${port}`,
            vipAddress: "ref-data",
        },
    });
    client.start((error) => {
        console.log("Node eureka started:", error);
    });
}
exports.serviceDiscovery = serviceDiscovery;
