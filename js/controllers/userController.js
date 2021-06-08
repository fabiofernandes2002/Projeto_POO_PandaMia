import userModel from '../models/userModel.js'

export default class userController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    register(nameSurname, id,username, city, postalCode, address, birthDate, email, password, type) {
        if (!this.users.some(user => user.username === username)) {
            this.users.push(new userModel(new id, nameSurname, username, city, postalCode, address, birthDate, email, password, type));
            localStorage.setItem('users', JSON.stringify(this.users))
        } else {
            throw Error(`User with username "${username}" already exists!`);
        }
    }

    login(email, password) {
        if (this.users.some(user => user.email === email && user.password === password )) {
            sessionStorage.setItem("loggedUser", email)
        } else {
            throw Error("Invalid login!");
        }
    }

    logout() {
        sessionStorage.removeItem("loggedUser")
    }

    isLogged() {
        return sessionStorage.getItem("loggedUser") ? true : false
    }

    isAdmin(){
        const name = sessionStorage.getItem("loggedUser")
        return this.users.some(user => user.username == name && user.type == "admin")
    }
    getUsers(){
        return this.users
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
}