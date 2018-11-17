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
export interface ISearchTrade {
    buy?: boolean;
    counterparty?: string;
    commodity?: string;
    location?: string;
    sell?: boolean;
    fromDate?: string;
    toDate?: string;
}
