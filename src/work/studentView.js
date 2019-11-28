import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';

export default function RenderStudentView({ state, onChange, onSubmit, formatBool }) {
    if (state && !state.user.professor) {
        return (
            <div className='Student-Works-container'>
                <div className='Student-Works-content'>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h5">Trabalho</Typography>
                            <div className="card-items">
                                <div>
                                    <Typography color="textSecondary" variant="subtitle1">Descrição</Typography>
                                    <Typography variant="body1">{state.work ? state.work.descricao : ''}</Typography>
                                    <Typography color="textSecondary" variant="subtitle1">Turma</Typography>
                                    <Typography variant="body1">{state.work ? state.work.turma : ''}</Typography>
                                    <Typography color="textSecondary" variant="subtitle1">Curso</Typography>
                                    <Typography variant="body1">{state.work ? state.work.curso : ''}</Typography>
                                    <Typography color="textSecondary" variant="subtitle1">Data</Typography>
                                    <Typography variant="body1">{state.work ? state.work.data : ''}</Typography>
                                    <Typography color="textSecondary" variant="subtitle1">Data Limite</Typography>
                                    <Typography variant="body1">{state.work ? state.work.data_limite : ''}</Typography>
                                </div>
                                <div className="divider">
                                </div>
                                <div>
                                    <Typography color="textSecondary" variant="subtitle1">Enviado</Typography>
                                    <Typography variant="body1">{state.work ? formatBool(state.work.enviado) : ''}</Typography>
                                    <Typography color="textSecondary" variant="subtitle1">Nota</Typography>
                                    <Typography variant="body1">{state.work ? state.work.nota : ''}</Typography>
                                    <div className="Student-Works-upload">
                                        <Typography color="textSecondary" variant="subtitle1">Trabalho</Typography>
                                        <div className="mb-16"></div>
                                        <label htmlFor="file">Upload</label>
                                        <input type="file" id="file" name="file" onChange={onChange} />
                                        <div className="submitArea">
                                            <h4>{state.file ? 'Arquivo Anexado' : ''}</h4>
                                            <RenderSubmitButton onSubmit={onSubmit} fileName={state.file ? state.file.name : null} />
                                        </div>
                                    </div>
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

function RenderSubmitButton({ fileName, onSubmit }) {
    if (fileName) {
        return <button onClick={onSubmit}>Enviar</button>
    }

    return '';
}