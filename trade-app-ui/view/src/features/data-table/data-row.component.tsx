import * as React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


import Delete from '@material-ui/icons/Delete';
import { ItradeList } from '../../app-state';

interface IRowProps {
    item: ItradeList;
    selectRowHandlar: (value: ItradeList) => void;
    deletRowHandlar: (value: ItradeList) => void;
}

const DataRow = (props:IRowProps) => {
        const {item, selectRowHandlar, deletRowHandlar} = props;
        const deleteHandlar = (event:any) => {
            event.stopPropagation();
            deletRowHandlar(item);
        }
        const selectHandlar = (event:any) => {
            event.stopPropagation();
            selectRowHandlar(item);
        }
        return (
            <TableRow onClick={selectHandlar}>
                <TableCell component="td" scope="row">
                    {item.tradeDate}
                </TableCell>
                <TableCell numeric={true}>{item.commodity}</TableCell>
                <TableCell numeric={true}>{item.side}</TableCell>
                <TableCell numeric={true}>{item.quantity}</TableCell>
                <TableCell numeric={true}>{item.price}</TableCell>
                <TableCell numeric={true}>{item.counterparty}</TableCell>
                <TableCell numeric={true}>{item.location}</TableCell>
                <TableCell>
                    <div onClick={deleteHandlar}>
                        <Delete />
                    </div>
                </TableCell>
            </TableRow>
        )
}
export default DataRow;
 