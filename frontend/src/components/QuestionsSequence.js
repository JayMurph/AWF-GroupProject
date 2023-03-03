import React from "react";
import QuizStartForm from "./QuizStartForm";
import QuestionForm from "./QuestionForm";
import {
  FlexColumnContainer,
  QuestionSequenceHeaderContainer,
} from "../StyledElements";

export default class QuestionsSequence extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currPgIdx: 0,
      pgCount: props.triviaQuestions.length + 1,
      currTime: 0.0,
      category: props.category,
      triviaQuestionsArr: props.triviaQuestions,
      answerInfoArr:[]
    };
  }

  onQuestionAnswered = (userAnswerInfo) => {
    this.setState((state) => {
      let answerInfoArr = [...state.answerInfoArr];
      answerInfoArr.push(userAnswerInfo);
      let currPgIdx = (state.currPgIdx + 1) % state.pgCount;

      return ({
        currPgIdx: currPgIdx,
        answerInfoArr: answerInfoArr
      })}
    );
  };

  onStartButtonClick = () => {
    this.setState({ currPgIdx: 1 });
  };

  render() {
    let content;
    let questionCountText;

    if (this.state.currPgIdx > 0)  {
        content = 
        <QuestionForm
          key={this.state.currPgIdx - 1}
          triviaQuestion={this.state.triviaQuestionsArr[this.state.currPgIdx - 1]}
          onQuestionAnswered={this.onQuestionAnswered}
        />;
        questionCountText = <h2>Question {this.state.currPgIdx} / {this.state.triviaQuestionsArr.length}</h2>;
    }
    else {
      content = 
        <QuizStartForm
          category={this.state.category}
          onButtonClick={this.onStartButtonClick}
        />
        questionCountText = <h2>Question 1 / {this.state.triviaQuestionsArr.length}</h2>;
    }

    return (
      <FlexColumnContainer>
        <QuestionSequenceHeaderContainer>
          <div style={{ justifySelf: "start" }}>
            {questionCountText}
          </div>
          <div
            style={{
              justifySelf: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h1 style={{ marginRight: "22px" }}>
              {this.state.currTime.toFixed(2)}
            </h1>
            <h2>secs</h2>
          </div>
          <div style={{ justifySelf: "end" }}>
            <h2>{this.state.category}</h2>
          </div>
        </QuestionSequenceHeaderContainer>
        <FlexColumnContainer>{content}</FlexColumnContainer>
      </FlexColumnContainer>
    );
  }
}
