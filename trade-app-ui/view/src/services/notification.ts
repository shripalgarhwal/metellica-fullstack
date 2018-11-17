import * as io from 'socket.io-client';
import { store, UpdateRowAction} from '../app-state';


export class Notification {
    public makeSocketConnection() {
        const socket = io("http://localhost:3400");
        socket.on("open", (message: any) => {
            console.log("message:::", message);
        })
        socket.on("receiveUpdatedPrice", (priceData: any) => {
            console.log("get receiveUpdatedPrice:", priceData);
            store.dispatch(UpdateRowAction(priceData));
        })
        socket.emit("sendLiveData","send updated price for UI ");
    }
}