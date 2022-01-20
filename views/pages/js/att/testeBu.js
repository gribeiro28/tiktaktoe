var tcheison;
var agrup;
var sites = [];
var tb = document.getElementById('table');
function inicio() {
    var dias = new Date();
    t = dias;
    /*dias.setYear(Number.parseInt(document.getElementById('ano').value));
     dias.setMonth(Number.parseInt(document.getElementById('mes').value));*/
    dias.setUTCDate(0);
    let inicio = document.getElementById("inicio");
    inicio.length = 0;
    for (let k = 1; k < dias.getUTCDate() + 1; k++) {
        let opt = document.createElement('option');
        opt.textContent = k;
        inicio.append(opt);
    }
}
function fim() {
    var dias = new Date();
    t = dias;
    console.log("Rhaast");
    let inicio = document.getElementById("inicio");
    let fim = document.getElementById("fim");
    fim.length = 0;
    for (let k = (Number.parseInt(inicio.value) + 1); k < dias.getUTCDate() + 1; k++) {
        let opt = document.createElement('option');
        opt.textContent = k;
        fim.append(opt);
    }
}

function agrupaDados(json) {
    tcheison = json;
    let agrupado = [];
    for (let m = 0; m < json.length; m++) {
//Confirma se há algum vetor para aquele site
        if (agrupado[json[m].site] == undefined) {
//Cria uma parte para o site
            agrupado[json[m].site] = [];
            //Cria uma parte para a equipe
            agrupado[json[m].site][json[m].idEquipe] = [];
            //Coloca os dados do trabalho da equipe, na parte da equipe
            //agrupado[json[m].site][json[m].idEquipe][agrupado[json[m].site].length] = {dia: (new Date(json[m].data).getDate() + 1), mes: (new Date(json[m].data).getMonth() + 1), atividade: json[m].idAtividade, grupo: json[m].equipe, idGrupo: json[m].idEquipe};
            agrupado[json[m].site][json[m].idEquipe][agrupado[json[m].site][json[m].idEquipe].length] = json[m];
        } else {
            if (agrupado[json[m].site][json[m].idEquipe] == undefined) {
//Cria uma parte para a equipe
                agrupado[json[m].site][json[m].idEquipe] = [];
            }
//Coloca os dados do trabalho da equipe, na parte da equipe
//agrupado[json[m].site][json[m].idEquipe][agrupado[json[m].site].length] = {dia: (new Date(json[m].data).getDate() + 1), mes: (new Date(json[m].data).getMonth() + 1), atividade: json[m].idAtividade, grupo: json[m].equipe, idGrupo: json[m].idEquipe};
            agrupado[json[m].site][json[m].idEquipe][agrupado[json[m].site][json[m].idEquipe].length] = json[m];
        }
    }
    return agrupado;
}
var t;
function geraCalendar() {
    for (let k = tb.children.length; k > 0; k--) {
        tb.lastChild.remove();
    }
    /*var dias = new Date(document.getElementById('inicio'));
     dias.setMonth(dias.getMonth() + 1);
     dias.setUTCDate(0);*/
    tb.style = "color : #fff;width: 1600px; text-align: center;";
    let thead = document.createElement('thead');
    let inicio = document.getElementById("inicio").value;
    let fim = document.getElementById("fim").value;
    let aa = new Date(inicio + "T");
    let ll = 0;
    for (let k = Number.parseInt(inicio) - 1; k <= Number.parseInt(fim) + 1; k++) {
        let th = document.createElement('th');
        if (ll == 0) {
            th.textContent = 'Equipe';
            th.style = "margin : 20px;";
            thead.append(th);
            tb.append(thead);
            ll++;
        } else if (ll == 1) {
            th.textContent = "Site";
            thead.append(th);
            ll++;
        } else if (k < 10) {
            t.setDate(k);
            th.textContent = getDiaS(t.getDay() - 1) + "0" + (k - 1);
            thead.append(th);
        } else {
            t.setDate(k);
            th.textContent = "" + getDiaS(t.getDay() - 1) + (k - 1);
            thead.append(th);
        }
    }
    tb.append(thead);
}
function geraBody(json) {
    let drop = document.getElementById('pokemon');
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let alc = [];
    agrup = agrupaDados(json);
    sites = [];
    if (drop.value != 0) {
        for (let k = 0; k < json.length; k++) {
            console.log(json[k].site);
            console.log((drop[drop.value].text).replace(" ", ""));
            if ((json[k].site.replace(" ", "")) === (drop[drop.value].text).replace(" ", "")) {
                alc[alc.length] = json[k];
            }
        }
        json = alc;
    }
    if (json.length !== 0) {
//Roda a quantidade de vezes que há dados no json
        for (let k = 0; k < json.length; k++) {
//Verifica se ja foi criado um uma parti para o site atual
            if (!(sites.indexOf(json[k].site) > -1)) {
                let thead = document.createElement('thead');
                let th = document.createElement('td');
                th.textContent = "";
                th.style = "color: #a88;";
                thead.append(th);
                tb.append(thead);
                //Coloca o site na lista dos sites ja colocados
                sites[sites.length] = json[k].site;
                let tr = [];
                for (let m = 0; m < agrup[json[k].site].length; m++) {
                    let td = [];
                    //Roda a quantidade de grupos q trabalharam no site atual
                    tr[tr.length] = document.createElement('tr');
                    if (agrup[json[k].site][m] !== undefined) {
                        for (let n = 0; n < tb.tHead.children.length; n++) {
                            td[m] = document.createElement('td');
                            for (let v = 0; v < agrup[json[k].site][m].length; v++) {
                                let data = new Date(agrup[json[k].site][m][v].data);
                                if (n === 1) {
                                    td[m].textContent = agrup[json[k].site][m][v].site;
                                    //console.log(agrup[json[k].site][m][v].site);
                                } else if (n === 0) {
                                    td[m].textContent = agrup[json[k].site][m][n].equipe;
                                } else if ((Number.parseInt(tb.tHead.children[n].textContent[4] + tb.tHead.children[n].textContent[5])) === data.getUTCDate()) {
                                    td[m].textContent = agrup[json[k].site][m][v].numero;
                                } else {
                                    let a = document.createElement('a');
                                    a.textContent = "+";
                                    a.href = "hehe?site=" + json[k].idSite + "&equipe=" + agrup[json[k].site][m][0].idEquipe + "&dia=" + (n - 1) + "&mes=" + mes.value + "&ano=" + (ano.value);
                                    a.style = "color : #fff;";
                                    if (td[m].innerText === "") {
                                        td[m].append(a);
                                    }
                                }
                            }
                            tr[tr.length - 1].append(td[m]);
                        }
                        tb.append(tr[tr.length - 1]);
                    }
                }

            }

        }
    } else {
        let thead = document.createElement('thead');
        let th = document.createElement('th');
        let a = document.createElement("a");
        a.textContent = "Insira uma equipe";
        a.href = "escolhaAtividade.html?!site=" + (drop[drop.value].attributes.dir.value) + "&equipe=" + "as" + "&dia=" + 0 + "&mes=" + mes.value + "&ano=" + (ano.value);
        a.style = "color: #fff";
        th.append(a);
        th.style = "color: #a88 ;";
        thead.append(th);
        tb.append(thead);
    }
}
var loc;
var splic = [];
var final = [];
var alc;
var tb = document.getElementById('table');
function coun() {
    for (let n = 0; n < loc.length; n++) {
        for (let m = 0; m < loc[n].length; m++) {
            if (m === 0) {
                final[final.length] = {Equipe: loc[n][m].equipe, Site: loc[n][m].site};
                colocaDias(final);
            } else if (loc[n][m].site === final[final.length - 1].Site) {
                console.log("Site igual");
            }
        }
    }
}
function equipes(id) {
    loc[alc] = [];
    for (let k = tcheison.length - 1; k >= 0; k--) {
        if (tcheison[k].idEquipe === id) {
            loc[alc][loc[alc].length] = tcheison.splice(k, 1)[0];
        }
    }
    alc++;
}
function tchei() {
    let co = 0;
    loc = [];
    alc = 0;
    do {
        equipes(tcheison[co].idEquipe);
        console.log(tcheison.length);
    } while (tcheison.length > 0)
    console.log(tcheison.length);
    coun();
}