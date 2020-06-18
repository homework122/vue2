<!-- 进行中 -->
<template>
  <div>
    <el-container>
      <el-header>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="正在派券" name="first"></el-tab-pane>
          <el-tab-pane label="未开始" name="second"> </el-tab-pane>
          <el-tab-pane label="已结束" name="third"></el-tab-pane>
        </el-tabs>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  created() {
    this.activeName = this.$route.name;
  },

  methods: {
    handleClick() {
      if (this.activeName == "first") {
        this.$router.push("/home/quanguanli/SendTicket");
      }
      if (this.activeName == "second") {
        this.$router.push("/home/quanguanli/EndTicket");
      }
      if (this.activeName == "third") {
        this.$router.push("/home/quanguanli/OverTicket");
      }

      // if (this.activeName == "second") {
      //
      // if (this.activeName == "third") {
      //
      // }
      // if (this.activeName == "fourth") {
      //
      // }
    }
  }
};
</script>
<style scoped></style>
