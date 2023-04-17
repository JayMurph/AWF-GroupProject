import React from "react";
import QuizStartForm from "./QuizStartForm";
import QuestionForm from "./QuestionForm";
import {
  FlexColumnContainer,
  QuestionSequenceHeaderContainer,
} from "../../StyledElements";
import Timer from "@amplication/react-compound-timer";
import QuizResults from "../../Quiz/QuizResults";
import QuizResultsForm from "./QuizResultsForm";
import UserAnswerInfo from "../../Quiz/UserAnswerInfo";

const QUESTION_DURATION_MILLIS = 20000;
const TIMER_UPDATE_INTERVAL_MILLIS = 100;

/**
 * Displays a sequence of questions while timing each question and recording the
 * users answers.
 */
export default class QuestionsSequence extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currPgIdx: 0,
      pgCount: props.triviaQuestions.length + 2,
      category: props.category,
      triviaQuestionsArr: props.triviaQuestions,
      quizResults: new QuizResults(props.category),
      userId: props.userId,
      getAccessToken: props.getAccessToken,
      renewAccessToken: props.renewAccessToken,
    };

    this.timerRef = React.createRef();
    this.pages = [];

    // create all quiz pages that will be displayed to user so we can just cycle through them
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
    this.pages.push(
      <QuizResultsForm
        quizResults={this.state.quizResults}
        userId={this.state.userId}
        getAccessToken={this.state.getAccessToken}
      />
    );
  }

  /**
   * Handles when user answers a question. Saves the time of the answer then goes to the next page
   * @param {UserAnswerInfo} userAnswerInfo question and answer
   */
  onQuestionAnswered = (userAnswerInfo) => {
    const timer = this.timerRef.current;
    timer.stop();

    const elapsedTime = timer.getTime();
    timer.reset();

    userAnswerInfo.setTimeTakenMs(elapsedTime);
    this.state.quizResults.addAnswerInfo(userAnswerInfo);

    this.goToNextPage();
  };

  /**
   * Handles when user starts the quiz
   */
  onStartButtonClick = async () => {
    let renewed = await this.state.renewAccessToken();
    if (renewed) {
      this.goToNextPage();
    } else {
      alert("Can't renew token before quiz...shouldnt be here");
    }
  };

  /**
   * Handles when user runs out of time to answer question. Saves the non-answer
   * then goes to next page
   */
  onTimeElapsed = () => {
    this.timerRef.current.stop();
    this.timerRef.current.reset();

    const currQuestion =
      this.state.triviaQuestionsArr[this.state.currPgIdx - 1];
    const nonAnswer = new UserAnswerInfo(currQuestion, -1);
    this.state.quizResults.addAnswerInfo(nonAnswer);

    this.goToNextPage();
  };

  /**
   * Changes/increments the page displayed in the QuestionSequence
   */
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
    // capitalize category name
    let categoryName =
      this.state.category.substring(0, 1).toUpperCase() +
      this.state.category.substring(1);

    // generate text for indicating position in quiz
    if (this.state.currPgIdx === 0) {
      // on start page
      questionCountText = (
        <h2>Question 1 / {this.state.triviaQuestionsArr.length}</h2>
      );
    } else if (this.state.currPgIdx !== this.state.pgCount - 1) {
      // on quiz question
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
            {this.state.currPgIdx < this.state.pgCount - 1 && (
              <Timer
                ref={this.timerRef}
                initialTime={QUESTION_DURATION_MILLIS}
                lastUnit="ms"
                direction="backward"
                timeToUpdate={TIMER_UPDATE_INTERVAL_MILLIS}
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
            )}
          </div>
          <div style={{ justifySelf: "end" }}>
            <h2>{categoryName}</h2>
          </div>
        </QuestionSequenceHeaderContainer>
        <FlexColumnContainer>{content}</FlexColumnContainer>
      </FlexColumnContainer>
    );
  }
}
