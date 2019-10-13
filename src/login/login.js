import React from 'react'
import './login.css'
import '../App.css'

import axios from 'axios'

const api = require('../api')

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', error: false };
        let user = window.localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            if (user.professor) {
                this.redirect('/teacher');
            } else {
                this.redirect('/student');
            }
        }
    }

    emailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onSubmit = (event) => {
        axios.post(`${api.baseUrl}/login`, { email: this.state.email })
            .then(res => {
                if (!res.data.usuario_id) {
                    this.setState({ error: true });
                } else {
                    window.localStorage.setItem('user', JSON.stringify(res.data));
                    if (res.data.professor) {
                        this.redirect('/teacher');
                    } else {
                        this.redirect('/student');
                    }
                }
            })
        event.preventDefault();
    }

    redirect = (route) => {
        this.props.history.push(`${route}`);
    }

    render() {
        let incorrectLogin;
        if (this.state.error) {
            incorrectLogin = <div className="error">Usuário não encontrado</div>
        }

        return (
            <div className="Login-container">
                <div className="Login-content">
                    <div className="Login-card">
                        {incorrectLogin}
                        <h2>Login</h2>
                        <input placeholder="Digite seu e-mail" value={this.state.email} onChange={this.emailChange}></input>
                        <button className="mt-10" onClick={this.onSubmit}>Entrar</button>
                    </div>
                </div>
            </div>
        )
    }
}