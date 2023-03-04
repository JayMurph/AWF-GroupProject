export default class UserAnswerInfo {
    constructor(triviaQuestion, userAnswerIdx) {
        this.userAnswerIdx = userAnswerIdx;
        this.triviaQuestion = triviaQuestion;
        this.timeTakenMs = 0.0;
    }

    setTimeTakenMs(timeTakenMs) {
        this.timeTakenMs = timeTakenMs;
    }

    getScore() {
        return (this.userAnswerIdx === this.triviaQuestion.answerIdx) ?
        this.timeTakenMs :
        0.0;
    }
}