const fs = require('fs');

// Carega as bibliotecas utilziadas
const { response } = require('express');
var express = require('express');
var session = require("express-session");

var ses;

//prepara as conigurações do app
var app = express();
app.use(session({
    secret: "klausFiscal",
    resave: false,
    saveUninitialized: false

}));

// Informa que usaremos a EJS engine
app.set('view engine', 'ejs');

// index page - Tela de cadastro de Usuário
app.get('/', function (req, res) {

    res.render('pages/about');

});

app.get('/envio/:id', function (req, res) {
    //Le a pasta de arquivos
    const json = JSON.parse(fs.readFileSync('inicio.json', 'utf-8'));
    const finais = json.finais;

    id = req.params.id;

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

    //Caso tenha achado, ja ira ter feito na função, 'procuraVitoria', então só rpecisa finalizar a função
    if (achou) {
        return 0;
    } else { //Caso não tenha achado 

        //Procura uma derrota imediata para que possa impedir 
        achou = procuraDerrota(id, finais, res);
        
        //Caso tenha achado, ja ira ter impedido
        if (achou) {
            return 0;
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
            verificaCampeao(id + "" + finais[b].a[finais[b].a.length - 1]);
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

                //Envia a com mais rating
                res.json({ resp: maisViavel.a.substr(maisViavel.a.length - 1) });
            } else if (inviavel.length > 0) { //Verifica se existe uma opção INVIÁVEL

                //Aux para guardar as opções que n vale a pena
                naoFazer = "";

                console.log("Estamos aq");


                //Roda o vetor de jogas inviaveis
                for (let b = 0; b < inviavel.length; b++) {
                    //Adiciona a jogada as que n se deve fazer
                    naoFazer += inviavel[b].a.substr(inviavel[b].a.length - 1);
                }

                console.log(id);
                console.log(naoFazer);

                //Cria uma variavel para guardar o resultado aleatorio
                let rand;
                var max = 0;

                //Laço para procurar uma jogada pra fazer enquanto ela for diferente de algo ja jogado ou algo q nã ovale a pena
                do {
                    //prepara o rand para retornar um numero de 0 a 8 (que são as opções do campo do jogo da velha)
                    min = Math.ceil(0);
                    max = Math.floor(9);
                    rand = Math.floor(Math.random() * (max - min)) + min;

                    /*if (max == 10) {
                        break;
                    }
                    max++;*/
                } while (id.indexOf(rand) != -1 || naoFazer.indexOf(rand) != -1)
                //Chegou aq
                console.log(rand);

                //Adiciona a jogada Decidida agora ao vetor
                t += ",{\"a\":" + JSON.stringify(id + rand) + ", \"w\":" + minimoAceitavel + "}";

                //Fecha o vetor
                t += "]}";

                //Cria o novo file
                fs.writeFileSync("inicio.json", "" + t);

                res.json({ resp: rand });
                break;

            } else { //Casoseja uma posição nova
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
                t += ",{\"a\":" + JSON.stringify(id + rand) + ", \"w\":" + minimoAceitavel + "}";

                //Fecha o vetor
                t += "]}";

                //Cria o novo file
                fs.writeFileSync("inicio.json", "" + t);

                res.json({ resp: rand });
                break;
            }
        } else {
            t += ",";
        }
    }
});

// Recebido um novo turno do jogador
app.get('/envioa/:id', function (req, res) {

    //Le a pasta de arquivos
    const json = JSON.parse(fs.readFileSync('inicio.json', 'utf-8'));
    const finais = json.finais;

    //recebe como esta atualmente o jogo
    id = req.params.id;

    //Inicio de vetor
    let t = "{\"finais\":[";

    var inviavel = [];

    var minimoAceitavel = 50;

    do {

        //For q roda o vetor de jogadas ja feita
        for (let b = 0; b < finais.length; b++) {
            //Re aloca o vetor
            t += JSON.stringify(finais[b]);
            t += ",";

            //Verifica :
            //se for uma jogada a mais do q a q estamos agora ou seja, o proximo turno 
            //se existe uma jogada ja com a sequencia q estamos 
            //se ela tem uma boa winrate
            if (finais.length > 0 && finais[b].a.length == (id.length) + 1 && finais[b].a.indexOf(id) == 0 && finais[b].w >= /*50*/minimoAceitavel) {

                //console.log("RETURN " + finais[b].a[finais[b].a.length - 1]);

                verificaCampeao(id + "" + finais[b].a[finais[b].a.length - 1]);
                res.json({ resp: finais[b].a[finais[b].a.length - 1] });
                break;
            } else if (finais.length > 0 && finais[b].a.length == (id.length) + 1 && finais[b].a.indexOf(id) == 0 && finais[b].w <= 30) {
                inviavel[inviavel.length] = finais[b].a;
            } else if (b == finais.length - 1 && id.length < 9) {
                let rand;

                let viavel = 0;
                //CONTINUA DAQ O CORNO MANSO DO KRL
                do {
                    min = Math.ceil(0);
                    max = Math.floor(9);
                    rand = Math.floor(Math.random() * (max - min)) + min;
                    if (viavel < (9 - id.length)) {
                        for (let a = 0; a < inviavel.length; a++) {
                            if (inviavel[a] == id + "" + rand) {
                                viavel += 1;
                                inviavel.splice(a + 1, 1);
                            }
                        }
                    } else {
                        viavel = 0;
                    }
                    finais[finais.length] = id + "" + rand;
                } while (id.indexOf(rand) != -1 && viavel == 0)


                //t += ",";
                t += "{\"a\":" + JSON.stringify(id + rand) + ",\"w\":" + 20 + "}";

                //t = (finais[0]);
                t += "]}";
                fs.writeFileSync("inicio.json", "" + t);

                verificaCampeao(id + "" + finais[b].a[finais[b].a.length - 1]);

                res.json({ resp: rand });
                break;

            }
        }
        minimoAceitavel -= 10;
    } while (minimoAceitavel > -100)

    console.log(req.params.id);
});

