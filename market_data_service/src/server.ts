import errorHandler from "errorhandler";
import {socketConnection } from "./services";

import { App } from "./app";
const appSer = new App();
appSer.app.use(errorHandler());