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
                    respostaCerta: "20 segundos",
                    respostaErrada: "10 segundos",
                    respostaErrada: "15 segundos"
                },
                {
                    title: "De que forma se transmite o COVID-19?",
                    respostaCerta: "Com superfícies, objetos e pessoas contaminadas",
                    respostaErrada: "Desinfetando as mãos",
                    respostaErrada: "Utilizando máscara nova"
                },
                {
                    title: "Durante quantas horas a utilização da mesma máscara descartável é segura?",
                    respostaCerta: "4 horas",
                    respostaErrada: "2 horas",
                    respostaErrada: "8 horas"
                },
                {
                    title: "Qual a distância recomendada para se permanecer perto de outras pessoas?",
                    respostaCerta: "1,5 metros",
                    respostaErrada: "1 metro",
                    respostaErrada: "0,5 metro"
                },
                {
                    title: "Qual o período de incubação do vírus?",
                    respostaCerta: "1 a 14 dias",
                    respostaErrada: "1 a 20 dias",
                    respostaErrada: " 1 a 7 dias"
                },
                {
                    title: "O que podes fazer durante o período de isolamento?",
                    respostaCerta: "Utilizar a divisão da casa onde estás isolado",
                    respostaErrada: "Sair de casa, estar a conviver com os amigos, estar junto com as outras pessoas da família",
                    respostaErrada: "Ter visitas de amigos e familiares"
                },
                {
                    title: "Que medidas devo tomar se tiver sintomas que possam estar associados a COVID-19?",
                    respostaCerta: "Ligar para o número de telefone SNS 24 para evitar o contacto pessoal e obter informações mais concretas sobre como devo proceder",
                    respostaErrada: "Ir imediatamente ao hospital, pois pode ser grave",
                    respostaErrada: "Permanecer em casa sem qualquer avaliação médica"
                },
                {
                    title: "Qual a sequência correta de desinfeção das mãos?",
                    respostaCerta: "Molhar as mãos; Aplicar sabão que cobre toda a superfície das mãos; Esfregar as palmas das mãos e entrelaçar os dedos; Esfregar os polegares, as costas das mãos e os pulsos;",
                    respostaErrada: "Enxaguar as mãos com água; Secar com um toalhete descartável",
                    respostaErrada: "Lavar as mãos só com água"
                },
                {
                    title: "Como se deve colocar a máscara?",
                    respostaCerta: "Lavar as mãos com água e sabão ou desinfetar com álcool gel; Colocar a máscara na posição correta; Segurar a máscara pelos elásticos e adaptar à orelha; Ajustar justo ao nariz e queixo sem tocar na face da máscara",
                    respostaErrada: "Lavar as mãos e depois colocar a máscara",
                    respostaErrada: "Desinfetar as mãos com álcool gel; Segurar na face da máscara e depois pôr na posição correta"
                }
            
            ]
        }
        ]
        
        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.games) {
            localStorage.setItem('quizGames', JSON.stringify(quizGames));
        }
        
        if (!localStorage.users) {
            localStorage.setItem("users", JSON.stringify(users));
        }
        
    }
}

new App();