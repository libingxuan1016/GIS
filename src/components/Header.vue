<template lang="pug">
.header-container
  li.link
    router-link(to="/", exact, tag="li") 功能1
  li.link
    router-link(to="/", tag="li") 功能2
  li.link
    router-link(to="/", tag="li") 功能3

</template>

<style lang="scss" scoped>
li {
  list-style: none;
  display: inline-block;
}
.header-container {
  position:relative;
  z-index: 9;
  background-color:#fff;
  box-shadow: 0 5px 20px rgba(37, 36, 36, 0.664);
  width: 100%;
  height: 60px;
}
</style>
