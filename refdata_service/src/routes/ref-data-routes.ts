import { Application, Request, Response } from "express";
import { RefDataController } from "../controllers/ref-data-controller";
import { ICommodity, ICounterparty, ILocation } from "../controllers/ref-data-interface";

export class Routes {
    public refDataController: RefDataController = new RefDataController();
    public routes(app: Application): void {
        app.route("/commodity")
        .get((req: Request, res: Response) => {
            console.log("commodity data request on refdata:");
            this.refDataController.getAllCommodity()
            .then((data: any) => {
                res.status(200).json(data);
            })
            .catch((error: any) => {
                console.log("error on commodity data:", error);
                res.status(200).json({error: "Error"});
            });
        });
        app.route("/counterparty")
        .get((req: Request, res: Response) => {
            this.refDataController.getAllCounterparty()
            .then((data: any) => {
                res.status(200).json(data);
            })
            .catch((error: any) => {
                console.log("error on counterparty data::", error);
                res.status(200).json({error: "Error"});
            });
        });

        // Contact
        app.route("/location")
        .get((req: Request, res: Response) => {
            this.refDataController.getAllLocation()
            .then((data: any) => {
                res.status(200).json(data);
            })
            .catch((error: any) => {
                console.log("error on location data::", error);
                res.status(200).json({error: "Error"});
            });
        });
    }
}
