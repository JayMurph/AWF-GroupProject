import React from 'react';
import CategorySelection from '../components/CategorySelection';
import { CenteredDiv } from '../StyledElements';

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phase:0,
            root:null,
            categories:["T1", "T2", "T3", "t4", "t5", "t6", "t7"],
            onCategorySelection:(c)=>console.log(c)
        }

        this.state.root = (
            <CategorySelection
                categories={this.state.categories}
                onCategorySelection={this.state.onCategorySelection}
            />
        );
    }

    render() {
        return (
            this.state.root
        )
    }
}