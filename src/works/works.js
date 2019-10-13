import React, { Component } from 'react';
import './works.css'
import '../App.css'

import api from '../api';
import axios from 'axios';

import Toolbar from '../layouts/toolbar';

import DataGrid, { Column } from 'devextreme-react/data-grid';

import { withRouter } from 'react-router-dom';

class Student extends Component {
    constructor(props) {
        super(props);
        const tools = require('../services/tools');

        this.state = {
            works: [],
            studentId: props.studentId ? props.studentId : tools.checkAuthenticated(this.props).usuario_id,
            user: tools.checkAuthenticated(this.props)
        };

        if (this.state.user) {
            this.loadWorks();
        }
    }

    loadWorks = () => {
        axios.get(`${api.baseUrl}/aluno/${this.state.studentId}/trabalhos`).then(works => {
            this.setState({ works: works.data });
        })
    }

    onSelectionChanged = (event) => {
        const work_id = event.selectedRowKeys[0];
        this.props.history.push(`/student/works/${work_id}`);
    }

    render() {
        return (
            <div>
                <Toolbar />
                <div className='Student-container'>
                    <div className='Student-content'>
                        <div className='Student-card'>
                            <h2>Lista de trabalhos</h2>
                            <DataGrid id={'grid-container'}
                                dataSource={this.state.works}
                                keyExpr={'trabalho_id'}
                                showBorders={true}
                                columnHidingEnabled={true}
                                selection={{ mode: 'single' }}
                                onSelectionChanged={this.onSelectionChanged}
                            >
                                <Column dataField={'turma'} width={170} caption={'Turma'} />
                                <Column dataField={'curso'} width={170} caption={'Curso'} />
                                <Column dataField={'descricao'} caption={'Descrição'} />
                                <Column dataField={'nota'} caption={'Nota'} />
                                <Column dataField={'data'} width={170} caption={'data'} />
                                <Column dataField={'data_limite'} width={125} caption={'Data Limite'} />
                            </DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default withRouter(Student)
