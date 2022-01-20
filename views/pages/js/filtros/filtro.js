var dias = [];
function filtraMes(vet, mes) {
    for (let k = 0; k < vet.length; k++) {
        let dt = new Date(vet[k].data);
        if ((dt.getMonth() + 1) != mes) {
            vet.splice(k, 1);
            k--;
        }
    }
}

function diasVagos(json) {
    dias.length = 0;
    count = 0;
    let ini = new Date(document.getElementById("inicio").value + "T12:00:00.000Z");
    let fi = new Date(document.getElementById("fim").value + "T12:00:00.000Z");
    let dif = fi.getUTCMonth() - ini.getUTCMonth();
    for (let q = ini.getUTCMonth() + 1; q <= fi.getUTCMonth() + 1; q++) {
        dias[q] = [];
        if (dif === 0) {
            for (let w = ini.getUTCDate(); w <= fi.getUTCDate(); w++) {
                dias[q][w] = w;
            }
            for (let w = json.length; w >= 0; w--) {
                if (json[w] !== undefined) {
                    let dia = new Date(json[w].data).getDate();
                }
            }
        } else {
            let jump = new Date(document.getElementById("fim").value + "T12:00:00.000Z");
            jump.setUTCMonth(q);
            //jump.setUTCDate(0);
            var a;
            var b;
            if (q === fi.getUTCMonth() + 1) {
                a = 1;
                b = new Date(document.getElementById("fim").value + "T12:00:00.000Z").getUTCDate();
            } else {
                a = ini.getUTCDate();
                console.log("Kayn");
                console.log(q);
                jump.setUTCMonth(q);
                jump.setUTCDate(0);
                console.log(jump);
                b = jump.getUTCDate();
            }
            for (let w = a; w <= b; w++) {
                dias[q][w] = w;
            }
        }
    }

    for (let a = 0; a < dias.length; a++) {
        if (dias[a] !== undefined) {
            for (let b = json.length - 1; b >= 0; b--) {
                let dt = new Date(json[b].data);
                if (dias[dt.getUTCMonth() + 1].indexOf(dt.getUTCDate()) && a === dt.getUTCMonth() + 1) {
                    dias[a].splice(dt.getUTCDate(), 1);
                    count++;
                }
            }
        }
    }

    let result = [];
    result[0] = 0;
    result[1] = count;
    for (let b = 0; b < dias.length; b++) {
        if (dias[b] !== undefined) {
            for (let w = 0; w < dias[b].length; w++) {
                if (dias[b][w] !== undefined) {
                    result[0]++;
                }
            }
        }
    }
    return result;
}

function reuneAtiv(vetor) {
    let ativ = [];
    for (let m = 0; m < vetor.length; m++) {
        if (ativ.length === 0) {
            ativ[0] = {count: vetor[m].count, atividade: vetor[m].atividade, numero: vetor[m].numero};
        } else {
            for (let k = 0; k < ativ.length; k++) {
                if (ativ[k].atividade === vetor[m].atividade) {
                    ativ[k].count += vetor[m].count;
                    break;
                }
                if (k === (ativ.length - 1)) {
                    ativ[ativ.length] = {count: vetor[m].count, atividade: vetor[m].atividade, numero: vetor[m].numero};
                    break;
                }
            }
        }
    }
    return ativ;
}