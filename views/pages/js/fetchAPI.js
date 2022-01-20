var lastUp = document.getElementsByClassName("lastUp");

function fetchAPI() {
    fetch("http://192.192.1.116:3000/select").then(
            function (resp) {
                resp.json().then(function (json) {
                    console.log(json);

                    for (let a = 0; a < lastUp.length; a++) {
                        lastUp[a].textContent = "Atualizado às: " + json[json.length - 1].dt;
                    }

                    gaugeOption.series[0].data[0] = json[0].tempS;
                    gaugeOption.series[0].pointer.width = 6;
                    gaugeOption.series[0].detail.textStyle.fontSize = '25';
                    myGaugeChart[0].setOption(gaugeOption, true);


                    gaugeOption.series[0].data[0] = json[0].tempA;
                    gaugeOption.series[0].pointer.width = 2;
                    gaugeOption.series[0].detail.textStyle.fontSize = '15';
                    myGaugeChart[1].setOption(gaugeOption, true);


                    gaugeOption.series[0].data[0] = json[0].tempE;
                    gaugeOption.series[0].pointer.width = 2;
                    myGaugeChart[2].setOption(gaugeOption, true);


                    gaugeOption.series[0].data[0] = json[0].temp;
                    gaugeOption.series[0].pointer.width = 2;
                    myGaugeChart[3].setOption(gaugeOption, true);


                    gaugeOption.series[0].data[0] = json[0].dem;
                    gaugeOption.series[0].pointer.width = 2;
                    myGaugeChart[4].setOption(gaugeOption, true);


                });
            });
}

fetchAPI();
setInterval(fetchAPI, 2000);
