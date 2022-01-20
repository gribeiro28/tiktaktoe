//Inicia as bibliotercas que usaremos
const fs = require("fs");
var xlsx = require('node-xlsx');


let json = fs.readFileSync("dbConversoes/tabelaCompleta.json", "utf-8");
json = JSON.parse(json);
for (let a = 0; a < json.tabela.length; a++) {

    for (let b = a + 1; b < json.tabela.length; b++) {

        if (json.tabela[a] == json.tabela[b]) {
            console.log(JSON.stringify(json.tabela[a]));
        }
    }
}

