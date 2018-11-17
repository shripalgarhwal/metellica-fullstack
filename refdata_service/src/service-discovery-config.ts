declare function require(name: string): any;
const eureka = require("eureka-js-client").Eureka;

export function serviceDiscovery(port: any) {
  const promise = new Promise((resolve: Function) => {
    const client = new eureka({
      eureka: {
        host: "localhost",
        port: 8070,
        servicePath: "/eureka/apps/",
        defaultZone: "http://127.0.0.1:8761/eureka/apps/"
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

    client.start((error: any) => {
        console.log("Node eureka started:", error);
        resolve();
    });
  });
  return promise;
}
