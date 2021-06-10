import quizGamesController from '../controllers/quizGamesController.js'

export default class quizGamesView {
    constructor() {
        this.quizGamesController = new quizGamesController();

        this.userScore = document.querySelector("#userScore")
        this.totalScore = document.querySelector("#totalScore")
        this.rightAnswers = document.querySelector("#rightAnswers")
        this.questionText = document.querySelector("#questionText")
        this.options1 = document.querySelector("#options1")
        this.options2 = document.querySelector("#options2")
        this.options3 = document.querySelector("#options3")

        this.updatesQuiz();
        this.bindNextButton();
    }

    /* bindBackButton() {
        this.btnBack.addEventListener('click', () => {
            history.back();
        })
    } */

    updatesQuiz(){
        const currentQuiz = this.quizGamesController.getCurrentQuiz();
        this.quizName.innerHTML = currentQuiz.name
        this.quizDescription.innerHTML = currentQuiz.description
        this.questionText.innerHTML = currentQuiz.title
        this.options1.innerHTML = currentQuiz.questions[1]
        
    }
}