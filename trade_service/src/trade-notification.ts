import * as Amqp from "amqp-ts";

const NEW_TRADE = "NEW_TRADE_CREATED";
const connection = new Amqp.Connection("amqp://localhost");
const exchange = connection.declareExchange("Metallica");

export function configMq() {
    connection.completeConfiguration().then(() => {
        console.log("Trade server rabbitMq configuration compleated:");
    });
}
export function sendNewTradeAlert() {
    const msg2 = new Amqp.Message("NewTradeCreated");
    exchange.send(msg2);
}
