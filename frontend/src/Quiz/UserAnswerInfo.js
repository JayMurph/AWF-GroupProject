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
        Math.floor(this.timeTakenMs * 0.1) :
        0.0;
    }

    isCorrect() {
        return this.userAnswerIdx === this.triviaQuestion.answerIdx;
    }

    getQuestionText() {
        return this.triviaQuestion.question;
    }

    getSelectedAnswerText() {
        return this.userAnswerIdx >= 0 ? 
            this.triviaQuestion.answers[this.userAnswerIdx] :
            "NONE";
    }
}