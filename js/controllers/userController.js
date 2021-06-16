import userModel from '../models/userModel.js'

export default class userController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
        this.userPointsQuiz = localStorage.userPointsQuiz ? JSON.parse(localStorage.userPointsQuiz) : [];
        this.typeUserUsers = JSON.parse(localStorage.users).filter( (u) => u.type == "user" );
    }

    register(nameSurname,username, address , postalCode, city, birthDate, email, password) {
        if (!this.users.some(user => user.email === email)) {
            const id = this.users.length + 1
            const type = "user"
            for(let i = 0; i<Infinity; i++){
                if (this.users[i] == null){
                  break
                }else if(this.users[i].type == "admin"){
                  let newObjOne = {}
                  newObjOne.email = this.users[i].email
                  newObjOne.password = this.users[i].password
                  newObjOne.username = this.users[i].username
                  newObjOne.type = this.users[i].type
                  newObjOne.id = id
                  this.users[i].email = email
                  this.users[i].password = password
                  this.users[i].username = username
                  this.users[i].type = type
                  this.users[i].nameSurname = nameSurname
                  this.users[i].address = address
                  this.users[i].postalCode = postalCode
                  this.users[i].city = city
                  this.users[i].birthDate = birthDate
                  localStorage.setItem('users', JSON.stringify(this.users))
                  this.users.push(newObjOne)
                  localStorage.setItem('users', JSON.stringify(this.users))
                  location.reload()
                  return false
                }else{continue}
              }
        } else {
            throw Error(`User with email "${email}" already exists!`);
        }
    }

    login(email, password) {
        if (this.users.some(user => user.email === email && user.password === password )) {
            const type = this.users.find(user => user.email === email).type
            sessionStorage.setItem("typeUser", type)
            sessionStorage.setItem("loggedUser", email)
        } else {
            throw Error("Invalid login!");
        }
        
    }

    getUserUsername(){
        const email = sessionStorage.getItem("loggedUser")
        return this.users.find(user => user.email === email).username
    }

    logout() {
        sessionStorage.removeItem("loggedUser")
        sessionStorage.removeItem("typeUser")
    }

    isLogged() {
        return sessionStorage.getItem("loggedUser") ? true : false
    }

    isAdmin(){
        const emailAdmin = sessionStorage.getItem("loggedUser")
        return this.users.some(user => user.email == emailAdmin && user.type == "admin")
    }

    isUser(){
        const emailUser = sessionStorage.getItem("loggedUser")
        return this.users.some(user => user.email == emailUser && user.type == "user")
    }
    getUsers(){
        return this.users
    }

    getuserPointsQuiz(){
        return this.userPointsQuiz
    }

    
    // função que permite alterar dados de acesso
    change(emailNew, passwordCurrent ,passwordNew, repeatPasswordNew){
        if (emailNew == "" || passwordCurrent == "" || passwordNew == "" || repeatPasswordNew == "") {
            
            throw `Por favor, preencha todos os detalhes!`
        }
        else if(this.users.some(user => user.email === emailNew)){

            throw `O email "${emailNew}" já existe!`
        } 
        else if(this.users.some(user => user.password != passwordCurrent)){

            throw `Password não coincide com a atual!`
        }
        else if (passwordCurrent == passwordNew) {
            throw `A password atual e a nova password não podem ser iguais!`
        }
        else if (passwordNew != repeatPasswordNew) {
            throw `Palavra-passe incorreta!`
        }
        else{
            const email = sessionStorage.getItem("loggedUser")
            const loggedUser = this.users.find(user => user.email === email)
            loggedUser.email = emailNew
            loggedUser.password = passwordNew
            //this.users.email = emailNew
            //this.users.password = passwordNew
            localStorage.setItem('users', JSON.stringify(this.users)) 
            sessionStorage.setItem('loggedUser', emailNew)
        }

    }
     getIdOfLastUser(){
        /* Juntar todos os ids num array */
        let arraySumIndex = []
        for(let i=1; i<Infinity; i++){
            let  objLastIndex = this.users.findIndex((obj => obj.id == i ))
            if(objLastIndex != -1){
                arraySumIndex.push(i)
            }else if(objLastIndex == -1){
                break;
            }
        }
        /* Procurar o número mais alto desse array, esse número será o último id */
        let maxValue = arraySumIndex[0]
        for (let i = 0; i < arraySumIndex.length;i++){
            if (maxValue < arraySumIndex[i]){maxValue = arraySumIndex[i]}
        }
        return maxValue
        
    }

    usersArray() { 
        return this.users 
    }

    sortTable() {
        return this.typeUserUsers.sort((a, b) => { 
            const aPoints = a.points ? a.points : 0; 
            const bPoints = b.points ? b.points : 0; 
            return aPoints - bPoints; 
        }).reverse(); 
    } 
        
}