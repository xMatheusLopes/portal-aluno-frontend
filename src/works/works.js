import React, { Component } from 'react';
import './works.css'
import '../App.css'

import api from '../api';
import axios from 'axios';

import Toolbar from '../layouts/toolbar';
import MaterialTable from './components/MaterialTable';

import { Card, Typography } from '@material-ui/core';

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

    onSelectionChanged = (work_id) => {
        this.props.history.push(`/student/works/${work_id}`);
    }

    render() {
        return (
            <div>
                <Toolbar />
                <div className='Student-container'>
                    <div className='Student-content'>
                        <Card className="Classes-p-10" elevation={3}>
                            <Typography variant="h5">Lista de trabalhos</Typography>
                            <MaterialTable className="mt-10" works={this.state.works} onPress={this.onSelectionChanged} />
                        </Card>
                    </div>
                </div>
            </div>
        );

    }
}

export default withRouter(Student)
