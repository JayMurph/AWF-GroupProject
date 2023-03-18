import React from "react";
import { PageHeader, BigButton, CenteredDiv } from "../../StyledElements";
import UserAnswerInfo from "../../Quiz/UserAnswerInfo";

/**
 * Displays a quiz question and its possible answers
 */
export default class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triviaQuestion: props.triviaQuestion,
      onQuestionAnswered: props.onQuestionAnswered,
    };
  }

  /**
   * Handles when an answer is clicked.
   * @param {*} ev
   */
  handleAnswerClick = (ev) => {
    this.state.onQuestionAnswered(
      new UserAnswerInfo(
        this.state.triviaQuestion,
        Number.parseInt(ev.target.id)
      )
    );
  };

  /**
   * Shuffles an array
   * @param {*} array to be shuffled
   * @returns Input array, shuffled
   */
  shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  render() {
    // create shuffled list of answers
    const answers = this.shuffle([
      { idx: 0, answerTxt: this.state.triviaQuestion.answers[0] },
      { idx: 1, answerTxt: this.state.triviaQuestion.answers[1] },
      { idx: 2, answerTxt: this.state.triviaQuestion.answers[2] },
      { idx: 3, answerTxt: this.state.triviaQuestion.answers[3] },
    ]);

    // display question and answers. embed answer idx into button id so that we can tell if the correct answer is clicked
    return (
      <>
        <PageHeader style={{ backgroundColor: "lightGray" }}>
          {this.state.triviaQuestion.question}
        </PageHeader>
        <CenteredDiv>
          <BigButton
            id={answers[0].idx}
            onClick={(ev) => this.handleAnswerClick(ev)}
          >
            {answers[0].answerTxt}
          </BigButton>
          <BigButton
            id={answers[1].idx}
            onClick={(ev) => this.handleAnswerClick(ev)}
          >
            {answers[1].answerTxt}
          </BigButton>
          <BigButton
            id={answers[2].idx}
            onClick={(ev) => this.handleAnswerClick(ev)}
          >
            {answers[2].answerTxt}
          </BigButton>
          <BigButton
            id={answers[3].idx}
            onClick={(ev) => this.handleAnswerClick(ev)}
          >
            {answers[3].answerTxt}
          </BigButton>
        </CenteredDiv>
      </>
    );
  }
}
