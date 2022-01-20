function fetchCadastro() {

    let sites = document.getElementById("selectSite");
    let packs = document.getElementById("selectPacote");

    let url = "http://192.192.1.200:4000/cadastraPacote/" + sites.value + "&" + packs.value;
    console.log(url);
    console.log(sites.value);
    console.log(packs.value);

    fetch(url).then(
            function (resp) {
                resp.json().then(function (jsonQ) {});
            });
}