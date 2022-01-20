//var url = "http://192.192.1.200:4000/b/SELECT COUNT(idAtividade),a.atividade FROM diaria as d join site as s on s.id = d.idSite join equipe as e on e.id = d.idEquipe JOIN atividade as a on a.id=d.idAtividade where d.data BETWEEN \"" + inicio.value + "\" and \"" + fim.value + "\" GROUP BY a.atividade";

var lastUp = document.getElementsByClassName("lastUp");
var json;
var total = 0;
var txVagos = document.getElementById('vagos');
var txFinalizado = document.getElementById('finalizado');
var txProblemas = document.getElementById('problemas');
var txTrabalhados = document.getElementById('trabalhados');


function fetchSelect() {
    var url = "http://192.192.1.200:4000/b/SELECT count(d.idAtividade) as count,a.atividade,d.data,a.numero from diaria as d join atividade as a where d.idAtividade = a.id group by d.idAtividade,d.data ORDER BY d.data";
    fetch(url).then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                    $(document).ready(function () {
                        let countProblemas = 0;
                        let countFinalizados = 0;
                        let current = new Date().getMonth() + 1;

                        if (selectMes.value === "0") {
                            selectMes.value = current;
                        }
                        filtraMes(jsonQ, selectMes.value);
                        let vagos = diasVagos(jsonQ);
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
                                        console.log(jsonQ[l].count);
                                        countProblemas += jsonQ[l].count;
                                        pie.series[0].data[l] = {value: jsonQ[l].count, name: jsonQ[l].atividade};
                                    } else {
                                        pie.series[0].data[l] = {value: jsonQ[l].count, name: jsonQ[l].atividade};
                                    }
                                } else {
                                    bar.series[0].data[l] = 0;
                                }
                            }
                        }
                        txProblemas.textContent = countProblemas;
                        txFinalizado.textContent = countFinalizados;
                        myBar.setOption(bar);
                        myPie.setOption(pie);
                    });
                }
                );
            }
    );
}
fetchSelect();
