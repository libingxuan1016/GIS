<template lang="pug">
div
  .header-container
    div nihao
  div
    router-view
</template>

<script>
import appHeader from './components/Header.vue'

export default {
  name: 'App',
  components: {
    appHeader
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  z-index:9 !important;
  background: red;
  height: 50px;
}
</style>
