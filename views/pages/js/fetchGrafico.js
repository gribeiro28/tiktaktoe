var selectEquipe = document.getElementById("selectEquipe");
var selectSite = document.getElementById("selectSite");
var selectMes = document.getElementById("selectMes");
var json;
var sites = [];

function fetchEquipe() {
    let url = "http://192.192.1.200:4000/b/SELECT * FROM";
    fetch(url + " equipe").then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                    let d = [];
                    for (let l = 0; l < jsonQ.length; l++) {
                        d[l] = document.createElement('option');
                        d[l].value = jsonQ[l].id;
                        d[l].textContent = jsonQ[l].equipe;
                        selectEquipe.append(d[l]);
                    }
                });
            }
    );
}

function fetchSite() {
    let url = "http://192.192.1.200:4000/b/SELECT s.id,s.site,d.data FROM diaria as d JOIN site as s JOIN equipe as e on d.idSite = s.id and d.idEquipe = " + selectEquipe.value + " GROUP BY d.data, s.id";
    fetch(url).then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                    console.log("fetchSite");
                    json = jsonQ;
                    selectSite.options.length = 1;
                    let d = [];
                    sites.length = 0;
                    if (selectMes.value === "0") {
                        for (let l = 0; l < jsonQ.length; l++) {
                            d[l] = document.createElement('option');
                            d[l].textContent = jsonQ[l].site;
                            d[l].value = jsonQ[l].id;
                            if (sites.indexOf(d[l].textContent) < 0) {
                                sites[sites.length] = d[l].textContent;
                                selectSite.append(d[l]);
                            }
                        }
                    } else {
                        for (let l = 0; l < jsonQ.length; l++) {
                            var dat = new Date(json[l].data);
                            if (dat.getUTCMonth() + 1 == selectMes.value) {
                                d[l] = document.createElement('option');
                                d[l].textContent = jsonQ[l].site;
                                d[l].value = jsonQ[l].id;
                                if (sites.indexOf(d[l].textContent) < 0) {
                                    sites[sites.length] = d[l].textContent;
                                    selectSite.append(d[l]);
                                }
                            }
                        }
                    }

                });
            }
    );
}

function monta() {
    if (selectEquipe.value == "Todas as equipes" && selectMes.value !== "0") {
        console.log("Monta 1");
        fetchSelect();
    } else if (selectMes.value !== "0" && selectSite.value === "Site") {
        console.log("Monta 2");
        let url = "http://192.192.1.200:4000/b/SELECT count(d.idAtividade) as count,a.atividade,d.data,a.numero from diaria as d join atividade as a where d.idAtividade = a.id and d.idEquipe = " + selectEquipe.value + " group by d.idAtividade,d.data  ORDER BY d.data";
        fetch(url).then(
                function (resp) {
                    resp.json().then(function (jsonQ) {
                        let countProblemas = 0;
                        let countFinalizados = 0;
                        filtraMes(jsonQ, selectMes.value);
                        let vagos = diasVagos(jsonQ);
                        txVagos.textContent = vagos;
                        jsonQ = reuneAtiv(jsonQ);
                        json = jsonQ;
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
                        txProblemas.textContent = countProblemas;
                        txFinalizado.textContent = countFinalizados;
                        myBar.setOption(bar);
                        myPie.setOption(pie);
                    });
                }
        );
    } else if (selectEquipe.value !== "Todas as equipes" && selectSite.value !== "Site" && selectMes.value == "0") {
        console.log("Monta 3");
        let url = "http://192.192.1.200:4000/b/SELECT count(d.idAtividade) as count,a.atividade,d.data,a.numero from diaria as d join atividade as a where d.idAtividade = a.id and d.idEquipe = " + selectEquipe.value + " and d.idSite = " + selectSite.value + " group by d.idAtividade,d.data  ORDER BY d.data";
        fetch(url).then(
                function (resp) {
                    resp.json().then(function (jsonQ) {
                        let vagos = diasVagos(jsonQ);
                        let txVagos = document.getElementById('vagos');
                        txVagos.textContent = vagos;
                        pie.series[0].data.length = 0;
                        json = jsonQ;
                        jsonQ = reuneAtiv(jsonQ);
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
                        txProblemas.textContent = countProblemas;
                        txFinalizado.textContent = countFinalizados;
                        myBar.setOption(bar);
                        myPie.setOption(pie);
                    });
                }
        );

    } else {
        console.log("Monta 4");
        let url = "http://192.192.1.200:4000/b/SELECT count(d.idAtividade) as count,a.atividade,d.data,a.numero from diaria as d join atividade as a where d.idAtividade = a.id and d.idEquipe = " + selectEquipe.value + " and d.idSite =" + selectSite.value + "  group by d.idAtividade,d.data  ORDER BY d.data";
        fetch(url).then(
                function (resp) {
                    resp.json().then(function (jsonQ) {
                        let countProblemas = 0;
                        let countFinalizados = 0;
                        filtraMes(jsonQ, selectMes.value);
                        let vagos = diasVagos(jsonQ);
                        txVagos.textContent = vagos;
                        jsonQ = reuneAtiv(jsonQ);
                        json = jsonQ;
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
                        txProblemas.textContent = countProblemas;
                        txFinalizado.textContent = countFinalizados;
                        myBar.setOption(bar);
                        myPie.setOption(pie);
                    });
                }
        );
    }

}
fetchEquipe();
monta();