<template>
<<<<<<< HEAD
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
=======
  <div>
    <!--订单区分-->
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="grid-content bg-purple" :class="{ grid: ok }">
          近三个月订单
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          等待买家付款
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          买家已付款
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          等待买家收货
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          退款中
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          交易成功
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          交易关闭
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          三个月前订单
        </div>
      </el-col>
    </el-row>
    <!--分割线-->
    <el-divider class="margin"></el-divider>
    <!--搜索-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      //    状态区分
<<<<<<< HEAD
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
=======
      ok: false,
      //    搜索值
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  models: {
    //查询按钮
    onSubmit() {
      console.log("submit!");
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
    }
  }
};
</script>

<style scoped>
.margin {
<<<<<<< HEAD
  margin: 20px;
}

.bg-purple {
  background: #d3dce6;
=======
  margin-top: 20px;
  margin-bottom: 20px;
}

.bg-purple {
  /*background: #d3dce6;*/
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
}

.grid-content {
  text-align: center;
  min-height: 36px;
}

.grid-content:hover {
<<<<<<< HEAD
  /*border-bottom: 3px solid steelblue;*/
  border: 1px solid red;
}

.grid {
=======
  border-bottom: 3px solid steelblue;
}

grid {
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
  border-bottom: 3px solid steelblue;
}
</style>
