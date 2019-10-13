import React from 'react';

export default function RenderStudentView({ state, onChange, onSubmit, formatBool }) {
    if (state && !state.user.professor) {
        return (
            <div className='Student-Works-container'>
                <div className='Student-Works-content'>
                    <div className='Student-Works-card'>
                        <h1>Trabalho</h1>
                        <div className="card-items">
                            <div>
                                <h3>Descrição:</h3>
                                <h2>{state.work ? state.work.descricao : ''}</h2>
                                <h3>Turma:</h3>
                                <h2>{state.work ? state.work.turma : ''}</h2>
                                <h3>Curso:</h3>
                                <h2>{state.work ? state.work.curso : ''}</h2>
                                <h3>Data:</h3>
                                <h2>{state.work ? state.work.data : ''}</h2>
                                <h3>Data Limite:</h3>
                                <h2>{state.work ? state.work.data_limite : ''}</h2>
                            </div>
                            <div className="divider">
                            </div>
                            <div>
                                <h3>Enviado:</h3>
                                <h2>{state.work ? formatBool(state.work.enviado) : ''}</h2>
                                <h3>Nota:</h3>
                                <h2>{state.work ? state.work.nota : ''}</h2>
                                <div className="Student-Works-upload">
                                    <h3>Trabalho:</h3>
                                    <label htmlFor="file">Upload</label>
                                    <input type="file" id="file" name="file" onChange={onChange} />
                                    <div className="submitArea">
                                        <h4>{state.file ? state.file.name : ''}</h4>
                                        <RenderSubmitButton onSubmit={onSubmit} fileName={state.file ? state.file.name : null} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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