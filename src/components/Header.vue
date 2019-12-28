<template lang="pug">
.header-container
  .logo-container
    img(src="../assets/logo.png")
    h1 灾害数据可视化和景点查询
  div.li1.li
    li.link
      router-link(to="/", exact, tag="li") 首页
  div.li2.li
    li.link
      router-link(to="/show", exact, tag="li") 灾害展示
  div.li.li3
    li.link
      router-link(to="/path", tag="li") 景点查询
  //- li.link
  //-   router-link(to="/", tag="li") 功能3

</template>

<style lang="scss" scoped>
.logo-container {
  display: inline-block;
    margin: 5px;
}
h1 {
    margin: 0;
    color: white;
    font-size: 25px;
    font-weight: 400;
    /* padding-top: 15px; */
    /* padding-left: 8px; */
    display: inline-block;
    position: absolute;
    left: 40px;
    top: 15px;
}
img{
  width: 30px;
    position: absolute;
    top: 15px;
}
li {
  list-style: none;
  display: inline-block;
  color: rgba(255, 255, 255, 0.808);
}
.li {
    margin-left:20px;
    position: absolute;
    bottom:17px;
    cursor: pointer;
}
li:hover,li:visited{
  color:'#fff';
}
.li1{
  left:400px;
}
.li2 {
  left:480px;
}
.li3 {
  left:600px;
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
