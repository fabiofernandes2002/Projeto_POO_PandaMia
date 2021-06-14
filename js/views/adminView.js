import UserController from '../controllers/userController.js'
export default class adminView {
    constructor() {
        this.userController = new UserController()
        this.users = this.userController.getUsers()
        this.getIdOfLastUser = this.userController.getIdOfLastUser();
        this.tableChange = document.querySelector("#tbody");
        this.modalChange = document.querySelector("#modalsUsers");
        this.modalBlockChange = document.querySelector("#modalsBlockUsers");
        if(this.tableChange && this.modalChange && this.modalBlockChange){
            this.dataBase();
        }
    }



    dataBase() {
      let infoUser = "";
      let modalUser = "";
      let modalBlockUser = "";
      for (const user of this.users){
        if(user.type !== "admin"){
            infoUser += ` <tr>
            <th scope="row">${user.id}</th>
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>${user.email}</td>
            <td>
            <button class="buttonForEdit" data-toggle="modal" data-target="#${user.username}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg></button>
            <button id="blockButton${user.id}" data-toggle="modal" data-target="#block${user.username}"><svg style="background-color:lightblue;color:black;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg></button>
            <button id="trashButton${user.id}" "><svg style="color:red;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg></button>
            </td>
            </tr>`;

            modalUser += ` 
            <div class="modal fade modalUser" id="${user.username}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <i id="${user.username}"></i>
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Alteração dos dados</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                <form class="form">
                    <div class="form-group">
                    <label>Nome</label>
                    <input type="text" class="form-control${user.id - 1}" value="${user.username}">
                    </div>
                    <br>
                    <div class="form-group">
                    <label>Senha</label>
                    <input type="text" class="form-control${user.id - 1}" value="${user.password}">
                    </div>
                    <br>
                    <label>Email</label>
                    <input type="text" class="form-control${user.id - 1}" value="${user.email}">
                    </div>
                    <input class="btn btn-primary submitChange" type="button" value="Alterar">
                </form>
                </div>
              </div>
            </div>
          </div>`
          modalBlockUser += `<div class="modal fade" id="block${user.username}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle1" aria-hidden="true">
          <i id="block${user.username}"></i>
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle1">Bloquear Utilizador</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              Motivo: 
              <input type="text" id="motivo${user.id - 1}">
              <br>
              <br>
              <input class="btn btn-primary clickToBlock" id="inputBlock${user.id - 1}" type="button" value="Bloquear">
              </div>
            </div>
          </div>
        </div>

          `
            this.tableChange.innerHTML = infoUser;
            this.modalChange.innerHTML = modalUser;
            this.modalBlockChange.innerHTML = modalBlockUser;
            
        }   
    }
    /* Adicionar atributos ids para cada botao de submit do form do respetivo user */
    const submitChange = document.getElementsByClassName('submitChange')
    const clickToBlock = document.getElementsByClassName('clickToBlock')
    let users = JSON.parse(localStorage.getItem("users"));
    for (let ids = 0; ids < submitChange.length; ids++) {
              submitChange[ids].setAttribute('id',ids+1)
    }
    function makeItSubmit(a){
      let formControl= document.getElementsByClassName(`form-control${a}`);
      let  objIndex = users.findIndex((obj => obj.id == parseInt(document.getElementsByClassName('submitChange')[a].id)));
        users[objIndex].username = formControl[0].value;
        users[objIndex].password = formControl[1].value;
        users[objIndex].email = formControl[2].value;
        localStorage.setItem('users', JSON.stringify(users));
        location.reload();
        return false;
      };

      function makeItRemove(remove){
        let users = JSON.parse(localStorage.getItem("users"));
        let indexOfIdToRemove = users.findIndex((obj => obj.id == remove));
        for(let indexToBeChanged = 1; indexToBeChanged < Infinity; indexToBeChanged++ ){
          try {
            users[indexToBeChanged + indexOfIdToRemove].id
          } catch (errorIdUndefined) {
            break; 
          }
          users[indexToBeChanged + indexOfIdToRemove].id -=1
          localStorage.setItem('users', JSON.stringify(users));
        }
        users.splice(indexOfIdToRemove,1);
        localStorage.setItem('users', JSON.stringify(users));
        location.reload();
        return false;
      };

      function makeItBlock(block){
        let formControl= document.getElementsByClassName(`form-control${block}`);
        let arrayOfIsBlocked = JSON.parse(localStorage.getItem("blockedUsers"))
        const motivoValue = document.getElementById(`motivo${block}`).value
        if(arrayOfIsBlocked == null) {
          arrayOfIsBlocked = []
        }
        let objectOfUserBlocked = {}
        objectOfUserBlocked.username = formControl[0].value;
        objectOfUserBlocked.password = formControl[1].value;
        objectOfUserBlocked.email = formControl[2].value;
        objectOfUserBlocked.motivo = motivoValue
        arrayOfIsBlocked.push(objectOfUserBlocked)
        localStorage.setItem('blockedUsers', JSON.stringify(arrayOfIsBlocked))
        
        
      }
      for (let a = 0; a < submitChange.length; a++) {
        submitChange[a].addEventListener('click', function changeUser(){makeItSubmit(a)});
      }  
    for (let remove = 1; remove < this.getIdOfLastUser ; remove++) {
      let removeButton = document.getElementById('trashButton' + (remove))
      if(removeButton == null){continue}
      else{
        removeButton.addEventListener('click', function removeUser(){makeItRemove(remove)});
      }
    }
    for (let block = 0; block < clickToBlock.length; block++ )  {
      clickToBlock[block].addEventListener('click', function blockUser(){makeItBlock(block)})
    }

    
    document.getElementById("addUser").addEventListener('submit', (event) => {
      event.preventDefault()
      let users = JSON.parse(localStorage.getItem("users"));
      const usernameNewUser = document.querySelector("#exampleInputUsername1").value
      const passwordNewUser = document.querySelector("#exampleInputPassword1").value
      const emailNewUser = document.querySelector("#exampleInputEmail1").value
      let typeNewUser = document.querySelector('input[name="flexRadioDefault"]:checked').value
      let newObj = {}


      //Se não existir objetos na array users da localstorage
      if(users[0]== null){
        newObj.username = usernameNewUser
        newObj.email = emailNewUser
        newObj.password = passwordNewUser
        newObj.type = typeNewUser
        newObj.id=1
        users.push(newObj)
        localStorage.setItem('users', JSON.stringify(users))
        location.reload()
        return false
      }else{
              let arrayUsernames = []
              // Caso contrário, irá juntar todos os usernames já existentes num array
              for(let i=0; i<Infinity; i++){
                if(users[i] == null){
                  break
                }else{
                  arrayUsernames.push(users[i].username)
                }
               
              }
                //Verificar se algum username existente é igual ao username da entidade que vai ser adicionada, ou seja, verificar se já existe um username igual
              for(let i=0; i<arrayUsernames.length + 1; i++){
                //Se já existir, então vai mandar um alerta
                if(arrayUsernames[i] == usernameNewUser){
                  alert("O username já existe")
                  break
                //Se conseguiu chegar até ao final sem ter encontrado uma correspondência, então vai criar o username  
                }else if(arrayUsernames[i] == null){
                  newObj.username = usernameNewUser
                  break
                }else{
                  continue
                }
              }
              let arraySumIndex = []
              
              // irá juntar todos os emails já existentes num array
              for(let i=0; i<Infinity; i++){
                if(users[i] == null){
                  break
                }else{
                  arraySumIndex.push(users[i].email)
                }
              }
                //Verificar se algum  existente é igual ao email escolhido, ou seja, verificar se já existe um email igual
              for(let i=0; i<arraySumIndex.length + 1; i++){
                //Se já existir, então vai mandar um alerta
                if(arraySumIndex[i] == emailNewUser){
                  alert("O email já existe")
                  break
                //Se conseguiu chegar até ao final sem ter encontrado uma correspondência, então vai criar o email  
                }else if(arraySumIndex[i] == null){
                  newObj.email = emailNewUser
                  break
                }else{
                  continue
                }
              }
              newObj.password = passwordNewUser
              newObj.type = typeNewUser

              // ----id----------------

            for(let index=0; index<Infinity; index++){
              if(users[index] == null){
                newObj.id=this.getIdOfLastUser+1
              }else{
                continue
              }
              break
            }
            let newObjOne = {}
            //Verificar se o newObj contêm todas as propriedades necessárias: .username, .email, .type e .password
          if(newObj.username != null && newObj.password != null && newObj.email != null && newObj.type == "user"){
            for(let i = 0; i<Infinity; i++){
              if (users[i] == null){
                break
              }else if(users[i].type == "admin"){
                newObjOne.email = users[i].email
                newObjOne.password = users[i].password
                newObjOne.username = users[i].username
                newObjOne.type = users[i].type
                users[i].email = newObj.email
                users[i].password = newObj.password
                users[i].username = newObj.username
                users[i].type = newObj.type
                localStorage.setItem('users', JSON.stringify(users))
                users.push(newObjOne)
                localStorage.setItem('users', JSON.stringify(users))
                location.reload()
                return false
              }else{continue}
            }
            
          } else if (newObj.username != null && newObj.password != null && newObj.email != null && newObj.type == "admin"){
            users.push(newObj)
            localStorage.setItem('users', JSON.stringify(users))
            location.reload()
            return false
          }else{
            alert("Tente novamente")
          }
          console.log(newObj)
            }})}}

