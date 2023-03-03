import React from "react";
import { PageHeader } from "../StyledElements";

export default class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question,
      answers: props.answers,
      answerIdx: props.answerIdx,
    };
  }

  render() {
    return <PageHeader>Yo</PageHeader>;
  }
}
