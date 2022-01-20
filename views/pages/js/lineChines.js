var teste;
var dom = document.getElementById("myLine");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    animation: false,
    position: 'start',
    textStyle: {
        color: '#fff'
    }, tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        boundaryGap: false
    },
    yAxis: {
        splitLine: {
            show: false
        }
    },
    dataZoom: [{
            startValue: 0
        }, {
            type: 'inside'
        }],

    visualMap: {
        top: 5,
        orient: 'horizontal',
        textStyle: {
            color: '#aaa'
        },
        pieces: [{
                gt: 0,
                lte: 10,
                color: '#0f0'

            }, {
                gt: 10,
                lte: 20,
                color: '#f82'
            }, {
                gt: 20,
                lte: 30,
                color: '#f00'
            }],
        outOfRange: {
            color: '#f00'
        }
    },
    series: {
        name: 'Porcentagem na atividade',
        type: 'line',
        symbolSize: 3,
        lineStyle: {
            normal: {
                width: 1
            }
        },

        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        smooth: false,
        markLine: {
            silent: false,
            data: [{
                    yAxis: 10,
                    lineStyle: {
                        color: '#0f0'
                    }

                }, {
                    yAxis: 20,
                    lineStyle: {

                        color: '#f82'

                    }
                }, {
                    yAxis: 30,
                    lineStyle: {

                        color: '#f00'

                    }
                }]
        }
    }
};

myChart.setOption(option, true);
teste = myChart.getOption();
