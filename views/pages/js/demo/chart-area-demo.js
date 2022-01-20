// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// Area Chart Example
var ctx = document.getElementById("myLineChart");



var myLineChart = new Chart(ctx, {
    type: 'line',
    color: '#fff',
    data: {
        labels: [],
        datasets: [{
                label: "Temperatura",
                lineTension: 0.3,
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: []
            }, {
                label: "SetPoint",
                lineTension: 0,
                backgroundColor: "rgba(100,117,216,0.2)",
                borderColor: "rgba(100,10,40,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(100,10,40,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(100,10,40,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: []
            }]
    },
    options: {

        responsiveAnimationDuration: 2,
        scales: {
            xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        maxTicksLimit: 12
                    }
                }],
            yAxes: [{

                    ticks: {
                        textColor: '#fff',
                        min: 0,
                        max: 50,
                        maxTicksLimit: 8,
                        callback: function (value, index, values) {
                            return value + " ºC";
                        }
                    },
                    gridLines: {
                        display: true
                    }
                    
                }]
        },
        legend: {
            display: true
        }
    }
});
 