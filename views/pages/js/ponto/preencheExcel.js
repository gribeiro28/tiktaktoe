var cou = 0;
function duasCasas(numero) {
    if (Number.parseInt(numero) < 10) {
        return "0" + numero;
    } else {
        return numero;
    }
}

function header(max, ma) {
    var th = document.createElement('thead');
    var tr = document.createElement('tr');
    let td = [];
    let mod = 0;
    let count = 1;
    let coun = 1;
    let m = 0;

    for (let k = 0; k < (max + 3); k++) {
        td[k] = document.createElement('th');
        if (k === 0) {
            td[k].textContent = 'Dispositivo';
            td[k].class = "col";
        } else if (k === 1) {
            td[k].textContent = 'Dia';
        } else if (k === 2) {
            td[k].textContent = 'KM/Dia';
        } else if (k < 3 + ma) {
            td[k].textContent = coun + '° Centro de Custo ';
            coun++;
        } else if (m % 2 === 0) {
            td[k].textContent = count + '°Entrada:';
            m++;
        } else {
            td[k].textContent = count + '°Saída:';
            m++;
            count++;
        }
        tr.append(td[k]);
        th.append(tr);

    }
    table.append(th);
}

function preenche(json, add, ma) {
    var tr = [];
    var td = [];
    var tb = document.createElement("tbody");
    var alc;
    var al = 0;
    var dia = 0;
    var a = 0;

    console.log(json);

    //For com a quantidade de dias entre o periodo 
    for (let k = 0; k < kms.length; k++) {
        a = 0;
        dia = (new Date(kms[k].data)).getUTCDate()

        //Cria alinha Respectiva ao dia 
        tr[k] = document.createElement("tr");

        //l === mes do for
        let dd = new Date(kms[k].data);
        var l = dd.getUTCMonth() + 1;

        td[0] = document.createElement("th");
        td[0].class = "row";
        td[0].textContent = selectEquipe[selectEquipe.value].textContent;
        tr[k].append(td[0]);
        tb.append(tr[k]);

        //Coloca o dia
        td[0] = document.createElement("td");
        dt = new Date(kms[k].data);
        td[0].textContent = duasCasas(dt.getUTCDate()) + "/" + duasCasas((dt.getUTCMonth() + 1)) + "/" + duasCasas(dt.getFullYear());
        tr[k].append(td[0]);
        tb.append(tr[k]);

        td[0] = document.createElement("td");
        td[0].textContent = (kms[k].km).toFixed(2);
        tr[k].append(td[0]);
        tb.append(tr[k]);

        //console.log("Mês: " + l);
        //console.log("Dia: " + (new Date(kms[k].data)).getUTCDate());

        //Caso Haja dairia cadastrada
        if (json[l] !== undefined && json[l][dia] !== undefined) {
            for (let z = 0; z < ma; z++) {
                if (add[l][dia][z] !== undefined) {
                    td[z] = document.createElement("td");
                    td[z].textContent = sites[add[l][dia][z]];
                    tr[k].append(td[z]);
                    tb.append(tr[k]);
                } else {
                    td[z] = document.createElement("td");
                    td[z].textContent = "";
                    tr[k].append(td[z]);
                    tb.append(tr[k]);
                }

            }

            for (let n = 0; n < json[l][dia].length; n++) {
                console.log(n);
                td[n] = document.createElement("td");
                let t = json[l][dia][n].type;
                dt = new Date(json[l][dia][n].data);


                if (t === 1) {
                    td[n].textContent = duasCasas(dt.getUTCHours()) + ":" + duasCasas((dt.getUTCMinutes())) + ":" + duasCasas(dt.getUTCSeconds());
                    tr[k].append(td[n]);

                } else {
                    if (n === 0) {
                        td[n].textContent = ("------------------");
                        tr[k].append(td[n]);
                        td[n] = document.createElement("td");
                        td[n].textContent = duasCasas(dt.getUTCHours()) + ":" + duasCasas((dt.getUTCMinutes())) + ":" + duasCasas(dt.getUTCSeconds());
                        tr[k].append(td[n]);
                    } else {
                        td[n].textContent = duasCasas(dt.getUTCHours()) + ":" + duasCasas((dt.getUTCMinutes())) + ":" + duasCasas(dt.getUTCSeconds());
                        tr[k].append(td[n]);
                    }
                }



                //tr[k].append(td[n]);
                tb.append(tr[k]);
            }

        }

        table.append(tb);
    }
}