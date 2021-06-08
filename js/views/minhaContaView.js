import userController from '../controllers/userController.js'

export default class minhaContaView {

    constructor() {
        
        this.userController = new userController();

        // gestão do form de dados de acesso
        this.formDataAccess = document.querySelector("#formDataAccess")
        this.emailNew = document.querySelector("#txtEmailNew").value;
        this.passwordCurrent = document.querySelector("#txtPasswordCurrent").value;
        this.passwordNew = document.querySelector("#txtPasswordNew").value;
        this.repeatPasswordNew = document.querySelector("#txtRepeatPasswordNew").value
        this.btnSave = document.querySelector("#btnSave")
        this.dataAccessMessage = document.querySelector("#dataAccessMessage")
        this.bindFormDataAccess()
        

    }

    bindFormDataAccess(){
        try {
            if (this.passwordNew.value !== this.repeatPasswordNew.value) {
                throw Error("Password and Confirm Password are not equal");
            }
            this.userController.change(this.emailNew.value, this.passwordCurrent.value, this.passwordNew.value, this.repeatPasswordNew.value)
            this.displayMessage("change", "Data access change with success!", "success");
            // Espera 1 seg. antes de fazer refresh à pagina
            // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
            setTimeout(() => {location.href = "../index.html"}, 1000);
        } catch (err) {
            this.displayMessage(err);
        }
    }

     /** 
     * Função que define uma mensagem de erro 
     */ 
     displayMessage(text) { 
        this.dataAccessMessage.innerHTML = text; 
       } 
       
      
    
}

