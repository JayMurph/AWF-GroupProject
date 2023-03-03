export default class UserAnswerInfo {
    constructor(triviaQuestion, timeTakenMs, userAnswerIdx) {
        this.userAnswerIdx = userAnswerIdx;
        this.timeTakenMs = timeTakenMs;
        this.triviaQuestion = triviaQuestion;
    }
}