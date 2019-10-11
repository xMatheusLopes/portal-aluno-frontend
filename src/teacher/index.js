import React, { Component } from 'react';
import './styles.css'

import api from '../api';
import axios from 'axios';
import Toolbar from '../layouts/toolbar';

import DataGrid, { Column } from 'devextreme-react/data-grid';

export default class Teacher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            works: []
        };
    }

    componentDidMount() {
        const tools = require('../services/tools')
        const user = tools.checkAuthenticated(this.props);
        if (user) {
            setTimeout(() => {
                this.setState({ user })
                this.loadWorks()
            }, 200);
        }
    }

    loadWorks = () => {
        axios.get(`${api.baseUrl}/turmas/${this.state.user.usuario_id}`).then(works => {
            this.setState({ works: works.data });
        })
    }

    render() {
        return (
            <div>
                <Toolbar />
                <div className='Student-container'>
                    <div className='Student-content'>
                        <div className='Student-card'>
                            <h2>Lista de turmas</h2>
                            <DataGrid id={'grid-container'}
                                dataSource={this.state.works}
                                keyExpr={'turma_id'}
                                showBorders={true}
                                columnHidingEnabled={true}
                            >
                                <Column dataField={'turma'} width={170} caption={'Turma'} />
                                <Column dataField={'curso'} width={170} caption={'Curso'} />
                                <Column dataField={'materia_atual'} caption={'Matéria'} />
                                <Column dataField={'periodo'} width={170} caption={'Período'} />
                            </DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
