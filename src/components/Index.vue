<style lang="scss" scoped>
* {
  -webkit-box-sizing:  border-box;
     -moz-box-sizing:  border-box;
	      box-sizing:  border-box;
}
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
  color: rgb(165, 164, 164);
  height:200px;
  width:300px;
  top:80px;
  left: 20px;
  padding: 25px;
  @include card;
}
.charts-container {
  width: 400px;
  top: 80px;
  right: 20px;
  @include card;
}
select,option,select:active,select:visited {
  margin-left: 20px;
  color: #fff;
  background-color: rgba(2, 2, 2, 0);
  border:none;
  outline:none;
}
.select-title,select {
  margin-bottom: 10px;
  display: inline-block;
}
option{
  background-color:rgba(22, 22, 22, 0.815);
}
.checkbutton {
  display: block;
  background-color: rgb(97, 94, 94);
  border: none;
  color: white;
  font-family:Arial;
  padding: 10px 24px;
  width: 240px;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 2px;
}
</style>
<template lang="pug">
div
  .map(id="myChart",
    :style="{width:'100%',height:mapHeight}"
  )
  .func-container
    div
      div.select-title 灾害类型
      select.select(v-model="type")
        option(value="空气质量") 空气质量
        option(value ="地震") 地震
        option(value="台风") 台风
    div(v-if="this.type==='空气质量'")
      div.select-title 空气质量指标
      select.select(v-model="index")
        option(v-for="(a,i) in soption", :value="a.value") {{a.name}}
      button.checkbutton(@click="start") 查看
    div(v-else)
      div.select-title  日期
      select.select(v-model="e_year")
        option(v-for="(a,i) in year", :value="a") {{a}}年
      select.select(v-model="e_month")
        option(v-for="(a,i) in month", :value="a") {{a}}月
      div.select-title(v-model="erank",v-if="this.type==='地震'") 震级
      select.select(v-model="erank",v-if="this.type==='地震'")
        option(v-for="(a,i) in rank", :value="a") {{a}}
      button.checkbutton(@click="start") 查 看
  //- .charts-container(:style="{height:chartsHeight}")
  //-   div(:style="{width: '400px', height:'300px'}")
</template>

<script>
import { MP } from '../assets/build-map'
var k = [{
  value: 'AQI',
  name: 'AQI'
}, {
  value: 'PM2_5',
  name: 'PM2.5'
}, {
  value: 'PM10',
  name: 'PM10'
}]

