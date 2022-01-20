//Inicia as bibliotercas que usaremos
const fs = require("fs");
var xlsx = require('node-xlsx');

//Informa onde esta a pasta De-Para
var arquivoBase = "tabelasDePara/";

//Recebe os arquivos da pasta
var arquivos = fs.readdirSync(arquivoBase);


//Variavel onde sera guardado a tabela completa
var tabelaCompleta = [];

//Laço que verifica todos os arquivos da pasta De-Para
for (let a = 0; a < arquivos.length; a++) {

    //Verifica se ja existe a pasta para enviar o resultado
    try {
        fs.readdirSync("dbConversoes")
    } catch {
        //Caso não tenha, cria
        fs.mkdirSync("dbConversoes");
    }

    //Recebe os dado do excel com os dados
    var obj = xlsx.parse(arquivoBase + '/' + arquivos[a]);

    /*
        CAMPOS:
        CFOP Antigo : Coluna 1
        Descrição : Coluna 2
        CST Antigo :  Coluna 3
        Aplicação : Coluna 4
        
        CFOPNovo : 5
        CSTNovo : 6
        */

    //console.log(obj[0]);


    //Laço que passa por todas as linhas do excel
    for (let b = 1; b < obj[0].data.length; b++) {

        var c = obj[0].data[b];

        if (obj[0].data[b] != undefined && obj[0].data[b][1] !== undefined) {
            var jso = { desc: c[2].trim(), cfop: c[1], cst: c[3], aplicacao: c[4], cfopNovo: c[5], cstNovo: c[6] };
            tabelaCompleta[tabelaCompleta.length] = JSON.stringify(jso);
        }

    }


}

//tabelaCompleta = '[{"data":"' + new Date() + '","versao":"1.0.0","tabela":"' + tabelaCompleta + '"}]';
console.log(tabelaCompleta);


fs.writeFileSync("dbConversoes/tabelaCompleta.json", "{\"versao\":\"1.0.0\",\"tabela\":[" + tabelaCompleta + "]}");

//fs.writeFileSync("dbConevrsoes/tabelaCompleta.json",""+ tabelaCompleta);