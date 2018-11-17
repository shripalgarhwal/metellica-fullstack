
import {NEW_TRADE} from './queue-names';
import * as Amqp from "amqp-ts";
const connection = new Amqp.Connection("amqp://localhost");
const exchange = connection.declareExchange("Metallica");
const queue = connection.declareQueue("QueueName");
queue.bind(exchange);
queue.activateConsumer((message) => {
    console.log("Message received: " + message.getContent());
    if(message.getContent() === "NewTradeCreated") {
        console.log("New Trade Message received: " + message.getContent());
        const tradeExchange = connection.declareExchange("MetallicaNewTrade");
        const msg2 = new Amqp.Message("NewTradeAvailable");
        tradeExchange.send(msg2);
    }
});

connection.completeConfiguration().then(() => {
    console.log("Trade server rabbitMq configuration compleated:");
});