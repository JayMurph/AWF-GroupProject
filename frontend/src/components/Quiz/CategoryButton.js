import React from "react";
import { BigButton } from "../../StyledElements";

/**
 * Button that displays a category name. Takes an onClick callback
 */
export default class CategoryButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
      onClick: props.onClick,
    };
  }

  render() {
    // capitalize category name
    let categoryName =
      this.state.category.substring(0, 1).toUpperCase() +
      this.state.category.substring(1);

    return (
      <BigButton onClick={(ev) => this.state.onClick(this.state.category)}>
        {categoryName}
      </BigButton>
    );
  }
}
