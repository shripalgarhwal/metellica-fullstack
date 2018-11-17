import { ITrade } from "../controllers";
export declare function socketConnection(app: any): void;
export declare function sendPriceNotification(tradeItem: ITrade): void;
export declare function receiveNotification(): void;
