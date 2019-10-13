import React, { Component } from 'react';

import Student from '../works/works';

export default class StudentWorks extends Component {
    constructor(props) {
        super(props);
        const { student_id } = this.props.match.params;
        this.state = { student_id };
    }
    render() {
        return <Student studentId={this.state.student_id} />;
    }
}
