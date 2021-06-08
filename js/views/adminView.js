import UserController from '../controllers/userController.js'
export default class AdminView {
    constructor() {
        this.userController = new UserController()
        this.users = this.userController.getUsers()
        console.log(this.users);
        this.tableChange = document.getElementById("tbody");
        this.modalChange = document.getElementById("modalsUsers");
        if(this.tableChange && this.modalChange){
            this.dataBase();
        }
    }



    dataBase() {
      let infoUser = "";
      let modalUser = "";
      for (const user of this.users){
        if(user.type !== "admin"){
            infoUser += ` <tr>
            <th scope="row">${user.id}</th>
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>${user.email}</td>
            <td>
            <button class="buttonForEdit" data-toggle="modal" data-target="#${user.username}" id="pencilButton"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg></button>
            <button id="trashButton${user.id}"><svg style="color:red;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg></button></td>
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
            this.tableChange.innerHTML = infoUser;
            this.modalChange.innerHTML = modalUser;
            
        }   
    }
    /* Adicionar atributos ids para cada botao de submit do form do respetivo user */
    let submitChange = document.getElementsByClassName('submitChange')
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
        users.splice(users.findIndex((obj => obj.id == remove)),1);
        localStorage.setItem('users', JSON.stringify(users));
        location.reload();
        return false;
      };
      for (let a = 0; a < submitChange.length; a++) {
        submitChange[a].addEventListener('click', function submit(){makeItSubmit(a)});
      }  

    for (let remove = 1; remove < this.userController.getIdOfLastUser() + 1 ; remove++) {
      let removeButton = document.getElementById('trashButton' + (remove))
      if(removeButton == null){continue}
      removeButton.addEventListener('click', function removeUser(){makeItRemove(remove)});
    }  
  }
}

            