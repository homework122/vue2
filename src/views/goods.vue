<template>
  <div class="bg">
    <h1>商品管理</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="出售中商品" name="chushouzhong"></el-tab-pane>
      <el-tab-pane label="下架商品" name="xiajia"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "goods",
  data() {
    return {
      //    状态区分
      activeName: "chushouzhong"
    };
  },
  created() {
    this.activeName = this.$route.name;
  },
  methods: {
    handleClick() {
      if (this.activeName == "chushouzhong") {
        this.$router.push("/home/goods/chushouzhong");
      }
      if (this.activeName == "xiajia") {
        this.$router.push("/home/goods/xiajia");
      }
    }
  }
};
</script>

<style scoped></style>
