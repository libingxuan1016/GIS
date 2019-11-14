var echarts = require("echarts");
var $ =require("jquery");
var myChart = echarts.init(document.getElementById('main'));
$.get('map.json', function (myJson){
    echarts.registerMap('MY', myJson) //注册

    var option = {     
    series: [
        {
          name: 'my custom map',
          type: 'map',
          roam: true,
          map: 'MY'       //使用
        }
      ]
    };
myChart.setOption(option);
});