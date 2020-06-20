<template>
  <div id="app">
          <img src="./assets/bg.jpg" alt="" style="position: absolute;left: 0;top: 0; width:100%;height:100%;opacity:0.1;">
   <div class="main">
      <router-view v-if="isRouterAlive"></router-view>

   </div>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
.section {
  background: firebrick;
  margin-left: 30px;
}
#app {
  /* background: url("./assets/bg.jpg") no-repeat;
  background-size:100% 100%; */
  
}
.main{
  width: 90%;
  height: 750px;
  margin: 0 auto;
  z-index: 100;
  border-radius: 50px;
  border:1px solid black;
  overflow: scroll;
}
.main::-webkit-scrollbar{width:0;}
</style>
