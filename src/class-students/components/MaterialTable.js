import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    row: {
        cursor: 'pointer'
    }
});

export default function MaterialTable({ works, onPress }) {
    const classes = useStyles();
    return (
        <Paper className={classes.root} elevation={0}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {works.map(row => (
                        <TableRow className={classes.row} key={row.aluno_id}>
                            <TableCell onClick={() => onPress(row.aluno_id)} component="th" scope="row">
                                {row.nome}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper >
    )
}