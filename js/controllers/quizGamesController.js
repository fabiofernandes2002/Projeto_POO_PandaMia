import quizGamesModel from '../models/quizGamesModel.js'

export default class quizGamesController{
    constructor() {
        //this.quizGamesModel = new quizGamesModel
        // quizGames cont~em as questões!! 
        this.quizGames = localStorage.quizGames ? JSON.parse(localStorage.quizGames) : [];
        // isto não existe na sessionStorage!  É suposto que guardes algures na SessionStorage o quizGame? 
        // isso não acontece em lago algum, no código. 
      //  this.currentQuiz = sessionStorage.quizGame ? sessionStorage.quizGame : null
    }

    getCurrentQuiz(currentQuiz) {
      //  quando vais pesquisar (find) no array quizGames,  this.currentQuiz é nulo, pois
      // não está guardada na sessionStorage
      
        const quiz = this.quizGames.find(quizGame => quizGame.name == currentQuiz)
      //  alert(quiz.name)
       // alert(quiz.questions[1].title)
        return quiz
    }

    
        

    
}