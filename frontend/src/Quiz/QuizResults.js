/**
 * Encapsulates a user's peformance on a quiz
 */
export default class QuizResults {
  /**
   * Creates new QuizResults and sets category
   * @param {String} quizCategory Category of the quiz
   */
  constructor(quizCategory) {
    this.quizCategory = quizCategory;
    this.answers = [];
  }

  /**
   * Records another answer to a trivia question for the quiz
   * @param {UserAnswerInfo} userAnswerInfo Users answer to a trivia question in the quiz
   */
  addAnswerInfo(userAnswerInfo) {
    this.answers.push(userAnswerInfo);
  }

  /**
   * Calculates and returns the user's total score on the quiz (the scores of all questions combined)
   * @returns Integer
   */
  getScore() {
    return this.answers.reduce((acc, val) => acc + val.getScore(), 0);
  }

  getCategory() {
    return this.quizCategory;
  }
}
