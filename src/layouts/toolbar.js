import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './styles.css';

class Toolbar extends Component {
    logout = () => {
        window.localStorage.removeItem('user');
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="toolbar">
                <h2>Portal do Aluno</h2>
                <button className="white-button" onClick={this.logout}>Sair</button>
            </div>
        );
    }
}

export default withRouter(Toolbar)