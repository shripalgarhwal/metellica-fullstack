"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trade_controller_1 = require("../controllers/trade-controller");
const trade_notification_1 = require("../trade-notification");
class Routes {
    constructor() {
        this.refDataController = new trade_controller_1.TradeController();
    }
    routes(app) {
        app.route("/createTrade")
            .post((req, res) => {
            this.refDataController.createNewTrade(req)
                .then((data) => {
                trade_notification_1.sendNewTradeAlert();
                res.status(200).json(data);
            })
                .catch((error) => {
                console.log("error on create trade:", error);
                res.status(200).json({ error: "Error" });
            });
        });
        app.route("/updateTrade")
            .post((req, res) => {
            this.refDataController.updateTrade(req)
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((error) => {
                console.log("error on create trade:", error);
                res.status(200).json({ error: "Error" });
            });
        });
        app.route("/deleteTrade")
            .post((req, res) => {
            this.refDataController.deleteTrade(req)
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((error) => {
                console.log("error on create trade:", error);
                res.status(200).json({ error: "Error" });
            });
        });
        app.route("/searchTrade")
            .post((req, res) => {
            console.log("search trade route:");
            this.refDataController.searchTrade(req)
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((error) => {
                console.log("error on create trade:", error);
                res.status(200).json({ error: "Error" });
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
exports.Routes = Routes;
