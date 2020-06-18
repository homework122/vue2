<template>
  <div class="margin">
    <!--订单区分-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="近三个月订单" name="jinsanyue"></el-tab-pane>
      <el-tab-pane label="等待买家付款" name="dengfukuan"></el-tab-pane>
      <el-tab-pane label="买家已付款" name="yifukuan"></el-tab-pane>
      <el-tab-pane label="等待买家收货" name="dengshouhuo"></el-tab-pane>
      <el-tab-pane label="退款中" name="tuikuanzhong"></el-tab-pane>
      <el-tab-pane label="交易成功" name="jiaoyichenggong"></el-tab-pane>
      <el-tab-pane label="交易关闭" name="jiaoyiguanbi"></el-tab-pane>
      <el-tab-pane label="三个月前订单" name="sanyueqian"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      //    状态区分
      activeName: "jinsanyue"
    };
  },
  created() {
    this.activeName = this.$route.name;
  },
  methods: {
    handleClick() {
      if (this.activeName == "jinsanyue") {
        this.$router.push("/home/order/jinsanyue");
      }
      if (this.activeName == "dengfukuan") {
        this.$router.push("/home/order/dengfukuan");
      }
      if (this.activeName == "yifukuan") {
        this.$router.push("/home/order/yifukuan");
      }
      if (this.activeName == "dengshouhuo") {
        this.$router.push("/home/order/dengshouhuo");
      }
      if (this.activeName == "tuikuanzhong") {
        this.$router.push("/home/order/tuikuanzhong");
      }
      if (this.activeName == "jiaoyichenggong") {
        this.$router.push("/home/order/jiaoyichenggong");
      }
      if (this.activeName == "jiaoyiguanbi") {
        this.$router.push("/home/order/jiaoyiguanbi");
      }
      if (this.activeName == "sanyueqian") {
        this.$router.push("/home/order/sanyueqian");
      }
    }
  }
};
</script>

<style scoped>
.margin {
  margin: 20px;
}

.bg-purple {
  background: #d3dce6;
}

.grid-content {
  text-align: center;
  min-height: 36px;
}

.grid-content:hover {
  /*border-bottom: 3px solid steelblue;*/
  border: 1px solid red;
}

.grid {
  border-bottom: 3px solid steelblue;
}
</style>
