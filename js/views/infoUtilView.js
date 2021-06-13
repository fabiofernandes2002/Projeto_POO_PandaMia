import UserController from '../controllers/userController.js'
export default class infoUtilView {
    constructor() {
        this.userController = new UserController()
        this.users = this.userController.getUsers()
        this.getIdOfLastUser = this.userController.getIdOfLastUser();
        this.infoUtilThings = document.querySelector("#infoUtilThings")
        this.likesCount();
    }
    
    likesCount(){
        const isLogged = sessionStorage.getItem('loggedUser')
        // likeBlocker serve armazenar os utilizadores que já meteram, pelo menos, um like num card da informação util e, ao mesmo tempo, indica quais dos cards ele já meteu like (numeroDoCard:"liked") e quais é que não meteu (numeroDoCard:"notLiked")  //
        const likeBlocker = JSON.parse(localStorage.getItem('likeBlocker'));
        //CardsLikeCount serve para armazenar os likes em cada card, por exemplo, o objeto "1":0 sigifica que a primeira card tem 0 likes
        const cardsLikeCount = JSON.parse(localStorage.getItem('cardsLikeCount'));

        function makeItLike(buttonsLike){
            if(isLogged == null){ // Bloquear os likes para as pessoas que não estão logadas  
                alert("Log-in first")
            }else{
                // Se não existir objetos na key LikeBlocker, então é criado o primeiro objeto que contêm o email do primeiro utilizador a meter like numa card
                if(likeBlocker[0] == null){
                        let arrayOfLikeBlocker = []
                        let objectOfLikeBlocker = {}
                        objectOfLikeBlocker.email = sessionStorage.getItem('loggedUser');
                        // Na altura que escrevi este código só tinha colocado três cards com os botoes de dar like, neste momento estou a acrescentar opções de o adminstrador poder adicionar mais cards dentro do site e tenciono mostrar esse código ainda hoje
                        objectOfLikeBlocker[1]="notLiked"
                        objectOfLikeBlocker[2]="notLiked"
                        objectOfLikeBlocker[3]="notLiked"
                        objectOfLikeBlocker[buttonsLike]="liked"
                        arrayOfLikeBlocker .push(objectOfLikeBlocker)
                        localStorage.setItem('likeBlocker', JSON.stringify(arrayOfLikeBlocker))
                        //Vamos chamar cardsLikeCount para alterar o numero anterior de likes do card, somando mais um, neste caso, o número anterior é o número inicial 0, portanto vamos somar mais 1 e o valor ficará 1 
                        cardsLikeCount[buttonsLike-1][buttonsLike] += 1
                        localStorage.setItem("cardsLikeCount", JSON.stringify(cardsLikeCount))
                
                }else{
                    for(let i=0; i<7; i++){  
                        // Se o likeBlocker já tiver objetos (ou seja, se, pelo menos, algum utilizador já meteu like em algum dos cards) então o for loop vai verificar se o email utilizador que acabou de meter like am algum dos cards já está armazenado no likeBlocker 
                        if (likeBlocker[i].email == sessionStorage.getItem('loggedUser')) {
                             //Se esse utilizador já deu like no card e voltou a clicar novamente no mesmo botao do like, então o programa irá assumir que ele quer remover o seu like
                            if (likeBlocker[i][buttonsLike] == "liked") {
                                likeBlocker[i][buttonsLike] ="notLiked"
                                localStorage.setItem('likeBlocker', JSON.stringify(likeBlocker))

                                cardsLikeCount[buttonsLike-1][buttonsLike] -= 1
                                localStorage.setItem("cardsLikeCount", JSON.stringify(cardsLikeCount))

                                
                            } else {
                                //Se o utilizador nunca deu like e está a clicar pela primeira vez, então o programa irá acrescenter o seu like 
                                likeBlocker[i][buttonsLike]="liked"
                                localStorage.setItem('likeBlocker', JSON.stringify(likeBlocker))

                                cardsLikeCount[buttonsLike-1][buttonsLike] += 1
                                localStorage.setItem("cardsLikeCount", JSON.stringify(cardsLikeCount))
                            }
                            break
                        } else {
                            continue
                        }
                    }
                }
                
            } 
            // vai dar refresh á pagina sempre que dermos like ou removermos o like
            location.reload()
            return false
            
        }
         // Este loop serve para atualizar os números dos likes que se encontram armazenados na key cardsLikeCount, introduzindo esses valores para dentro do span que se encontra dentro do botão do like
        for(let i=0; i < Infinity; i++){
            if(cardsLikeCount[i] == null){
                break
            }
            const spanValue = cardsLikeCount[i][i+1]
            let buttonLike = document.getElementById(`modal0${i+1}`)
            const SPAN = buttonLike.children[0]
            SPAN.innerHTML= spanValue
        }
        //Este loop server para adicionar Event Listeners a todos os botoes dos likes
        for(let buttonsLike=1; buttonsLike<Infinity; buttonsLike++){
            let buttonLike = document.getElementById(`modal0${buttonsLike}`)
            if(buttonLike == null){
                break
            }
            buttonLike.addEventListener('click', function LikeUser(){makeItLike(buttonsLike)})
        }

        
    }


}