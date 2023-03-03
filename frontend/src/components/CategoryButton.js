import React from 'react';
import { BigButton } from '../StyledElements';

export default class CategoryButton extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.category);
        this.state = {
            category:props.category
        }
    }

    render() {
        return (
            <BigButton>
                {this.state.category}
            </BigButton>
        )
    }
}