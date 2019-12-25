<template lang="pug">
.header-container
  .title 自然灾害查询系统
  //- li.link
  //-   router-link(to="/", exact, tag="li") 功能1
  //- li.link
  //-   router-link(to="/", tag="li") 功能2
  //- li.link
  //-   router-link(to="/", tag="li") 功能3

</template>

<style lang="scss" scoped>
li {
  list-style: none;
  display: inline-block;
  color: white;
}
.title {
  display: inline-block;
  color: white;
  margin: auto;
  letter-spacing: 3px;
  font-size: 25px;
  position:absolute;
  top:20%;
  left: 43%;
}
.header-container {
  position:relative;
  z-index: 9;
  width: 100%;
}
</style>
