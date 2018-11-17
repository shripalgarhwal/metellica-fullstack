// declare function require(name: string): any;
// const eureka = require("eureka-js-client").Eureka;

// import Eureka from 'eureka-client';
const Eureka = require("eureka-client").Eureka;

export function serviceDiscovery(port: any) {
  const promise = new Promise((resolve: Function) => {
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

    client.start((error: any) => {
        console.log("Node eureka started:", error);
        resolve();
    });
  });
  return promise;
}
