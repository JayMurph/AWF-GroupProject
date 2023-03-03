import React from "react";
import QuizStartForm from "./QuizStartForm";
import QuestionForm from "./QuestionForm";
import { FlexColumnContainer, QuestionSequenceHeaderContainer, PageHeader } from "../StyledElements";

export default class QuestionsSequence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      currPgIdx:0,
      currQuestionNum:0,
      currTime:0.0,
      category: props.category,
      questionsArr: props.questionsArr,
    };

    this.state.pages.push(
      <QuizStartForm
        category={this.state.category}
        onButtonClick={this.onStartButtonClick}
      />
    );
    this.state.questionsArr.forEach((q) => {
      this.state.pages.push(
        <QuestionForm
          question={q.question}
          answers={q.answers}
          answerIdx={q.answserIdx}
        />
      );
    });
  }

  onStartButtonClick = () => {
    this.setState({currPgIdx:1})
  };

  render() {
    return (
      <FlexColumnContainer>
        <QuestionSequenceHeaderContainer>
            <PageHeader style={{justifySelf:"start"}}>Question {this.state.currQuestionNum}</PageHeader>
            <PageHeader style={{justifySelf:"center"}}>{this.state.currTime} secs</PageHeader>
            <PageHeader style={{justifySelf:"end"}}>{this.state.category}</PageHeader>
        </QuestionSequenceHeaderContainer>
        <FlexColumnContainer>
            {this.state.pages[this.state.currPgIdx]}
        </FlexColumnContainer>
      </FlexColumnContainer>
    );
  }
}