// var d = []
// var t = []
require('echarts/extension/bmap/bmap')
export default {
  data () {
    return {
      mapHeight: 600,
      chartsHeight: 600,
      mapStyle: {
        style: 'dark'
      },
      soption: k,
      type: '空气质量',
      index: '',
      e_month: '1',
      e_year: '2014',
      year: ['2014', '2015', '2016', '2017', '2018', '2019'],
      month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      rank: ['1', '2', '3', '4', '5', '6', '7', '8'],
      erank: '1'
    }
  },
  watch: {
    type (a) {
      if (a === '空气质量') {
        this.soption = k
        this.index = this.soption[0].value
      }
      // else if (a === '地震') this.soption = d
      // else this.soption = t

      // this.drawLine(this.index)
    }
  },
  mounted () {
    this.mapHeight = document.documentElement.clientHeight - 60 + 'px'
    this.chartsHeight = document.documentElement.clientHeight - 60 - 40 + 'px'
    this.index = this.soption[0].value
    this.$nextTick(() => {
      MP('Xx8OKfayCncHTB0irzONqPCfhwP2g6A4').then(BMap => {
        this.$nextTick(() => {
          this.start()
        })
      })
    })
    // this.drawLine()
  },
  methods: {
    start () {
      if (this.type === '空气质量') {
        this.drawLine(this.index)
      } else if (this.type === '台风') {
        this.typhon()
      } else {
        this.earthquake()
      }
    },
    drawLine (a) {
      var myChart = this.$echarts.init(document.getElementById('myChart'), 'wonderland')
      var option = null
      // data按照这个格式获取，value改为空气质量指标，每次该空气质量指标时从后台获取全部数据，存到data变量即可
      var data = [
        {year: '2014', month: '1', name: '海门', value: 9},
        {year: '2014', month: '5', name: '鄂尔多斯', value: 12},
        {year: '2015', month: '2', name: '招远', value: 19},
        {year: '2014', month: '2', name: '天津', value: 300, myId: 5},
        {year: '2016', month: '2', name: '北京', value: 40},
        {year: '2016', month: '2', name: '济南', value: 12},
        {year: '2017', month: '2', name: '上海', value: 42},
        {year: '2017', month: '2', name: '成都', value: 10},
        {year: '2017', month: '2', name: '长沙', value: 46},
        {year: '2017', month: '2', name: '南京', value: 70},
        {year: '2017', month: '2', name: '哈尔滨', value: 50},
        {year: '2017', month: '3', name: '北京', value: 120},
        {year: '2017', month: '2', name: '北京', value: 250},
        {year: '2017', month: '3', name: '上海', value: 42},
        {year: '2017', month: '3', name: '成都', value: 30},
        {year: '2017', month: '3', name: '长沙', value: 200},
        {year: '2017', month: '3', name: '南京', value: 75},
        {year: '2017', month: '3', name: '哈尔滨', value: 90},
        {year: '2017', month: '4', name: '北京', value: 40},
        {year: '2017', month: '4', name: '上海', value: 121},
        {year: '2017', month: '4', name: '成都', value: 80},
        {year: '2017', month: '4', name: '长沙', value: 150},
        {year: '2017', month: '4', name: '南京', value: 90},
        {year: '2017', month: '4', name: '哈尔滨', value: 220},
        {year: '2017', month: '4', name: '北京', value: 99}
      ]
      this.$axios.post(`/air`, {
        type: 'air',
        index: a
      }).then((res) => {
        data = res.data
        console.log(data)
        var geoCoordMap = {// 城市位置
          '海门': [121.15, 31.89],
          '鄂尔多斯': [109.781327, 39.608266],
          '招远': [120.38, 37.35],
          '舟山': [122.207216, 29.985295],
          '齐齐哈尔': [123.97, 47.33],
          '盐城': [120.13, 33.38],
          '赤峰': [118.87, 42.28],
          '青岛': [120.33, 36.07],
          '乳山': [121.52, 36.89],
          '金昌': [102.188043, 38.520089],
          '泉州': [118.58, 24.93],
          '莱西': [120.53, 36.86],
          '日照': [119.46, 35.42],
          '胶南': [119.97, 35.88],
          '南通': [121.05, 32.08],
          '拉萨': [91.11, 29.97],
          '云浮': [112.02, 22.93],
          '梅州': [116.1, 24.55],
          '文登': [122.05, 37.2],
          '上海': [121.48, 31.22],
          '攀枝花': [101.718637, 26.582347],
          '威海': [122.1, 37.5],
          '承德': [117.93, 40.97],
          '厦门': [118.1, 24.46],
          '汕尾': [115.375279, 22.786211],
          '潮州': [116.63, 23.68],
          '丹东': [124.37, 40.13],
          '太仓': [121.1, 31.45],
          '曲靖': [103.79, 25.51],
          '烟台': [121.39, 37.52],
          '福州': [119.3, 26.08],
          '瓦房店': [121.979603, 39.627114],
          '即墨': [120.45, 36.38],
          '抚顺': [123.97, 41.97],
          '玉溪': [102.52, 24.35],
          '张家口': [114.87, 40.82],
          '阳泉': [113.57, 37.85],
          '莱州': [119.942327, 37.177017],
          '湖州': [120.1, 30.86],
          '汕头': [116.69, 23.39],
          '昆山': [120.95, 31.39],
          '宁波': [121.56, 29.86],
          '湛江': [110.359377, 21.270708],
          '揭阳': [116.35, 23.55],
          '荣成': [122.41, 37.16],
          '连云港': [119.16, 34.59],
          '葫芦岛': [120.836932, 40.711052],
          '常熟': [120.74, 31.64],
          '东莞': [113.75, 23.04],
          '河源': [114.68, 23.73],
          '淮安': [119.15, 33.5],
          '泰州': [119.9, 32.49],
          '南宁': [108.33, 22.84],
          '营口': [122.18, 40.65],
          '惠州': [114.4, 23.09],
          '江阴': [120.26, 31.91],
          '蓬莱': [120.75, 37.8],
          '韶关': [113.62, 24.84],
          '嘉峪关': [98.289152, 39.77313],
          '广州': [113.23, 23.16],
          '延安': [109.47, 36.6],
          '太原': [112.53, 37.87],
          '清远': [113.01, 23.7],
          '中山': [113.38, 22.52],
          '昆明': [102.73, 25.04],
          '寿光': [118.73, 36.86],
          '盘锦': [122.070714, 41.119997],
          '长治': [113.08, 36.18],
          '深圳': [114.07, 22.62],
          '珠海': [113.52, 22.3],
          '宿迁': [118.3, 33.96],
          '咸阳': [108.72, 34.36],
          '铜川': [109.11, 35.09],
          '平度': [119.97, 36.77],
          '佛山': [113.11, 23.05],
          '海口': [110.35, 20.02],
          '江门': [113.06, 22.61],
          '章丘': [117.53, 36.72],
          '肇庆': [112.44, 23.05],
          '大连': [121.62, 38.92],
          '临汾': [111.5, 36.08],
          '吴江': [120.63, 31.16],
          '石嘴山': [106.39, 39.04],
          '沈阳': [123.38, 41.8],
          '苏州': [120.62, 31.32],
          '茂名': [110.88, 21.68],
          '嘉兴': [120.76, 30.77],
          '长春': [125.35, 43.88],
          '胶州': [120.03336, 36.264622],
          '银川': [106.27, 38.47],
          '张家港': [120.555821, 31.875428],
          '三门峡': [111.19, 34.76],
          '锦州': [121.15, 41.13],
          '南昌': [115.89, 28.68],
          '柳州': [109.4, 24.33],
          '三亚': [109.511909, 18.252847],
          '自贡': [104.778442, 29.33903],
          '吉林': [126.57, 43.87],
          '阳江': [111.95, 21.85],
          '泸州': [105.39, 28.91],
          '西宁': [101.74, 36.56],
          '宜宾': [104.56, 29.77],
          '呼和浩特': [111.65, 40.82],
          '成都': [104.06, 30.67],
          '大同': [113.3, 40.12],
          '镇江': [119.44, 32.2],
          '桂林': [110.28, 25.29],
          '张家界': [110.479191, 29.117096],
          '宜兴': [119.82, 31.36],
          '北海': [109.12, 21.49],
          '西安': [108.95, 34.27],
          '金坛': [119.56, 31.74],
          '东营': [118.49, 37.46],
          '牡丹江': [129.58, 44.6],
          '遵义': [106.9, 27.7],
          '绍兴': [120.58, 30.01],
          '扬州': [119.42, 32.39],
          '常州': [119.95, 31.79],
          '潍坊': [119.1, 36.62],
          '重庆': [106.54, 29.59],
          '台州': [121.420757, 28.656386],
          '南京': [118.78, 32.04],
          '滨州': [118.03, 37.36],
          '贵阳': [106.71, 26.57],
          '无锡': [120.29, 31.59],
          '本溪': [123.73, 41.3],
          '克拉玛依': [84.77, 45.59],
          '渭南': [109.5, 34.52],
          '马鞍山': [118.48, 31.56],
          '宝鸡': [107.15, 34.38],
          '焦作': [113.21, 35.24],
          '句容': [119.16, 31.95],
          '北京': [116.46, 39.92],
          '徐州': [117.2, 34.26],
          '衡水': [115.72, 37.72],
          '包头': [110, 40.58],
          '绵阳': [104.73, 31.48],
          '乌鲁木齐': [87.68, 43.77],
          '枣庄': [117.57, 34.86],
          '杭州': [120.19, 30.26],
          '淄博': [118.05, 36.78],
          '鞍山': [122.85, 41.12],
          '溧阳': [119.48, 31.43],
          '库尔勒': [86.06, 41.68],
          '安阳': [114.35, 36.1],
          '开封': [114.35, 34.79],
          '济南': [117, 36.65],
          '德阳': [104.37, 31.13],
          '温州': [120.65, 28.01],
          '九江': [115.97, 29.71],
          '邯郸': [114.47, 36.6],
          '临安': [119.72, 30.23],
          '兰州': [103.73, 36.03],
          '沧州': [116.83, 38.33],
          '临沂': [118.35, 35.05],
          '南充': [106.110698, 30.837793],
          '天津': [117.2, 39.13],
          '富阳': [119.95, 30.07],
          '泰安': [117.13, 36.18],
          '诸暨': [120.23, 29.71],
          '郑州': [113.65, 34.76],
          '哈尔滨': [126.63, 45.75],
          '聊城': [115.97, 36.45],
          '芜湖': [118.38, 31.33],
          '唐山': [118.02, 39.63],
          '平顶山': [113.29, 33.75],
          '邢台': [114.48, 37.05],
          '德州': [116.29, 37.45],
          '济宁': [116.59, 35.38],
          '荆州': [112.239741, 30.335165],
          '宜昌': [111.3, 30.7],
          '义乌': [120.06, 29.32],
          '丽水': [119.92, 28.45],
          '洛阳': [112.44, 34.7],
          '秦皇岛': [119.57, 39.95],
          '株洲': [113.16, 27.83],
          '石家庄': [114.48, 38.03],
          '莱芜': [117.67, 36.19],
          '常德': [111.69, 29.05],
          '保定': [115.48, 38.85],
          '湘潭': [112.91, 27.87],
          '金华': [119.64, 29.12],
          '岳阳': [113.09, 29.37],
          '长沙': [113, 28.21],
          '衢州': [118.88, 28.97],
          '廊坊': [116.7, 39.53],
          '菏泽': [115.480656, 35.23375],
          '合肥': [117.27, 31.86],
          '武汉': [114.31, 30.52],
          '大庆': [125.03, 6.58]
        }
        var getValue = function (data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            res.push(data[i].value)
          }
          return res
        }

        var getName = function (data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            res.push(data[i].name)
          }
          return res
        }

        var extractData = function (data, date) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var str = date.split('-')
            if (str[0] === data[i].year && str[1] === data[i].month) {
              res.push(data[i])
            }
          }
          return res
        }

        var convertData = function (data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name]
            if (geoCoord) {
              if (data[i].myId) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value),
                  myId: data[0].myId
                })
              } else {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
                })
              }
            }
          }
          return res
        }

        option = {
          baseOption: {
            timeline: {
              axisType: 'category',
              orient: 'horizontal',
              autoPlay: true,
              playInterval: 1000,
              bottom: 20,
              left: 100,
              right: 100,
              symbol: 'none',
              label: {
                normal: {
                  textStyle: {
                    color: '#999'
                  }
                },
                emphasis: {
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              lineStyle: {
                color: '#555'
              },
              checkpointStyle: {
                color: '#bbb',
                borderColor: '#777',
                borderWidth: 2
              },
              controlStyle: {
                showNextBtn: false,
                showPrevBtn: false,
                normal: {
                  color: '#666',
                  borderColor: '#666'
                },
                emphasis: {
                  color: '#aaa',
                  borderColor: '#aaa'
                }
              },
              data: ['2014-1', '2014-2', '2014-3', '2014-4', '2014-5', '2014-6', '2014-7', '2014-8', '2014-9', '2014-10', '2014-11', '2014-12',
                '2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12',
                '2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12',
                '2017-1', '2017-2', '2017-3', '2017-4', '2017-5', '2017-6', '2017-7', '2017-8', '2017-9', '2017-10', '2017-11', '2017-12',
                '2018-1', '2018-2', '2018-3', '2018-4', '2018-5', '2018-6', '2018-7', '2018-8', '2018-9', '2018-10', '2018-11', '2018-12',
                '2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10']
            },
            bmap: {
              center: [115.114129, 37.550339],
              zoom: 5,
              roam: false,
              mapStyle: {
                style: 'dark'
              }
            }
          },
          options: []
        }

        for (var n = 0; n < 70; n++) {
        // option.baseOption.timeline.data.push(data.timeline[n]);
          option.options.push({
            title: {
              text: '全国主要城市空气质量  ' + option.baseOption.timeline.data[n].split('-')[0] + '年' + option.baseOption.timeline.data[n].split('-')[1] + '月',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              paramformatter: function (params) {
                var htmlStr = '<div class="info"><p>' + params.data.name + '</p><p>' + '指数:' + params.data.value[2] + '</p></div>'
                return htmlStr
              }
            },
            xAxis: {
              type: 'category',
              data: getName(extractData(data, option.baseOption.timeline.data[n]).sort(function (a, b) {
                return b.value - a.value
              }).slice(0, 5)),
              splitLine: {show: false}, // 去除网格线
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#fff', // 左边线的颜色
                  width: '2'// 坐标线的宽度
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#fff' // 坐标值得具体的颜色
                }
              }
            },
            yAxis: {
              splitLine: {show: false}, // 去除网格线
              type: 'value',
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#fff', // 左边线的颜色
                  width: '2'// 坐标线的宽度
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#fff' // 坐标值得具体的颜色
                }
              }
            },
            grid: {
              left: '72%', // 与容器左侧的距离
              // right: '10%', // 与容器右侧的距离
              // top: '5%',   // 与容器顶部的距离
              bottom: '60%' // 与容器底部的距离
            },
            series: [
              {
                name: '空气污染指数Top5',
                data: getValue(extractData(data, option.baseOption.timeline.data[n]).sort(function (a, b) {
                  return b.value - a.value
                }).slice(0, 5)),
                type: 'bar'

              },
              {
                name: this.index, // 这里需要改成选择的空气质量指标
                type: 'scatter',
                coordinateSystem: 'bmap',
                data: convertData(extractData(data, option.baseOption.timeline.data[n])),
                symbolSize: function (val) {
                  let d = parseInt(val[2] / 50) + 1
                  return d * 4
                },
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#F5D101'
                  }
                }
              },
              {
                name: this.index + 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: convertData(extractData(data, option.baseOption.timeline.data[n]).sort(function (a, b) {
                  return b.value - a.value
                }).slice(0, 5)),
                symbolSize: function (val) {
                  let d = parseInt(val[2] / 50) + 1
                  return d * 4
                },
                showEffectOn: 'render',
                rippleEffect: {
                  brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#F5D101',
                    shadowBlur: 10,
                    shadowColor: '#333'
                  }
                },
                zlevel: 1
              }
            ]
          })
        }
        if (option && typeof option === 'object') {
          myChart.setOption(option, true)
        }
      })
    },
    epoint (params) {
      this.$axios.post(`/ethqkLoc`, {
        type: '地震',
        location: params.data.name[0] + params.data.name[1]
      }).then((res) => {
        console.log(res)
      })
    },
    earthquake () {
      var myChart = this.$echarts.init(document.getElementById('myChart'), 'wonderland')
      var option = null
      var data = []
      myChart.on('click', function (params) {
        console.log(params.data.name[0] + params.data.name[1])
        this.epoint(params)
      })
      this.$axios.post(`/earthquake`, {
        type: 'earthquake',
        year: this.e_year,
        month: this.e_month,
        erank: this.erank
      }).then((res) => {
        data = res.data
        console.log(data)
        var convertData = function (data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            let v = []
            v.push(data[i].longitude)
            v.push(data[i].latitude)
            v.push(data[i].erank)
            res.push({
              name: data[i].位置,
              value: v,
              year: data[i].year,
              month: data[i].month,
              depth: data[i].震源深度}
            )
          }
          return res
        }
        option = {
          title: {
            text: '全国地震灾害记录',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              var htmlStr = '<div class="info"><p>' + params.data.name +
              '</p><p>震级:' + params.data.value[2] +
              '</p><p>震源深度:' + params.data.depth +
              '</p><p>日期:' + params.data.year + '-' + params.data.month +
              '</p></div>'
              return htmlStr
            }
          },
          bmap: {
            center: [115.114129, 37.550339],
            zoom: 5,
            roam: false,
            mapStyle: {
              style: 'dark'
            }
          },
          series: [
            {
              name: this.index, // 这里需要改成选择的空气质量指标
              type: 'scatter',
              coordinateSystem: 'bmap',
              data: convertData(data),
              symbolSize: function (val) {
                return val[2] * 4
              },
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#F5D101'
                }
              }
            },
            {
              name: this.index + 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'bmap',
              data: convertData(data).sort(function (a, b) {
                return b.value - a.value
              }).slice(0, 5),
              symbolSize: function (val) {
                return val[2] * 4
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#F5D101',
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
      )
    },

    typhon () {
      var myChart = this.$echarts.init(document.getElementById('myChart'), 'wonderland')
      var option = null
      var data = []
      this.$axios.post(`/typhoon`, {
        type: 'typhoon',
        year: this.e_year,
        month: this.e_month
      }).then((res) => {
        data = res.data
        console.log(data)
        var convertData = function (data) {
          var res = []
          var result = []
          var num = data[0].num
          for (var i = 0; i < data.length; i++) {
            if (num === data[i].num) {
              res.push(
                [data[i].longitude, data[i].latitude]
              )
            } else {
              result.push({
                name: data[i - 1].name,
                symbol: 'circle',
                coords: res,
                lineStyle: {
                  width: 3
                }
              })
              res = []
              num = data[i].num
            }
          }
          result.push({
            name: data[data.length - 1].name,
            symbol: 'circle',
            coords: res,
            lineStyle: {
              width: 3
            }
          })
          return result
        }

        option = {
          title: {
            text: '台风路径示意图',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          bmap: {
            center: [115.114129, 37.550339],
            zoom: 5,
            roam: true,
            mapStyle: {
              style: 'dark'
            }
          },
          series: {
            data: convertData(data),
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true
          }

        }
        if (option && typeof option === 'object') {
          myChart.setOption(option, true)
        }
      })
    }
  }
}
</script>
