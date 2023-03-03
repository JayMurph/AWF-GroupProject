import React from "react";
import { PageHeader } from "../StyledElements";

export default class QuestionsSequence extends React.Component {
  render() {
    return <PageHeader>{this.props.category}</PageHeader>;
  }
}
