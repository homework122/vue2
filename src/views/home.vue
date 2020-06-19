<template>
  <div>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <h3>全心生活后台管理系统</h3>
              </div></el-col
            >
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                <el-row type="flex" class="row-bg" justify="end">
                  <el-col :span="5"
                    ><div class="grid-content bg-purple-light">
                      <div class="timer">
                        {{ nowDate + " " + nowTime + " " + nowWeek }}
                      </div>
                    </div></el-col
                  >
                  <el-col :span="2"
                    ><div class="grid-content bg-purple">
                      <img class="headerImg" :src="this.img" /></div
                  ></el-col>
                  <el-col :span="5"
                    ><div class="grid-content bg-purple">
                      <el-popover
                        placement="bottom"
                        width="300"
                        trigger="click"
                      >
                        <div class="center">
                          <h3 class="point">个人中心</h3>
                          <p>邮箱:{{ this.userTwo.user_email }}</p>
                          <p>手机:{{ this.userTwo.user_phone }}</p>
                          <p>
                            <el-button type="primary" @click="up"
                              >修改个人信息</el-button
                            >
                          </p>
                          <p class="point" @click="exit">退出</p>
                        </div>
                        <el-button slot="reference" class="myName" width="100px"
                          >欢迎你{{ this.userTwo.user_name }}</el-button
                        >
                      </el-popover>
                    </div></el-col
                  >
                </el-row>
              </div></el-col
            >
          </el-row>
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <NavMenu></NavMenu></div
      ></el-col>
    </el-row>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.user_beforepwd"
            type="password"
            autocomplete="off"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="修改密码" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="form.user_pwd"
            autocomplete="off"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="修改邮箱" :label-width="formLabelWidth">
          <el-input
            v-model="form.user_email"
            autocomplete="off"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="修改手机号" :label-width="formLabelWidth">
          <el-input
            v-model="form.user_phone"
            autocomplete="off"
            style="width: 240px"
          ></el-input>
          <el-button type="primary" @click="countDown" :disabled="disabled">
            {{ content }}</el-button
          >
        </el-form-item>
        <el-form-item label="请输入验证码" :label-width="formLabelWidth">
          <el-input
            v-model="form.yzm"
            autocomplete="off"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="请选择头像" :label-width="formLabelWidth">
          <el-image
            style="width: 100px;height: 100px ;text-align: center ;margin: 0 auto "
            :src="this.imgUrl"
          ></el-image>
          <el-upload
            action="/api/uploadfile.do"
            ref="upload"
            auto-upload
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="success"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogFormVisibleImg">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="back">取 消</el-button>
        <el-button type="primary" @click="modify()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NavMenu from "./NavMenu.vue";
