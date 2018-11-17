import { API_URL_GET_COMMODITY, API_URL_GET_COUNTERPATY, API_URL_GET_CREATE_TRADE, 
    API_URL_GET_DELETE_TRADE, API_URL_GET_LOCATION, API_URL_GET_SEARCH_TRADE,
    API_URL_GET_UPDATE_TRADE } from '../api-urls';

import { ItradeList } from '../types';

import axios from 'axios';

import { FetchCommoditySuccess, FetchCounterpartySuccess,
        FetchLocationSuccess, NewTradeSubmitedAction, SearchedTradeAction } from './actions';

export function fetchCommodity() {
    return (dispatch: any) => {
        return axios.get(API_URL_GET_COMMODITY)
        .then((res: any) => {
            const commodity: any = res.data;
            console.log('commodity', commodity);
            dispatch(FetchCommoditySuccess(commodity));
        }).catch((err) => {
            console.log(err);
        })
    };
}
export function fetchCounterparty() {
    return (dispatch: any) => {
        return axios.get(API_URL_GET_COUNTERPATY)            
            .then((res: any) => {
                const counterparty: any = res.data;
                console.log('counterparty', counterparty);
                dispatch(FetchCounterpartySuccess(counterparty));
            }).catch((err) => {
                console.log(err);
            })
    };
}
export function fetchLocation() {
    return (dispatch: any) => {
        return axios.get(API_URL_GET_LOCATION)
            .then((res: any) => {
                const location: any = res.data;
                console.log('location', location);
                dispatch(FetchLocationSuccess(location));
            }).catch((err) => {
                console.log(err);
            })
    };
}
export function SearchTrade(payload: ItradeList) {
    return (dispatch: any) => {
        return axios.post(API_URL_GET_SEARCH_TRADE, payload)
            .then((res: any) => {
                const searchedItems: ItradeList[] = res.data;
                console.log('searchedItems', searchedItems);
                dispatch(SearchedTradeAction(searchedItems));
            }).catch((err) => {
                console.log(err);
            })
    };
}
export function CreateNewTrade(payload: ItradeList) {
    console.log('CreateNewTrade', payload);
    return (dispatch: any) => {
        return axios.post(API_URL_GET_CREATE_TRADE, payload)
            .then((res: any) => {
                const tradeData: any = res.data;
                console.log('tradeData', tradeData);
                dispatch(NewTradeSubmitedAction(tradeData));
            }).catch((err) => {
                console.log(err);
            })
    };
}
export function deleteTradeReq(payload: ItradeList) {
    console.log('delete trade', payload);
    return (dispatch: any) => {
        return axios.post(API_URL_GET_DELETE_TRADE, payload)
            .then((res: any) => {
                const tradeData: any = res.data;
                console.log('tradeData', tradeData);
                // dispatch(DeleteSelectedItemAction());
            }).catch((err) => {
                console.log(err);
            })
    };
}
export function UpdateTrade(payload: ItradeList) {
    return (dispatch: any) => {
        return axios.post(API_URL_GET_UPDATE_TRADE, payload)
            .then((res: any) => {
                console.log('Update trade', res.data);
            }).catch((err) => {
                console.log(err);
            })
    };
}
// Handle HTTP errors since fetch won't.
// function handleErrors(response: any) {
//     if (!response.ok) {
//         throw Error(response.statusText);
//     }
//     return response;
// }