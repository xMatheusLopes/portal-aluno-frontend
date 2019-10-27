import React, { Component } from 'react';
import './class-students.css';

import api from '../api';
import axios from 'axios';

import Toolbar from '../layouts/toolbar';

import MaterialTable from './components/MaterialTable';

import { Card, Typography } from '@material-ui/core';

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

    onSelectionChanged = (student_id) => {
        this.props.history.push(`/teacher/student/${student_id}/works`);
    }

    render() {
        return (
            <div>
                <Toolbar />
                <div className='Class-Students-container'>
                    <div className='Class-Students-content'>
                        <Card className="Classes-p-10" elevation={3}>
                            <Typography variant="h5">Lista de alunos</Typography>
                            <MaterialTable className="mt-10" works={this.state.students} onPress={this.onSelectionChanged} />
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

