export default class UserAnswerInfo {
    constructor(triviaQuestion, timeTaken, userAnswerIdx) {
        this.userAnswerIdx = userAnswerIdx;
        this.timeTaken = timeTaken;
        this.triviaQuestion = triviaQuestion;
    }
}