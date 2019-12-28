<style lang="scss" scoped>
.welcome-container {
  position: relative;
}
img {
  width:100%;
}
button {
    position: absolute;
    z-index: 9;
    top: 450px;
    left: 610px;
    border: 2px solid;
    border-color: rgb(228, 227, 227);
    color: rgb(228, 227, 227);
    background: rgba(0,0,0,0);
    border-radius: 30px;
    height: 60px;
    width: 250px;
    outline:none;
}
.button1 {
  top: 350px;
}
.title {
      position: absolute;
    top: 200px;
    left: 490px;
    color: white;
    letter-spacing: 5px;
    font-size: 40px;
}
</style>
<template lang="pug">
.welcome-container
  .title 灾害数据可视化和景点查询
  img(src="../assets/background.png")
  router-link(to="/show")
    button.button1 灾害展示
  router-link(to="/path")
    button 景点查询
</template>
