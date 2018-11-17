import {AppActions} from '../actions/actions';

import {DELETE_TDADE_ROW, GET_TDADE_LIST, SEARCHED_TRADE, UPDATE_TDADE_ROW } from '../actions/action-names';

import {ItradeList} from '../types';


const initialState:ItradeList[] = [
    {
        commodity: 'AL',
        counterparty: 'Dummy',
        id: 1,
        location: 'Us',
        price: 22,
        quantity: 20,
        side: 'Buy',
        tradeDate: 'Frozen yoghurt'
    },
    {
        commodity: 'AL',
        counterparty: 'Dummy',
        id: 2,
        location: 'Us',
        price: 22,
        quantity: 20,
        side: 'Buy',
        tradeDate: 'Ice cream sandwich'
    },
    {
        commodity: 'AL',
        counterparty: 'Dummy',
        id: 3,
        location: 'Us',
        price: 22,
        quantity: 20,            
        side: 'Buy',
        tradeDate: 'Eclair'
    }
]

export function tradeListReducer(state:ItradeList[] = initialState, action:any):ItradeList[]{
    switch((action as AppActions).type) {
        case GET_TDADE_LIST:
            return state;
        case DELETE_TDADE_ROW:
            const filterList = state.filter((item:any) => {
                return item.id !== action.payload.id;
            });
        return [...filterList];
        case UPDATE_TDADE_ROW:
            const newState: ItradeList[] = [];
            state.forEach((item:any) => {
                
                if(item._id === action.payload._id) {
                    newState.push(action.payload);
                } else {
                    newState.push(item);
                }
            });
        return newState;
        case SEARCHED_TRADE:
        return [...action.payload];
        default:
        return state;
    }
}