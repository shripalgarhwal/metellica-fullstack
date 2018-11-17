import { Application } from "express";
import { TradeController } from "../controllers/trade-controller";
export declare class Routes {
    refDataController: TradeController;
    routes(app: Application): void;
}
