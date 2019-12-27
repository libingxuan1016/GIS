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
  top:80px;
  left: 20px;
  @include card;
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
.checkbutton:active,.checkbutton:visited {
  outline:none;
  border:none;
}
</style>
<template lang="pug">
div
  .map(id="myChart",
    :style="{width:'100%',height:mapHeight}"
  )
  .func-container
    div
      button.checkbutton(@click="init") 返回
</template>

<script>
import { MP } from '../assets/build-map'
require('echarts/extension/bmap/bmap')
export default {
  data () {
    return {
      mapHeight: 600,
      chartsHeight: 600,
      mapStyle: {
        style: 'dark'
      },
      option: {}
    }
  },
  watch: {
    option: {
      deep: true,
      handler: function (newValue, old) {
        var myChart = this.$echarts.init(document.getElementById('myChart'), 'wonderland')
        if (newValue) myChart.setOption(newValue, true)
        else myChart.setOption(old.true)
      }
    }
  },
  mounted () {
    this.mapHeight = document.documentElement.clientHeight - 60 + 'px'
    this.chartsHeight = document.documentElement.clientHeight - 60 - 40 + 'px'
    this.$nextTick(() => {
      MP('Xx8OKfayCncHTB0irzONqPCfhwP2g6A4').then(BMap => {
        this.$nextTick(() => {
          this.init()
        })
      })
    })
    // this.drawLine()
  },
  methods: {
    init () {
      var myChart = this.$echarts.init(document.getElementById('myChart'), 'wonderland')
      var data = []
      var that = this
      this.$http.post(`/showCity`).then((res) => {
        data = res.data
        var convertData = function (data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            let v = []
            v.push(data[i].longitude)
            v.push(data[i].latitude)
            v.push('1')
            res.push({
              name: data[i].Cname,
              value: v,
              namee: data[i].name}
            )
          }
          return res
        }
        myChart.on('click', function (params) {
          console.log(that.option.bmap.zoom)
          if (that.option.bmap.zoom === 5) {
            that.$http.post(`/showScene`, {
              name: params.data.namee
            }).then((res) => {
              let d = res.data
              console.log(d)
              var c = function (data) {
                var res = []
                for (var i = 0; i < data.length; i++) {
                  let v = []
                  v.push(data[i].longitude)
                  v.push(data[i].latitude)
                  v.push('1')
                  res.push({
                    name: data[i].name,
                    value: v,
                    address: data[i].address}
                  )
                }
                return res
              }
              that.option = {
                title:
            {
              text: '点击您要查看的地点',
              left: '48%',
              top: '4%',
              textAlign: 'center',
              textStyle: {
                color: '#fff'
              }
            },
                tooltip: {
                  trigger: 'item',
                  formatter: function (params) {
                    var htmlStr = '<div class="info"><p>景点' + params.data.name +
                    '</p><p>地点:' + params.data.address +
                    '</p></div>'
                    return htmlStr
                  }
                },
                bmap: {
                  center: [params.data.value[0], params.data.value[1]],
                  zoom: 10,
                  roam: true,
                  mapStyle: {
                    style: 'dark'
                  }
                },
                series: [
                  {
                    name: this.index, // 这里需要改成选择的空气质量指标
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: c(d),
                    symbolSize: function (val) {
                      return val[2] * 15
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
                  }
                ]
              }
              if (that.option && typeof that.option === 'object') {
                myChart.setOption(that.option, true)
              }
            })
          }
        })
        that.option = {
          title:
            {
              text: '点击您要查看的地点',
              left: '48%',
              top: '4%',
              textAlign: 'center',
              textStyle: {
                color: '#fff'
              }
            },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              var htmlStr = '<div class="info"><p>' + params.data.name + '</p></div>'
              return htmlStr
            }
          },
          bmap: {
            center: [115.114129, 37.550339],
            zoom: 5,
            roam: true,
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
                return val[2] * 15
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
            }
          ]
        }
        if (that.option && typeof that.option === 'object') {
          myChart.setOption(that.option, true)
        }
      })
    }
  }
}
</script>
