const fs = require('fs');

// Carega as bibliotecas utilziadas
const { response } = require('express');
var express = require('express');
var session = require("express-session");
const bodyParser = require('body-parser');
const { range } = require('express/lib/request');

const port = 4001;

var ses;

//prepara as conigurações do app
var app = express();
app.use(session({
    secret: "klausFiscal",
    resave: false,
    saveUninitialized: false

}));


//configurando o body parser para interpretar requests mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Informa que usaremos a EJS engine
app.set('view engine', 'ejs');

// index page - Tela de cadastro de Usuário
app.get('/', function (req, res) {

    res.render('./pages/jogo');

});

app.get('/envio/:id', async function (req, res) {
    //Le a pasta de arquivos
    const json = await JSON.parse(fs.readFileSync('finais.json', 'utf-8'));
    const finais = json.finais;

    id = req.params.id;
    camp = await verificaCampeao(id, res);

    if (camp != "fica") {
        req.params.vitorioso = camp;
        fim(req, res, finais);
        return 0;
    }


    //Inicio de vetor
    let t = "{\"finais\":[";

    //variaveis com os valores mais viaveis e os mais inviaveis
    var viavel = [];
    var inviavel = [];

    //Minimo de rating que queremos 
    var minimoAceitavel = 50;

    var i = "";
    var p = "";

    //Procura uma Vitoria imediata no jogo antes de jogar
    var achou = procuraVitoria(id, finais, res);

    //Caso tenha achado, ja ira ter feito na função, 'procuraVitoria', então só precisa finalizar a função
    if (achou) {
        console.log("Achou uma Vitoria");
        return;
    } else { //Caso não tenha achado 

        //Procura uma derrota imediata para que possa impedir 
        achou = procuraDerrota(id, finais, res);

        //Caso tenha achado, ja ira ter impedido
        if (achou) {
            console.log("Achou uma Derrota");
            return;
        }
    }

    //Roda o vetor atual de jogadas ja registrada q temos
    for (let b = 0; b < finais.length; b++) {
        t += JSON.stringify(finais[b]);

        /*Verifica se 
        finais não esta vazio
        existe uma opção ja registrada com uma proxima jogada para agora
        se ela inicia com a sequencia q queremos
        e se esta na margem aceitavel que queremos, seja maior ou menor
        */
        if (finais.length > 0 && finais[b].a.length == (id.length) + 1 && finais[b].a.indexOf(id) == 0 && finais[b].w < minimoAceitavel) {
            //Caso menor que o aceitavel entra em inviavel
            inviavel[inviavel.length] = finais[b];
        } else if (finais.length > 0 && finais[b].a.length == (id.length) + 1 && finais[b].a.indexOf(id) == 0 && finais[b].w >= minimoAceitavel) {
            //Caso maior que o aceitavel entra em viavel
            viavel[viavel.length] = finais[b];
        }

        //verifica se ja terminamos o vetor de finais
        if (b == finais.length - 1) {

            verificaCampeao(id + "" + finais[b].a[finais[b].a.length - 1], res);

            if (viavel.length > 0) {//Verifica se existe opção VIÁVEL

                //prepara uma variavel aux para verificar qual é a opção mais viavel
                maisViavel = { w: 0 };

                //roda todo o vetor de viaveis
                for (let b = 0; b < viavel.length; b++) {

                    //Caso seja mais viavel que a atual, inverte
                    if (viavel[b].w > maisViavel.w) {
                        maisViavel = viavel[b];
                    }
                }

                console.log("Jogada mais viavel:")
                console.log(maisViavel);

                //Envia a com mais rating
                res.json({ resp: maisViavel.a.substr(maisViavel.a.length - 1) });
            } else if (inviavel.length > 0 && (9 - id.length - inviavel.length) > 0) { //Verifica se existe uma opção INVIÁVEL. Apos o && estou tentando verificar se todas estão consideraas como inviavel

                //Aux para guardar as opções que n vale a pena
                naoFazer = "";

                //Roda o vetor de jogas inviaveis
                for (let b = 0; b < inviavel.length; b++) {
                    //Adiciona a jogada as que n se deve fazer
                    naoFazer += inviavel[b].a.substr(inviavel[b].a.length - 1);
                }


                //Cria uma variavel para guardar o resultado aleatorio
                let rand;
                var vezes = 0;

                //Laço para procurar uma jogada pra fazer enquanto ela for diferente de algo ja jogado ou algo q nã ovale a pena
                do {
                    vezes++
                    //prepara o rand para retornar um numero de 0 a 8 (que são as opções do campo do jogo da velha)
                    min = Math.ceil(0);
                    max = Math.floor(9);
                    rand = Math.floor(Math.random() * (max - min)) + min;
                } while (id.indexOf(rand) != -1 || naoFazer.indexOf(rand) != -1)

                console.log(rand);


                //Adiciona a jogada Decidida agora ao vetor
                t += ",{\"a\":" + JSON.stringify(id + rand) + ", \"w\":" + (minimoAceitavel + 10) + "}";

                //Fecha o vetor
                t += "]}";

                //Cria o novo file
                fs.writeFileSync("finais.json", "" + t);

                console.log("Quando sabemos de jogadas inviaveis pra situação:");
                console.log(t);

                res.json({ resp: rand });
                break;

            } else { //Caso seja uma posição nova ou se todas as jogadas possiveis forem consideradas inviaveis
                //Inicia o aux randomico
                let rand;

                //Laço para procurar uma jogada ainda não feita
                do {
                    //prepara o rand para retornar um numero de 0 a 8 (que são as opções do campo do jogo da velha)
                    min = Math.ceil(0);
                    max = Math.floor(9);
                    rand = Math.floor(Math.random() * (max - min)) + min;
                } while (id.indexOf(rand) != -1)


                //Adiciona a jogada Decidida agora ao vetor
                t += ",{\"a\":" + JSON.stringify(id + rand) + ", \"w\":" + 10 + "}";
                7
                //Fecha o vetor
                t += "]}";

                console.log("Quando não temos conhecimento sobre a posição atual.");
                console.log(t);
                //Cria o novo file
                fs.writeFileSync("finais.json", "" + t);

                res.json({ resp: rand });
                break;
            }
        } else {
            t += ",";
        }
    }
});


