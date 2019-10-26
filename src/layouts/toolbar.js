import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Toolbar as MaterialToolbar, Paper } from '@material-ui/core';
import { Button, Typography } from '@material-ui/core';

import './toolbar.css';

class Toolbar extends Component {
    logout = () => {
        window.localStorage.removeItem('user');
        this.props.history.push('/');
    }

    render() {
        return (
            <Paper elevation={3}>
                <MaterialToolbar className="toolbar-color toolbar">
                    <Typography variant="h5">
                        Portal do Aluno
                    </Typography>
                    <Button variant="contained" onClick={this.logout}>Sair</Button>
                </MaterialToolbar>
            </Paper>
        );
    }
}

export default withRouter(Toolbar)