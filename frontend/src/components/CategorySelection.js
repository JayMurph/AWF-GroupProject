import React from "react";
import { BigButton, ScrollDiv , PageHeader, FlexColumnContainer, CategorySelectionScrollDiv } from "../StyledElements";
import CategoryButton from "./CategoryButton";

export default class CategorySelection extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.categories);
    this.state = {
      categories: props.categories,
      onCategorySelection: props.onCategorySelection,
    };
  }

  render() {
    const listItems = this.state.categories.map((c) => <CategoryButton category={c}/>)
    return (
      <FlexColumnContainer>
        <PageHeader>Categories</PageHeader>
        <FlexColumnContainer>
            <CategorySelectionScrollDiv>
                {listItems}
            </CategorySelectionScrollDiv>
        </FlexColumnContainer>
      </FlexColumnContainer>
    );
  }
}
