import { Application, Request, Response } from "express";
import { TradeController } from "../controllers/trade-controller";
import { ITrade } from "../controllers/trade-interface";

import { sendNewTradeAlert } from "../trade-notification";

export class Routes {
    public refDataController: TradeController = new TradeController();
    public routes(app: Application): void {
        app.route("/createTrade")
        .post((req: Request, res: Response) => {
            this.refDataController.createNewTrade(req)
            .then((data: any) => {
                sendNewTradeAlert();
                res.status(200).json(data);
            })
            .catch((error: any) => {
                console.log("error on create trade:", error);
                res.status(200).json({error: "Error"});
            });
        });
        app.route("/updateTrade")
        .post((req: Request, res: Response) => {
            this.refDataController.updateTrade(req)
            .then((data: any) => {
                res.status(200).json(data);
            })
            .catch((error: any) => {
                console.log("error on create trade:", error);
                res.status(200).json({error: "Error"});
            });
        });
        app.route("/deleteTrade")
        .post((req: Request, res: Response) => {
            this.refDataController.deleteTrade(req)
            .then((data: any) => {
                res.status(200).json(data);
            })
            .catch((error: any) => {
                console.log("error on create trade:", error);
                res.status(200).json({error: "Error"});
            });
        });
        app.route("/searchTrade")
        .post((req: Request, res: Response) => {
            console.log("search trade route:");
            this.refDataController.searchTrade(req)
            .then((data: any) => {
                res.status(200).json(data);
            })
            .catch((error: any) => {
                console.log("error on create trade:", error);
                res.status(200).json({error: "Error"});
            });
        });
        // // POST endpoint
        // .post((req: Request, res: Response) => {
        // // Create new contact
        //     res.status(200).send({
        //         message: "POST contact request successfulll!!!!",
        //     });
        // });

        // // Contact detail
        // app.route("/contact/:contactId")
        // // get specific contact
        // .get((req: Request, res: Response) => {
        // // Get a single contact detail
        //     res.status(200).send({
        //         message: "GET request successfulll!!!!",
        //     });
        // })
        // .put((req: Request, res: Response) => {
        // // Update a contact
        //     res.status(200).send({
        //         message: "PUT request successfulll!!!!",
        //     });
        // })
        // .delete((req: Request, res: Response) => {
        // // Delete a contact
        //     res.status(200).send({
        //         message: "DELETE request successfulll!!!!",
        //     });
        // });
    }
}
