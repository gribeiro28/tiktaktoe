var tcheison;

function fetchSelect() {

    let mes = document.getElementById('mes').value;
    let url = "http://192.192.1.200:4000/select/" + ano.value + "&" + mes;

    fetch(url).then(
            function (resp) {
                resp.json().then(function (jsonQ) {

                    var t = window.location.search.split("=");

                    geraCalendar();
                    geraBody(jsonQ);
                }
                );
            }
    );
}

function fetchPeriodo() {
    let inicio = document.getElementById("inicio").value;
    let fim = document.getElementById("fim").value;

    let url = "http://192.192.1.200:4000/periodo/" + inicio + "&" + fim;
    console.log(url);
    fetch(url).then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                    console.log(jsonQ);
                    var t = window.location.search.split("=");
                    geraCalendar();
                    geraBody(jsonQ);
                }
                );
            }
    );
}