// Campeão
app.get('/fim/:id/:vitorioso', function (req, res) {

    const json = JSON.parse(fs.readFileSync('finais.json', 'utf-8'));
    const finais = json.finais;

    fim(req, res, finais);

});

app.listen(port);
console.log('Já ligado a porta '+ port);

function fim(req, res, finais) {
    id = req.params.id;
    vit = req.params.vitorioso;

    let t = "{\"finais\":[";

    console.log(vit);

    for (let a = 0; a < finais.length; a++) {


        if (vit == "O") {
            if (finais[a].a == id.substr(0, 2)) {
                finais[a].w += 50;
            }
            if (finais[a].a == id.substr(0, 4)) {
                finais[a].w += 15;
            }

            if (finais[a].a == id.substr(0, 6)) {
                finais[a].w += 20;
            }

            if (finais[a].a == id) {
                finais[a].w += 100;
            }

        }

        if (vit == "X") {
            if (finais[a].a == id.substr(0, 2)) {
                finais[a].w -= 5;
            }

            if (finais[a].a == id.substr(0, 4)) {
                finais[a].w -= 10;
            }

            if (finais[a].a == id.substr(0, 6)) {
                finais[a].w -= 15;
            }

            if (finais[a].a == id) {
                finais[a].w = 0;
            }

        }

        if (vit == "E") {
            if (finais[a].a == id.substr(0, 2)) {
                finais[a].w += 50;
            }
            if (finais[a].a == id.substr(0, 4)) {
                finais[a].w += 10;
            }

            if (finais[a].a == id.substr(0, 6)) {
                finais[a].w += 15;
            }

            if (finais[a].a == id) {
                finais[a].w += 20;
            }

        }


        t += JSON.stringify(finais[a]);

        if (a < finais.length - 1) {
            t += ",";
        }

    }
    t += "]}";

    console.log("Estamos no fim:\n" + t);

    fs.writeFileSync("finais.json", "" + t);

    res.json({ resp: vit });
}


