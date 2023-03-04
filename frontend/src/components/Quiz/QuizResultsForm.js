import React from 'react';
import { PageHeader } from '../../StyledElements';

export default class QuizResultsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizResults:props.quizResults
        }
    }
    render() {
        return (
            <PageHeader>Results</PageHeader>
        )
    }
}