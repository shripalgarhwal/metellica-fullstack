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
const ref_data_routes_1 = require("./routes/ref-data-routes");
class App {
    constructor() {
        this.routePrv = new ref_data_routes_1.Routes();
        this.app = express_1.default();
        this.config();
        this.routePrv.routes(this.app);
        db_setup_1.DbSetup();
        this.mongoSetup();
    }
    config() {
        // add static paths
        this.app.use(express_1.default.static(path.join(__dirname, "public")));
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
    mongoSetup() {
        // mongoose.Promise = global.Promise;
        // const connection: mongoose.Connection = mongoose.createConnection(this.mongoUrl);
        // mongoose.connect(this.mongoUrl).then(() => {
        //     console.log("mongo connected:");
        // })
        // .catch(err => {
        //     console.error("App starting error:", err.stack);
        //     process.exit(1);
        // });
        // use q promises
        // global.Promise = require("q").Promise;
        // mongoose.Promise = global.Promise;
        // // connect to mongoose
        // const connection: mongoose.Connection = mongoose.createConnection(this.mongoUrl);
        // connection.addListener("open", () => {
        //     console.log("Mongodb connected:");
        // });
        // connection.addListener("error", () => {
        //     console.log("Error on Mongodb connection:");
        // });
        // connection.addListener("close", () => {
        //     console.log("Mongodb connection closed:");
        // });
        // create models
        // this.model.user = connection.model<IUserModel>("User", userSchema);
        // catch 404 and forward to error handler
        this.app.use((err, req, res, next) => {
            err.status = 404;
            next(err);
        });
    }
}
exports.default = new App().app;
