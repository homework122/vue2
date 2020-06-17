<!-- 登录页 -->
<template>
  <div id="Login_Main">
    <div class="Login_Box">
      <div class="title">
        <b>全心生活运营</b>
      </div>
      <!-- 表单部分 -->
      <el-form
        class="LoginForm"
        :model="form"
        :rules="rules"
        ref="LoginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="name">
          <el-input
            placeholder="输入用户名"
            prefix-icon="el-icon-user-solid"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pwd">
          <el-input
            placeholder="输入密码"
            prefix-icon="el-icon-link"
            v-model="form.pwd"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="Bths">
          <el-button type="primary" @click="login">立即登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  components: {},

  computed: {},

  methods: {
    reset() {
      this.$refs.LoginFormRef.resetFields();
    },
    login() {
      this.$refs.LoginFormRef.validate(v => {
        if (v) {
          var name = this.form.name;
          var pwd = this.form.pwd;
          this.$axios
            .post(
              "/api/user/login.do",
              {
                user_name: name,
                user_pwd: pwd
              },
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
            .then(res => {
              if (res.data.code == 200) {
                console.log(res);

                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.$router.push({ path: "/home" });
              } else {
                this.$message.error("登陆失败");
              }

              //   1 要存一个登陆值
              //   2 判断登陆次数
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>
<style scoped>
#Login_Main {
  background-image: linear-gradient(#be93c5, #7bc6cc);
  height: 100%;
}
.Login_Box {
  width: 400px;
  height: 350px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
}
/* 头部LoGo */
.title {
  height: 40px;
  line-height: 40px;
  width: 150px;
  position: relative;
  top: -20px;
  margin: 0 auto;
  text-align: center;
  vertical-align: middle;
  background-color: #7bc6cc;
  border-radius: 5px;
  color: white;
}
.title::before {
  content: "";
  width: 29px;
  height: 28px;
  position: absolute;
  top: 6px;
  left: -12px;
  transform: rotate(45deg);
  background-color: #7bc6cc;
  border-radius: 5px 0 5px 5px;
}
.title::after {
  content: "";
  top: 6px;
  right: -12px;
  width: 29px;
  height: 28px;
  position: absolute;
  transform: rotate(45deg);
  background-color: #7bc6cc;
  border-radius: 0 5px 5px 5px;
}
/* 表单部分 */
.Bths {
  display: flex;
  justify-content: flex-end;
}
.LoginForm {
  position: absolute;
  bottom: 20%;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
