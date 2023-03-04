export default class QuizResults { 
    constructor(quizCategory) {
        this.quizCategory = quizCategory;
        this.answers = [];
    }

    addAnswerInfo(userAnswerInfo) {
        this.answers.push(userAnswerInfo);
    }

    getScore() {
        return Math.floor(this.answers.reduce((acc, val) => acc + val.getScore(), 0) * 0.1);
    }
}