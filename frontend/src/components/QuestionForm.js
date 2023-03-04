import React from "react";
import { PageHeader, BigButton, CenteredDiv } from "../StyledElements";
import UserAnswerInfo from "../UserAnswerInfo";

export default class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triviaQuestion: props.triviaQuestion,
      onQuestionAnswered: props.onQuestionAnswered,
    };
  }

  handleClick = (ev) => {
    this.state.onQuestionAnswered(
      new UserAnswerInfo(
        this.state.triviaQuestion,
        ev.target.id
      )
    );
  };

  render() {
    return (
      <>
        <PageHeader style={{ backgroundColor: "gray" }}>
          {this.state.triviaQuestion.question}
        </PageHeader>
        <CenteredDiv>
          <BigButton
            id={0}
            onClick={(ev) =>
              this.handleClick(ev)
            }
          >
            {this.state.triviaQuestion.answers[0]}
          </BigButton>
          <BigButton
            id={1}
            onClick={(ev) =>
              this.handleClick(ev)
            }
          >
            {this.state.triviaQuestion.answers[1]}
          </BigButton>
          <BigButton
            id={2}
            onClick={(ev) =>
              this.handleClick(ev)
            }
          >
            {this.state.triviaQuestion.answers[2]}
          </BigButton>
          <BigButton
            id={3}
            onClick={(ev) =>
              this.handleClick(ev)
            }
          >
            {this.state.triviaQuestion.answers[3]}
          </BigButton>
        </CenteredDiv>
      </>
    );
  }
}
