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
        <el-form-item prop="rememberMe">
          <el-checkbox v-model="checked">记住我</el-checkbox>
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
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        pwd: "",
        rememberMe: ""
      },
      checked: false,
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  components: {},

  computed: {
    ...mapState({}),
    ...mapMutations(["usermsg"])
  },
  created() {
    sessionStorage.clear()
    window.localStorage.clear()
      let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.login();// 登录方法名
         return false
      }
    };
  },
  methods: {
    Name: function(username) {
      this.$store.commit("usermsg", username);
    },
    reset() {
      this.$refs.LoginFormRef.resetFields();
    },
    login() {
      var that = this;
      this.$refs.LoginFormRef.validate(v => {
        if (v) {
          var name = this.form.name;
          var pwd = this.form.pwd;
          this.$axios
            .post(
              "/api/user/login.do",
              {
                user_name: name,
                user_pwd: pwd,
                rememberMe: this.checked
              },
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
            .then(res => {
              console.log(res);
              if (res.data.code == 200) {
                that.$message({
                  message: res.data.msg,
                  type: "success"
                });
                // window.sessionStorage.setItem("token", res.data.data.token);
                this.$store.commit("usermsg", res.data.data);
                window.sessionStorage.setItem("userTwo",JSON.stringify(res.data.data));
                window.sessionStorage.setItem("nav",JSON.stringify(res.data.data.permissionList))
                window.sessionStorage.setItem("role_no",JSON.stringify(res.data.data.role_no))
                this.$store.dispatch('setToken',res.data.data.token);//设置token

                // window.sessionStorage.setItem("userList",JSON.stringify(res.data.data))
                this.$router.push("/home");
                // this.$store.commit('user_name', res.data.data.user_name)
                // this.$store.commit('user_pwd', res.data.data.user_pwd)
                // this.$store.commit('user_email', res.data.data.user_email)
                // this.$store.commit('user_phone', res.data.data.user_phone)
                // this.$store.commit('user_no', res.data.data.user_no)
                // this.$store.commit('user_img', res.data.data.user_img)
                // this.$store.commit('user_status', res.data.data.user_status)
                // this.$store.commit('rememberMe', res.data.data.rememberMe)
              } else{
                that.$message({
                  message: res.data.msg,
                  type: "warning"
                });
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