async function verificaCampeao(total, res) {

    let i = "";
    let p = "";

    let vet = "";

    for (let a = 0; a < total.length; a++) {
        if (a % 2 == 0) {
            i += total[a];
        } else {
            p += total[a];
        }
    }

    //Verifica se o X ganhou por linha
    if (i.indexOf("0") >= 0 && i.indexOf("1") >= 0 && i.indexOf("2") >= 0) {
        vet = "X";
    }
    if (i.indexOf("3") >= 0 && i.indexOf("4") >= 0 && i.indexOf("5") >= 0) {
        vet = "X";
    }
    if (i.indexOf("6") >= 0 && i.indexOf("7") >= 0 && i.indexOf("8") >= 0) {
        vet = "X";
    }

    //Verifica se o X ganhou por Coluna
    if (i.indexOf("0") >= 0 && i.indexOf("3") >= 0 && i.indexOf("6") >= 0) {
        vet = "X";
    }
    if (i.indexOf("1") >= 0 && i.indexOf("4") >= 0 && i.indexOf("7") >= 0) {
        vet = "X";
    }
    if (i.indexOf("2") >= 0 && i.indexOf("5") >= 0 && i.indexOf("8") >= 0) {
        vet = "X";
    }

    //Verifica se o X ganhou por diagonal
    if (i.indexOf("0") >= 0 && i.indexOf("4") >= 0 && i.indexOf("8") >= 0) {
        vet = "X";
    } if (i.indexOf("2") >= 0 && i.indexOf("4") >= 0 && i.indexOf("6") >= 0) {
        vet = "X";
    }

    /*
    *================================================================
    */

    //Verifica se o O ganhou por linha
    if (p.indexOf("0") >= 0 && p.indexOf("1") >= 0 && p.indexOf("2") >= 0) {
        vet = "O";
    }
    if (p.indexOf("3") >= 0 && p.indexOf("4") >= 0 && p.indexOf("5") >= 0) {
        vet = "O";
    }
    if (p.indexOf("6") >= 0 && p.indexOf("7") >= 0 && p.indexOf("8") >= 0) {
        vet = "O";
    }

    //Verifica se o O ganhou por Coluna
    if (p.indexOf("0") >= 0 && p.indexOf("3") >= 0 && p.indexOf("6") >= 0) {
        vet = "O";
    }
    if (p.indexOf("1") >= 0 && p.indexOf("4") >= 0 && p.indexOf("7") >= 0) {
        vet = "O";
    }
    if (p.indexOf("2") >= 0 && p.indexOf("5") >= 0 && p.indexOf("8") >= 0) {
        vet = "O";
    }

    //Verifica se o O ganhou por diagonal
    if (p.indexOf("0") >= 0 && p.indexOf("4") >= 0 && p.indexOf("8") >= 0) {
        vet = "O";
    } if (p.indexOf("2") >= 0 && p.indexOf("4") >= 0 && p.indexOf("6") >= 0) {
        vet = "O";
    }

    if (vet === "") {
        return "fica";
    } else {
        return vet;
    }



}

