/**
 * Encapsulates a user's answer to a single trivia question
 */
export default class UserAnswerInfo {
  /**
   * Stores a trivia question and a user's answer to it
   * @param {TriviaQuestion} triviaQuestion question that the user answered
   * @param {Integer} userAnswerIdx 0-based index of the user's answer, -1 for a non-answer
   */
  constructor(triviaQuestion, userAnswerIdx) {
    this.userAnswerIdx = userAnswerIdx;
    this.triviaQuestion = triviaQuestion;
    this.timeTakenMs = 0.0;
  }

  /**
   * Sets the amount of time that the user took to answer the Trivia Question, in milliseconds
   * @param {Integer} timeTakenMs Amount of time user took to answer trivia question, in milliseconds
   */
  setTimeTakenMs(timeTakenMs) {
    this.timeTakenMs = timeTakenMs;
  }

  /**
   * Calculates and returns the users score for on the trivia question
   * @returns Integer
   */
  getScore() {
    return this.userAnswerIdx === this.triviaQuestion.answerIdx
      ? Math.floor(this.timeTakenMs * 0.1)
      : 0.0;
  }

  /**
   * Indicates if the user chose the correct answer for the trivia question
   * @returns true or false
   */
  isCorrect() {
    return this.userAnswerIdx === this.triviaQuestion.answerIdx;
  }

  /**
   * Gets the text of the question that the user answered
   * @returns String
   */
  getQuestionText() {
    return this.triviaQuestion.question;
  }

  /**
   * Gets the text of the answer that the user gave to the trivia question
   * @returns String
   */
  getSelectedAnswerText() {
    return this.userAnswerIdx >= 0
      ? this.triviaQuestion.answers[this.userAnswerIdx]
      : "NONE";
  }
}
