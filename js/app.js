import navBarView from './views/navBarView.js';
import AdminView from './views/adminView.js';
import minhaContaView from './views/minhaContaView.js';
import quizGamesView from './views/quizGamesView.js';
import infoUtilView from './views/infoUtilView.js';
import sobreView from './views/sobreView.js';

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
            "sobre": [navBarView, sobreView],
            "infoUtil": [navBarView, infoUtilView],
            "link":[navBarView],
            "register": [navBarView],
            "top10": [top10View],
            "login": [navBarView],
            "minhaConta":[minhaContaView,navBarView],
            "dadosAcesso":[minhaContaView, navBarView],
            "game": [navBarView],
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
                birthDate: "12-01-2002",
                points: 500,
                photo: ""
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
                birthDate: "12-01-2002",
                points: 150,
                photo: ""
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
                birthDate: "12-01-2002",
                points: 1000,
                photo: ""
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
                birthDate: "12-01-2002",
                points: 350,
                photo: ""
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
                birthDate: "12-01-2002",
                points: 200,
                photo: ""

            }

        ];
        
        const questions = [
            {
              question: "Qual é o tempo recomendado para lavar as mãos?",
              answers: [
                { text: "20 segundos", correct: true },
                { text: "15 segundos", correct: false },
                { text: "10 segundos", correct: false }
              ]
            },
            {
              question: 'De que forma se transmite a COVID-19?',
              answers: [
                { text: 'Utilizando máscara nova', correct: false },
                { text: 'Com superfícies, objetos e pessoas contaminadas', correct: true },
                { text: 'Desinfetando as mãos', correct: false }
              ]
            },
            {
              question: 'Durante quantas horas a utilização da mesma máscara descartável é segura?',
              answers: [
                { text: '2 horas', correct: false },
                { text: '8 horas', correct: false },
                { text: '4 horas', correct: true }
              ]
            },
            {
              question: 'Qual a distância recomendada para se permanecer perto de outras pessoas?',
              answers: [
                { text: '1 metro', correct: false },
                { text: '1,5 metros', correct: true },
                { text: '0,5 metros', correct: false }
              ]
            },
            {
              question: 'Qual o período de incubação do vírus?',
              answers: [
                { text: '1 a 20 dias', correct: false },
                { text: '1 a 7 dias', correct: false },
                { text: '1 a 14 dias', correct: true },
              ]
            },
            {
              question: 'O que podes fazer durante o período de isolamento?',
              answers: [
                { text: 'Utilizar a divisão da casa onde estás isolado', correct: true },
                { text: 'Sair de casa, estar a conviver com os amigos, estar junto com as outras pessoas da família', correct: false },
                { text: 'Ter visitas de amigos e familiares', correct: false },
              ]
            },
            {
              question: 'Que medidas devo tomar se tiver sintomas que possam estar associados a COVID-19?',
              answers: [
                { text: 'Ir imediatamente ao hospital, pois pode ser grave', correct: false },
                { text: 'Ligar para o número de telefone SNS 24 para evitar o contacto pessoal e obter informações mais concretas sobre como devo proceder', correct: true },
                { text: 'Permanecer em casa sem qualquer avaliação médica', correct: false },
              ]
            },
            {
              question: 'Qual a sequência correta de desinfeção das mãos?',
              answers: [
                { text: 'Molhar as mãos; Aplicar sabão que cobre toda a superfície das mãos; Esfregar as palmas das mãos e entrelaçar os dedos; Esfregar os polegares, as costas das mãos e os pulsos;', correct: true },
                { text: 'Enxaguar as mãos com água; Secar com um toalhete descartável', correct: false },
                { text: 'Lavar as mãos só com água', correct: false },
              ]
            },
            {
              question: 'Como se deve colocar a máscara?',
              answers: [
                { text: 'Lavar as mãos e depois colocar a máscara', correct: false },
                { text: 'Desinfetar as mãos com álcool gel; Segurar na face da máscara e depois pôr na posição correta', correct: false },
                { text: 'Lavar as mãos com água e sabão ou desinfetar com álcool gel; Colocar a máscara na posição correta; Segurar a máscara pelos elásticos e adaptar à orelha; Ajustar justo ao nariz e queixo sem tocar na face da máscara', correct: true },
              ]
            },
            {
              question: 'O que podes fazer durante o período de isolamento?',
              answers: [
                { text: 'Utilizar a divisão da casa onde estás isolado', correct: true },
                { text: 'Sair de casa, estar a conviver com os amigos, estar junto com as outras pessoas da família', correct: false },
                { text: 'Ter visitas de amigos e familiares', correct: false },
              ]
            },
          ];

        const blockedUsers = [];
        const likeBlocker = [];
        const cardsLikeCount = [
            {1:0},
            {2:0},
            {3:0}
        ];
        const modalsAndItsComments = [
            {modal:1},
            {modal:2},
            {modal:3}
        ];
        const opinions = []
        const userPointsQuiz = [
            {email:"user1@gmail.com",
            points:100
            }

        ]
        
        // Load the fixtures in case there is no data in the local storage 
        
        if (!localStorage.users) {
            localStorage.setItem("users", JSON.stringify(users));
        }

        if (!localStorage.blockedUsers) {
            localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
        }

        if (!localStorage.likeBlocker) {
            localStorage.setItem('likeBlocker', JSON.stringify(likeBlocker));
        }

        if (!localStorage.cardsLikeCount) {
            localStorage.setItem('cardsLikeCount', JSON.stringify(cardsLikeCount));
        }

        if (!localStorage.modalsAndItsComments) {
            localStorage.setItem('modalsAndItsComments', JSON.stringify(modalsAndItsComments));
        }

        if (!localStorage.avatars) {
            localStorage.setItem('avatars', JSON.stringify(avatars));
        }


        if (!localStorage.opinions) {
            localStorage.setItem('opinions', JSON.stringify(opinions));
        }

        if (!localStorage.questions) {
            localStorage.setItem('quizQuestionsAndAnswers', JSON.stringify(questions));
        }

        if (!localStorage.userPointsQuiz) {
            localStorage.setItem('userPointsQuiz', JSON.stringify(userPointsQuiz));
        }
    }
}

new App();
