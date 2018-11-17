import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk'

import { IApplicationState } from './types';

import { AppReducer } from './reducers/app-reducer';
import { tradeListReducer } from './reducers/trade-list-reducer';


const reducers: Reducer<IApplicationState> = combineReducers<IApplicationState>({
    appState: AppReducer,
    tradeList: tradeListReducer    
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));