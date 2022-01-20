var gaugeOption;
if (document.getElementById("gaugeChines0") !== null) {

    var dom0 = document.getElementById("gaugeChines0");
}

if (document.getElementById("gaugeChines1") !== null) {

    var dom1 = document.getElementById("gaugeChines1");
}

if (document.getElementById("gaugeChines2") !== null) {

    var dom2 = document.getElementById("gaugeChines2");
}

if (document.getElementById("gaugeChines3") !== null) {

    var dom3 = document.getElementById("gaugeChines3");
}

if (document.getElementById("gaugeChines4") !== null) {

    var dom4 = document.getElementById("gaugeChines4");
}

var myGaugeChart = [];
if (dom0 !== null) {
    myGaugeChart[0] = echarts.init(dom0);
}

if (dom1 !== null) {
    myGaugeChart[1] = echarts.init(dom1);
}

if (dom2 !== null) {
    myGaugeChart[2] = echarts.init(dom2);
}

if (dom3 !== null) {
    myGaugeChart[3] = echarts.init(dom3);
}

if (dom4 !== null) {
    myGaugeChart[4] = echarts.init(dom4);
}

var app = {};
gaugeOption = null;
gaugeOption = {
    tooltip: {
        formatter: "{a} <br/>{c} {b}"
    }, title: {
        text: 'Sem Serviço',
        x: 'center',
        textStyle: {
            color: '#fff'
        }

    },

    series: [
        {
            name: 'Temperatura',
            type: 'gauge',
            min: 0,
            max: 60,

            splitNumber: 10,
            radius: '50%',
            axisLine: {// 坐标轴线
                lineStyle: {// 属性lineStyle控制线条样式
                    color: [[0.1, '#ff4500'], [0.4, '#ffff00'], [0.7, '#00ff00'], [0.9, '#ffff00'], [1, '#ff4500']],
                    width: 4,
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 8
                }
            },
            axisLabel: {// 坐标轴小标记
                textStyle: {// 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    color: '#fff0',
                    shadowColor: '#fff0', //默认透明
                    shadowBlur: 10
                }
            },
            axisTick: {// 坐标轴小标记
                length: 0, // 属性length控制线长
                lineStyle: {// 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            splitLine: {// 分隔线
                length: 25, // 属性length控制线长
                lineStyle: {// 属性lineStyle（详见lineStyle）控制线条样式
                    width: 3,
                    color: '#fff0',
                    shadowColor: '#fff0', //默认透明
                    shadowBlur: 6
                }
            },
            pointer: {// 分隔线
                shadowColor: '#fff', //默认透明
                shadowBlur: 2,
                width: 8
            },
            title: {

                textStyle: {// 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic',
                    color: '#fff',
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            detail: {
                backgroundColor: 'rgba(120,120,120,0)',
                borderWidth: 1,
                borderColor: '#0000',
                shadowColor: '#fff', //默认透明
                shadowBlur: 8,
                offsetCenter: [0, '50%'], // x, y，单位px
                textStyle: {// 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: '25',
                    color: 'auto'
                }
            },
            data: [{value: 30, name: ''}]

        }
    ]
};
if (dom0 !== null) {
    gaugeOption.series[0].pointer.width = 6;
    myGaugeChart[0].setOption(gaugeOption, true);
}
if (dom1 !== null) {

    gaugeOption.series[0].detail.textStyle.fontSize = '15';
    gaugeOption.series[0].pointer.width = 2;
    myGaugeChart[1].setOption(gaugeOption, true);
}
if (dom2 !== null) {
    gaugeOption.series[0].detail.textStyle.fontSize = '15';
    gaugeOption.series[0].pointer.width = 2;
    myGaugeChart[2].setOption(gaugeOption, true);
}
if (dom3 !== null) {
    gaugeOption.series[0].detail.textStyle.fontSize = '15';
    gaugeOption.series[0].pointer.width = 2;
    myGaugeChart[3].setOption(gaugeOption, true);
}
if (dom4 !== null) {
    gaugeOption.series[0].detail.textStyle.fontSize = '15';
    gaugeOption.series[0].pointer.width = 2;
    myGaugeChart[4].setOption(gaugeOption, true);
}
gaugeOption.title.text = '';