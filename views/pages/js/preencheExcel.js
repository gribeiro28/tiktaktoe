/*var dts;
 var alx;
 var aux = 0;
 var devs;
 var max = 0;
 var dta;
 var certo;
 var count = 0;
 var subs = [];
 var d;
 var dt;
 var td;
 var sub;
 var a;
 var dados;
 */
function headerES(max) {
    th = document.createElement('thead');
    tr = document.createElement('tr');
    for (let k = 0; k < (max + 2); k++) {

        td[k] = document.createElement('th');
        if (k == 0) {
            td[k].textContent = 'dispositivo';
        } else if (k == 1) {
            td[k].textContent = 'Dia';
        } else if (k % 2 == 0) {
            td[k].textContent = 'Entrada';
        } else {
            td[k].textContent = 'Saída';
        }
        tr.append(td[k]);
        th.append(tr);
    }




    table.append(th);
}
/*
 function preencheExcelC() {
 devs = separaDev();
 dts = separaDias();
 
 dados = dts;
 /*
 * DTS
 * VETOR DIVIDO EM VARIASd PARTES
 * 3º : Geocerca    (Int)
 * 1º : ID do grupo (Int)
 * 2º : Dia         (Int)
 * 4º : Json {"evento", "data"} (String , Date)
 */
/*
 a = 0;
 tb = document.createElement('tbody');
 tr = [];
 let sub;
 //let  subs = []
 
 // M == "id do dispositivo"
 //Roda a quantidade de dispositivos 
 
 
 
 
 for (let m = 0; m < dts.length + a; m++) {
 
 count = 0;
 //Confirma se tem dados sobre o dispositivo atual
 if (dts[m] !== undefined) {
 
 // K == Id da geocerca
 for (let k = 0; k < dts[m].length; k++) {
 //Roda a quantidade de Geocercas que ele entrou
 alc = 0;
 alx = 0;
 certo = 0;
 aux = 0;
 //Confere se há dados sobre aquela geocerca
 if (dts[m][k] !== undefined) {
 //Roda a quantidade de Dias que ele entrou na Geocerca
 for (let l = 0; l < dts[m][k].length; l++) {/
 /*
 * Caso seja a primeira vez que esta passando no for, Ele gera os dados iniciais
 * 1º : Grupo
 * 2º : Geocerca
 * 3º : Dia
 * 4º : Dia da semana
 *//*
  if (dts[m][k][l] !== undefined && aux === 0) {
  tr[alc] = document.createElement('tr');
  for (let n = 0; n < dts[m][k][l].length; n++) {
  if (n === 0) {
  td[n] = document.createElement('td');
  td[n].textContent = getId(device, m);
  tr[alc].append(td[n]);
  td[n] = document.createElement('td');
  td[n].textContent = getId(geo, l);
  tr[alc].append(td[n]);
  td[n] = document.createElement('td');
  td[n].textContent = dts[m][k][l][n][1].getDate() + "/" + (dts[m][k][l][n][1].getMonth() + 1) + "/" + (dts[m][k][l][n][1].getYear() + 1900);
  tr[alc].append(td[n]);
  td[n] = document.createElement('td');
  td[n].textContent = getDiaSemana(dts[m][k][l][n][1].getDay());
  td[n].textContent = getDiaSemana(dts[m][k][l][n][1].getDay());
  tr[alc].append(td[n]);
  tb.append(tr[alc]);
  tableE.append(tb);
  }
  
  
  td[n] = document.createElement('td');
  //Caso o Alx seja 0 estaremos colocando a primeira data
  if (alx === 0) {
  td[n].textContent = dts[m][k][l][n][1].getHours() + ":" + dts[m][k][l][n][1].getMinutes();
  dta = dts[m][k][l][n];
  tr[alc].append(td[n]);
  alx++;
  } else if (alx === 2) {
  subs[subs.length] = sub;
  td[n].textContent = sub.getHours() + ":" + sub.getMinutes();
  tb.append(tr[alc]);
  tr[alc].append(td[n]);
  alx++;
  } else if ((dts[m][k][l][n][1] - dta[1]) / 6 > 15 && dts[m][k][l][n][0] !== dta[0]) {
  td[n].textContent = dts[m][k][l][n][1].getHours() + ":" + dts[m][k][l][n][1].getMinutes();
  sub = subDate(dts[m][k][l][n][1], (dta[1]));
  dta = dts[m][k][l][n];
  tr[alc].append(td[n]);
  alx++;
  if (alx == 2) {
  n--;
  }
  
  }
  if (alx === 5) {
  td[n] = document.createElement('td');
  subs[subs.length] = sub;
  td[n].textContent = sub.getHours() + ":" + sub.getMinutes();
  tr[alc].append(td[n]);
  td[n] = document.createElement('td');
  let dt = new Date();
  dt.setHours(subs[count * 2].getHours() + subs[count * 2 + 1].getHours());
  dt.setMinutes(subs[count * 2].getMinutes() + subs[count * 2 + 1].getMinutes());
  td[n].textContent = dt.getHours() + ":" + dt.getMinutes();
  tr[alc].append(td[n]);
  td[n] = document.createElement('td');
  td[n].textContent = "7 :48";
  tr[alc].append(td[n]);
  td[n] = document.createElement('td');
  var da = new Date();
  da.setHours(7);
  da.setMinutes(48);
  da.setSeconds(0);
  if (da.getTime() <= dt.getTime()) {
  dt.setMinutes(da.getMinutes() - dt.getMinutes());
  dt.setHours(da.getHours() - dt.getHours());
  td[n] = document.createElement('td');
  td[n].textContent = dt.getHours() + ": " + dt.getMinutes();
  } else {
  dt.setMinutes(da.getMinutes() - dt.getMinutes());
  dt.setHours(da.getHours() - dt.getHours());
  td[n] = document.createElement('td');
  td[n].textContent = "-" + dt.getHours() + ": " + dt.getMinutes();
  }
  tr[alc].append(td[n]);
  count++;
  }
  
  
  }
  tb.append(tr[alc]);
  aux = 1;
  } else {
  
  alc++;
  tr[alc] = document.createElement('tr');
  if (dts[m][k][l] !== undefined) {
  
  for (let n = 0; n < dts[m][k][l].length; n++) {
  
  if (n === 0) {
  
  td[n] = document.createElement('td');
  td[n].textContent = getId(device, m);
  tr[alc].append(td[n]);
  td[n] = document.createElement('td');
  td[n].textContent = getId(geo, l);
  tr[alc].append(td[n]);
  td[n] = document.createElement('td');
  td[n].textContent = dts[m][k][l][n][1].getDate() + "/" + (dts[m][k][l][n][1].getMonth() + 1) + "/" + (dts[m][k][l][n][1].getYear() + 1900);
  tr[alc].append(td[n]);
  td[n] = document.createElement('td');
  td[n].textContent = getDiaSemana(dts[m][k][l][n][1].getDay());
  td[n].textContent = getDiaSemana(dts[m][k][l][n][1].getDay());
  tr[alc].append(td[n]);
  tb.append(tr[alc]);
  tableE.append(tb);
  }
  
  
  td[n] = document.createElement('td');
  //Caso o Alx seja 0 estaremos colocando a primeira data
  if (alx === 0) {
  td[n].textContent = dts[m][k][l][n][1].getHours() + ":" + dts[m][k][l][n][1].getMinutes();
  dta = dts[m][k][l][n];
  tr[alc].append(td[n]);
  alx++;
  } else if (alx === 2) {
  subs[subs.length] = sub;
  td[n].textContent = sub.getHours() + ":" + sub.getMinutes();
  tb.append(tr[alc]);
  tr[alc].append(td[n]);
  alx++;
  } else if ((dts[m][k][l][n][1] - dta[1]) / 6 > 15 && dts[m][k][l][n][0] !== dta[0]) {
  td[n].textContent = dts[m][k][l][n][1].getHours() + ":" + dts[m][k][l][n][1].getMinutes();
  sub = subDate(dts[m][k][l][n][1], (dta[1]));
  dta = dts[m][k][l][n];
  tr[alc].append(td[n]);
  alx++;
  if (alx == 2) {
  n--;
  }
  }
  if (alx === 5) {
  td[n] = document.createElement('td');
  subs[subs.length] = sub;
  td[n].textContent = sub.getHours() + ":" + sub.getMinutes();
  tr[alc].append(td[n]);
  td[n] = document.createElement('td');
  let dt = new Date();
  dt.setHours(subs[count * 2].getHours() + subs[count * 2 + 1].getHours());
  dt.setMinutes(subs[count * 2].getMinutes() + subs[count * 2 + 1].getMinutes());
  td[n].textContent = dt.getHours() + ":" + dt.getMinutes();
  tr[alc].append(td[n]);
  td[n] = document.createElement('td');
  td[n].textContent = "7 :48";
  tr[alc].append(td[n]);
  td[n] = document.createElement('td');
  var da = new Date();
  da.setHours(7);
  da.setMinutes(48);
  da.setSeconds(0);
  if (da.getTime() <= dt.getTime()) {
  dt.setMinutes(da.getMinutes() - dt.getMinutes());
  dt.setHours(da.getHours() - dt.getHours());
  td[n] = document.createElement('td');
  td[n].textContent = dt.getHours() + ": " + dt.getMinutes();
  } else {
  dt.setMinutes(da.getMinutes() - dt.getMinutes());
  dt.setHours(da.getHours() - dt.getHours());
  td[n] = document.createElement('td');
  td[n].textContent = "-" + dt.getHours() + ": " + dt.getMinutes();
  }
  tr[alc].append(td[n]);
  count++;
  }
  
  
  }
  
  }
  }
  
  }
  
  tb.append(tr[alc]);
  alc++;
  }
  
  }
  }
  }
  
  
  tableE.append(tb);
  }
  */