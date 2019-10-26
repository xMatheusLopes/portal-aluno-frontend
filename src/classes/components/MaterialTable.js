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
                        <TableCell>Turma</TableCell>
                        <TableCell align="right">Curso</TableCell>
                        <TableCell align="right">Matéria Atual</TableCell>
                        <TableCell align="right">Período</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {works.map(row => (
                        <TableRow className={classes.row} key={row.turma_id}>
                            <TableCell onClick={() => onPress(row.turma_id)} component="th" scope="row">
                                {row.turma}
                            </TableCell>
                            <TableCell onClick={() => onPress(row.turma_id)} align="right">{row.curso}</TableCell>
                            <TableCell onClick={() => onPress(row.turma_id)} align="right">{row.materia_atual}</TableCell>
                            <TableCell onClick={() => onPress(row.turma_id)} align="right">{row.periodo}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper >
    )
}