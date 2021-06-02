import userController from '../controllers/userController.js'

export default class minhaContaView {

    constructor() {
        
        this.userController = new userController();

        // gestão do form de dados de acesso
        this.formDataAccess = document.querySelector("#formDataAccess")
        this.emailNew = document.querySelector("#txtEmailNew")
        this.passwordCurrent = document.querySelector("#txtPasswordCurrent")
        this.passwordNew = document.querySelector("#txtPasswordNew")
        this.repeatPasswordNew = document.querySelector("#txtRepeatPasswordNew")
        this.btnSave = document.querySelector("#btnSave")
        this.dataAccessMessage = document.querySelector("#dataAccessMessage")
        this.bindFormDataAccess()

        // gestão do form de dados pessoais
        this.formPersonalData = document.querySelector("#formPersonalData")
        this.usernameNew = document.querySelector("#txtUsernameNew")
        this.addressNew = document.querySelector("#txtAddressNew")
        this.cityNew = document.querySelector("#txtCityNew")
        this.postalCodeNew = document.querySelector("#txtPostalCodeNew")
        this.btnSave = document.querySelector("#btnSave")
        this.personalDataMessage = document.querySelector("#personalDataMessage")
        this.bindFormPersonalData()
    }
}