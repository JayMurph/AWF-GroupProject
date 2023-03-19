/**
 * Encapsulates a question in a quiz. Contains question text, possible answers
 * text, and index of 0-based correct answer
 */
export default class TriviaQuestion {
  /**
   * Creates new trivia question. sets question and answer texts and correct answer index
   * @param {String} questionTxt Question text
   * @param {String[]} answerTxtArr Array of text for possible answers
   * @param {Integer} correctAnswerIdx 0 based index of correct answer
   */
  constructor(questionTxt, answerTxtArr, correctAnswerIdx) {
    this.question = questionTxt;
    this.answers = answerTxtArr;
    this.answerIdx = correctAnswerIdx;
  }
}
