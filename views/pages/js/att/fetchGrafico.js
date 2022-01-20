var selectEquipe = document.getElementById("selectEquipe");
var inicio = document.getElementById("inicio");
var fim = document.getElementById("fim");
var json;
var sites = [];
var selectSite = document.getElementById("selectSite");
function fetchEquipe() {
    console.log("validat fetchEquipe");
    if (window.location.host === "192.192.1.200:4000") {
        var url = "http://192.192.1.200:4000/b/";
    } else {
        var url = "http://177.192.1.200:4000/b/";
    }

    url += "SELECT * FROM";
    fetch(url + " equipe  WHERE status=\"ativado\"").then(
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
    console.log("validat fetchSite");
    if (window.location.host === "192.192.1.200:4000") {
        var url = "http://192.192.1.200:4000/b/";
    } else {
        var url = "http://177.192.1.200:4000/b/";
    }

    if (inicio.value !== "" && fim.value !== "") {
        url += "SELECT s.id,s.site,d.data FROM diaria as d JOIN site as s JOIN equipe as e on d.idSite = s.id and d.idEquipe = " + selectEquipe.value + " and d.data >= \"" + inicio.value + "\" and d.data <= \"" + fim.value + "\"GROUP BY d.data, s.id";
    } else {
        url += "SELECT s.id,s.site,d.data FROM diaria as d JOIN site as s JOIN equipe as e on d.idSite = s.id and d.idEquipe = " + selectEquipe.value + " GROUP BY d.data, s.id";
    }
    fetch(url).then(
            function (resp) {
                resp.json().then(function (jsonQ) {

                    json = jsonQ;
                    selectSite.options.length = 1;
                    let d = [];
                    sites.length = 0;
                    if (inicio.value === "") {
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
                            var ini = new Date(inicio.value + "T00:00:00.000Z");
                            var fi = new Date(fim.value + "T00:00:00.000Z");
                            var dat = new Date(jsonQ[l].data);
                            if (dat > ini && dat < fi) {
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
    console.log("validat Monta");
    if (window.location.host === "192.192.1.200:4000") {
        var url = "http://192.192.1.200:4000/b/";
    } else {
        var url = "http://177.192.1.200:4000/b/";
    }

    if (selectEquipe.value === "Todas as equipes" && inicio.value === "" && fim.value === "" && selectSite.value === "Site") {
        console.log("monta 00");
        fetchSelect();
    } else if (selectEquipe.value === "Todas as equipes" && selectSite.value === "Site" && inicio.value !== "" && fim.value !== "") {
        console.log("monta 11");
        url += "SELECT count(d.idAtividade) as count, a.atividade, d.data, a.numero from diaria as d join atividade as a where d.idAtividade = a.id  and d.data >= \"" + inicio.value + "\" and d.data <= \" " + fim.value + "\"  group by d.idAtividade,d.data  ORDER BY d.data";
        fetch(url).then(
                function (resp) {
                    resp.json().then(function (jsonQ) {
                        console.log(jsonQ);
                        let countProblemas = 0;
                        let countFinalizados = 0;
                        let vagos = diasVagos(jsonQ);
                        txVagos.textContent = vagos[0];
                        txTrabalhados.textContent = vagos[1];
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
                                    if (jsonQ[l].numero === 14) {
                                        countFinalizados = jsonQ[l].count;
                                        pie.series[0].data[l] = {value: countFinalizados, name: jsonQ[l].atividade};
                                    } else if (jsonQ[l].numero === 11 || jsonQ[l].numero === 12 || jsonQ[l].numero === 13) {
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
    } else if (inicio.value !== "" && fim.value !== "" && selectSite.value === "Site" && selectEquipe.value !== "Todas as equipes") {
        console.log("monta 22");
        url += "SELECT count(d.idAtividade) as count,a.atividade,d.data,a.numero from diaria as d join atividade as a where d.idAtividade = a.id and d.idEquipe = " + selectEquipe.value + " and d.data >= \"" + inicio.value + "\" and d.data <= \" " + fim.value + "\" group by d.idAtividade,d.data  ORDER BY d.data";
        fetch(url).then(
                function (resp) {
                    resp.json().then(function (jsonQ) {
                        let countProblemas = 0;
                        let countFinalizados = 0;
                        let vagos = diasVagos(jsonQ);
                        txVagos.textContent = vagos[0];
                        txTrabalhados.textContent = vagos[1];
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
                                    if (jsonQ[l].numero === 14) {
                                        countFinalizados = jsonQ[l].count;
                                        pie.series[0].data[l] = {value: countFinalizados, name: jsonQ[l].atividade};
                                    } else if (jsonQ[l].numero === 11 || jsonQ[l].numero === 12 || jsonQ[l].numero === 13) {

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
    } else if (selectEquipe.value !== "Todas as equipes" && selectSite.value !== "Site" && inicio.value === "" && fim.value === "") {
        console.log("monta 33");
        url += "SELECT count(d.idAtividade) as count,a.atividade,d.data,a.numer from diaria as d join atividade as a where d.idAtividade = a.id and d.idEquipe = " + selectEquipe.value + " and d.idSite = " + selectSite.value + " group by d.idAtividade,d.data  ORDER BY d.data";
        fetch(url).then(
                function (resp) {
                    resp.json().then(function (jsonQ) {
                        let vagos = diasVagos(jsonQ);
                        let countProblemas = 0;
                        let countFinalizados = 0;
                        let txVagos = document.getElementById('vagos');
                        txVagos.textContent = vagos[0];
                        txTrabalhados.textContent = vagos[1];
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
                                    if (jsonQ[l].numero === 14) {
                                        countFinalizados = jsonQ[l].count;
                                        pie.series[0].data[l] = {value: countFinalizados, name: jsonQ[l].atividade};
                                    } else if (jsonQ[l].numero === 11 || jsonQ[l].numero === 12 || jsonQ[l].numero === 13) {
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
    } else {
        url += "SELECT count(d.idAtividade) as count,a.atividade,d.data,a.numero from diaria as d join atividade as a where d.idAtividade = a.id and d.idEquipe = " + selectEquipe.value + " and d.idSite =" + selectSite.value + " and d.data >= \"" + inicio.value + "\" and d.data <= \"" + fim.value + "\" group by d.idAtividade,d.data  ORDER BY d.data";
        console.log("monta 33");
        fetch(url).then(
                function (resp) {
                    resp.json().then(function (jsonQ) {

                        let countProblemas = 0;
                        let countFinalizados = 0;
                        let vagos = diasVagos(jsonQ);
                        txVagos.textContent = vagos[0];
                        txTrabalhados.textContent = vagos[1];
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
                                    if (jsonQ[l].numero === 14) {
                                        countFinalizados = jsonQ[l].count;
                                        pie.series[0].data[l] = {value: countFinalizados, name: jsonQ[l].atividade};
                                    } else if (jsonQ[l].numero === 11 || jsonQ[l].numero === 12 || jsonQ[l].numero === 13) {
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
}
fetchEquipe();