export default class QuizResults { 
    constructor(quizCategory) {
        this.quizCategory = quizCategory;
        this.answers = [];
    }

    addAnswerInfo(userAnswerInfo) {
        this.answers.push(userAnswerInfo);
    }
}