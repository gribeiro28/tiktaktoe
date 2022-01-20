/*var jsonR = [];
var geo;
var dev;
var device;
var table;
var tableE;
var tr;
var dtSub;
var td = [];
var tb;
var testes = 0;
var min = 0;
var objG = {
    method: 'GET',
    'devideId': 3,
    'from': '2018-12-17T00:0:00Z',
    'to': '2018-12-28T23:59:59Z',
    //'to': '2018-12-17T23:59:59Z',
    'type': 'geofenceEnter',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': btoa('bgomes@people-team.com:People01'),
        'Origin': ''
    }
};
function getId(vet, id) {

    for (var l = 0; l < vet.length; l++) {

        if (vet[l].id == id) {
            return vet[l].name;
            break;
        }
    }

}

var time;
function subDate(dataS, dataE) {

    let tempo = new Date(dataS - dataE);
    tempo.setHours(tempo.getHours() + 3);
    return (tempo);
}

function getDiaSemana(dia) {

    switch (dia) {

        case 0:
            return "Domingo";
            break;
        case 1:
            return "Segunda-feira";
            break;
        case 2:
            return "Terça-feira";
            break;
        case 3:
            return "Quarta-feira";
            break;
        case 4:
            return "Quinta-feira";
            break;
        case 5:
            return "Sexta-feira";
            break;
        case 6:
            return "Sábado";
            break;
        default:
            return "NaN";
            break

    }

}

function options(vetor) {

    var select = document.getElementById("equipes");

    for (let k = 0; k < vetor.length; k++) {
        let option = document.createElement('option');
        option.textContent = vetor[k].name;
        option.value = vetor[k].id;
        option.id = vetor[k].id;
        select.append(option);
    }

}

function get(url) {

    fetch(url, objG).then(
            function (resp) {
                resp.json().then(function (json) {
                    jsonR = [];
                    for (let k = 0; k < json.length; k++) {

                        if (json[k].type == 'geofenceEnter' || json[k].type == 'geofenceExit') {
                            jsonR[jsonR.length] = json[k];
                        }

                    }


                    //preencheExcel();
                    preencheExcelC();
                });
            });


}


function geraExcel() {

    table = document.getElementById("table");
    tableE = document.getElementById('tblExport');
    th = document.createElement('thead');
    tr = document.createElement('tr');
    td[0] = document.createElement('th');
    td[1] = document.createElement('th');
    td[2] = document.createElement('th');
    td[3] = document.createElement('th');
    td[4] = document.createElement('th');
    td[5] = document.createElement('th');
    td[6] = document.createElement('th');
    td[7] = document.createElement('th');
    td[8] = document.createElement('th');
    td[9] = document.createElement('th');
    td[10] = document.createElement('th');
    td[11] = document.createElement('th');
    td[12] = document.createElement('th');


    td[0].textContent = "Dispositivo";
    td[1].textContent = "Centro de Custo";
    td[2].textContent = "Dia";
    td[3].textContent = "Dia da semana";
    td[4].textContent = "Entrada";
    td[5].textContent = "Saída do intervalo";
    td[6].textContent = "Horas";
    td[7].textContent = "Retorno do Intervalo";
    td[8].textContent = "Saída";
    td[9].textContent = "Horas";
    td[10].textContent = "Total Horas/Dia";
    td[11].textContent = "Mínimo Horas/Dia";
    td[12].textContent = "Extras/ Débitos";

    tr.append(td[0], td[1], td[2], td[3], td[4], td[5], td[6], td[7], td[8], td[9], td[10], td[11], td[12]);
    th.append(tr);
    tableE.append(th);
}

url = "http://138.197.104.196/api/reports/events/";
url += "?from=" + objG.from;
url += "&to=" + objG.to;
urlD = "http://138.197.104.196/api/devices";
urlG = "http://138.197.104.196/api/geofences/";
fetch(urlD, objG).then(
        function (resp) {
            resp.json().then(function (json) {
                device = json;


                options(device);


            });
        });

fetch(urlG, objG).then(
        function (resp) {
            resp.json().then(function (json) {
                geo = json;

            });
        });

function gera() {

    if (tb !== undefined && th !== undefined) {
        tb.remove();
        th.remove();
    }


    var disp = (document.getElementById('equipes').value);


    get(url + "&deviceId=" + disp);
    geraExcel();
}
*/