import UserController from '../controllers/userController.js'
export default class infoUtilView {
    constructor() {
        this.userController = new UserController()
        this.users = this.userController.getUsers()
        this.getIdOfLastUser = this.userController.getIdOfLastUser()
        this.isAdmin = this.userController.isAdmin()
        this.giveOpinion();
    }

    giveOpinion(){
        function makeItSubmit(){
            let opinions = JSON.parse(localStorage.getItem("opinions"))
            //Se não existir ainda nenhum objeto dentro da array do opinions
            if(opinions[0] == null ){
                let newObject = {}
                const validationCustomValueOne = document.getElementById('validationCustom01').value
                const validationCustomValueTwo = document.getElementById('validationCustom01').value
                const validationCustomValueThree = document.getElementById('validationCustom01').value
        
                newObject.name = validationCustomValueOne
                newObject.email = validationCustomValueTwo
                newObject.opinion = validationCustomValueThree
                opinions.push(newObject)
                localStorage.setItem('opinions', JSON.stringify(opinions))

            }else{
                for(let i = 0; i<Infinity ; i++ ){
                    //Se já existirem objetos o programa vai adicionar um novo objeto 
                    if(opinions[i] == null){
                        let newObject = {}
                        const validationCustomValueOne = document.getElementById('validationCustom01').value
                        const validationCustomValueTwo = document.getElementById('validationCustom02').value
                        const validationCustomValueThree = document.getElementById('validationCustom03').value
        
                        newObject.name = validationCustomValueOne
                        newObject.email = validationCustomValueTwo
                        newObject.opinion = validationCustomValueThree
                        opinions.push(newObject)
                        localStorage.setItem('opinions', JSON.stringify(opinions))
                        break
                    } else {continue}
                }}}
        
        document.getElementById("submitForm").addEventListener('submit', event => {
            event.preventDefault();
            makeItSubmit()
        })
    }}