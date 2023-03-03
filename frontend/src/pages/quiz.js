import React from "react";
import CategorySelection from "../components/CategorySelection";
import QuestionsSequence from "../components/QuestionsSequence";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      root: null,
      currCategory: "",
      categories: ["T1", "T2", "T3", "t4", "t5", "t6", "t7"],
    };

    // get categories from API
    this.state.root = (
      <CategorySelection
        categories={this.state.categories}
        onCategorySelection={this.onCategorySelection}
      />
    );
  }

  onCategorySelection = (c) => {
    // get questions from API
    // start quiz for category
    this.setState({ currCategory: c });
    this.setState({ root: <QuestionsSequence category={c} /> });
  };

  render() {
    return this.state.root;
  }
}
