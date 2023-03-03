import React from "react";
import { CenteredDiv, FlexColumnContainer, PageHeader, BigButton } from "../StyledElements";

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
      <FlexColumnContainer>
        <PageHeader>{this.state.category}</PageHeader>
        <CenteredDiv style={{ height: "80%" }}>
          <BigButton onClick={this.state.onButtonClick}>Start</BigButton>
        </CenteredDiv>
      </FlexColumnContainer>
    );
  }
}