import { mapState, mapMutations } from "vuex";
const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
export default {
  name: "",
  props: [],

  components: {
    NavMenu
  },

  computed: {
    ...mapState(["user"]),
    ...mapMutations(["usermsg", "SetToken"])
  },

  data: function() {
    return {
      img: "",
      form: {
        user_no: "",
        user_phone: "",
        user_email: "",
        user_pwd: "",
        user_img: "",
        yam: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        user_beforepwd: ""
      },
      nowDate: "", // 当前日期
      nowTime: "", // 当前时间
      nowWeek: "", // 当前星期
      userNo: [],
      userTwo: [],
      dialogImageUrl: "",
      dialogFormVisibleImg: false,
      dialogFormVisibleTwo: false,
      dialogFormVisible: false,
      imgUrl: "", //图片上传成功后接收的地址
      formLabelWidth: "120px", //表单宽度
      content: "发送验证码", // 按钮里显示的内容
      totalTime: 90, //记录具体倒计时时间
      canClick: true, //添加canClick
      disabled: false, //按钮禁用
      a: 1,
      inject: ["reload"],
      token: window.sessionStorage.getItem("token")
    };
  },
  methods: {
    currentTime() {
      setInterval(this.getDate, 500);
    },
    back() {
      this.dialogFormVisible = false;
      this.form.user_beforepwd = "";
      console.log("返回");
    },
    getDate: function() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let week = new Date().getDay();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      if (week == 1) {
        this.nowWeek = "星期一";
      } else if (week == 2) {
        this.nowWeek = "星期二";
      } else if (week == 3) {
        this.nowWeek = "星期三";
      } else if (week == 4) {
        this.nowWeek = "星期四";
      } else if (week == 5) {
        this.nowWeek = "星期五";
      } else if (week == 6) {
        this.nowWeek = "星期六";
      } else {
        this.nowWeek = "星期日";
      }
      _this.nowTime = hh + ":" + mf;
      _this.nowDate = yy + "/" + mm + "/" + dd;
    },
    exit() {
      var that = this;
      console.log(this.userTwo.user_no);
      this.$axios
        .post(
          "/api/user/logout.do",
          {
            user_no: this.userTwo.user_no
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: this.token
            }
          }
        )
        .then(res => {
          console.log(res);
          that.$message({
            message: res.data.msg,
            type: "success"
          });
          this.$store.commit("usermsg", []);
          this.$store.commit("SetToken", []);
          this.$router.push({ path: "/Login" });
        });
    },
    countDown() {
      var that = this;
      if (this.form.user_phone == "") {
        that.$message({
          message: "你还没有输入手机号哦",
          type: "warning"
        });
      } else if (!reg.test(this.form.user_phone)) {
        that.$message({
          message: "请输入正确的手机号",
          type: "warning"
        });
      } else {
        this.disabled = true;
        console.log("我被禁用了" + this.a++);
        this.content = this.totalTime + "s后重新发送"; //这里解决60秒不见了的问题
        let clock = window.setInterval(() => {
          this.totalTime--;
          this.content = this.totalTime + "s后重新发送";
          if (this.totalTime < 0) {
            //当倒计时小于0时清除定时器
            window.clearInterval(clock);
            this.content = "重新发送验证码";
            this.totalTime = 90;
            this.disabled = false;
            console.log("我又恢复使用了" + this.a++);
          }
        }, 1000);
        that.$axios
          .post(
            "/api/user/sendSMS.do",
            {
              user_phone: this.form.user_phone
            },
            {
              headers: {
                "Content-Type": "application/json",
                token: this.token
              }
            }
          )
          .then(res => {
            console.log(res);
          });
      }
    },
    modify() {
      var that = this;
      this.$refs["upload"].clearFiles();
      console.log(this.imgUrl);
      console.log(this.form);
      if (this.disabled == false) {
        console.log("没用修改手机号");

        this.$axios
          .post(
            "/api/user/editMe.do",
            {
              oldPwd: this.form.user_beforepwd,
              user_no: this.form.user_no,
              user_name: this.form.user_name,
              user_email: this.form.user_email,
              user_pwd: this.form.user_pwd,
              user_phone: this.form.user_phone,
              user_img: this.imgUrl,
              cheakCode: this.form.yzm
            },
            {
              headers: {
                "Content-Type": "application/json",
                token: this.token
              }
            }
          )
          .then(res => {
            console.log(res);
            this.dialogFormVisible = false;
            this.getnew(this.form.user_name);
            console.log(this.user);
            console.log(this.userNo);
            that.$message({
              message: res.data.msg,
              type: "success"
            });
            this.form.user_beforepwd = "";
            this.reload();
            // this.usermsg(res.data.data)
            // this.$store.commit("usermsg", res.data.data);
            // sessionStorage.setItem("user",JSON.stringify(res.data.data) )
          });
      } else {
        this.$axios
          .post(
            "/api/user/editMe.do",
            {
              oldPwd: this.form.user_beforepwd,
              user_no: this.form.user_no,
              user_name: this.form.user_name,
              user_email: this.form.user_email,
              user_pwd: this.form.user_pwd,
              user_phone: this.form.user_phone,
              user_img: this.form.this.imgUrl,
              cheakCode: this.form.yzm
            },
            {
              headers: {
                "Content-Type": "application/json",
                token: this.token
              }
            }
          )
          .then(res => {
            this.form.user_beforepwd = "";
            console.log(res);
            this.dialogFormVisible = false;
            this.getnew(this.form.user_name);
            console.log(this.userNo);
            that.$message({
              message: res.data.msg,
              type: "success"
            });
            this.reload();
          });
      }
    },
    getnew(name) {
      var that = this;
      this.$axios
        .post(
          "/api/sys/mgr/showKeyEmpInfoAbs.do",
          {
            userName: name,
            page: 1,
            pageSize: 1
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: this.token
            }
          }
        )
        .then(res => {
          console.log(res);
          that.$store.commit("usermsg", JSON.stringify(res.data.data))
          // window.sessionStorage.setItem("userTwo",JSON.stringify(res.data.data))
          // this.$set(this.userNo,res.data.data)
          // this.userTwo.user_img=res.data.data.user_img
          this.img = this.imgUrl;
          console.log(this.userNo);
          // console.log(this.userNo[0].user_img)
        });
    },
    up() {
      console.log("修改弹出");
      this.dialogFormVisible = true;
      console.log(this.form);
      for (var key in this.userTwo) {
        this.form[key] = this.userTwo[key];
        this.imgUrl = this.userTwo.user_img;
      }
    },
    success(response) {
      console.log(response);
      this.imgUrl = response.newfilepath;
    },
    // 图片移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogFormVisibleImg = true;
    },
    getUserTwo() {
      this.userTwo = JSON.parse(window.sessionStorage.getItem("userTwo"));
      console.log(this.userTwo);
      this.img = this.userTwo.user_img;
    }
  },
  mounted() {
    // this.getnew(this.user.user_name)
    // this.getnew(JSON.parse(window.sessionStorage.getItem("userTwo")).user_name)
    console.log(JSON.parse(window.sessionStorage.getItem("userTwo")).user_name);
    this.getUserTwo();
    this.currentTime();
  }
};
</script>

<style scoped>
.headerImg {
  width: 45px;
  height: 45px;
  border-radius: 100%;
}
.point {
  cursor: pointer;
}
.myName {
  font-size: 20px;
  font-family: KaiTi;
  border: none;
}
.center {
  text-align: center;
}
.timer {
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  font-family: KaiTi;
  font-size: 15px;
}
</style>
