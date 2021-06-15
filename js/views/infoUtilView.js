import UserController from '../controllers/userController.js'
export default class infoUtilView {
    constructor() {
        this.userController = new UserController()
        this.users = this.userController.getUsers()
        this.getIdOfLastUser = this.userController.getIdOfLastUser();
        this.infoUtilThings = document.querySelector("#infoUtilThings")
        this.isAdmin = this.userController.isAdmin()
        this.likesCount();
        this.commentUser();
    }
    
    likesCount(){
        const isLogged = sessionStorage.getItem('loggedUser')
        // likeBlocker serve armazenar os utilizadores que já meteram, pelo menos, um like num card da informação util e, ao mesmo tempo, indica quais dos cards ele já meteu like (numeroDoCard:"liked") e quais é que não meteu (numeroDoCard:"notLiked")  //
        const likeBlocker = JSON.parse(localStorage.getItem('likeBlocker'));
        //CardsLikeCount serve para armazenar os likes em cada card, por exemplo, o objeto "1":0 sigifica que a primeira card tem 0 likes
        const cardsLikeCount = JSON.parse(localStorage.getItem('cardsLikeCount'));

        function makeItLike(buttonsLike){
            if(isLogged == null){ // Bloquear os likes para as pessoas que não estão logadas  
                alert("Faz Login primeiro")
            }else{
                // Se não existir objetos na key LikeBlocker, então é criado o primeiro objeto que contêm o email do primeiro utilizador a meter like numa card
                if(likeBlocker[0] == null){
                        let arrayOfLikeBlocker = []
                        let objectOfLikeBlocker = {}
                        objectOfLikeBlocker.email = sessionStorage.getItem('loggedUser');
                        // Neste momento só há 3 cards
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
                        //Se o index do array do likeBlocker não der undefined, ou seja, se encontrar um objeto dentro da array do likeBlocker
                        if(likeBlocker[i] != null){
                            //e a propriedade email desse objeto for igual ao email do utilizador que estiver logado
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

                           }
                           continue
                        //Se o loop ultrapassar o limite de objetos do array do likeBlocker, ou seja, se o utilizador que estiver a dar like não tiver ainda o seu e-mail registado no likeBlocker (por outras palavras, se o utilizador estiver pela primeira vez a dar like num card)
                        } else if (likeBlocker[i] == null ) {
                            // vai acrescentar na array (do likeBlocker) um novo objeto com o email desse utilizador, mostrar qual foi o card que ele meteu like e finalmente atualizar o número de likes
                            let objectOfLikeBlocker = {}
                            objectOfLikeBlocker.email = sessionStorage.getItem('loggedUser');
                            // Mais uma vez, neste momento só há 3 cards
                            objectOfLikeBlocker[1]="notLiked"
                            objectOfLikeBlocker[2]="notLiked"
                            objectOfLikeBlocker[3]="notLiked"
                            objectOfLikeBlocker[buttonsLike]="liked"
                            likeBlocker.push(objectOfLikeBlocker)
                            localStorage.setItem('likeBlocker', JSON.stringify(likeBlocker))

                            cardsLikeCount[buttonsLike-1][buttonsLike] += 1
                            localStorage.setItem("cardsLikeCount", JSON.stringify(cardsLikeCount))
                            break // Resolvido: para não criar mais do que um objeto

                        }}}}

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

        }}

    commentUser(){
        const modalsAndItsComments = JSON.parse(localStorage.getItem('modalsAndItsComments'));
        const isLogged = sessionStorage.getItem('loggedUser')
        let users = JSON.parse(localStorage.getItem("users"))

        function makeItComment(enviarButton){ 
            const textAreaValue = document.getElementById(`textArea${enviarButton + 1}`).value
            for(let i=0 ; i<Infinity; i++){
                if(users[i] == null){  //se o loop chegar ao fim da array da key users
                    break
                }else{
                    if (users[i].email == isLogged){ // se se o email do utilizador que está logado for igual ao email da localstorage
                        let authorOfComment = users[i].username 
                        for(let k=1; k<Infinity; k++){
                            if(modalsAndItsComments[enviarButton][k] != null){
                                continue
                            }else{
                                const enviarTag = document.getElementById(`Enviar${enviarButton+1}`)
                                const TEXT = modalsAndItsComments[enviarButton][k] = textAreaValue
                                const AUTHOR = modalsAndItsComments[enviarButton]['user' + k] = authorOfComment
                                localStorage.setItem('modalsAndItsComments', JSON.stringify(modalsAndItsComments))
                                // O código a seguir serve para mostrar o comentário sem precisarmos de fazer reload à página (NOTA:o código do comentário adicionado desaparecerá se dermos reload, mas o utilizador não irá se aperceber disso, porque o ciclo for da linha 175 irá colocar novamente o comentário, buscando os dados dele na localstorage que eu pedi ao programa para armazenar nas três linhas de código anteriores )
                                let divChild = document.createElement("div")
                                const brTag = document.createElement("br")
                                let headingFour = document.createElement("h4")
                                let headingSix = document.createElement("h6")
                                let minusDiv = document.createElement("div")
                                minusDiv.innerHTML= `<svg style="height: 10px;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 4"><path d="M8,20V16H28v4Z" transform="translate(-8 -16)" style="fill: red"/>
                                </svg>`
                                headingFour.style.color="#000000"
                                headingSix.style.color="#000000"
                                headingFour.innerText=TEXT
                                headingSix.innerText=`- ${AUTHOR}`
                                divChild.appendChild(brTag)
                                divChild.appendChild(brTag.cloneNode()) // Não podemos dizes brTag duas vezes, um é o original e o outro tem que ser o clone
                                divChild.appendChild(headingFour)
                                divChild.appendChild(headingSix)
                                if(sessionStorage.getItem('typeUser') == "admin"){
                                    divChild.appendChild(minusDiv)
                                    enviarTag.after(divChild)
                                    location.reload()
                                    return false
                                    }
                                enviarTag.after(divChild)
                                break
                            }
                        }
                    }else{
                        continue

                    }}}} 

        // Este loop serve para adicionar Event Listeners a todos os botoes de Enviar o comentário
        for(let enviarButton=0; enviarButton<Infinity; enviarButton++){
            let divParent = document.getElementsByClassName('col-12')[enviarButton]
            if(divParent == null){
                break
            }
            let BUTTON = divParent.children[0]
            BUTTON.addEventListener('click', function CommentUser(){makeItComment(enviarButton)})
        }

        // Para a página de informação util estar sempre atualizada com os comentários que são guardados na key modalsAndItsComments da localstorage 
        for(let i=0; i <Infinity ; i++){ //iterar os objetos das arrays
            const enviarTag = document.getElementById(`Enviar${i+1}`)
            if(modalsAndItsComments[i] == null ){
                break
            }
            for(let index=1; index<Infinity; index++){ //iterar as propriedades correspondentes aos comentários e aos seus relativos autores que estão dentro do objeto iterado
                if(modalsAndItsComments[i][index] == null){
                    break
                }
                let divChild = document.createElement("div")
                const TEXT = modalsAndItsComments[i][index]
                const AUTHOR = modalsAndItsComments[i]['user' + (index)]
                const brTag = document.createElement("br")
                let headingFour = document.createElement("h4")
                let headingSix = document.createElement("h6")
                let minusDiv = document.createElement("div")
                minusDiv.innerHTML= `<svg style="height: 10px;" id="remove${i+index}" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 4"><path d="M8,20V16H28v4Z" transform="translate(-8 -16)" style="fill: red"/>
              </svg>`
                headingFour.style.color="#000000"
                headingSix.style.color="#000000"
                headingFour.innerText=TEXT
                headingSix.innerText=`- ${AUTHOR}`
                divChild.appendChild(brTag)
                divChild.appendChild(brTag.cloneNode()) // Não podemos dizes brTag duas vezes, um é o original e o outro tem que ser o clone
                divChild.appendChild(headingFour)
                divChild.appendChild(headingSix)
                //Se o utilizador logado for administrador, então vai aparecer um simbolo menos em baixo de cada comentário para ele ter a possibilidade de remover o comentário
                if(this.isAdmin){
                    divChild.appendChild(minusDiv)
                    enviarTag.after(divChild)
                    document.getElementById(`remove${i+index}`).addEventListener('click', () => {
                        delete modalsAndItsComments[i][index];
                        delete modalsAndItsComments[i]['user' + (index)]; 
                        localStorage.setItem('modalsAndItsComments', JSON.stringify(modalsAndItsComments))
                        location.reload()
                        return false
                    })
                }
                enviarTag.after(divChild) // Para que os comentários mais recentes estejam sempre em primeiro
            }}}}