// Campeão
app.get('/fim/:id/:vitorioso', function (req, res) {

    const json = JSON.parse(fs.readFileSync('inicio.json', 'utf-8'));
    const finais = json.finais;

    fim(req, res, finais);

});

app.listen(4001);
console.log('4001 is the magic port');

function fim(req, res, finais) {
    id = req.params.id;
    vit = req.params.vitorioso;

    let t = "{\"finais\":[";

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
                console.log(id);
                //finais[a].w -= 5;
            }

            if (finais[a].a == id.substr(0, 4)) {
                //finais[a].w -= 10;
            }

            if (finais[a].a == id.substr(0, 6)) {
                //finais[a].w -= 15;
            }

            if (finais[a].a == id) {
                //finais[a].w = 0;
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
    fs.writeFileSync("inicio.json", "" +/* JSON.stringify({ "finais": [t] })*/ t);

    res.json({ resp: 0 });
}


async function verificaCampeao(total) {

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


    if (p.indexOf("0") >= 0 && p.indexOf("1") >= 0 && i.indexOf("2") < 0) {
        retorno = 2;
    } else if (p.indexOf("3") >= 0 && p.indexOf("4") >= 0 && i.indexOf("5") < 0) {
        retorno = 5;
    } else if (p.indexOf("6") >= 0 && p.indexOf("7") >= 0 && i.indexOf("8") < 0) {
        retorno = 8;
    } else if (p.indexOf("0") >= 0 && p.indexOf("3") >= 0 && i.indexOf("6") < 0) {
        retorno = 6;
    } else if (p.indexOf("1") >= 0 && p.indexOf("4") >= 0 && i.indexOf("7") < 0) {
        retorno = 7;
    } else if (p.indexOf("2") >= 0 && p.indexOf("5") >= 0 && i.indexOf("8") < 0) {
        retorno = 8;
    } else if (p.indexOf("0") >= 0 && p.indexOf("4") >= 0 && i.indexOf("8") < 0) {
        retorno = 8;
    } else if (p.indexOf("2") >= 0 && p.indexOf("4") >= 0 && i.indexOf("6") < 0) {
        retorno = 6;
    }

    if (retorno == "") {
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


    if (p.indexOf("0") >= 0 && p.indexOf("1") >= 0 && i.indexOf("2") < 0) {
        retorno = 2;
    } else if (p.indexOf("3") >= 0 && p.indexOf("4") >= 0 && i.indexOf("5") < 0) {
        retorno = 5;
    } else if (p.indexOf("6") >= 0 && p.indexOf("7") >= 0 && i.indexOf("8") < 0) {
        retorno = 8;
    } else if (p.indexOf("0") >= 0 && p.indexOf("3") >= 0 && i.indexOf("6") < 0) {
        retorno = 6;
    } else if (p.indexOf("1") >= 0 && p.indexOf("4") >= 0 && i.indexOf("7") < 0) {
        retorno = 7;
    } else if (p.indexOf("2") >= 0 && p.indexOf("5") >= 0 && i.indexOf("8") < 0) {
        retorno = 8;
    } else if (p.indexOf("0") >= 0 && p.indexOf("4") >= 0 && i.indexOf("8") < 0) {
        retorno = 8;
    } else if (p.indexOf("2") >= 0 && p.indexOf("4") >= 0 && i.indexOf("6") < 0) {
        retorno = 6;
    }

    if (retorno == "") {
        return false;
    } else {
        res.json({ resp: retorno });
        return true;
    }

}


function zera() {

}