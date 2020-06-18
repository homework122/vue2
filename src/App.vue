<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
<<<<<<< HEAD
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
  /*background: #8D8CD8;*/
}
</style>
=======
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
    /*background: #8D8CD8;*/
  }
</style>
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
