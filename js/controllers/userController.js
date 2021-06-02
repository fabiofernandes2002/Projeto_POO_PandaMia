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
        if (this.users.some(user.email === email && user.password === password )) {
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
}