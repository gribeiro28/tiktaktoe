var gtemperatura, gdemanda;
document.addEventListener("DOMContentLoaded", function (event) {
    gtemperatura = new JustGage({
        id: "gaugetemp",
        value: 15,
        min: 0,
        max: 30,
        title: "Temperatura",
        relativeGaugeSize: true,
        label: "até"
    });
    gdemanda = new JustGage({
        id: "gaugedemanda",
        value: 15,
        min: 0,
        max: 30,
        title: "Demanda",
        relativeGaugeSize: true,
        label: "até"
    });
    gtempentradachiller = new JustGage({
        id: "gaugetempentradachiller",
        value: 15,
        min: 0,
        max: 30,
        title: "Temp entrada Chiller",
        relativeGaugeSize: true,
        label: "até"
    });
    gtempsaidachiller = new JustGage({
        id: "gaugeteste",
        value: 15,
        min: 0,
        max: 30,
        title: "Temp Saída Chiller",
        relativeGaugeSize: true,
        label: "até"
    });
    gtemparexterno = new JustGage({
        id: "gaugetemparexterno",
        value: 15,
        min: 0,
        max: 30,
        title: "Temp Ar Externo",
        relativeGaugeSize: true,
        label: "até"
    });
});
var numero;