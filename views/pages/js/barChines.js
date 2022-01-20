
var teste;
var dom = document.getElementById("myBar");
var myBar = echarts.init(dom);
var app = {};
barOption = null;
barOption = {
    textStyle: {
        color: '#fff'
    },
    legend: {
        textStyle: {

            color: '#fff'

        },
        orient: 'horizontal',
        right: 0,
        top: 0,
        bottom: 0,
        data: ['Atividade']

    },
    color: ['rgba(2, 117, 216, 1)'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {// 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: '#fff'
                }
            },
            lineStyle: {
                color: '#fff'
            },
            type: 'category',
            data: ["1-Recebimento", "2-infra", "3-Gabinete", "4-Antena ou RRU", "5-Passagem dos Cabos", "6-Movimentaçã ode TX", "7-Integração", "8-Desinstalação", "9-Documentação", "10-RSA", "11-Meio Ambimente", "12-Cliente", "13-BackOffice", "14-Finalizado"],
            axisTick: {
                alignWithLabel: false
            }
        }
    ],
    yAxis: {
        type: 'value',
        axisLine: {
            onZero: false,
            lineStyle: {
                color: '#fff'
            }
        }
    },
    series: [
        {
            name: 'Dias na atividade',
            type: 'bar',
            data: [6, 5, 4, 3, 4, 5, 6, 6, 5, 4, 3, 4, 5, 6]

        }
    ]
};
myBar.setOption(barOption, true);
bar = myBar.getOption();
/*
 if (option && typeof option === "object") {
 
 }
 */