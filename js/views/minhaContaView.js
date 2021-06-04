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
        this.formDataAccess.addEventListener("submit", event =>{
            event.preventDefault();
            try {
                if (this.email === this.emailNew) {
                    throw Error("O email antigo não pode ser alterado para o mesmo!")
                } else {
                    
                }
            } catch (error) {
                
            }
        })
    }
}