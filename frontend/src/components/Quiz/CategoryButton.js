import React from 'react';
import { BigButton } from '../../StyledElements';

export default class CategoryButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category:props.category,
            onClick:props.onClick
        }
    }

    render() {
        return (
            <BigButton onClick={(ev)=>this.state.onClick(this.state.category)}>
                {this.state.category}
            </BigButton>
        )
    }
}