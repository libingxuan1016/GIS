<template lang="pug">
div
  .map(id="myChart",
    :style="{width:'100%',height:mapHeight}"
  )
  .func-container
    div 选择灾害类型
  .charts-container(:style="{height:chartsHeight}")
    div(:style="{width: '400px', height:'300px'}")
</template>

<script>
import BMap from 'BMap'
require('echarts/extension/bmap/bmap')
export default {
  data () {
    return {
      mapHeight: 600,
      chartsHeight: 600,
      mapStyle: {
        style: 'dark'
      }
    }
  },
  mounted () {
    this.mapHeight = document.documentElement.clientHeight - 60 + 'px'
    this.chartsHeight = document.documentElement.clientHeight - 60 - 40 + 'px'
    this.drawLine()
  },
  methods: {
    drawLine () {
      var myChart = this.$echarts.init(document.getElementById('myChart'), 'wonderland')
      var option = null
      var data = [
        {name: '海门', value: 9},
        {name: '鄂尔多斯', value: 12},
        {name: '招远', value: 12},
        {name: '舟山', value: 12},
        {name: '齐齐哈尔', value: 14},
        {name: '盐城', value: 15},
        {name: '赤峰', value: 16},
        {name: '青岛', value: 18},
        {name: '乳山', value: 18}
      ]
      var geoCoordMap = {
        '海门': [121.15, 31.89],
        '鄂尔多斯': [109.781327, 39.608266],
        '招远': [120.38, 37.35]
      }

      var convertData = function (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      }

      option = {
        title: {
          text: '全国主要城市空气质量 - 百度地图',
          subtext: 'data from PM25.in',
          sublink: 'http://www.pm25.in',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        bmap: {
          center: [115.114129, 55.550339],
          zoom: 5,
          roam: true,
          mapStyle: {
            style: 'dark'
          }
        },
        series: [
          {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: 'purple'
              }
            }
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: convertData(data.sort(function (a, b) {
              return b.value - a.value
            }).slice(0, 6)),
            symbolSize: function (val) {
              return val[2] / 10
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: 'purple',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }
        ]
      }
      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin card {
  background: rgba(22, 22, 22, 0.815);
  position:absolute;
  border-radius: 3px;
  box-shadow: 5px 5px 20px rgba(37, 36, 36, 0.664);
}
.map {
  width: 100%;
  position:relative;
  text-align:center;
}
.func-container {
  height:200px;
  width:300px;
  top:80px;
  left: 20px;
  @include card;
}
.charts-container {
  width: 400px;
  top: 80px;
  right: 20px;
  @include card;
}
</style>
