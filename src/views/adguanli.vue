<!--广告管理-->
<template>
  <div>
    <el-row>
      <el-col
        :span="8"
        v-for="(o, index) in 2"
        :key="o"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2183577386,500095072&fm=26&gp=0.jpg"
            class="image"
          />
          <div style="padding: 10px;">
            <div class="bottom clearfix">
              <el-button type="primary" class="button" @click="goadlist"
                >广告位列表</el-button
              >
              <el-button type="primary" class="button" @click="gotouf"
                >投放广告</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "adguanli",
  data() {
    return {
      currentDate: new Date()
    };
  },
  methods: {
    goadlist() {
      this.$router.push({
        path: "/home/adlist"
      });
    },
    gotouf() {
      this.$router.push({
        path: "/home/touf"
      });
    }
  }
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

/*.button {*/
/*padding: 0;*/
/*float: right;*/
/*}*/

.image {
  width: 100%;
  display: block;
}

/*.clearfix:before,*/
/*.clearfix:after {*/
/*display: table;*/
/*content: "";*/
/*}*/

/*.clearfix:after {*/
/*clear: both*/
/*}*/
</style>
