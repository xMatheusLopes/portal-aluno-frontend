import React from 'react';

export default function RenderTeacherView({ state, onChange, onSubmit }) {
    if (state && state.user.professor && state.work) {
        return (
            <div className='Student-Works-container'>
                <div className='Student-Works-content'>
                    <div className='Student-Works-card'>
                        <h1 className="Student-Works-h1">Trabalho</h1>
                        <div className="card-items">
                            <div>
                                <h3>Descrição:</h3>
                                <h2>{state.work ? state.work.descricao : ''}</h2>
                                <h3>Nota:</h3>
                                <div className="mb-20">
                                    <input className="Student-Works-input" type="number" placeholder="Digite aqui a nota do aluno" value={state.work.nota} onChange={onChange}></input>
                                    <button onClick={onSubmit}>Salvar</button>
                                </div>
                                <a download rel="noopener noreferrer" target="_blank" href={state.work.link}>Baixar Trabalho</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return '';
}