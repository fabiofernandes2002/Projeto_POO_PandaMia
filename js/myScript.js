let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
/* Dar refresh à página sempre que damos resize */
window.onresize = function(){ location.reload(); } 

/* Event Listeners para o catálogo de jogos */
let cardOne=document.getElementById("card1")
let cardTwo=document.getElementById("card2")
if(cardOne && cardTwo){
    cardOne.addEventListener('click', function(){hideCard(cardOne)})
}


    function hideCard(e){
        /* Apaga todos os nodes childs que estão dentro do elemento e */
    e.innerHTML=""
    e.innerHTML+=`<div class="card-body">
    <a href="quizzes.html"><h2 class="card-text text-center">QUIZ 1</h2></a>
    <hr>
    <h2 class="card-text text-center">QUIZ 2</h2>
    <hr>
    <h2 class="card-text text-center">QUIZ 3</h2>
    </div>`
    setTimeout(function(){
        window.addEventListener('click', function(e){
            
        })
    }, 1)
    
    }

    
        

    