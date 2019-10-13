import React, { Component } from 'react';
import './class-students.css';

import api from '../api';
import axios from 'axios';

import Toolbar from '../layouts/toolbar';

import DataGrid, { Column } from 'devextreme-react/data-grid';


export default class ClassStudents extends Component {
    constructor(props) {
        super(props);
        const { class_id } = this.props.match.params;
        this.state = { class_id, students: [] };
    }

    componentDidMount() {
        const tools = require('../services/tools');
        const user = tools.checkAuthenticated(this.props);
        if (user) {
            this.loadStudents();
        }
    }

    loadStudents = () => {
        axios.get(`${api.baseUrl}/turma/${this.state.class_id}/alunos`).then(items => {
            this.setState({ students: items.data });
        })
    }

    onSelectionChanged = (event) => {
        const student_id = event.selectedRowKeys[0];
        this.props.history.push(`/teacher/student/${student_id}/works`);
    }

    render() {
        return (
            <div>
                <Toolbar />
                <div className='Class-Students-container'>
                    <div className='Class-Students-content'>
                        <div className='Class-Students-card'>
                            <h2>Lista de alunos</h2>
                            <DataGrid id={'grid-container'}
                                dataSource={this.state.students}
                                keyExpr={'aluno_id'}
                                showBorders={true}
                                columnHidingEnabled={true}
                                selection={{ mode: 'single' }}
                                onSelectionChanged={this.onSelectionChanged}
                            >
                                <Column dataField={'nome'} caption={'Nome'} />
                            </DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

