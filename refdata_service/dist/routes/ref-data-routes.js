"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ref_data_controller_1 = require("../controllers/ref-data-controller");
class Routes {
    constructor() {
        this.refDataController = new ref_data_controller_1.RefDataController();
    }
    routes(app) {
        app.route("/commodity")
            .get((req, res) => {
            this.refDataController.getAllCommodity()
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((error) => {
                console.log("error on commodity data:", error);
                res.status(200).json({ error: "Error" });
            });
        });
        app.route("/counterparty")
            .get((req, res) => {
            this.refDataController.getAllCounterparty()
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((error) => {
                console.log("error on counterparty data::", error);
                res.status(200).json({ error: "Error" });
            });
        });
        // Contact
        app.route("/location")
            .get((req, res) => {
            this.refDataController.getAllLocation()
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((error) => {
                console.log("error on location data::", error);
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
