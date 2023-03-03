import React from 'react';
import CategorySelection from '../components/CategorySelection';
import { CenteredDiv } from '../StyledElements';

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CategorySelection/>
        )
    }
}