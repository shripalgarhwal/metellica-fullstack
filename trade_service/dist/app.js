"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const db_setup_1 = require("./db-setup");
const morgan_1 = __importDefault(require("morgan"));
const path = __importStar(require("path"));
const trade_routes_1 = require("./routes/trade-routes");
const service_discovery_config_1 = require("./service-discovery-config");
const trade_notification_1 = require("./trade-notification");
class App {
    constructor() {
        this.routePrv = new trade_routes_1.Routes();
        this.app = express_1.default();
        this.config();
        service_discovery_config_1.serviceDiscovery(3300)
            .then(() => {
            this.routePrv.routes(this.app);
        });
        db_setup_1.DbSetup();
        this.afterDbSetup();
        trade_notification_1.configMq();
    }
    config() {
        // add static paths
        // this.app.use(express.static(path.join(__dirname, "public")));
        // configure pug
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        // mount logger
        this.app.use(morgan_1.default("dev"));
        // mount json form parser
        this.app.use(bodyParser.json());
        // mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));
        // mount cookie parker
        // this.app.use(cookieParser("SECRET_GOES_HERE"));
        // mount override
        // this.app.use(methodOverride());
    }
    afterDbSetup() {
        this.app.use((err, req, res, next) => {
            err.status = 404;
            next(err);
        });
    }
}
exports.default = new App().app;
