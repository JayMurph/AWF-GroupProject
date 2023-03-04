export default class UserAnswerInfo {
    constructor(triviaQuestion, userAnswerIdx) {
        this.userAnswerIdx = userAnswerIdx;
        this.triviaQuestion = triviaQuestion;
        this.timeTakenMs = 0.0;
    }
}