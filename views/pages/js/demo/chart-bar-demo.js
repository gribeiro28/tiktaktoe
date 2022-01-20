// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myBarChart = new Chart(ctx, {
    type: 'bar',
    backgroudColor: '#b1b1b1',
    data: {
        labels: [""],
        datasets: [{
                label: "temperatura",
                backgroundColor: "rgba(2,117,216,1)",
                borderColor: "rgba(2,117,216,1)",
                data: [0],
            }, {
                label: "Demanda",
                backgroundColor: "rgba(100,10,40,1)",
                borderColor: "rgba(100,10,40,1)",
                data: [0],
            }],
    },
    options: {
        scales: {
            xAxes: [{
                    time: {
                        unit: 'month'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 12
                    }
                }],
            yAxes: [{
                    ticks: {
                        min: 0,
                        max: 30,
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        display: true
                    }
                }],
        },
        legend: {
            display: true
        }
    }
});
