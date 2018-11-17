export interface IApplicationState {
    tradeList: ItradeList[];
    appState:IRootState
}
export interface IRootState {    
    selectedTrade: ItradeList;
    commodityList: IValuePair[];
    counterpartyList: IValuePair[];
    locationList: IValuePair[];
    openCreateForm: boolean;
    openEditForm: boolean;
}
export interface ItradeList {     
    commodity: string,
    counterparty: string,
    id?: number,
    __id?: string,
    location: string,
    quantity?: number,
    price?: number,
    side: string,
    tradeDate: string
}
export interface IValuePair {
    code: string;
    name: string;
}
export interface ISearchForm {
    buy: boolean;
    commodity: string;
    counterparty: string;   
    fromDate: string;
    location: string;
    sell: boolean;        
    toDate: string;
}