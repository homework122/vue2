<!--这个是发布优惠券**运费券-->
<template>
  <div>
    <el-row>
      <el-col :span="2">运费券名称：</el-col>
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
  name: "FreightTicket",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      value1: "",
      search: ""
    };
  }
};
</script>

<style scoped></style>
