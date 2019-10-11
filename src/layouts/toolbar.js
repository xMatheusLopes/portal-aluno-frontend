import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Container } from './styles';

import './styles.css';

class Toolbar extends Component {
    logout = () => {
        window.localStorage.removeItem('user');
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="toolbar">
                <button onClick={this.logout}>Sair</button>
            </div>
        );
    }
}

export default withRouter(Toolbar)