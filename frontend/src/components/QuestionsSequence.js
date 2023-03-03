import React from "react";
import { PageHeader } from "../StyledElements";

export default class QuestionsSequence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
      questionsArr : props.questionsArr,
    };
  }
  render() {
    return <PageHeader>{this.state.category}</PageHeader>;
  }
}
