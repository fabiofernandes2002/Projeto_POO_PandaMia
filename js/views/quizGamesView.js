import quizGamesController from '../controllers/quizGamesController.js'

export default class quizGamesView {
    constructor() {
        this.quizGamesController = new quizGamesController();
        this.quizName = document.querySelector("#quizName")
        this.description = document.querySelector("#descriptionQuiz")
        this.userScore = document.querySelector("#userScore")
        this.totalScore = document.querySelector("#totalScore")
        this.rightAnswers = document.querySelector("#rightAnswers")
        this.questionText = document.querySelector("#questionText")
        this.options1 = document.querySelector("#options1")
        this.options2 = document.querySelector("#options2")
        this.options3 = document.querySelector("#options3")
        this.btnNext = document.querySelector("#btnNext")

        let shuffledQuestions, currentQuestionIndex


        this.updatesQuiz();
        this.buildQuiz();
        //this.bindBntNext();
        this.setNextQuestion();
    }


    updatesQuiz(){
        // ATENÇÃO!!!
        const quizName = "Quiz 1"  // está forçado!! depende da escolha na pagina game.html!!!~

        const currentQuiz = this.quizGamesController.getCurrentQuiz(quizName);
        this.quizName.innerHTML = currentQuiz.name
        //this.descriptionQuiz.innerHTML = currentQuiz.description
         this.questionText.innerHTML = currentQuiz.questions[0].title
         const responses= currentQuiz.questions[0].respostas
         this.options1.innerHTML = responses[0]
         this.options2.innerHTML = responses[1]
         this.options3.innerHTML = responses[2]
         
    }

    buildQuiz(){
        //this.questions = this.gameController.getQuestionsQuiz(); 
        this.questionsCounter = 0; 
        this.correctAnswerCounter = 0; 
        this.shuffledQuestions = questions.sort(() => Math.random() - .5)
        this.currentQuestionsIndex = 0;
        this.btnNext.addEventListener("click", () => {
            this.currentQuestionsIndex++
            setNextQuestion();
        })

    }

    setNextQuestion(){
        getCurrentQuiz(this.shuffledQuestions[currentQuestionsIndex])
    }


     
    
}