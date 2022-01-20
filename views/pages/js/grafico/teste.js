//PASTA DE TESTE
var tcheison;
var agrup;
var sites = [];
var tb = document.getElementById('table');

function fimMes(mes) {
    let dd = new Date();
    dd.setMonth(mes + 1);
    dd.setDate(0);
    return dd.getUTCDate();
}

function getDiaS(dia) {
    switch (dia) {
        case 0:
            return "Do: ";
            break;
        case 1:
            return "2º: ";
            break;
        case 2:
            return "3°: ";
            break;
        case 3:
            return "4°: ";
            break;
        case 4:
            return "5°: ";
            break;
        case 5:
            return "6°: ";
            break;
        default:
            return "Sá: ";
            break;
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


function geraCalendarT() {
    var dias = new Date();
    for (let k = tb.children.length; k > 0; k--) {
        tb.lastChild.remove();
    }

    tb.style = "color : #fff;";
    let thead = document.createElement('thead');
    let inicio = document.getElementById("inicio").value;
    let fim = document.getElementById("fim").value;
    let aa = new Date(inicio + "T12:00:00.000Z");
    t = aa;
    let current = new Date();
    let bb = new Date(fim + "T12:00:00.000Z");
    if (bb > current) {
        bb = current;
    }
    let am = [];
    let fm = [];
    let diferencaMes = bb.getUTCMonth() - aa.getUTCMonth();

    if (diferencaMes > 0) {
        for (let w = 0; w <= diferencaMes; w++) {
            if (w === 0) {
                am[w] = aa.getDate();
                fm[w] = fimMes(aa.getUTCMonth());
            } else if (w !== diferencaMes) {
                am[w] = 1;
                fm[w] = fimMes(aa.getUTCMonth() + 1);
            } else {
                am[w] = 1;
                fm[w] = bb.getUTCDate();
            }
        }
    } else {
        am[0] = aa.getDate();
        fm[0] = bb.getUTCDate();
    }

    let ll = 0;

    for (let l = 0; l <= diferencaMes; l++) {
        t.setUTCDate(15);
        t.setUTCMonth(t.getUTCMonth() + l);
        for (let k = am[l] - 1; k <= fm[l] + 1; k++) {
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
            } else if (k <= 10 && k - 1 > 0) {
                t.setDate(k);
                th.textContent = getDiaS(t.getDay() - 1) + "0" + (k - 1) + "/" + (Number.parseInt(t.getUTCMonth() + 1));
                thead.append(th);
            } else if (k - 1 > 0) {
                t.setDate(k - 1);
                th.textContent = getDiaS(t.getDay()) + (k - 1) + "/" + (Number.parseInt(t.getUTCMonth() + 1));
                thead.append(th);
            }
        }
    }

    tb.append(thead);
}
function geraBody(json) {
    let drop = document.getElementById('pokemon');
    let tr = document.createElement('tr');
    let td = [];
    let sp = [];
    let alc = [];
    agrup = agrupaDados(json);
    sites = [];
    if (drop.value != 0) {
        for (let k = 0; k < json.length; k++) {
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
                    //Roda a quantidade de grupos q trabalharam no site atual
                    tr[tr.length] = document.createElement('tr');
                    if (agrup[json[k].site][m] !== undefined) {
                        for (let n = 0; n < tb.tHead.children.length; n++) {
                            td[m] = document.createElement('td');
                            sp[m] = document.createElement('span');
                            for (let v = 0; v < agrup[json[k].site][m].length; v++) {
                                let data = new Date(agrup[json[k].site][m][v].data);
                                if (n === 1) {
                                    td[m].textContent = agrup[json[k].site][m][v].site;
                                } else if (n === 0) {
                                    td[m].textContent = agrup[json[k].site][m][n].equipe;
                                } else if ((Number.parseInt(tb.tHead.children[n].textContent[4] + tb.tHead.children[n].textContent[5])) === data.getUTCDate() && (Number.parseInt(tb.tHead.children[n].textContent[7] + tb.tHead.children[n].textContent[8])) == data.getUTCMonth() + 1) {
                                    if (td[m].textContent === "") {
                                        td[m].className = "tool";
                                        sp[m].className = "tooltiptext";
                                        sp[m].textContent = agrup[json[k].site][m][v].atividade;
                                        sp[m].style.width = (sp[m].textContent.length * 10) + "px";
                                        td[m].textContent = agrup[json[k].site][m][v].numero;
                                        td[m].append(sp[m]);
                                    } else if (td[m].textContent === "+") {
                                        td[m].className = "tool";
                                        sp[m].className = "tooltiptext";
                                        sp[m].textContent = agrup[json[k].site][m][v].atividade;
                                        sp[m].style.width = (sp[m].textContent.length * 10) + "px";
                                        td[m].textContent = agrup[json[k].site][m][v].numero;
                                        td[m].append(sp[m]);
                                    } else {
                                        let span = td[m].children[0].textContent;
                                        td[m].children[0].textContent = "";
                                        td[m].textContent += ", " + agrup[json[k].site][m][v].numero;
                                        sp[m].className = "tooltiptext";
                                        sp[m].textContent = span + " " + agrup[json[k].site][m][v].atividade;
                                        sp[m].style.width = (sp[m].textContent.length * 10) + "px";
                                        td[m].append(sp[m]);
                                    }
                                } else {
                                    let a = document.createElement('a');
                                    a.textContent = "+";
                                    a.href = "hehe?site=" + json[k].idSite + "&equipe=" + agrup[json[k].site][m][0].idEquipe + "&dia=" + (Number.parseInt(tb.tHead.children[n].textContent[4] + tb.tHead.children[n].textContent[5])) + "&mes=" + (Number.parseInt(tb.tHead.children[n].textContent[7] + tb.tHead.children[n].textContent[8])) + "&ano=" + (new Date(document.getElementById("inicio").value + "T00:00:00.000Z").getFullYear());
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
    } while (tcheison.length > 0)
    coun();
}




//PASTA DE TESTE
/*var tcheison;
 var agrup;
 var sites = [];
 var tb = document.getElementById('table');
 function fimMes(mes) {
 let dd = new Date();
 dd.setMonth(mes + 1);
 dd.setDate(0);
 return dd.getUTCDate();
 }
 
 function getMes(mes) {
 switch (mes) {
 case 0:
 return "Janeiro";
 break;
 case 1:
 return "Fevereiro";
 break;
 case 2:
 return "Março";
 break;
 case 3:
 return "Abril";
 break;
 case 4:
 return "Maio";
 break;
 case 5:
 return "Junho";
 break;
 case 6:
 return "Julho";
 break;
 case 7:
 return "Agosto";
 break;
 case 8:
 return "Setembro";
 break;
 case 9:
 return "Outubro";
 break;
 case 10:
 return "Novembro";
 break;
 case 11:
 return "Dezembro";
 break;
 default:
 return "Bug";
 break;
 }
 }
 
 function getDiaS(dia) {
 switch (dia) {
 case 0:
 return "Domingo:\n ";
 break;
 case 1:
 return "Segunda:\n ";
 break;
 case 2:
 return "Terça:\n ";
 break;
 case 3:
 return "Quarta:\n ";
 break;
 case 4:
 return "Quinta:\n ";
 break;
 case 5:
 return "Sexta:\n ";
 break;
 default:
 return "Sábado:\n ";
 break;
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
 
 
 function geraCalendarT() {
 var dias = new Date();
 for (let k = tb.children.length; k > 0; k--) {
 tb.lastChild.remove();
 }
 
 tb.style = "color : #fff;";
 let thead = [];
 thead[0] = document.createElement('thead');
 thead[1] = document.createElement('thead');
 let inicio = document.getElementById("inicio").value;
 let fim = document.getElementById("fim").value;
 let aa = new Date(inicio + "T12:00:00.000Z");
 t = aa;
 let current = new Date();
 let bb = new Date(fim + "T12:00:00.000Z");
 if (bb > current) {
 bb = current;
 }
 let am = [];
 let fm = [];
 let diferencaMes = bb.getUTCMonth() - aa.getUTCMonth();
 if (diferencaMes > 0) {
 for (let w = 0; w <= diferencaMes; w++) {
 if (w === 0) {
 am[w] = aa.getDate();
 fm[w] = fimMes(aa.getUTCMonth());
 } else if (w !== diferencaMes) {
 am[w] = 1;
 fm[w] = fimMes(aa.getUTCMonth() + 1);
 } else {
 am[w] = 1;
 fm[w] = bb.getUTCDate();
 }
 }
 } else {
 am[0] = aa.getDate();
 fm[0] = bb.getUTCDate();
 }
 
 let ll = 0;
 for (let l = 0; l <= diferencaMes; l++) {
 t.setUTCDate(15);
 t.setUTCMonth(t.getUTCMonth() + l);
 for (let k = am[l] - 1; k <= fm[l] + 1; k++) {
 let th = [];
 th[0] = document.createElement('th');
 th[1] = document.createElement('th');
 if (ll == 0) {
 th[0].textContent = '#';
 th[0].style = "margin : 20px;";
 thead[0].append(th[0]);
 
 th[1].textContent = 'Equipe';
 th[1].style = "margin : 20px;";
 thead[1].append(th[1]);
 //tb.append(thead[1]);
 ll++;
 } else if (ll == 1) {
 th[0].textContent = "#";
 thead[0].append(th[0]);
 
 th[1].textContent = "Site";
 thead[1].append(th[1]);
 ll++;
 } else if (k <= 10 && k - 1 > 0) {
 t.setDate(k);
 th[0].textContent = getDiaS(t.getDay() - 1);
 thead[0].append(th[0]);
 
 th[1].textContent = "0" + (k - 1) + "/" + (getMes(t.getUTCMonth()));
 thead[1].append(th[1]);
 } else if (k - 1 > 0) {
 t.setDate(k - 1);
 th[0].textContent = getDiaS(t.getDay());
 thead[0].append(th[0]);
 
 th[1].textContent = (k - 1) + "/" + (getMes(t.getUTCMonth()));
 thead[1].append(th[1]);
 }
 }
 }
 
 tb.append(thead[0], thead[1]);
 }
 function geraBody(json) {
 let drop = document.getElementById('pokemon');
 let tr = document.createElement('tr');
 let td = [];
 let sp = [];
 let alc = [];
 agrup = agrupaDados(json);
 sites = [];
 if (drop.value != 0) {
 for (let k = 0; k < json.length; k++) {
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
 //Roda a quantidade de grupos q trabalharam no site atual
 tr[tr.length] = document.createElement('tr');
 if (agrup[json[k].site][m] !== undefined) {
 for (let n = 0; n < tb.tHead.children.length; n++) {
 td[m] = document.createElement('td');
 sp[m] = document.createElement('span');
 for (let v = 0; v < agrup[json[k].site][m].length; v++) {
 let data = new Date(agrup[json[k].site][m][v].data);
 if (n === 1) {
 td[m].textContent = agrup[json[k].site][m][v].site;
 } else if (n === 0) {
 td[m].textContent = agrup[json[k].site][m][n].equipe;
 } else if ((Number.parseInt(tb.tHead.children[n].textContent[4] + tb.tHead.children[n].textContent[5])) === data.getUTCDate() && (Number.parseInt(tb.tHead.children[n].textContent[7] + tb.tHead.children[n].textContent[8])) == data.getUTCMonth() + 1) {
 if (td[m].textContent === "") {
 td[m].className = "tool";
 sp[m].className = "tooltiptext";
 sp[m].textContent = agrup[json[k].site][m][v].atividade;
 sp[m].style.width = (sp[m].textContent.length * 10) + "px";
 td[m].textContent = agrup[json[k].site][m][v].numero;
 td[m].append(sp[m]);
 } else if (td[m].textContent === "+") {
 td[m].className = "tool";
 sp[m].className = "tooltiptext";
 sp[m].textContent = agrup[json[k].site][m][v].atividade;
 sp[m].style.width = (sp[m].textContent.length * 10) + "px";
 td[m].textContent = agrup[json[k].site][m][v].numero;
 td[m].append(sp[m]);
 } else {
 let span = td[m].children[0].textContent;
 td[m].children[0].textContent = "";
 td[m].textContent += ", " + agrup[json[k].site][m][v].numero;
 sp[m].className = "tooltiptext";
 sp[m].textContent = span + " " + agrup[json[k].site][m][v].atividade;
 sp[m].style.width = (sp[m].textContent.length * 10) + "px";
 td[m].append(sp[m]);
 }
 } else {
 let a = document.createElement('a');
 a.textContent = "+";
 a.href = "hehe?site=" + json[k].idSite + "&equipe=" + agrup[json[k].site][m][0].idEquipe + "&dia=" + (Number.parseInt(tb.tHead.children[n].textContent[4] + tb.tHead.children[n].textContent[5])) + "&mes=" + (Number.parseInt(tb.tHead.children[n].textContent[7] + tb.tHead.children[n].textContent[8])) + "&ano=" + (new Date(document.getElementById("inicio").value + "T00:00:00.000Z").getFullYear());
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
 } while (tcheison.length > 0)
 coun();
 }*/
