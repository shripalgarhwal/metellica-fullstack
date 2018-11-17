"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("errorhandler"));
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 3200;
/**
 * Error Handler. Provides full stack - remove for production
 */
app_1.default.use(errorhandler_1.default());
const service_discovery_config_1 = require("./service-discovery-config");
service_discovery_config_1.serviceDiscovery(port);
/**
 * Start Express server.
 */
app_1.default.listen(port, () => {
    console.log("  App is running at http://localhost:%${port} in %s mode", app_1.default.get("port"), app_1.default.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
