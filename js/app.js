import navBarView from './views/navBarView.js';
import AdminView from './views/adminView.js';
import minhaContaView from './views/minhaContaView.js';

// import adminView from './views/adminView.js'
// import userView from './views/userView.js'
// import gameView from './views/gameView.js'

class App {
    constructor() {
        // Mapeamento entre os ficheiros HTML e as views que estes vão carregar
        this.routes = {
            "": [navBarView],
            "userAdmin": [AdminView],
            "index": [navBarView],
            "register": [navBarView],
            "login": [navBarView],
            "minhaConta":[minhaContaView],
            "dadosAcesso":[minhaContaView]
            
        };

        // importa dados dummy para testes
        this.#importDataFixtures();

        // instancia as views mapeadas no objeto routes
        this.#instantiateViews();
    }

    #instantiateViews() {
        const path = window.location.pathname
        const file = path.substr(path.lastIndexOf("/") + 1);
        const route = file.split(".")[0];

        const views = this.#getViews(route);

        for (const view of views) {
            new view();
        }
    }

    #getViews(route) {
        return typeof this.routes[route] === 'undefined' ? [] : this.routes[route];
    }

    #importDataFixtures() {
        

        const users = [
            {
                id: 1,
                username: "user1",
                nameSurname: "user1",
                email : "user1@gmail.com",
                password: "pass1",
                type: "user",
                address: "Rua joão de Deus, Vila Nova de Gaia",
                postalCode: "4400-182",
                city: "Porto",
                birthDate: "12-01-2002"
            },
            {
                id: 2,
                username: "user2",
                nameSurname: "user2",
                email : "user2@gmail.com",
                password: "pass2",
                type: "user",
                address: "Rua joão de Deus, Vila Nova de Gaia",
                postalCode: "4400-182",
                city: "Porto",
                birthDate: "12-01-2002"
            },
            {
                id: 3,
                username: "Tomás",
                nameSurname: "Tomás Borges",
                email: "tomas@gmail.com",
                password: "pass2",
                type: "admin",
                address: "Rua joão de Deus, Vila Nova de Gaia",
                postalCode: "4400-182",
                city: "Porto",
                birthDate: "12-01-2002"
            },
            {
                id: 4,
                username: "Fábio",
                nameSurname: "Fábio Fernandes",
                email: "fabio@gmail.com",
                password: "fernandes",
                type: "admin",
                address: "Rua joão de Deus, Vila Nova de Gaia",
                postalCode: "4400-182",
                city: "Porto",
                birthDate: "12-01-2002"

            }

        ];

        // Load the fixtures in case there is no data in the local storage 
        // if (!localStorage.games) {
            // localStorage.setItem('games', JSON.stringify(games));
        // }
        if (!localStorage.users) {
            localStorage.setItem("users", JSON.stringify(users));
        }
    }
}

new App();