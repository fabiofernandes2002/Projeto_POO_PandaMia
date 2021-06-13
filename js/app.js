import navBarView from './views/navBarView.js';
import AdminView from './views/adminView.js';
import minhaContaView from './views/minhaContaView.js';
import quizGamesView from './views/quizGamesView.js';

// import adminView from './views/adminView.js'
// import userView from './views/userView.js'
// import gameView from './views/gameView.js'

class App {
    constructor() {
        // Mapeamento entre os ficheiros HTML e as views que estes vão carregar
        this.routes = {
            "": [navBarView],
            "userAdmin": [AdminView, navBarView],
            "index": [navBarView],
            "sobre": [navBarView],
            "infoUtil": [navBarView],
            "link":[navBarView],
            "register": [navBarView],
            "login": [navBarView],
            "minhaConta":[minhaContaView,navBarView],
            "dadosAcesso":[minhaContaView, navBarView],
            "game": [quizGamesView, navBarView],
            "quizzes":[quizGamesView],
            "quiz1Detalies":[quizGamesView]
            
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
                username: "user3",
                nameSurname: "user3",
                email : "user3@gmail.com",
                password: "pass3",
                type: "user",
                address: "Rua joão de Deus, Vila Nova de Gaia",
                postalCode: "4400-182",
                city: "Porto",
                birthDate: "12-01-2002"
            },
            {
                id: 4,
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
                id: 5,
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
        
        const quizGames = [
            {
                id: "1",
                name: "Quiz 1",
                description: "Será que consegues acertar? Testa o seu conhecimento sobre a COVID-19!"
            ,
            questions: [
                {
                    title: "Qual é o tempo recomendado para lavar as mãos?",
                    answers:["20 segundos","15 segundos", "10 segundos"], 
                    correctAnswer: 1
                    
                },
                {
                    title: "De que forma se transmite o COVID-19?",
                    answers:["Utilizando máscara nova","Com superfícies, objetos e pessoas contaminadas","Desinfetando as mãos"],
                    correctAnswer: 2
                },
                {
                    title: "Durante quantas horas a utilização da mesma máscara descartável é segura?",
                    answers: ["2 horas","8 horas","4 horas"],
                    correctAnswer: 3
                },
                {
                    title: "Qual a distância recomendada para se permanecer perto de outras pessoas?",
                    answers: ["1 metro","1,5 metros","0,5 metro"],
                    correctAnswer: 2 
                },
                {
                    title: "Qual o período de incubação do vírus?",
                    answers: ["1 a 20 dias"," 1 a 7 dias","1 a 14 dias"],
                    correctAnswer: 3 
                },
                {
                    title: "O que podes fazer durante o período de isolamento?",
                    answers: [
                        "Utilizar a divisão da casa onde estás isolado",
                        "Sair de casa, estar a conviver com os amigos, estar junto com as outras pessoas da família",
                        "Ter visitas de amigos e familiares"
                    ],
                    correctAnswer: 1 
                },
                {
                    title: "Que medidas devo tomar se tiver sintomas que possam estar associados a COVID-19?",
                    answers: [
                        "Ir imediatamente ao hospital, pois pode ser grave",
                        "Ligar para o número de telefone SNS 24 para evitar o contacto pessoal e obter informações mais concretas sobre como devo proceder",
                        "Permanecer em casa sem qualquer avaliação médica"
                    ],
                    correctAnswer: 2
                },
                {
                    title: "Qual a sequência correta de desinfeção das mãos?",
                    answers: [
                        "Molhar as mãos; Aplicar sabão que cobre toda a superfície das mãos; Esfregar as palmas das mãos e entrelaçar os dedos; Esfregar os polegares, as costas das mãos e os pulsos;",
                        "Enxaguar as mãos com água; Secar com um toalhete descartável",
                        "Lavar as mãos só com água"
                    ],
                    correctAnswer: 1 
                },
                {
                    title: "Como se deve colocar a máscara?",
                    answers: [
                        "Lavar as mãos e depois colocar a máscara",
                        "Desinfetar as mãos com álcool gel; Segurar na face da máscara e depois pôr na posição correta",
                        "Lavar as mãos com água e sabão ou desinfetar com álcool gel; Colocar a máscara na posição correta; Segurar a máscara pelos elásticos e adaptar à orelha; Ajustar justo ao nariz e queixo sem tocar na face da máscara"
                    ],
                    correctAnswer: 3 
                     
                }
            
            ]
        }
        ]
        const blockedUsers = [];
        
        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.quizGames) {
            localStorage.setItem('quizGames', JSON.stringify(quizGames));
        }
        
        if (!localStorage.users) {
            localStorage.setItem("users", JSON.stringify(users));
        }

        if (!localStorage.isBlocked) {
            localStorage.setItem('isBlocked', JSON.stringify(blockedUsers));
        }
        
    }
}

new App();
