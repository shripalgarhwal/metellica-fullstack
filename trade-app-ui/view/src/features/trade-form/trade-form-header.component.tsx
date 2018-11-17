import * as React from 'react';

import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import Grid from '@material-ui/core/Grid';

import './trade-form-header.component.css';

interface ITradeFormHeaderProps {
    openCreateForm: boolean;
    openEditForm: boolean;
    deleteSelectItem: (value:any) => any
    editTradeHandlar: (value:any) => any;
}
const TradeFormHeader = (props:ITradeFormHeaderProps) => {
    const {openCreateForm, openEditForm, deleteSelectItem, editTradeHandlar} = props;
    let editBtn;
    let deleteBtn;
    if(!openCreateForm && openEditForm) {
        editBtn = <Edit color="primary" onClick={ editTradeHandlar } />
    }
    if(openCreateForm || openEditForm) {
        deleteBtn = <Delete onClick={deleteSelectItem} /> 
    }
    return (
        <div className={'trader-form-header'}>
            <Grid container={true} spacing={24}>
                <Grid item={true} xs={9}>
                    Trade
                </Grid>
                <Grid item={true} xs={3} >
                    { editBtn }
                    { deleteBtn }                            
                </Grid>
            </Grid>
        </div>
    )
}
export default TradeFormHeader;
 