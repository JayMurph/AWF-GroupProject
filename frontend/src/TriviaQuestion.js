export default class TriviaQuestion {
    constructor(questionTxt, answerTxtArr, correctAnswerIdx) {
        this.question = questionTxt;
        this.answers = answerTxtArr;
        this.answerIdx = correctAnswerIdx;
    }
}