import React from "react";
import {
  CenteredDiv,
  FlexColumnContainer,
  PageHeader,
} from "../../StyledElements";
import { PostQuizResults } from "../../ApiCalls";

/**
 * Placeholder page. Displays the results of a quiz: Total score plus score and
 * answer for each question
 */
export default class QuizResultsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizResults: props.quizResults,
      userId: props.userId,
    };
  }

  // post results to leaderboard somewhere ...
  async componentDidMount() {
    const timestamp = new Date().toLocaleDateString(undefined, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12:false,
    });
    PostQuizResults(this.state.userId, this.state.quizResults, timestamp);
  }

  render() {
    return (
      <>
        <PageHeader>Results</PageHeader>
        <PageHeader>Score : {this.state.quizResults.getScore()}</PageHeader>
        <CenteredDiv>
          <FlexColumnContainer>
            {this.state.quizResults.answers.map((answer, idx) => {
              return (
                <CenteredDiv key={idx} style={{ border: "4px solid gray" }}>
                  <h3>{answer.getQuestionText()}</h3>
                  <h4>Your Answer : {answer.getSelectedAnswerText()}</h4>
                  {answer.isCorrect() ? (
                    <h4 style={{ color: "green" }}>Correct!</h4>
                  ) : (
                    <h4 style={{ color: "red" }}>Wrong!</h4>
                  )}
                  <h3>Points : {answer.getScore()}</h3>
                </CenteredDiv>
              );
            })}
          </FlexColumnContainer>
        </CenteredDiv>
      </>
    );
  }
}
