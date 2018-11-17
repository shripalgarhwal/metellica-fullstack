import * as React from 'react';

import Paper from '@material-ui/core/Paper';

import "./container.component.css";
import CreateTradeForm from "./create-trade.component";
import TradeFormHeader from "./trade-form-header.component";
import ViewTrade from './view-trade.component';

import {ItradeList, IValuePair} from '../../app-state';

interface ITradeFormProps {
    commodityList: IValuePair[];
    counterpartyList: IValuePair[];
    locationList: IValuePair[];
    openCreateForm: boolean;
    openEditForm:boolean;
    selectedTradeRow: ItradeList
    deleteSelectItem: (value: any) => any;
    editTradeHandlar: (value: any) => any;
    submitNewTrade: (value: ItradeList) => any
}

const TradeForm = (props:ITradeFormProps) =>{
        const {openCreateForm, openEditForm, deleteSelectItem, editTradeHandlar, selectedTradeRow,
            commodityList, counterpartyList, locationList, submitNewTrade} = props;
        return (
        <Paper className={'trader-form'}>
            <TradeFormHeader  openCreateForm={openCreateForm}
                openEditForm={openEditForm}
                deleteSelectItem={deleteSelectItem}
                editTradeHandlar={editTradeHandlar}/>
            { 
                openCreateForm?
                <CreateTradeForm selectedTradeRow={selectedTradeRow}
                    commodityList={commodityList}
                    counterpartyList={counterpartyList}
                    locationList={locationList}
                    submitNewTrade={submitNewTrade} />
                :<ViewTrade selectedTradeRow={selectedTradeRow} />
            }
        </Paper>
    )
}
export default TradeForm;
 