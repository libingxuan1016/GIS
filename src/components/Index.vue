<template lang="pug">
  baidu-map.map(center="中国",
    :zoom="5",
    :min-zoom="5",
    :scroll-wheel-zoom="true",
    mapType="BMAP_HYBRID_MAP",
  )
    //- :style="{height:mapHeight}")
</template>

<script>
export default {
  data () {
    return {
      mapHeight: 600
    }
  },
  mounted () {
    this.mapHeight = document.body.clientHeight + 'px'
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 200px;
}
</style>
