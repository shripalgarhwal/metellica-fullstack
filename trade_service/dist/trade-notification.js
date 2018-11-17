"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Amqp = __importStar(require("amqp-ts"));
const NEW_TRADE = "NEW_TRADE_CREATED";
const connection = new Amqp.Connection("amqp://localhost");
const exchange = connection.declareExchange("Metallica");
// it is possible that the following message is not received because
// it can be sent before the queue, binding or consumer exist
function configMq() {
    connection.completeConfiguration().then(() => {
        // the following message will be received because
        // everything you defined earlier for this connection now exists
        console.log("Trade server rabbitMq configuration compleated:");
    });
}
exports.configMq = configMq;
function sendNewTradeAlert() {
    const msg2 = new Amqp.Message("NewTradeCreated");
    exchange.send(msg2);
}
exports.sendNewTradeAlert = sendNewTradeAlert;
