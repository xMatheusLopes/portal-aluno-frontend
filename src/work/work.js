import React, { Component } from 'react';

import './work.css'
import '../App.css'

import api from '../api';
import axios from 'axios';

import Toolbar from '../layouts/toolbar';

import RenderStudentView from './studentView';
import RenderTeacherView from './teacherView';

export default class StudentWorks extends Component {
    constructor(props) {
        super(props);
        const tools = require('../services/tools');
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
            }).catch(res => {
                window.alert(res);
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
        return (
            <div>
                <Toolbar />
                <RenderStudentView state={this.state} onChange={this.onChangeHandler} onSubmit={this.onSubmit} formatBool={this.formatBool} />
                <RenderTeacherView state={this.state} onChange={this.onChangeRate} onSubmit={this.onSubmitRate} />
            </div>
        );
    }
}

