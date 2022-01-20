module.exports = function Animal(from, to, device, atividade, res) {
    const fetch = require("node-fetch");
    const btoa = require('btoa');
    this.json = "req feita";
    fetch("http://138.197.104.196/api/reports/events/?from=" + from + "&to=" + to + "&deviceId=" + device + "&type=geofenceExit&type=geofenceEnter", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + btoa('bgomes@people-team.com:People01'),
            'Content-Type': 'application/json',
            'Origin': ''
        }
    }).then(
            function (resp) {
                resp.json().then(function (jsonQ) {
                    if (jsonQ[jsonQ.length - 1].type === "geofenceExit") {
                        this.resposta = {site: jsonQ[jsonQ.length - 1].geofenceId, perm: false};
                    } else if (jsonQ[jsonQ.length - 1].type === "geofenceEnter") {
                        this.resposta = {site: jsonQ[jsonQ.length - 1].geofenceId, perm: true};
                    }
                    console.log(jsonQ[jsonQ.length - 1].deviceId);

                    fetch("http://192.192.1.167:4000/insertDiaria/" + jsonQ[jsonQ.length - 1].geofenceId + "&" + device + "&" + atividade).then(
                            function (resp) {
                                resp.json().then(function (jsonQ) {

                                });
                            });
                    res.json(this.resposta);
                }
                );
            }
    );
};