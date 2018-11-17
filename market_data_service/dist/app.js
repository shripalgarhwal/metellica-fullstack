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
const services_1 = require("./services");
const morgan_1 = __importDefault(require("morgan"));
class App {
    // public routePrv: Routes = new Routes();
    constructor() {
        this.app = express_1.default();
        this.config();
        // this.routePrv.routes(this.app);
        services_1.DbSetup();
        this.afterDbSetup();
        services_1.socketConnection(this.app);
    }
    config() {
        this.app.use(morgan_1.default("dev"));
        // mount json form parser
        this.app.use(bodyParser.json());
        // mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));
    }
    afterDbSetup() {
        this.app.use((err, req, res, next) => {
            err.status = 404;
            next(err);
        });
    }
}
exports.default = new App().app;
