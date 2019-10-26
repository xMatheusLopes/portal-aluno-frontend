import React, { Component } from 'react';
import './classes.css'

import api from '../api';
import axios from 'axios';
import Toolbar from '../layouts/toolbar';

import MaterialTable from './components/MaterialTable';

import { Card, Typography } from '@material-ui/core';

export default class Teacher extends Component {
    constructor(props) {
        super(props);
        const tools = require('../services/tools');

        this.state = {
            works: [],
            user: tools.checkAuthenticated(this.props)
        };

        if (this.state.user) {
            this.loadWorks();
        }
    }

    loadWorks = () => {
        axios.get(`${api.baseUrl}/turmas/${this.state.user.usuario_id}`).then(works => {
            this.setState({ works: works.data });
        })
    }

    onSelectionChanged = (class_id) => {
        this.props.history.push(`/teacher/${class_id}/students`);
    }

    render() {
        return (
            <div>
                <Toolbar />
                <div className='Classes-container'>
                    <div className='Classes-content'>
                        <Card className="Classes-p-10" elevation={3}>
                            <Typography variant="h5">Lista de turmas</Typography>
                            <MaterialTable className="mt-10" works={this.state.works} onPress={this.onSelectionChanged} />
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
