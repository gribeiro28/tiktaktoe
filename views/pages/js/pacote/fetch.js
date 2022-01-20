var equipes = document.getElementById("selectSite");
var pacotes = document.getElementById("selectPacote");

function fetchSite() {
    let url = "http://192.192.1.200:4000/b/select id,idTraccar,site from site";
    fetch(url).then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                    console.log("Site  ");
                    console.log(jsonQ);
                    for (let l = 0; l < jsonQ.length; l++) {
                        let eq = [];
                        eq[jsonQ[l].id] = document.createElement("option");
                        eq[jsonQ[l].id].textContent = jsonQ[l].site;
                        eq[jsonQ[l].id].value = jsonQ[l].id;
                        eq[jsonQ[l].id].l = jsonQ[l].id;
                        equipes.append(eq[jsonQ[l].id]);
                    }
                });
            });
}


function fetchPacote() {
    let url = "http://192.192.1.200:4000/b/select id,pacote,dias from pacote";
    fetch(url).then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                    console.log("Pacote");
                    console.log(jsonQ);
                    for (let l = 0; l < jsonQ.length; l++) {
                        let eq = [];
                        eq[jsonQ[l].id] = document.createElement("option");
                        eq[jsonQ[l].id].textContent = jsonQ[l].pacote + " - " + jsonQ[l].dias + " dias";
                        eq[jsonQ[l].id].value = jsonQ[l].id;
                        eq[jsonQ[l].id].l = jsonQ[l].dias;
                        pacotes.append(eq[jsonQ[l].id]);
                    }
                });
            });
}

function cadastraPacote() {
    let pacote = document.getElementById("pacote");
    let dias = document.getElementById("dias");
    fetch(url).then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                });
            });
}

fetchSite();
fetchPacote();