import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import  DataRow from './data-row.component';

import { ItradeList } from '../../app-state';

import './data-table.component.css';


interface ITableProps {
    tradeList: ItradeList[];
    selectRowHandlar: (value: ItradeList) => void;
    deletRowHandlar: (value: ItradeList) => void;
}
const DataTable = (props:ITableProps) => {
        const {tradeList, selectRowHandlar, deletRowHandlar} = props;
        return (
            <Paper className={'table-container'}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Trade Date</TableCell>
                            <TableCell>Comodity</TableCell>
                            <TableCell>Side</TableCell>
                            <TableCell>Qty (MT)</TableCell>
                            <TableCell>Price(/MT)</TableCell>
                            <TableCell>Counterparty</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tradeList.map((n:any, index: number) => {
                            return (
                                <DataRow key={index.toString()} item={n}
                                    selectRowHandlar={selectRowHandlar}
                                    deletRowHandlar={deletRowHandlar} />
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
}
export default DataTable;
 