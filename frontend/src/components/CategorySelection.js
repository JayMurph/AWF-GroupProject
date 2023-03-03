import React from "react";
import { BigButton, CenteredDiv, PageHeader } from "../StyledElements";
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
      <>
        <PageHeader>Categories</PageHeader>
        <CenteredDiv>
            {listItems}
        </CenteredDiv>
      </>
    );
  }
}
