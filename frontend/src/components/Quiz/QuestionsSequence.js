import React from "react";
import QuizStartForm from "./QuizStartForm";
import QuestionForm from "./QuestionForm";
import {
  FlexColumnContainer,
  QuestionSequenceHeaderContainer,
} from "../../StyledElements";
import Timer from "react-compound-timer";
import QuizResults from "../../Quiz/QuizResults";
import QuizResultsForm from "./QuizResultsForm";

const QUESTION_DURATION = 20000;

export default class QuestionsSequence extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currPgIdx: 0,
      pgCount: props.triviaQuestions.length + 2,
      category: props.category,
      triviaQuestionsArr: props.triviaQuestions,
      quizResults:new QuizResults(props.category) 
    };

    this.timerRef = React.createRef();
    this.pages = [];

    this.pages.push(
      <QuizStartForm
        category={this.state.category}
        onButtonClick={this.onStartButtonClick}
      />
    );
    this.state.triviaQuestionsArr.forEach((q, idx) => {
      this.pages.push(
        <QuestionForm
          key={idx}
          triviaQuestion={q}
          onQuestionAnswered={this.onQuestionAnswered}
        />
      );
    });
    this.pages.push(<QuizResultsForm quizResults={this.state.quizResults} />);
  }

  onQuestionAnswered = (userAnswerInfo) => {
    const timer = this.timerRef.current;
    timer.stop();

    const elapsedTime = timer.getTime();
    timer.reset();

    userAnswerInfo.setTimeTakenMs(elapsedTime);
    this.state.quizResults.addAnswerInfo(userAnswerInfo);

    this.goToNextPage();
  };

  onStartButtonClick = () => {
    this.goToNextPage();
  };

  onTimeElapsed = () => {
    this.timerRef.stop();
    this.timerRef.reset();
    this.goToNextPage();
  };

  goToNextPage = () => {
    if (this.state.currPgIdx < this.state.pgCount) {
      this.setState((state) => {
        const newPgIdx = state.currPgIdx + 1;

        if (newPgIdx !== 0 && newPgIdx !== state.pgCount - 1) {
          this.timerRef.current.start();
        }

        return { currPgIdx: newPgIdx };
      });
    }
  };

  render() {
    let content = this.pages[this.state.currPgIdx];
    let questionCountText = "";

    if (this.state.currPgIdx === 0) {
      questionCountText = (
        <h2>Question 1 / {this.state.triviaQuestionsArr.length}</h2>
      );
    } else if (this.state.currPgIdx !== this.state.pgCount -1) {
      questionCountText = (
        <h2>
          Question {this.state.currPgIdx} /{" "}
          {this.state.triviaQuestionsArr.length}
        </h2>
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
