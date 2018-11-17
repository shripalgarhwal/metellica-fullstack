import * as React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { ISearchForm, IValuePair } from '../../app-state';

import './search-form.css';

interface IProps {
    commodityList: IValuePair[];
    counterpartyList: IValuePair[];
    locationList: IValuePair[];
    submitSearch: (value: any) => any;
}

class SearchForm extends React.Component<IProps>{
    public state:ISearchForm = {
        buy: false,
        commodity: '',
        counterparty: '',
        fromDate: '',        
        location: '',
        sell: false,
        toDate: ''
    };
    constructor(props:any) {
        super(props);
        this.handleChangeBuy = this.handleChangeBuy.bind(this);
        this.handleChangeSell = this.handleChangeSell.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
        this.handleChangeCommodity = this.handleChangeCommodity.bind(this);
        this.handleChangeCounterparty = this.handleChangeCounterparty.bind(this);
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }
    public handleChangeBuy (event:any):void {
        this.setState({ buy: event.target.checked});
    }
    public handleChangeSell (event:any):void {
        this.setState({ sell: event.target.checked});
    }
    public handleChangeDate(event:any):void {
        this.setState({ toDate: event.target.value });
    }
    public handleChangeFromDate(event:any):void {
        this.setState({ fromDate: event.target.value });
    }
    public handleChangeCommodity(event:any):void{
        this.setState({ commodity: event.target.value });
    }
    public handleChangeCounterparty(event: any):void {
        this.setState({ counterparty: event.target.value });
    }
    public handleChangeLocation(event: any): void {
        this.setState({ location: event.target.value });
    }
    public handleSubmit(event:any):void {
        event.preventDefault();
        this.props.submitSearch(this.state);
        console.log('Submit:', this.state);
    }
    public resetForm(event: any): void{
        event.preventDefault();
        console.log('clean form:');
        this.setState({        
            commodity: '',
            counterparty: '',
            fromDate: '',        
            location: '',
            side: '',        
            toDate: ''
        })
    }
    public render () {
        return (
            <div className={'container'}>
                <Paper className={'pager'} elevation={1}>
                    <form noValidate={true}>
                        <div className={'form-fields'}>
                            <div> 
                                <div>
                                    <label>Trade Date: </label>
                                </div>
                                <TextField
                                    id="fromDate"
                                    type="date"                                
                                    className={'textField'}
                                    value={this.state.fromDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleChangeFromDate}
                                />
                            </div> 
                            <div>
                                <label>To: </label>
                                <TextField
                                    id="toDate"
                                    type="date"
                                    value={this.state.toDate}
                                    className={'textField'}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={this.handleChangeDate}
                                />
                            </div>
                            <div> 
                                <div>
                                    <label>Commodity: </label>
                                </div>
                                <select value={this.state.commodity}
                                    onChange={this.handleChangeCommodity}>
                                    <option value="">Select</option>
                                    { 
                                        this.props.commodityList.map((item: IValuePair, index: number) => {
                                            return <option key={index} value={item.code}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div> 
                                <div>
                                    <label>Side: </label>
                                </div>
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            checked={this.state.buy}
                                            onChange={this.handleChangeBuy}
                                            color="default" />
                                    }
                                    label="Buy"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            checked={this.state.sell}
                                            onChange={this.handleChangeSell}
                                            color="default" />
                                    }
                                    label="Sell"
                                />
                            </div>
                            <div> 
                                <div>
                                    <label>Counterparty: </label>
                                </div>
                                <select value={this.state.counterparty}
                                    onChange={this.handleChangeCounterparty}>
                                    <option value="">Select</option>
                                    {
                                        this.props.counterpartyList.map((item: IValuePair, index: number) => {
                                            return <option key={index} value={item.code}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div> 
                                <div>
                                    <label>Location: </label>
                                </div>
                                <select value={this.state.location}
                                    onChange={this.handleChangeLocation}>
                                    <option value="">Select</option>
                                    {
                                        this.props.locationList.map((item: IValuePair, index: number) => {
                                            return <option key={index} value={item.code}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <br/><br/>
                                <a href="" onClick={this.resetForm}>CLEAR</a>
                                <a href="" onClick={this.handleSubmit}>SEARCH</a>
                            </div>
                        </div>           
                    </form>
                </Paper>
            </div>
        )
    }
}

export default SearchForm;
 