function procuraVitoria(id, finais, res) {
    var i = "";
    var p = "";
    var retorno = "";

    for (let a = 0; a < id.length; a++) {
        if (a % 2 == 0) {
            i += id[a];
        } else {
            p += id[a];
        }
    }

    //Ganhando na primeira coluna (036)
    if (p.indexOf("0") >= 0 && p.indexOf("3") >= 0 && i.indexOf("6") < 0) {
        retorno = 6;
    } if (p.indexOf("0") >= 0 && i.indexOf("3") < 0 && p.indexOf("6") >= 0) {
        retorno = 3;
    } if (i.indexOf("0") < 0 && p.indexOf("3") >= 0 && p.indexOf("6") >= 0) {
        retorno = 0;
    }

    //Ganhando na segunda colunas (147)
    if (p.indexOf("1") >= 0 && p.indexOf("4") >= 0 && i.indexOf("7") < 0) {
        retorno = 7;
    }
    if (p.indexOf("1") >= 0 && i.indexOf("4") < 0 && p.indexOf("7") >= 0) {
        retorno = 4;
    }
    if (i.indexOf("1") < 0 && p.indexOf("4") >= 0 && p.indexOf("7") >= 0) {
        retorno = 1;
    }

    //Ganhando na terceira coluna (258)
    if (p.indexOf("2") >= 0 && p.indexOf("5") >= 0 && i.indexOf("8") < 0) {
        retorno = 8;
    }
    if (p.indexOf("2") >= 0 && i.indexOf("5") < 0 && p.indexOf("8") >= 0) {
        retorno = 5;
    }
    if (i.indexOf("2") < 0 && p.indexOf("5") >= 0 && p.indexOf("8") >= 0) {
        retorno = 2;
    }


    //Ganhando na primeira linha (012)
    if (p.indexOf("0") >= 0 && p.indexOf("1") >= 0 && i.indexOf("2") < 0) {
        retorno = 2;
    }
    if (p.indexOf("0") >= 0 && i.indexOf("1") < 0 && p.indexOf("2") >= 0) {
        retorno = 1;
    } if (i.indexOf("0") < 0 && p.indexOf("1") >= 0 && p.indexOf("2") >= 0) {
        retorno = 0;
    }

    //Ganhando na Segunda linha (345)
    if (p.indexOf("3") >= 0 && p.indexOf("4") >= 0 && i.indexOf("5") < 0) {
        retorno = 5;
    }
    if (p.indexOf("3") >= 0 && i.indexOf("4") < 0 && p.indexOf("5") >= 0) {
        retorno = 4;
    } if (i.indexOf("3") < 0 && p.indexOf("4") >= 0 && p.indexOf("5") >= 0) {
        retorno = 3;
    }

    //Ganhando na Terceira linha (678)
    if (p.indexOf("6") >= 0 && p.indexOf("7") >= 0 && i.indexOf("8") < 0) {
        retorno = 8;
    }
    if (p.indexOf("6") >= 0 && i.indexOf("7") < 0 && p.indexOf("8") >= 0) {
        retorno = 7;
    } if (i.indexOf("6") < 0 && p.indexOf("7") >= 0 && p.indexOf("8") >= 0) {
        retorno = 6;
    }


    //Ganhando na diagonal do 0 ao 8   (048)
    if (p.indexOf("0") >= 0 && p.indexOf("4") >= 0 && i.indexOf("8") < 0) {
        retorno = 8;
    } if (p.indexOf("0") >= 0 && p.indexOf("8") >= 0 && i.indexOf("4") < 0) {
        retorno = 4;
    } if (p.indexOf("4") >= 0 && p.indexOf("8") >= 0 && i.indexOf("0") < 0) {
        retorno = 0;
    }

    //Ganhando na diagonal do 2 ao 6   (246)
    if (p.indexOf("2") >= 0 && p.indexOf("4") >= 0 && i.indexOf("6") < 0) {
        retorno = 6;
    } if (p.indexOf("2") >= 0 && i.indexOf("4") < 0 && p.indexOf("6") >= 0) {
        retorno = 4;
    } if (i.indexOf("2") < 0 && p.indexOf("4") >= 0 && p.indexOf("6") >= 0) {
        retorno = 2;
    }

    if (retorno === "") {
        return false;
    } else {
        res.json({ resp: retorno });
        return true;
    }
}

