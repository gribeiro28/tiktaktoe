var teste;
var dom = document.getElementById("myPie");
var myPie = echarts.init(dom);
var app = {};
option = null;
var pie;
option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
        {
            name: "Atividade/Dias (Porcentagem do total)",
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [{data: 1, name: "1-Recebimento"}, {data: 2, name: "2-RRU"}],
            itemStyle: {
                emphasis: {
                    shadowBlur: 20,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myPie.setOption(option, true);
pie = myPie.getOption();