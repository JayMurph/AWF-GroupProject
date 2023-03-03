import React from "react";
import { PageHeader, BigButton, CenteredDiv } from "../StyledElements";

export default class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triviaQuestion: props.triviaQuestion,
      onQuestionAnswered: props.onQuestionAnswered,
    };
    console.log(this.state.triviaQuestion.question);
  }

  handleClick = (answer) => {
    this.state.onQuestionAnswered("info");
  };

  render() {
    return (
      <>
        <PageHeader style={{ backgroundColor: "gray" }}>
          {this.state.triviaQuestion.question}
        </PageHeader>
        <CenteredDiv>
          <BigButton onClick={(ev) => this.handleClick(this.state.triviaQuestion.answers[0])}>
            {this.state.triviaQuestion.answers[0]}
          </BigButton>
          <BigButton onClick={(ev) => this.handleClick(this.state.triviaQuestion.answers[1])}>
            {this.state.triviaQuestion.answers[1]}
          </BigButton>
          <BigButton onClick={(ev) => this.handleClick(this.state.triviaQuestion.answers[2])}>
            {this.state.triviaQuestion.answers[2]}
          </BigButton>
          <BigButton onClick={(ev) => this.handleClick(this.state.triviaQuestion.answers[3])}>
            {this.state.triviaQuestion.answers[3]}
          </BigButton>
        </CenteredDiv>
      </>
    );
  }
}
