<template>
  <div class="e">
    <!--        快速发帖-->
    <div v-if="false" id="wrap">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="userName"
          :rules="[{ required: true, message: '用户不能为空' }]"
        >
          <el-input
            type="userName"
            v-model.number="numberValidateForm.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd"
          :rules="[{ required: true, message: '密码不能为空' }]"
        >
          <el-input
            type="pwd"
            v-model.number="numberValidateForm.pwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('numberValidateForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('numberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <div class="a">发帖圈子</div>
                <el-select v-model="value_1" placeholder="请选择" class="d">
                  <el-option
                    v-for="item in options_1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                <div class="a">发帖类型</div>
                <el-select v-model="value_2" placeholder="请选择" class="d">
                  <el-option
                    v-for="item in options_2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select></div
            ></el-col>
          </el-row></div
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <el-input placeholder="请输入标题" class="a"></el-input></div
      ></el-col>
    </el-row>

    <el-row>
      <el-col :span="8"
        ><div class="grid-content bg-purple-light">
          价格：<el-input placeholder="￥0.0" class="a"></el-input></div
      ></el-col>
    </el-row>

    <el-row>
      <el-col :span="10"
        ><div class="grid-content bg-purple-dark">
          <fuwenben></fuwenben></div
      ></el-col>
    </el-row>
    <div>
      <el-button type="primary">发布</el-button>
      <el-button>清空</el-button>
    </div>
  </div>
</template>

<script>
import fuwenben from "./fuwenben.vue";
export default {
  name: "",
  props: [],

  data: function() {
    return {
      numberValidateForm: {
        userName: "",
        pwd: ""
      },
      value_1: "",
      options_1: [],
      value_2: "",
      options_2: []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: {
    fuwenben
  }
};
</script>

<style scoped>
#wrap {
  width: 300px;
  margin: 150px auto 0;
}
#sec {
  margin-top: 50px;
}
/*设置外边距*/
.a {
  padding-top: 20px;
  padding-bottom: 20px;
}
.d {
  width: 400px;
}
.e {
  border: 1px solid #939799;
  width: 800px;
  margin: 20px;
  padding: 50px;
}
f {
}
</style>
