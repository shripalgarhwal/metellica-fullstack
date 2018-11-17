import { Application } from "express";
import { RefDataController } from "../controllers/ref-data-controller";
export declare class Routes {
    refDataController: RefDataController;
    routes(app: Application): void;
}
