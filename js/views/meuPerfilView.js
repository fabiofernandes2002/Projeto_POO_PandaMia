import UserController from '../controllers/userController.js'
export default class meuPerfilView {
    constructor() {
        this.userController = new UserController()
        this.users = this.userController.getUsers()
        this.userPointsQuiz = this.userController.getuserPointsQuiz()
        this.imagePerfil = document.querySelector("#imagePerfil")
        this.parentImagePerfil = document.querySelector("#parentImage")
        this.progressBar = document.querySelector("#progressBar")
        this.myProfile();
    }

    myProfile(){
        const users = this.users.find(user => user.email === sessionStorage.getItem("loggedUser"))
        for(let i = 0 ; i<Infinity; i++){
            if(this.userPointsQuiz[i] == null){
                break
            }else{
                if(this.userPointsQuiz[i].email == users.email){
                    users.points = this.userPointsQuiz[i].points 
                    localStorage.setItem("users", JSON.stringify(this.users))
                    const avatars = JSON.parse(localStorage.getItem("avatars")) 
                    for(let i = 0; i<8; i++){
                        if(users.points >= avatars[i].points && users.points < avatars[i+1].points ){
                            const div = document.createElement("div")
                            const div1 = document.createElement("div")
                            const br = document.createElement("br")
                            this.parentImagePerfil.appendChild(div)
                            this.parentImagePerfil.appendChild(br)
                            this.parentImagePerfil.appendChild(div1)
                            this.imagePerfil.setAttribute("src", avatars[i].photo)
                            div.innerText= `Nível: ${avatars[i].id}`
                            div1.innerText= `Pontos: ${users.points}`
                            this.progressBar.style.width=`${avatars[i].id * 12.5}%`
                            break
                        } else{
                            continue
                        }
                    }
                    break
                }else{
                    continue
                }}}}



}
