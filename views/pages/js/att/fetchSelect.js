var lastUp = document.getElementsByClassName("lastUp");
var json;
var total = 0;
var txVagos = document.getElementById('vagos');
var txFinalizado = document.getElementById('finalizado');
var txProblemas = document.getElementById('problemas');
var txTrabalhados = document.getElementById('trabalhados');


var inicial = document.getElementById("inicio");
var final = document.getElementById("fim");
var dtt = new Date();
final.value = lp(dtt.getFullYear(), 4) + "-" + lp(dtt.getUTCMonth() + 1, 2) + "-" + lp(dtt.getUTCDate(), 2);
dtt.setDate(dtt.getDate() - 15);
inicial.value = lp(dtt.getFullYear(), 4) + "-" + lp(dtt.getUTCMonth() + 1, 2) + "-" + lp(dtt.getUTCDate(), 2);

function lp(value, totalWidth, paddingChar) {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
}

function fetchSelect() {
    var url = "http://192.192.1.200:4000/b/SELECT count(d.idAtividade) as count,a.atividade,d.data,a.numero, d.idPacote from diaria as d join atividade as a where d.idAtividade = a.id group by d.idAtividade,d.data ORDER BY d.data";
    try {
        fetch(url).then(
                function (resp) {
                    resp.json().then(function (jsonQ) {
                        $(document).ready(function () {
                            let countProblemas = 0;
                            let countFinalizados = 0;
                            let current = new Date().getMonth() + 1;

                            filtraMes(jsonQ, current);
                            let vagos = diasVagos(jsonQ);
                            console.log(vagos[0]);
                            jsonQ = reuneAtiv(jsonQ);
                            json = jsonQ;
                            txVagos.textContent = vagos[0];
                            txTrabalhados.textContent = vagos[1];
                            pie.series[0].data.length = 0;
                            bar.series[0].data.length = 0;
                            if (jsonQ.length === 0) {
                                pie.series[0].data[0] = {value: 1, name: "Nenhuma Atividade cadastrada nesse mês"};
                            } else {
                                for (let l = 0; l < 14; l++) {
                                    if (jsonQ[l] !== undefined) {
                                        bar.series[0].data[jsonQ[l].numero - 1] = jsonQ[l].count;
                                        if (jsonQ[l].atividade === "14-Finalizado") {
                                            countFinalizados = jsonQ[l].count;
                                            pie.series[0].data[l] = {value: countFinalizados, name: jsonQ[l].atividade};
                                        } else if (jsonQ[l].atividade === "11-Meio Ambiente" || jsonQ[l].atividade === "12-Cliente" || jsonQ[l].atividade === "13-BackOffice") {
                                            countProblemas++;
                                            pie.series[0].data[l] = {value: jsonQ[l].count, name: jsonQ[l].atividade};
                                        } else {
                                            pie.series[0].data[l] = {value: jsonQ[l].count, name: jsonQ[l].atividade};
                                        }
                                    } else {
                                        bar.series[0].data[l] = 0;
                                    }
                                }
                            }
                            txProblemas.textContent = "A" + countProblemas;
                            txFinalizado.textContent = countFinalizados;
                            myBar.setOption(bar);
                            myPie.setOption(pie);
                        });
                    }
                    );
                }
        );
    } catch (e) {
        alert("teste");
    }

}
//fetchSelect();