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
                    :key="item.circle_no"
                    :label="item.circle_name"
                    :value="item.circle_no"
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
                    :key="item.posttype_no"
                    :label="item.posttype_name"
                    :value="item.posttype_no"
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
          <el-input placeholder="请输入标题" class="a"></el-input>
      </div></el-col>
    </el-row>

    <el-row>
      <el-col :span="8"
        ><div class="grid-content bg-purple-light">
          价格：<el-input
              placeholder="￥0.0"
              v-model="price_input"
              clearable>
      </el-input></div
      ></el-col>
    </el-row>

    <el-row>
      <el-col :span="10"
        ><div class="grid-content bg-purple-dark">
        <el-upload
                action="/api/uploadfile.do"
                auto-upload
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="success"
                :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div></el-col>
    </el-row>
    <div>
      <el-button type="primary" @geteditor="getData">发布</el-button>
      <el-button>清空</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "",
  props: [],

  data: function() {
    return {
      numberValidateForm: {
        userName: "",
        pwd: ""
      },
      price_input:'',
      value_1: "",
      options_1: [],
      value_2: "",
      options_2: [],
      dialogImageUrl: '',
      dialogVisible: false
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
    },
    // 上传图片成功
    success(response){
      console.log(response)
    },
    // 图片移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },


  },
  components: {

  },
  mounted() {
    let that = this
    this.$axios.post('/api/forum/circleShow.do',{
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (res) {
      // console.log(res.data.data)
      that. options_1 = res.data.data;
    }).catch(function (err) {
      console.log(err)
    })

    this.$axios.post('/api/forum/postTypeShow.do',{
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (res) {
      console.log(res.data.data)
      that.options_2=res.data.data
    })
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
