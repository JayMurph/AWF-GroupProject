import React from "react";
import {
  PageHeader,
  FlexColumnContainer,
  CategorySelectionScrollDiv,
} from "../../StyledElements";
import CategoryButton from "./CategoryButton";

/**
 * Displays buttons for quiz categories
 */
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
    // create buttons for different categories
    const content =
      this.state.categories.length > 0 ? (
        this.state.categories.map((c) => (
          <CategoryButton
            key={c}
            category={c}
            onClick={this.state.onCategorySelection}
          />
        ))
      ) : (
        <div>
          <b>None Available</b>
        </div>
      );

    return (
      <FlexColumnContainer>
        <PageHeader>Categories</PageHeader>
        <FlexColumnContainer>
          <CategorySelectionScrollDiv>{content}</CategorySelectionScrollDiv>
        </FlexColumnContainer>
      </FlexColumnContainer>
    );
  }
}