function procuraDerrota(id, finais, res) {
    var i = "";
    var p = "";
    var retorno = "";

    for (let a = 0; a < id.length; a++) {
        if (a % 2 == 0) {
            p += id[a];
        } else {
            i += id[a];
        }
    }

    if (p.indexOf("4") >= 0 && p.indexOf("8") >= 0 && i.indexOf("0") < 0) {
        console.log("HEHE BOY");
    }

    //Ganhando na primeira coluna (036)
    if (p.indexOf("0") >= 0 && p.indexOf("3") >= 0 && i.indexOf("6") < 0) {
        retorno = 6;
    } if (p.indexOf("0") >= 0 && i.indexOf("3") < 0 && p.indexOf("6") >= 0) {
        retorno = 3;
    } if (i.indexOf("0") < 0 && p.indexOf("3") >= 0 && p.indexOf("6") >= 0) {
        retorno = 0;
    }

    //Ganhando na segunda colunas (147)
    if (p.indexOf("1") >= 0 && p.indexOf("4") >= 0 && i.indexOf("7") < 0) {
        retorno = 7;
    }
    if (p.indexOf("1") >= 0 && i.indexOf("4") < 0 && p.indexOf("7") >= 0) {
        retorno = 4;
    }
    if (i.indexOf("1") < 0 && p.indexOf("4") >= 0 && p.indexOf("7") >= 0) {
        retorno = 1;
    }

    //Ganhando na terceira coluna (258)
    if (p.indexOf("2") >= 0 && p.indexOf("5") >= 0 && i.indexOf("8") < 0) {
        retorno = 8;
    }
    if (p.indexOf("2") >= 0 && i.indexOf("5") < 0 && p.indexOf("8") >= 0) {
        retorno = 5;
    }
    if (i.indexOf("2") < 0 && p.indexOf("5") >= 0 && p.indexOf("8") >= 0) {
        retorno = 2;
    }


    //Ganhando na primeira linha (012)
    if (p.indexOf("0") >= 0 && p.indexOf("1") >= 0 && i.indexOf("2") < 0) {
        retorno = 2;
    }
    if (p.indexOf("0") >= 0 && i.indexOf("1") < 0 && p.indexOf("2") >= 0) {
        retorno = 1;
    } if (i.indexOf("0") < 0 && p.indexOf("1") >= 0 && p.indexOf("2") >= 0) {
        retorno = 0;
    }

    //Ganhando na Segunda linha (345)
    if (p.indexOf("3") >= 0 && p.indexOf("4") >= 0 && i.indexOf("5") < 0) {
        retorno = 5;
    }
    if (p.indexOf("3") >= 0 && i.indexOf("4") < 0 && p.indexOf("5") >= 0) {
        retorno = 4;
    } if (i.indexOf("3") < 0 && p.indexOf("4") >= 0 && p.indexOf("5") >= 0) {
        retorno = 3;
    }

    //Ganhando na Terceira linha (678)
    if (p.indexOf("6") >= 0 && p.indexOf("7") >= 0 && i.indexOf("8") < 0) {
        retorno = 8;
    }
    if (p.indexOf("6") >= 0 && i.indexOf("7") < 0 && p.indexOf("8") >= 0) {
        retorno = 7;
    } if (i.indexOf("6") < 0 && p.indexOf("7") >= 0 && p.indexOf("8") >= 0) {
        retorno = 6;
    }


    //Ganhando na diagonal do 0 ao 8   (048)
    if (p.indexOf("0") >= 0 && p.indexOf("4") >= 0 && i.indexOf("8") < 0) {
        retorno = 8;
    } if (p.indexOf("0") >= 0 && p.indexOf("8") >= 0 && i.indexOf("4") < 0) {
        retorno = 4;
    } if (p.indexOf("4") >= 0 && p.indexOf("8") >= 0 && i.indexOf("0") < 0) {
        retorno = 0;
    }

    //Ganhando na diagonal do 2 ao 6   (246)
    if (p.indexOf("2") >= 0 && p.indexOf("4") >= 0 && i.indexOf("6") < 0) {
        retorno = 6;
    } if (p.indexOf("2") >= 0 && i.indexOf("4") < 0 && p.indexOf("6") >= 0) {
        retorno = 4;
    } if (i.indexOf("2") < 0 && p.indexOf("4") >= 0 && p.indexOf("6") >= 0) {
        retorno = 2;
    }

    if (retorno === "") {
        return false;
    } else {
        res.json({ resp: retorno });
        return true;
    }
}

module.exports = app