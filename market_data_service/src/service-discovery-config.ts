// import { Eureka } from "eureka-js-client";
// declare function require(name:string):any;
let eureka = require("eureka-js-client").Eureka;

export function serviceDiscovery(port: any) {
    const promise = new Promise((resolve: Function) => {
        const client = new eureka({
            instance: {
            app: "market-data",
            name: "market-data",
            hostName: "localhost",
            ipAddr: "127.0.0.1",
            vipAddress: "market-data",
            statusPageUrl: `http://localhost:${port}`,
            port: {
                $: port,
                '@enabled': 'true'
            },
            dataCenterInfo: {
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                name: "MyOwn"      
            },
            fetchRegistry: true,
            registerWithEureka: true
            },
            eureka: {
            host: "localhost",
            port: 8070,
            servicePath: "/eureka/apps/"
            }
        });
        
        client.start((error:any) => {
            console.log("Node eureka started:", error);
            resolve();
        });
    });
    return promise;
}
