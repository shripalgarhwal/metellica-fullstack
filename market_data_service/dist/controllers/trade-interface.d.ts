export interface ITrade {
    counterparty: string;
    commodity: string;
    location: string;
    id?: number;
    price: number;
    quantity: number;
    side: string;
    tradeDate: string;
}
