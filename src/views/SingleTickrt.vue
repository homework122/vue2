<!--这个是发布优惠券**通用券-->
<template>
  <div>
    <el-row>
      <el-col :span="2">单品券名称：</el-col>
      <el-col :span="4">
        <el-input placeholder="请输入优惠券名称" v-model="input1" clearable>
        </el-input>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="2">面值</el-col>
      <el-col :span="4">
        <el-input
          placeholder="请输入面值应为1~99之间的整数"
          v-model="input2"
          clearable
        >
        </el-input>
      </el-col>
      <el-col :span="2">元</el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="2">发放总量</el-col>
      <el-col :span="4">
        <el-input
          placeholder="发放总量应为1~9999之间的整数"
          v-model="input3"
          clearable
        >
        </el-input>
      </el-col>
      <el-col :span="2">张</el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="2">使用条件</el-col>
      <el-col :span="1">订单满</el-col>
      <el-col :span="4">
        <el-input placeholder="不填则默认为0" v-model="input4" clearable>
        </el-input>
      </el-col>
      <el-col :span="2">元可使用</el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="2">有效期:</el-col>
      <el-col :span="10">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="2">选择商品</el-col>
      <el-button type="primary" @click="open">选择商品</el-button>
      <!--选择商品的弹出框-->

    </el-row>
    <el-row>
      <el-col :span="4">
        <el-button type="primary">发布</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="info">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SingleTickrt",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      value1: "",
      search: ""
    };
  },
  methods: {
    gettableDataList() {
<<<<<<< HEAD
      this.axios
        .post(
          "/api/discount/selectCouponKind.do",
=======
      this.$axios
        .post(
          "/api/discount/addSingleSelectAllCom.do",
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
          {
            // dis_status:0,
            // page:1,
            // pagesize:5
            /* token*/
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
<<<<<<< HEAD
    },
    created: function() {
      this.gettableDataList();
    }
=======
    },
    created: function() {
      this.gettableDataList();
    },
      open() {
          this.$alert('这是一段内容', '标题名称', {
              confirmButtonText: '确定',
              callback: action => {
                  this.$message({
                      type: 'info',
                      message: `action: ${ action }`
                  });
              }
          });
      }
>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
  }
};
</script>

<style scoped></style>
