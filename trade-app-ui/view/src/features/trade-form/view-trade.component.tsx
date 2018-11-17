import * as React from 'react';

import './view-trade.component.css';

interface IViewTradeProps {
    selectedTradeRow: any;
};

const ViewTrade = (props:IViewTradeProps) =>{
    const {selectedTradeRow} = props;
    return (
            <table>
                <tbody>
                    <tr>
                        <td>Trade Date</td>
                        <td>{selectedTradeRow.tradeDate}</td>
                    </tr>
                    <tr>
                        <td>Commodity</td>
                        <td>{selectedTradeRow.commodity}</td>
                    </tr>
                    <tr>
                        <td>Side</td>
                        <td>{selectedTradeRow.side}</td>
                    </tr>
                    <tr>
                        <td>Counter Party</td>
                        <td>{selectedTradeRow.counterparty}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>{selectedTradeRow.price?selectedTradeRow.price:""}</td>
                    </tr>
                    <tr>
                        <td>Quantity</td>
                        <td>{selectedTradeRow.quantity?selectedTradeRow.quantity:""}</td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td>{selectedTradeRow.location}</td>
                    </tr>
                </tbody>
            </table>
    )
}
export default ViewTrade;
 