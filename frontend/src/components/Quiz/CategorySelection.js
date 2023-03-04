import React from "react";
import {
  PageHeader,
  FlexColumnContainer,
  CategorySelectionScrollDiv,
} from "../../StyledElements";
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
    const listItems = this.state.categories.map((c) => (
      <CategoryButton category={c} onClick={this.state.onCategorySelection} />
    ));
    return (
      <FlexColumnContainer>
        <PageHeader>Categories</PageHeader>
        <FlexColumnContainer>
          <CategorySelectionScrollDiv>{listItems}</CategorySelectionScrollDiv>
        </FlexColumnContainer>
      </FlexColumnContainer>
    );
  }
}
