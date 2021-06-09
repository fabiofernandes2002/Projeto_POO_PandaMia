import userModel from '../models/userModel.js'

export default class userController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    register(nameSurname,username, address , postalCode, city, birthDate, email, password, type) {
        if (!this.users.some(user => user.email === email)) {
            const id = this.users.length + 1
            const type = "user"
            this.users.push(new userModel(id, nameSurname,username, address , postalCode, city, birthDate, email, password, type));
            localStorage.setItem('users', JSON.stringify(this.users))
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
    
    // função que permite alterar dados de acesso
    change(emailNew, passwordCurrent ,passwordNew, repeatPasswordNew){
        if (emailNew == "" || passwordCurrent == "" || passwordNew == "" || repeatPasswordNew == "") {
            
            alert('Please fill all the details');
        }
        else if (passwordCurrent == passwordNew) {
            alert("Old password and New Password cannot be same");
        }
        else if (passwordNew != repeatPasswordNew) {
            alert("password mismatch");
        }
        else{
            this.users.email = emailNew
            this.users.password = passwordNew
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
}