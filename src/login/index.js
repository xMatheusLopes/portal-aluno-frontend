import React from 'react'
import './styles.css'

import axios from 'axios'
const api = require('../api')

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', error: false };

        this.emailChange = this.emailChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    emailChange(event) {
        this.setState({ email: event.target.value });
    }

    onSubmit(event) {
        axios.post(`${api.baseUrl}/login`, { email: this.state.email })
            .then(res => {
                if (!res.data.usuario_id) {
                    this.setState({ error: true });
                } else {
                    // Redireciona
                }
            })
        event.preventDefault();
    }

    render() {
        let incorrectLogin;
        if (this.state.error) {
            incorrectLogin = <div className="error">Usuário não encontrado</div>
        }

        return (
            <div className="container">
                <div className="content">
                    <div className="card">
                        {incorrectLogin}
                        <h2>Login</h2>
                        <input placeholder="Digite seu e-mail" value={this.state.email} onChange={this.emailChange}></input>
                        <button onClick={this.onSubmit}>Entrar</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login