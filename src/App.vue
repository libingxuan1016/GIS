<template lang="pug">
div
  app-header
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

<style lang="scss">
</style>
