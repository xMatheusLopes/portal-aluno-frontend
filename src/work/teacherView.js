import React from 'react';

import { Card, CardContent, Typography, TextField, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function RenderTeacherView({ state, onChange, onSubmit }) {
    const classes = useStyles();

    if (state && state.user.professor && state.work) {
        return (
            <div className='Student-Works-container'>
                <div className='Student-Works-content'>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h5">Trabalho</Typography>
                            <div className="card-items">
                                <div>
                                    <Typography color="textSecondary" variant="subtitle1">{state.work ? state.work.descricao : ''}</Typography>
                                    <div className="mb-20">

                                        <TextField
                                            id="nota"
                                            label="Nota"
                                            margin="dense"
                                            value={state.work.nota} onChange={onChange}
                                        />

                                        <IconButton size="small" onClick={onSubmit} color="primary" aria-label="save" className={classes.margin}>
                                            <SaveIcon />
                                        </IconButton>
                                    </div>
                                    <Button variant="contained" color="primary" download rel="noopener noreferrer" target="_blank" href={state.work.link}>Baixar Trabalho</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return '';
}