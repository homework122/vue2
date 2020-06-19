<template>
  <div id="app">
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

}
.main{
  width: 90%;
  height: 780px;
  margin: 0 auto;
  z-index: 100;
  border-radius: 50px;
  border:1px solid black;
  overflow: hidden;
}
</style>
