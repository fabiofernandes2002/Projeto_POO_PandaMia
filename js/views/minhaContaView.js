import userController from '../controllers/userController.js'

export default class minhaContaView {

    constructor() {
        
        this.userController = new userController();

        // gestão do form de dados de acesso
        this.formDataAccess = document.querySelector("#formDataAccess")
        this.emailNew = document.querySelector("#txtEmailNew");
        this.passwordCurrent = document.querySelector("#txtPasswordCurrent");
        this.passwordNew = document.querySelector("#txtPasswordNew");
        this.repeatPasswordNew = document.querySelector("#txtRepeatPasswordNew")
        this.btnSave = document.querySelector("#btnSave")
        this.dataAccessMessage = document.querySelector("#dataAccessMessage")
        this.bindFormDataAccess()
        

    }

    bindFormDataAccess(){
        this.formDataAccess.addEventListener("submit",event => {
            event.preventDefault();
            try {
            if (this.passwordNew.value !== this.repeatPasswordNew.value) {
                throw Error("Password and Confirm Password are not equal");
            }
            this.userController.change(this.emailNew.value, this.passwordCurrent.value, this.passwordNew.value, this.repeatPasswordNew.value)
            this.displayMessage("Data access change with success!", "success");
            // Espera 1 seg. antes de fazer refresh à pagina
            // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
            setTimeout(() => {location.href = "../index.html"}, 1000);
            } catch (err) {
            this.displayMessage(err);
            }
        })
        
    }

     /** 
     * Função que define uma mensagem de erro 
     */ 
    displayMessage(text, type) {
        this.dataAccessMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${text}</div>`;
        
    }
    
}

