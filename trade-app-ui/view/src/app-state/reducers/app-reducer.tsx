import {AppActions} from '../actions/actions';

import {CREATE_TRADE, DELETE_SLECTED_ITEM, EDIT_TDADE_ROW, FETCH_COMMODITY_SUCCESS,
        FETCH_COUNTERPARTY_SUCCESS, FETCH_LOCATION_SUCCESS, NEW_TRADE_SUBMITED,
        SELECT_TDADE_ROW} from '../actions/action-names';

// import {fetchCommodity, fetchCounterparty, fetchLocation } from '../actions/ajax-actions';


import {IRootState} from '../types';


const initialState: IRootState = {    
    commodityList: [],
    counterpartyList: [],
    locationList: [],
    openCreateForm: false,
    openEditForm: false,
    selectedTrade: {
        commodity: '',
        counterparty: '',
        location: '',
        price: 0,
        quantity: 0,        
        side: '',
        tradeDate: ''
    }
}
export function AppReducer(state:IRootState = initialState, action:any):IRootState{
    switch((action as AppActions).type) {
        case CREATE_TRADE:
        return Object.assign({}, state, {
            openCreateForm: true,
            openEditForm: false,
            selectedTrade: initialState.selectedTrade            
        });
        case EDIT_TDADE_ROW:
            return Object.assign({}, state, {openCreateForm: true, openEditForm: false});
        case DELETE_SLECTED_ITEM:
            return Object.assign({}, state, {
                openCreateForm: false,
                openEditForm: false,
                selectedTrade: initialState.selectedTrade                
            });
        case SELECT_TDADE_ROW:
            return Object.assign({}, state, {
                openCreateForm: false,
                openEditForm: true,
                selectedTrade: action.payload                
            });
        case FETCH_COMMODITY_SUCCESS:
            return Object.assign({}, state, {commodityList: action.payload});
        case FETCH_COUNTERPARTY_SUCCESS:
            return Object.assign({}, state, {counterpartyList: action.payload});
        case FETCH_LOCATION_SUCCESS:
            return Object.assign({}, state, {locationList: action.payload});
        case NEW_TRADE_SUBMITED:
            return Object.assign({}, state, {
                openCreateForm: false,
                openEditForm: false,
                selectedTrade: initialState.selectedTrade
            });
        default:
        return state;
    }
}