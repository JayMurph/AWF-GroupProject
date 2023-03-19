import React from "react";
import { CenteredDiv, BigButton } from "../../StyledElements";

/**
 * Starting page for a quiz. Displays a button allowing a user to start answer
 * quiz questions.
 */
export default class QuizStartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
      onButtonClick: props.onButtonClick,
    };
  }

  render() {
    return (
        <CenteredDiv style={{ height: "80%" }}>
          <BigButton onClick={this.state.onButtonClick}>Start</BigButton>
        </CenteredDiv>
    );
  }
}
