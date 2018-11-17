import * as React from 'react';

import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

import { IValuePair } from '../../app-state';

import './create-trade.component.css';

interface IProps {
    selectedTradeRow?: any;
    commodityList: IValuePair[];
    counterpartyList: IValuePair[];
    locationList: IValuePair[];
    submitNewTrade: (value: IState) => IState
};
interface IState {    
    counterparty: string;
    commodity: string;
    location: string;
    id?: number;
    price: number;
    quantity: number;
    side: string;
    tradeDate: string;
};

class CreateTradeForm extends React.Component<IProps, IState>{
    public state = {        
        commodity: '',        
        counterparty: '',
        location: '',
        price: 0,
        quantity: 0,
        side: 'Buy',
        tradeDate: new Date().toString(),
    };
    constructor(props:any) {
        super(props);
        this.handleChangeSide = this.handleChangeSide.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeCommodity = this.handleChangeCommodity.bind(this);
        this.handleChangeCounterparty = this.handleChangeCounterparty.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }
    public componentDidMount() {
        this.setPropsInState();
    }
    public handleChange = (name:any) => (value:any) => {
        this.setState({
            side: value,
        });
    };
    public handleChangeSide = (event:any) =>{
        console.log("change side::", event.target.value);
        // console.log("change side111::", sideVal);
        this.setState({ side: event.target.value});
      };
    public handleChangeDate(event:any):void {
        this.setState({ tradeDate: event.target.value });
    }
    public handleChangeCommodity(event:any):void{
        this.setState({ commodity: event.target.value });
    }
    public handleChangeCounterparty(event: any):void {
        this.setState({ counterparty: event.target.value });
    }
    public handleChangePrice(event: any):void {
        this.setState({ price: event.target.value });
    }
    public handleChangeQuantity(event: any): void {
        this.setState({ quantity: Number(event.target.value) });
    }
    public handleChangeLocation(event: any): void {
        this.setState({ location: event.target.value });
    }
    public handleSubmit(event:any):void {
        event.preventDefault();
        console.log('Submit:', this.state);
        this.props.submitNewTrade(this.state);
    }
    public setPropsInState():void {
        console.log('setPropsInState rows:::');
        this.setState({...this.props.selectedTradeRow});
    }
    public render () {
        return (
            <form noValidate={true} className={'container'}>
                <Grid container={true} spacing={24}>
                    <Grid item={true} xs={4} sm={4} md={4}>
                        <label>Trade Date: </label>
                    </Grid>
                    <Grid item={true} xs={8} sm={8} md={8}>
                        <TextField
                            id="fromDate"
                            type="date"
                            value={this.state.tradeDate}
                            onChange={this.handleChangeDate}
                            className={'textField'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item={true} xs={4} sm={4} md={4}>
                        <label>Commodity: </label>
                    </Grid>
                    <Grid item={true} xs={8} sm={8} md={8}>
                        <select value={this.state.commodity}
                            onChange={this.handleChangeCommodity}>
                            <option value="">Select</option>
                            {
                                this.props.commodityList.map((item: IValuePair, index: number) => {
                                    return <option key={index} value={item.code}>{item.name}</option>
                                })
                            }
                        </select>
                    </Grid>
                    <Grid item={true} xs={4} sm={4} md={4}>
                        <label>Side: </label>
                    </Grid>
                    <Grid item={true} xs={8} sm={8} md={8}>
                        <FormControlLabel value="female" control={
                            <Radio
                                checked={this.state.side === 'buy'}
                                onChange={this.handleChangeSide}
                                value="buy"
                                name="side"
                                aria-label="Buy"
                                color="default"
                                />} label="Buy" />
                        <FormControlLabel value="male" control={
                            <Radio
                                checked={this.state.side === 'sell'}
                                onChange={this.handleChangeSide}
                                value="sell"
                                name="sell"
                                aria-label="Sell"
                                color="default"
                                />} label="Sell" />
                        
                        
                    </Grid>
                    <Grid item={true} xs={4} sm={4} md={4}>
                        <label>Counterparty: </label>
                    </Grid>
                    <Grid item={true} xs={8} sm={8} md={8}>
                        <select value={this.state.counterparty}
                            onChange={this.handleChangeCounterparty}>
                            <option value="">Select</option>
                            {
                                this.props.counterpartyList.map((item: IValuePair, index: number) => {
                                    return <option key={index} value={item.code}>{item.name}</option>
                                })
                            }
                        </select>
                    </Grid>
                    <Grid item={true} xs={4} sm={4} md={4}>
                        <label>Price: </label>
                    </Grid>
                    <Grid item={true} xs={8} sm={8} md={8}>
                        <Input
                            value={this.state.price}
                            onChange={this.handleChangePrice}
                            type={'number'}                       
                            className={'input price-field'}
                            inputProps={{
                            'aria-label': 'Description',
                            }}
                            placeholder="Price"
                        /> USD
                    </Grid>
                    <Grid item={true} xs={4} sm={4} md={4}>
                        <label>Quantity: </label>
                    </Grid>
                    <Grid item={true} xs={8} sm={8} md={8}>
                        <Input
                            className={'input'}
                            value={this.state.quantity}
                            onChange={this.handleChangeQuantity}
                            type={'number'}
                            inputProps={{
                            'aria-label': 'Description',
                            }}
                            placeholder="Quantity"
                        />
                    </Grid>
                    <Grid item={true} xs={4} sm={4} md={4}>
                        <label>Location: </label>
                    </Grid>
                    <Grid item={true} xs={8} sm={8} md={8}>
                        <select value={this.state.location}
                            onChange={this.handleChangeLocation}>
                            <option value="">Select</option>
                            {
                                this.props.locationList.map((item: IValuePair, index: number) => {
                                    return <option key={index} value={item.code}>{item.name}</option>
                                })
                            }
                        </select>
                    </Grid>
                    <Grid item={true} xs={12} sm={12} md={12}>
                        <Button variant="contained" 
                            className={'button'}
                            color="default" >
                            CLEAR
                        </Button>
                        <Button variant="contained" 
                            className={'button'}
                            color="primary"
                            onClick={this.handleSubmit} >
                            SAVE
                        </Button>
                    </Grid>
                </Grid>
            </form>
        )
    }
}
export default CreateTradeForm;
 