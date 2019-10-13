import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import * as serviceWorker from './serviceWorker';

import { Route, BrowserRouter as Router } from 'react-router-dom'

import Login from './login/login'
import Teacher from './classes/classes'
import TeacherStudentWorks from './student-works/student-works'
import ClassStudents from './class-students/class-students'
import Student from './works/works'
import StudentWorks from './work/work'

const routing = (
    <Router>
        <div className="fullscreen">
            <Route exact path="/" component={Login} />
            <Route exact path="/teacher" component={Teacher} />
            <Route path="/teacher/:class_id/students" component={ClassStudents} />
            <Route path="/teacher/student/:student_id/works" component={TeacherStudentWorks} />
            <Route exact path="/student" component={Student} />
            <Route path="/student/works/:work_id" component={StudentWorks} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
