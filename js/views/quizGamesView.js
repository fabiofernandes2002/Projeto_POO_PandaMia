import quizGamesController from '../controllers/quizGamesController.js'

export default class quizGamesView {
    constructor() {
        this.quizGamesController = new quizGamesController();
       


        this.quizGame()
    }

    quizGame(){
       let isLogged = sessionStorage.getItem("loggedUser")
       let userPointsQuiz = JSON.parse(localStorage.getItem("userPointsQuiz"))  
       let quizPoints = sessionStorage.getItem("quizPoints")
       let quizQuestionsAndAnswers = JSON.parse(localStorage.getItem("quizQuestionsAndAnswers")) 
       const buttonParent = document.querySelector("#controls")
       const startButton = buttonParent.children[0]
       const nextButton = buttonParent.children[1]
       const buttonClass = document.querySelector(".container")
       const questionContainer = buttonClass.children[3]
       const questionElement = document.getElementById('question')
       const answerButtonsElement = document.getElementById('answerbuttons')
       const parentNumberQuestions = document.querySelector(".container").children[2]
       const numberQuestions = parentNumberQuestions.children[1]
       const answersRight = parentNumberQuestions.children[3]
       
//Para o caso de alguem sair a meio do jogo, os pontos darão refresh 
quizPoints=0
sessionStorage.setItem("quizPoints", JSON.stringify(quizPoints))

let shuffledQuestions, currentQuestionIndex
let count = 1// igual a 1 porque queremos contar a partir da primeira pergunta
let countAnswersRight = 0

//Para começar o jogo
startButton.addEventListener('click', startGame)
//Avançar para a próxima pergunta
nextButton.addEventListener('click', () => {
   
  currentQuestionIndex++ //o index vai começar no 0 e à medida que formos respondendo ao quiz, o index da arrray das questões da localstorage vai incrementando até respondermos ás 10 respostas
  numberQuestions.innerHTML = `${++count}/10`; 
  setNextQuestion()
  
})

//Se clicarmos no botão começar
function startGame() {
  numberQuestions.innerHTML = "1/10"
  startButton.setAttribute('id','hide')  
  shuffledQuestions = quizQuestionsAndAnswers.sort(() => Math.random() - .10) // Para o jogo mandar as perguntas por ordem aleatória
  currentQuestionIndex = 0 // como tinha referido anteriormente
  questionContainer.setAttribute("id", "") 
  setNextQuestion()
}

//Para expor a próxima pergunta e as suas respostas se clicarmos no botão "próximo", ou, para expor a primeira pergunta e as suas respostas se clicarmos no botao começar
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

//mostrar a pergunta e as respostas
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    //somos obrigados a criar novos botoes porque dá undefined se formos buscar os que estão já guardados no html
    const button = document.createElement('button')
    button.classList.add("btn", "col-6", "m-2", "mb-1")
    button.style.padding="15px"
    button.style.borderRadius = "32px"
    button.style.marginRight = "300px"
    button.style.marginLeft = "300px"
    button.style.marginTop = "10px"
    button.style.backgroundColor = "#F2F7FD"
    button.style.color="#ed6a5a"
    button.innerText = answer.text
    if (answer.correct) {
      //criar o atributo data-correct com o valor true na tag do botão que tem a resposta certa
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  nextButton.setAttribute("id",'hide2')
  //? penso que seja para apagar as respostas, se existirem
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  
  if(selectedButton.dataset.correct){ // Se estiver certo recebe 50 pontos
    quizPoints += 10
    answersRight.innerText = `Respostas certas: ${++countAnswersRight}`
    sessionStorage.setItem("quizPoints", quizPoints)
  }
  //Array.from e .forEach para evitar o problema do programa assumir que os elementos do DOM tenham valores undefined quando, na verdade, não têm.
  //guardar num novo array os antigos elementos que estavam contidos na array do HTMLCollection , depois para cada elemento do novo array...
  Array.from(answerButtonsElement.children).forEach(button => {
    if(button.dataset.correct){
      button.style.backgroundColor="green"
      button.style.color="white"
    }else{
      button.style.backgroundColor="red"
      button.style.color="white"
    }
  })
  //se o número de questões for ainda maior que o número da pergunta em que  o utilizador já vai, vai prosseguir o quiz
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.removeAttribute('id')
  } else { // caso contrário, acabou o quiz
    let span = document.createElement("div")
    parentNumberQuestions.appendChild(span)
    for (let i = 0; i < Infinity; i++){
      //se o utilizador já jogou o quiz
      if(userPointsQuiz[i] != null){
        //se o email dele estiver já guardado na localstorage
        if(userPointsQuiz[i].email == isLogged){
          if(userPointsQuiz[i].points == 0){
            userPointsQuiz[i].points = quizPoints
            span.innerText = `Ganhaste: ${quizPoints} pontos`
            localStorage.setItem("userPointsQuiz", JSON.stringify(userPointsQuiz))
            break
          } else if (userPointsQuiz[i].points > quizPoints ){  //200               //100
            span.innerText = `Ganhaste: 0 pontos`
            break
          }else {    // 200    //300
            let newPoints = quizPoints - userPointsQuiz[i].points   
            span.innerText = `Recebeste: ${newPoints} pontos`
            userPointsQuiz[i].points = 0
            localStorage.setItem("userPointsQuiz", JSON.stringify(userPointsQuiz))
            userPointsQuiz[i].points = quizPoints
            localStorage.setItem("userPointsQuiz", JSON.stringify(userPointsQuiz)) 
            break
          }
        }else{ 
          continue
        }
      }else{ // Se nunca jogou
        let newObj = {}
          newObj.email =isLogged 
          newObj.points =quizPoints
          userPointsQuiz.push(newObj)
          localStorage.setItem("userPointsQuiz", JSON.stringify(userPointsQuiz))
          span.innerText = `Ganhaste: ${quizPoints} pontos`
          break
      }
  }
  questionContainer.setAttribute("id", "hide1") 
    answersRight.style.fontSize="50px"
    parentNumberQuestions.appendChild(span)
    quizPoints = 0
    sessionStorage.setItem("quizPoints", JSON.stringify(quizPoints))
    startButton.innerText = 'Sair'
    startButton.removeAttribute('hide')
}

}
    }
    

}