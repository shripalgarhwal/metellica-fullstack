import {Action, ActionCreator} from 'redux';
import {ItradeList, IValuePair} from '../types';

import {CREATE_TRADE, DELETE_SLECTED_ITEM, DELETE_TDADE_ROW, EDIT_TDADE_ROW,
        FETCH_COMMODITY_BEGIN, FETCH_COMMODITY_SUCCESS, FETCH_COUNTERPARTY_BEGIN,
        FETCH_COUNTERPARTY_SUCCESS, FETCH_LOCATION_BEGIN,
        FETCH_LOCATION_SUCCESS, GET_TDADE_LIST, NEW_TRADE_SUBMITED,
        SEARCHED_TRADE, SELECT_TDADE_ROW, UPDATE_TDADE_ROW } from './action-names';



export interface ICreateTradeAction extends Action {
    payload: any;
    type: string;
}
export interface IGetTradeListAction extends Action {
    type: string;
}
export interface IEditTradeAction extends Action {
    type: string;
    payload: ItradeList;
}
export interface IDeleteTradeRowAction extends Action {
    type: string;
    payload: ItradeList;
}
export interface IDeleteSelectedItem extends Action {
    type: string;
}
export interface INewTradeSubmitedAction extends Action {
    type: string;
}
export interface ISelectTradeAction extends Action {
    type: string;
    payload: ItradeList;
}
export interface IValuePairAction extends Action {
    type: string;
}
export interface ISearchedTradeAction extends Action {
    type: string;
    payload: ItradeList[];
}
export interface IValuePairSuccessAction extends Action {
    type: string;
    payload: IValuePair[];
}
export interface IUpdateTradePriceAction extends Action {
    type: string;
    payload: ItradeList;
}
export type AppActions = ICreateTradeAction | 
                        IGetTradeListAction | 
                        IEditTradeAction | 
                        IDeleteTradeRowAction | 
                        IDeleteSelectedItem | 
                        INewTradeSubmitedAction |
                        ISelectTradeAction |
                        IValuePairAction |
                        ISearchedTradeAction;


export const CreateTradeAction: ActionCreator<ICreateTradeAction> = 
(item: any) => ({
    payload: item,
    type: CREATE_TRADE
})
export const GetTradeListAction: ActionCreator<IGetTradeListAction> = 
() => ({
    type: GET_TDADE_LIST
})
export const EditRowAction: ActionCreator<IEditTradeAction> = 
(item: ItradeList) => ({
    payload: item,
    type: EDIT_TDADE_ROW
})
export const DeleteRowAction: ActionCreator<IDeleteTradeRowAction> = 
(item: ItradeList) => ({
    payload: item,
    type: DELETE_TDADE_ROW
})
export const DeleteSelectedItemAction: ActionCreator<IDeleteSelectedItem> = 
() => ({
    type: DELETE_SLECTED_ITEM
})
export const FetchCommodityBegin: ActionCreator<IValuePairAction> = 
() => ({
    type: FETCH_COMMODITY_BEGIN
})
export const FetchCounterpartyBegin: ActionCreator<IValuePairAction> = 
() => ({
    type: FETCH_COUNTERPARTY_BEGIN
})
export const FetchLocationBegin: ActionCreator<IValuePairAction> = 
() => ({
    type: FETCH_LOCATION_BEGIN
})
export const FetchCommoditySuccess: ActionCreator<IValuePairAction> = 
(item: IValuePair[]) => ({
    payload: item,
    type: FETCH_COMMODITY_SUCCESS
})
export const FetchCounterpartySuccess: ActionCreator<IValuePairAction> = 
(item: IValuePair[]) => ({
    payload: item,
    type: FETCH_COUNTERPARTY_SUCCESS
})
export const FetchLocationSuccess: ActionCreator<IValuePairAction> = 
(item: IValuePair[]) => ({
    payload: item,
    type: FETCH_LOCATION_SUCCESS
})
export const NewTradeSubmitedAction: ActionCreator<INewTradeSubmitedAction> = 
(item: ItradeList[]) => ({
    payload: item,
    type: NEW_TRADE_SUBMITED
})
export const SearchedTradeAction: ActionCreator<ISearchedTradeAction> = 
(item: ItradeList[]) => ({
    payload: item,
    type: SEARCHED_TRADE
})
export const SelectRowAction: ActionCreator<ISelectTradeAction> = 
(item: ItradeList) => ({
    payload: item,
    type: SELECT_TDADE_ROW
})
export const UpdateRowAction: ActionCreator<IUpdateTradePriceAction> = 
(item: ItradeList) => ({
    payload: item,
    type: UPDATE_TDADE_ROW
})
