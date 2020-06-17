<!--  -->
<template>
  <div>
    <div>
      <h3>个人中心</h3>
<<<<<<< HEAD
      <p>用户名:{{ this.user.user_name }}</p>
      <p>邮箱:{{ user.user_email }}</p>
      <p>
        手机:{{ user.user_phone }}
        <el-button type="primary" @click="upPhone" size="small"
          >修改手机号</el-button
        >
      </p>
=======
      <h4>欢迎您{{ userList.user_name }}</h4>
      <!-- <div class="img">
        <img 
          style="width: 100px;height: 100px ;text-align: center ;margin: 0 auto "
          :src="this.userList.user_img"
        />
        <el-image
            style="width: 50px;height: 50px"
            :src="this.user.user_img"
          ></el-image>
      </div> -->
      <!-- <input v-model="this.userList.user_email">  -->
      <p>邮箱:{{ this.userList.user_email }}</p>
      <p>手机:{{ this.userList.user_phone }}</p>
>>>>>>> 23b76cb91fef4f7ea5c2b64c353330a396a47dbb
      <p><el-button type="primary" @click="up">修改个人信息</el-button></p>
    </div>
    <!-- <el-dialog title="修改手机号" :visible.sync="dialogFormVisibleTwo">
<el-form :model="form">
    <el-form-item label="修改手机号" :label-width="formLabelWidth"> 
    <el-input v-model="form.phone" autocomplete="off"   style="width: 240px"></el-input> <el-button type="primary" @click="countDown" :disabled="disabled">  {{content}}</el-button>
    </el-form-item>
    <el-form-item label="请输入验证码" :label-width="formLabelWidth"> 
    <el-input v-model="form.yzm" autocomplete="off"   style="width: 240px"></el-input>
    </el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleTwo = false">取 消</el-button>
    <el-button type="primary" @click="phoneup" >确 定</el-button>
</div>
</el-dialog> -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="修改密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.user_name"
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
          <el-upload
            action="/api/uploadfile.do"
            auto-upload
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="success"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleImg = false">取 消</el-button>
        <el-button type="primary" @click="modify()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
export default {
  data() {
    return {
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
        desc: ""
      },
<<<<<<< HEAD
=======
      userList: JSON.parse(window.sessionStorage.getItem("user")),
      dialogImageUrl: "",
>>>>>>> 23b76cb91fef4f7ea5c2b64c353330a396a47dbb
      dialogFormVisibleImg: false,
      dialogFormVisibleTwo: false,
      dialogFormVisible: false,
      imgUrl: "", //图片上传成功后接收的地址
      formLabelWidth: "120px", //表单宽度
      content: "发送验证码", // 按钮里显示的内容
      totalTime: 90, //记录具体倒计时时间
      canClick: true, //添加canClick
      disabled: false, //按钮禁用
      a: 1
    };
  },

  components: {},

  computed: {
    ...mapState(["user"]),
    ...mapMutations(["usermsg"])
  },

<<<<<<< HEAD
  mounted: function() {},

=======
  mounted: function() {
    this.getnew();
  },
>>>>>>> 23b76cb91fef4f7ea5c2b64c353330a396a47dbb
  methods: {
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
                "Content-Type": "application/json"
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
      this.imgUrl == "" ? (this.imgUrl = this.user.user_img) : this.imgUrl;
      console.log(this.imgUrl);
      if (this.disabled == false) {
        console.log("没用修改手机号");

        that.$axios
          .post(
            "/api/user/editMe.do",
            {
              user_no: this.form.user_no,
              user_name: this.form.user_name,
              user_email: this.form.user_email,
              user_pwd: this.form.user_pwd,
              user_phone: this.form.user_phone,
              user_img: this.form.user_img,
              cheakCode: this.form.yzm
            },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => {
            console.log(res);
            this.dialogFormVisible = false;
<<<<<<< HEAD
            this.getnew();
=======
            for (var key in this.form) {
              this.userList[key] = this.form[key];
            }
            this.getnew();
            console.log(this.user);
            console.log(this.userList);
            // this.usermsg(res.data.data)
            // this.$store.commit("usermsg", res.data.data);
            // sessionStorage.setItem("user",JSON.stringify(res.data.data) )
>>>>>>> 23b76cb91fef4f7ea5c2b64c353330a396a47dbb
          });
      } else {
        that.$axios
          .post(
            "/api/user/editMe.do",
            {
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
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => {
            console.log(res);
            this.dialogFormVisible = false;
<<<<<<< HEAD
            this.getnew();
=======
            for (var key in this.form) {
              this.userList[key] = this.form[key];
            }
            this.getnew();
            console.log(this.userList);
>>>>>>> 23b76cb91fef4f7ea5c2b64c353330a396a47dbb
          });
      }
    },
    getnew() {
      var that = this;
      this.$axios
        .post(
          "/api/sys/showKeyEmpInfoAbs.do",
          {
            userName: this.form.user_name
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          console.log(res);
<<<<<<< HEAD
          that.$store.commit("usermsg", res.data.data);
        });
    },
=======
          that.$store.commit("usermsg", JSON.stringify(res.data.data));
          this.userList = res.data.data;
          console.log(this.userList);
        });
    },
    xunhuan() {
      for (var key in this.user) {
        this.userList[key] = this.user[key];
      }

      console.log("循环赋值");
      console.log(this.userList);
    },
>>>>>>> 23b76cb91fef4f7ea5c2b64c353330a396a47dbb
    // 上传图片成功
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
    // phoneup(){
    //     var that =this
    //     if(this.form.yam==""){
    //     that.$message({
    //     message: "你还没有输入验证码哦",
    //     type: "warning"
    //     });
    //     }else{
    //         that.$axios.post("/api/user/editMe.do",{
    //             user_no:this.user_no,
    //             user_name:this.user_name,
    //             user_email:this.user_email,
    //             user_pwd:this.user_pwd,
    //             user_phone:this.user_phone,
    //             user_img:this.user_img,
    //             cheakCode:this.form.yzm
    //         },{
    //     headers: {
    //     "Content-Type": "application/json"
    //     }
    //         })
    //     }
    // },
    up() {
      console.log("修改弹出");
      this.dialogFormVisible = true;
      console.log(this.form);
      for (var key in this.user) {
        this.form[key] = this.user[key];
      }
    },
    upPhone() {
      console.log("修改弹出");
      this.dialogFormVisibleTwo = true;
    }
  }
};
</script>
<style scoped>
div:nth-child(1) > div:nth-child(1) {
  color: black;
  margin: 0 auto;
  width: 300px;
}
h3 {
  text-align: center;
  font-size: 32px;
  font-family: KaiTi;
  margin-top: 30px;
}
p:nth-last-of-type(1) {
  text-align: center;
}
el-form {
  background-color: white;
}
</style>
