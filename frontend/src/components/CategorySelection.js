import React from 'react';
import { CenteredDiv, PageHeader } from '../StyledElements';

export default class CategorySelection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories:props.categories,
            onCategorySelection:props.onCategorySelection
        }
    }

    render() {
        return (
            <>
                <PageHeader>
                    Categories
                </PageHeader>
                <CenteredDiv>
                </CenteredDiv>
            </>
        );
    }
}