import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Route, BrowserRouter as Router } from 'react-router-dom'

import Login from './login/index'
import Teacher from './teacher/index'
import Student from './student/index'

const routing = (
    <Router>
        <div className="fullscreen">
            <Route exact path="/" component={Login} />
            <Route path="/teacher" component={Teacher} />
            <Route path="/student" component={Student} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
