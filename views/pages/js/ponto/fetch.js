var table = document.getElementById("tblExport");
table.style.color = "#fff";
var selectEquipe = document.getElementById("equipes");
var inicio = document.getElementById("inicio");
var fim = document.getElementById("fim");
var sites = [];
var adicionados = [];
var ma = 0;
var kms = [];

function equipes() {
    fetch("http://192.192.1.200:4000/b/SELECT idTraccar,equipe FROM equipe WHERE status=\"ativado\"").then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                    let equipes = [];
                    for (let k = 0; k < jsonQ.length; k++) {
                        equipes[k] = document.createElement('option');
                        equipes[k].textContent = jsonQ[k].equipe;
                        equipes[k].class = jsonQ[k].idTraccar;
                        equipes[k].value = k;
                        selectEquipe.append(equipes[k]);
                    }
                });
            });
}

function km() {

    let sql = "SELECT * FROM km WHERE idEquipe=(SELECT id FROM equipe WHERE idTraccar=" + selectEquipe[selectEquipe.value].class + ") AND data >= \"" + inicio.value + "\" AND data <= \"" + fim.value + "\" ORDER BY data LIMIT 400 "
    //let sql = "SELECT km FROM km WHERE idEquipe=" + selectEquipe[selectEquipe.value].class + " AND  ORDER BY data LIMIT 400;";
    let url = "http://192.192.1.200:4000/b/" + sql;

    fetch(url).then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                    kms = jsonQ;
                });
            });
}

function site() {
    fetch("http://192.192.1.200:4000/b/SELECT idTraccar,site FROM site").then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                    for (let k = 0; k < jsonQ.length; k++) {
                        sites[jsonQ[k].idTraccar] = jsonQ[k].site;
                    }
                });
            });
}

function ponto() {

    km();
    let neg = -1;
    max = 0;
    ma = 0;


    var url = "http://192.192.1.200:4000/b/SELECT horario as serverTime,idEquipe as deviceId,s.idTraccar as geofenceId,tipo as type FROM eventos JOIN site as s ON s.id= eventos.idSite WHERE horario >\"" + (inicio.value + "T00:00:00Z") + "\" and horario < \"" + (fim.value + "T23:59:59Z") + "\" and idEquipe=(SELECT id FROM equipe WHERE idTraccar=" + selectEquipe[selectEquipe.value].class + ") ORDER BY horario;";
    fetch(url).then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                    if (table.children !== undefined) {
                        for (let a = table.children.length; a >= 0; a--) {
                            if (table.children[a] !== undefined) {
                                table.children[a].remove();
                            }
                        }
                    }

                    var evs = separaDias(jsonQ);

                    //Datas que mvem do campo de calendario da tela
                    dtInicio = new Date(inicio.value + "T00:00:00Z");
                    dtFim = new Date(fim.value + "T23:59:59Z");
                    //valida se as datas estão condizentes
                    if (inicio.value === "" || dtInicio > dtFim || fim.value === "") {
                        alert("insira datas validas");
                    } else {
                        var eventos = separaDias(jsonQ);
                        if (eventos !== undefined) {
                            for (let b = 0; b <= eventos.length; b++) {
                                if (eventos[b] !== undefined) {
                                    for (let a = 0; a <= eventos[b].length; a++) {
                                        if (eventos[b][a] !== undefined) {
                                            if (eventos[b][a].length > max) {
                                                max = eventos[b][a].length;
                                                if (eventos[b][a][0].type === 0) {
                                                    neg = 1;
                                                } else {
                                                    neg = 0;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        //MES
                        for (let l = 0; l < eventos.length; l++) {
                            if (eventos[l] !== undefined) {
                                adicionados[l] = [];
                                //DIA
                                for (let k = 0; k < eventos[l].length; k++) {
                                    if (eventos[l][k] !== undefined) {
                                        adicionados[l][k] = [];
                                        for (let n = 0; n < eventos[l][k].length; n++) {
                                            if (eventos[l][k][n] !== undefined) {
                                                if (adicionados[l][k].indexOf(eventos[l][k][n].site) > -1) {
                                                } else {
                                                    adicionados[l][k][adicionados[l][k].length] = eventos[l][k][n].site;
                                                }
                                            }
                                        }
                                        if (adicionados[l][k].length > ma) {
                                            ma = adicionados[l][k].length;
                                        }
                                    }
                                }
                            }
                        }
                        header(max + neg + ma, ma);
                        preenche(eventos, adicionados, ma);
                    }
                });
            });
    //*/

}
equipes();
site();