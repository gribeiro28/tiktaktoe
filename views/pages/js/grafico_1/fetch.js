var tcheison;
var inicial = document.getElementById("inicio");
var final = document.getElementById("fim");
var dtt = new Date();
var selectEquipe = document.getElementById("equipes");

final.value = lp(dtt.getFullYear(), 4) + "-" + lp(dtt.getUTCMonth() + 1, 2) + "-" + lp(dtt.getUTCDate(), 2);
dtt.setDate(dtt.getDate() - 15);
inicial.value = lp(dtt.getFullYear(), 4) + "-" + lp(dtt.getUTCMonth() + 1, 2) + "-" + lp(dtt.getUTCDate(), 2);
//Função feita para adicionar 0 a esquerda, baseado no segundo param

function lp(value, totalWidth, paddingChar) {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
}


function fetchSelect() {
    let mes = document.getElementById('mes').value;
    let url = "http://192.192.1.200:4000/select/" + ano.value + "&" + mes;
    fetch(url).then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                    var t = window.location.search.split("=");

                    geraCalendar();
                    geraBody(jsonQ);
                }
                );
            }
    );
}

function equipes() {
    fetch("http://192.192.1.200:4000/b/SELECT id,equipe FROM equipe  WHERE status=\"ativado\"").then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                    let equipes = [];
                    for (let k = 1; k < jsonQ.length; k++) {
                        equipes[k] = document.createElement('option');
                        equipes[k].textContent = jsonQ[k].equipe;
                        equipes[k].class = jsonQ[k].id;
                        equipes[k].value = k;
                        selectEquipe.append(equipes[k]);
                    }
                });
            });
}

function fetchPeriodo() {
    let inicio = document.getElementById("inicio").value;
    let fim = document.getElementById("fim").value;
    let util = "periodo";


    if (selectEquipe[selectEquipe.value].class !== undefined) {
        console.log(selectEquipe[selectEquipe.value].class);
        util += "E";
        fim += "&" + selectEquipe[selectEquipe.value].class;
    }

    if (inicio <= fim) {
        let url = "http://192.192.1.200:4000/" + util + "/" + inicio + "&" + fim;

        fetch(url).then(
                function (resp) {
                    resp.json().then(function (jsonQ) {
                        var t = window.location.search.split("=");
                        geraCalendarT();
                        geraBody(jsonQ);
                    }
                    );
                }
        );
    } else if (inicio > fim) {
        alert("Insira uma data inicial menor que a final");
    }
}

equipes();