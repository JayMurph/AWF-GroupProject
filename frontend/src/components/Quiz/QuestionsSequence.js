import React from "react";
import QuizStartForm from "./QuizStartForm";
import QuestionForm from "./QuestionForm";
import {
  FlexColumnContainer,
  QuestionSequenceHeaderContainer,
} from "../../StyledElements";
import Timer from "react-compound-timer";

const QUESTION_DURATION = 20000;

export default class QuestionsSequence extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currPgIdx: 0,
      pgCount: props.triviaQuestions.length + 2,
      currTime: 0.0,
      category: props.category,
      triviaQuestionsArr: props.triviaQuestions,
      answerInfoArr: [],
    };

    this.timerRef = React.createRef();
  }

  onQuestionAnswered = (userAnswerInfo) => {
    const timer = this.timerRef.current;
    timer.stop();

    const elapsedTime = timer.getTime();
    timer.reset();

    userAnswerInfo.timeTakenMs = QUESTION_DURATION - elapsedTime;
    this.setState((state) => {
      let answerInfoArr = [...state.answerInfoArr];
      answerInfoArr.push(userAnswerInfo);
      return {
        answerInfoArr: answerInfoArr,
      };
    });

    this.goToNextPage();
    timer.start();
  };

  onStartButtonClick = () => {
    this.timerRef.current.start();
    this.goToNextPage();
  };

  onTimeElapsed = () => {
    this.goToNextPage();
  };

  goToNextPage = () => {
    if (this.state.currPgIdx < this.state.pgCount) {
      this.setState((state) => ({
        currPgIdx: state.currPgIdx + 1,
      }));
    }
  };

  render() {
    let content;
    let questionCountText;

    if (this.state.currPgIdx > 0) {
      content = (
        <QuestionForm
          key={this.state.currPgIdx - 1}
          triviaQuestion={
            this.state.triviaQuestionsArr[this.state.currPgIdx - 1]
          }
          onQuestionAnswered={this.onQuestionAnswered}
        />
      );
      questionCountText = (
        <h2>
          Question {this.state.currPgIdx} /{" "}
          {this.state.triviaQuestionsArr.length}
        </h2>
      );
    } else {
      content = (
        <QuizStartForm
          category={this.state.category}
          onButtonClick={this.onStartButtonClick}
        />
      );
      questionCountText = (
        <h2>Question 1 / {this.state.triviaQuestionsArr.length}</h2>
      );
    }

    return (
      <FlexColumnContainer>
        <QuestionSequenceHeaderContainer>
          <div style={{ justifySelf: "start" }}>{questionCountText}</div>
          <div
            style={{
              justifySelf: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Timer
              ref={this.timerRef}
              initialTime={QUESTION_DURATION}
              lastUnit="ms"
              direction="backward"
              timeToUpdate={100}
              startImmediately={false}
              checkpoints={[
                {
                  time: 0,
                  callback: this.onTimeElapsed,
                },
              ]}
            >
              <h1 style={{ marginRight: "22px" }}>
                <Timer.Milliseconds
                  formatValue={(val) => (val * 0.001).toFixed(1)}
                />
              </h1>
              <h2>secs</h2>
            </Timer>
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
