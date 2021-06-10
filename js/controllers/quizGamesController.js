import quizGamesModel from '../models/quizGamesModel.js'

export default class quizGamesController{
    constructor() {
        this.quizGamesModel = new quizGamesModel
        this.quizGames = localStorage.quizGames ? JSON.parse(localStorage.quizGames) : [];
        this.currentQuiz = sessionStorage.quizGame ? sessionStorage.quizGame : null
    }

    getCurrentQuiz() {
        return this.quizGames.find(quizGame => quizGame.name == this.currentQuiz)
    }

    
}