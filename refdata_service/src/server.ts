import errorHandler from "errorhandler";

import { App } from "./app";
const appSer = new App();
appSer.app.use(errorHandler());
