<!-- 进行中 -->
<template>
  <div>
    <el-container>
      <el-header>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="进行中" name="first"></el-tab-pane>
          <el-tab-pane label="未开始" name="second"> </el-tab-pane>
          <el-tab-pane label="以结束" name="third"></el-tab-pane>
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
        this.$router.push("/home/special/specialConduct");
      }
      if (this.activeName == "second") {
        this.$router.push("/home/special/specialNot");
      }
      if (this.activeName == "third") {
        this.$router.push("/home/special/specialEnd");
      }
    }
  }
};
</script>
<style scoped></style>
