<template lang="pug">
  baidu-map.map(center="中国",
    :zoom="5",
    :min-zoom="4",
    :scroll-wheel-zoom="true",
    mapType="BMAP_HYBRID_MAP",
    :style="{height:mapHeight}")
    .func-container
    .charts-container(:style="{height:chartsHeight}")
      div(id="myChart",:style="{width: '400px', height:'300px'}")
</template>

<script>
export default {
  data () {
    return {
      mapHeight: 600,
      chartsHeight: 600
    }
  },
  mounted () {
    this.mapHeight = document.documentElement.clientHeight - 60 + 'px'
    this.chartsHeight = document.documentElement.clientHeight - 60 - 40 + 'px'
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'), 'wonderland')
      // 绘制图表
      myChart.setOption({
        title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin card {
  background: rgba(255, 255, 255, 0.815);
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
  top:20px;
  left: 20px;
  @include card;
}
.charts-container {
  width: 400px;
  top: 20px;
  right: 20px;
  @include card;
}
</style>
