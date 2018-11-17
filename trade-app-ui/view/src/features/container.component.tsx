import * as React from 'react';

import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import AddIcon from '@material-ui/icons/Add';

import { API_URL_GET_CREATE_TRADE, API_URL_GET_DELETE_TRADE, API_URL_GET_UPDATE_TRADE, 
        CreateNewTrade, CreateTradeAction, DeleteSelectedItemAction, EditRowAction,
        fetchCommodity, fetchCounterparty, fetchLocation, GetTradeListAction,
        IRootState, ISearchForm, ItradeList, SearchTrade, SelectRowAction
    } from '../app-state';
import {Notification} from '../services/notification';
import DataTable from './data-table/data-table.component';

import SearchForm from './search-form/search.component';

import './container.component.css';
import TradeForm from './trade-form/trade.component';

interface ITradeStateProps {
    rootState: IRootState;
    tradeList: ItradeList[];
    
}
interface ICompState {
    searchData: ISearchForm;    
}
interface ITradeDispatchProps {
    CreateNewTrade: (payload:ItradeList) => ItradeList
    CreateTradeAction: () => {};
    DeleteSelectedItemAction: () => void;    
    EditRowAction: (payload:ItradeList) => {payload:ItradeList};
    fetchCommodity: () => {type: string};
    fetchCounterparty: () => {type: string};
    fetchLocation: () => {type: string};
    GetTradeListAction: () => {type: string};
    SearchTrade: (payload: any) => any;
    SelectRowAction: (payload:ItradeList) => {payload:ItradeList};
}

class ContainerComponent extends React.Component<ITradeStateProps & ITradeDispatchProps> {
    public state:ICompState = {
        searchData: {
            buy: false,
            commodity: '',
            counterparty: '',
            fromDate: '',        
            location: '',
            sell: false,
            toDate: ''
        }        
    };
    constructor(props: ITradeStateProps & ITradeDispatchProps) {
        super(props);
        this.createTradeHandler = this.createTradeHandler.bind(this);
        this.deletRowHandlar = this.deletRowHandlar.bind(this);
        this.deleteSelectedItem = this.deleteSelectedItem.bind(this);
        this.editTradeHandlar = this.editTradeHandlar.bind(this);
        this.selectRowHandlar = this.selectRowHandlar.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.submitNewTrade = this.submitNewTrade.bind(this);
        const socketConn: Notification = new Notification();
        socketConn.makeSocketConnection();
    }
    public componentDidMount() {
        console.log('componentDidMount:');
        this.props.fetchCommodity();
        this.props.fetchCounterparty();
        this.props.fetchLocation();
        this.props.SearchTrade({});
    }
    public createTradeHandler(event:any):void {
        this.props.CreateTradeAction();
    }
    public deletRowHandlar(value:ItradeList):void {
        console.log('delete row::', value);
        axios.post(API_URL_GET_DELETE_TRADE, value)
            .then((res: any) => {
                console.log('deleted trade:', res.data);
                this.props.SearchTrade(this.state.searchData);
            }).catch((err) => {
                console.log(err);
            })
    }
    public deleteSelectedItem(value:ItradeList):void {
        console.log('deleteSelectItem::', value);
        this.props.DeleteSelectedItemAction();
    }
    
    public editTradeHandlar(value:ItradeList) {
        console.log('edit row::', value);
        this.props.EditRowAction(value);
    }
    public selectRowHandlar(value:ItradeList):void {
        console.log('selected row::', value);
        this.props.SelectRowAction(value);
    }
    public submitSearch(value: any):void {
        console.log('submitSearch:', value);
        this.setState({searchData: value});
        this.props.SearchTrade(value);
    }
    public submitNewTrade(value: any):void {
        console.log('submitNewTrade:', value);
        if(value._id){
            axios.post(API_URL_GET_UPDATE_TRADE, value)
            .then((res: any) => {
                console.log('Update trade', res.data);
                this.props.SearchTrade(this.state.searchData);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            axios.post(API_URL_GET_CREATE_TRADE, value)
            .then((res: any) => {
                console.log('New trade created:', res.data);
                this.props.SearchTrade(this.state.searchData);
            }).catch((err) => {
                console.log(err);
            })
        }
        
    }
    public render() {

        return (
            <div >
                <SearchForm
                    commodityList={this.props.rootState.commodityList}
                    counterpartyList={this.props.rootState.counterpartyList}
                    locationList={this.props.rootState.locationList}
                    submitSearch={this.submitSearch} />
                <Grid container={true} spacing={24}
                    className={'body-container'}>
                    <Grid item={true} xs={9} sm={9} md={9}>
                        <DataTable tradeList={this.props.tradeList}
                                    selectRowHandlar={this.selectRowHandlar}
                                    deletRowHandlar={this.deletRowHandlar} />
                    </Grid>
                    <Grid item={true} xs={3} sm={3} md={3}>
                        <Paper >
                            <TradeForm 
                                openCreateForm={this.props.rootState.openCreateForm }
                                openEditForm={this.props.rootState.openEditForm}
                                deleteSelectItem={this.deleteSelectedItem}
                                editTradeHandlar={this.editTradeHandlar}
                                submitNewTrade={this.submitNewTrade}
                                selectedTradeRow={this.props.rootState.selectedTrade}
                                commodityList={this.props.rootState.commodityList}
                                counterpartyList={this.props.rootState.counterpartyList}
                                locationList={this.props.rootState.locationList}/>
                        </Paper>
                    </Grid>
                </Grid>
                <Button variant="fab" color="primary"
                    onClick={this.createTradeHandler}>
                    <AddIcon />
                </Button>
            </div>
        );
    }
}
const mapStateToProps = (state: any): ITradeStateProps => {
    return {
        rootState: state.appState,
        tradeList: state.tradeList        
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    CreateNewTrade,
    CreateTradeAction,
    DeleteSelectedItemAction,    
    EditRowAction,
    GetTradeListAction,
    SearchTrade,
    SelectRowAction, 
    fetchCommodity,
    fetchCounterparty,
    fetchLocation
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ContainerComponent);
 