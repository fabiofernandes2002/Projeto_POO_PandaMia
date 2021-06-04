import userController from '../controllers/userController.js'

export default class navBarView {
    constructor() {
        this.userController = new userController();

        // Gestão do form de login
        if (document.querySelector("#formLogin")) {
            this.formLogin = document.querySelector("#formLogin");
            this.emailUsernameLogin = document.querySelector("#txtEmailUsernameLogin");
            this.passwordLogin = document.querySelector("#txtPasswordLogin");
            this.loginMessage = document.querySelector("#loginMessage")
            this.bindLoginForm()
        }
        


        // Gestão do form de registo
        if (document.querySelector("#formRegister")) {
            this.formRegister = document.querySelector("#formRegister");
            this.nameSurnameRegister = document.querySelector("#txtNameSurnameRegister");
            this.usernameRegister = document.querySelector("#txtUsernameRegister");
            this.address = document.querySelector("#txtAddress");
            this.postalCode = document.querySelector("#txtPostalCode");
            this.city = document.querySelector("#txtCity");
            this.birthDate = document.querySelector("#txtBirthDate");
            this.email = document.querySelector("#txtEmail");
            this.passwordRegister = document.querySelector("#txtPasswordRegister");
            this.confirmPasswordRegister = document.querySelector("#txtConfirmPasswordRegister");
            this.registerMessage = document.querySelector("#registerMessage")
            this.bindFormRegister();
        }
        

        // Gestão dos botões da navbar
        this.loginButton = document.querySelector("#btnLogin");
        this.registerButton = document.querySelector("#btnRegister");
        this.logoutButton = document.querySelector("#btnLogout");
        this.bindLogout();


        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.updateStatusUI();
        this.updateAdmin();
    }

    /**
     * Função que define um listener para o botão de registo
     */
    bindFormRegister() {
        this.formRegister.addEventListener("submit", event => {
            event.preventDefault();
            try {
                if (this.passwordRegister.value !== this.confirmPasswordRegister.value) {
                    throw Error("Password and Confirm Password are not equal");
                }
                this.userController.register(this.nameSurnameRegister.value, this.usernameRegister.value, this.address.value, this.postalCode.value, this.birthDate.value, this.email.value, this.confirmPasswordRegister , this.city.value ,this.passwordRegister.value);
                this.displayMessage("register", "User registered with success!", "success");
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => {location.href = "../login.html"}, 1000);
            } catch (err) {
                this.displayMessage("register", err, "danger");
            }
        })
    }

    /**
     * Função que define um listener para o botão de login
     */
    bindLoginForm() {
        this.formLogin.addEventListener("submit", event => {
            event.preventDefault();
            try {
                this.userController.login(this.emailUsernameLogin.value, this.passwordLogin.value, "user");
                this.displayMessage("login", "User logged in with success!", "success");
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => {location.href = "../index.html"}, 1000);
            } catch (err) {
                this.displayMessage("login", err, "danger");
            }
        });

    }

    /**
     * Função que define um listener para o botão de logout
     */
    bindLogout() {
        this.logoutButton.addEventListener("click", () => {
            this.userController.logout();
            location.reload()
        })
    }

    /**
     * Função que atualiza a visibilidade dos botões de acordo com a autenticação
     */
    updateStatusUI() {
        if (this.userController.isLogged()) {
            this.loginButton.style.visibility = "hidden"
            this.registerButton.style.visibility = "hidden"
            this.logoutButton.style.visibility = "visible"
            this.minhaConta.html.visibility = "visible"
        } else {
            this.loginButton.style.visibility = "visible"
            this.registerButton.style.visibility = "visible"
            this.logoutButton.style.visibility = "hidden"
            this.minhaConta.html.visibility = "hidden"
        }
    }

    updateAdmin() { 
        if (this.userController.isAdmin() ) {
            this.userAdmin.html.style.visibility = "visible" 
        } else {
            this.userAdmin.html.style.visibility = "hidden"
        }
    } 
        

    
    

    /**
     * Função que define e exibe uma mensagem de sucesso ou de erro
     * @param {string} event tipo de evento (login ou register)
     * @param {string} text mensagem a ser exibida 
     * @param {string} type danger - caso seja uma mensagem de erro; success - caso seja uma mensagem de sucesso
     */
    displayMessage(event, text, type) {
        const message = `<div class="alert alert-${type}" role="alert">${text}</div>`;
        event == "login" ? this.loginMessage.innerHTML = message : this.registerMessage.innerHTML = message
    }
}