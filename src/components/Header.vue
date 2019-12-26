<template lang="pug">
.header-container
  img(src="../assets/title.png")
  //- .title 自然灾害查询系统
  //- li.link
  //-   router-link(to="/", exact, tag="li") 功能1
  //- li.link
  //-   router-link(to="/", tag="li") 功能2
  //- li.link
  //-   router-link(to="/", tag="li") 功能3

</template>

<style lang="scss" scoped>
img{
  width: 250px;
  top: 10px;
  position:absolute;
  left:40%;
}
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
  background-color:rgb(17, 17, 17);
  box-shadow: 0 5px 20px rgba(37, 36, 36, 0.705);
  width: 100%;
  height: 60px;
}
</style>
