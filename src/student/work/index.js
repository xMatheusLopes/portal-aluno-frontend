import React, { Component } from 'react';

import './styles.css'
import '../../App.css'

import api from '../../api';
import axios from 'axios';

import Toolbar from '../../layouts/toolbar';

export default class StudentWorks extends Component {
    constructor(props) {
        super(props);
        const tools = require('../../services/tools');
        const { work_id } = this.props.match.params;
        this.state = { work_id, work: null, file: null, user: tools.checkAuthenticated(this.props) };

        if (this.state.user) {
            this.loadWork();
        }
    }

    loadWork = () => {
        if (!this.state.user.professor) {
            axios.get(`${api.baseUrl}/trabalhos/${this.state.work_id}`).then(items => {
                this.setState({ work: items.data });
            })
        } else {
            axios.get(`${api.baseUrl}/professor/trabalhos/${this.state.work_id}`).then(items => {
                this.setState({ work: items.data });
            })
        }
    }

    formatBool = (bool) => {
        return bool ? 'Sim' : 'Não';
    }

    onChangeHandler = (event) => {
        if (event) {
            const file = event.target.files[0];
            this.setState({ file });
        }
    }

    onSubmit = () => {
        if (this.canUpload()) {
            var formData = new FormData();
            formData.append("work", this.state.file);
            axios.post(`${api.baseUrl}/upload/${this.state.work_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                window.alert('Trabalho Enviado com sucesso');
            })
        } else {
            window.alert('Data limite atingida');
        }
    }

    onChangeRate = (event) => {
        const work = this.state.work;
        work.nota = event.target.value;
        this.setState({ work });
    }

    onSubmitRate = () => {
        const data = { rate: this.state.work.nota };
        axios.post(`${api.baseUrl}/trabalhos/${this.state.work_id}/atualizar_nota`, data).then(success => {
            window.alert('Nota atualizada com sucesso');
        })
    }

    canUpload = () => {
        return new Date(this.state.work.data_limite) >= new Date();
    }

    render() {
        function RenderTeacherView({ state, onChange, onSubmit }) {
            if (state && state.user.professor && state.work) {
                return (
                    <div className='Student-Works-container'>
                        <div className='Student-Works-content'>
                            <div className='Student-Works-card'>
                                <h1>Trabalho</h1>
                                <div className="card-items">
                                    <div>
                                        <h3>Descrição:</h3>
                                        <h2>{state.work ? state.work.descricao : ''}</h2>
                                        <h3>Nota:</h3>
                                        <div className="mb-20">
                                            <input type="number" placeholder="Digite aqui a nota do aluno" value={state.work.nota} onChange={onChange}></input>
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

        function RenderStudentView({ state, onChange, onSubmit, formatBool }) {
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
                                    <div className="ml-50">
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
        return (
            <div>
                <Toolbar />
                <RenderStudentView state={this.state} onChange={this.onChangeHandler} onSubmit={this.onSubmit} formatBool={this.formatBool} />
                <RenderTeacherView state={this.state} onChange={this.onChangeRate} onSubmit={this.onSubmitRate} />
            </div>
        );
    }
}

