import userController from '../controllers/userController.js'

export default class top10View {

    constructor() {
         
            
        this.userController = new userController();
        this.top10Table = this.userController.sortTable();

        this.top10Table = document.querySelector("#top10Table")
        this.renderTable();



    }

    renderTable() {
        const users = this.userController.usersArray();
 
         let tableBody = "" 
         for (let pos = 0; pos < users.length; pos++) { 
             tableBody += ` 
                 <tr>
                     <td class="col">${users[pos].username}</td> 
                     <td class="col">${users[pos].points} pontos</td> 
          
                 </tr> 
             ` 
         } 
 
 
         this.top10Table.children[1].innerHTML = tableBody 
    } 
            
    

}