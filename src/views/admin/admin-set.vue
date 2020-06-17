<!--  -->
<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="formInline.user"
          placeholder="请输入查询用户名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" circle @click="onSubmit"></el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          circle
          @click="onAdd"
        ></el-button>
      </el-form-item>
    </el-form>
    <!--        数据显示-->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="tableHeaderColor"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="user_no" label="ID" width="50"> </el-table-column>
      <el-table-column prop="user_name" label="用户昵称" width="120">
      </el-table-column>
      <el-table-column prop="user_img" label="图片" width="100">
        <template slot-scope="scope">
          <el-image
            style="width: 50px;height: 50px"
            :src="scope.row.user_img"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="user_email" label="邮箱账号" width="">
      </el-table-column>
      <el-table-column prop="user_phone" label="手机号码" width="">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="60">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.user_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="changeValue(scope.$index, scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="role_no" label="管理权限" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.role_no"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="changequanxianValue(scope.$index, scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="user_time" label="创建时间" width="">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="Delete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form
        ref="uptableData"
        :model="uptableData"
        :label-width="formLabelWidth"
      >
        <el-form-item label="用户昵称">
          <el-input
            v-model="uptableData.user_name"
            disabled
            style="width:240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input
            v-model="uptableData.user_email"
            style="width:240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="uptableData.user_phone"
            style="width:240px"
          ></el-input>
          <el-button type="primary" @click="countDown" :disabled="disabled">
            {{ content }}</el-button
          >
        </el-form-item>
        <el-form-item label="请输入验证码" :label-width="formLabelWidth">
          <el-input
            v-model="yzm"
            autocomplete="off"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码">
          <el-input
            v-model="uptableData.user_pwd"
            style="width:240px"
            type="password"
          ></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="用户状态">
          <el-select v-model="uptableData.user_status" placeholder="请选择">
            <el-option value="1"></el-option>
            <el-option value="0"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="displayNone">取 消</el-button>
        <el-button type="primary" @click="updata">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog :visible.sync="dialogFormVisibletwo">
      <el-form
        ref="addtableData"
        :model="addtableData"
        :label-width="formLabelWidth"
      >
        <el-form-item label="用户昵称">
          <el-input
            v-model="addtableData.user_name"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input
            v-model="addtableData.user_email"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="addtableData.user_phone"
            style="width: 240px"
          ></el-input
          ><el-button
            type="primary"
            @click="countDown"
            :disabled="disabled"
            size="small"
          >
            {{ content }}</el-button
          >
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="yzm" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-checkbox v-model="user_status_checked"
            >状态是否启用</el-checkbox
          >
        </el-form-item>
        <el-form-item label="用户权限">
          <el-checkbox v-model="role_no_checked">是否为超级管理员</el-checkbox>
        </el-form-item>
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
        <el-dialog :visible.sync="dialogVisiblethere">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        <!-- <el-table-column
                            prop="status"
                            label="状态"
                            width="200">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.user_status"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    :active-value="1"
                                    :inactive-value="0"
                                    active-text="启用"
                                    inactive-text="禁用"
                                    @change="changeValue(scope.$index, scope.row)"
                            >
                            </el-switch>
                        </template>
                    </el-table-column> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="displayNoneone">取 消</el-button>
        <el-button type="primary" @click="addTableData">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 页码 -->
    <el-row>
      <el-col :span="6" :offset="8">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
const regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
// import{mapMutations}from'vuex'
//this.$store.comit(函数，传过去)
export default {
  data() {
    return {
      // disabled:false,
      role_no_checked: false,
      admin_role_no: 1,
      admin_user_status: 1,
      user_status_checked: false,
      formLabelWidth: "120px", //表单宽度
      tableData: [], //数据表信息
      dialogFormVisible: false, //弹出框属性设置
      dialogFormVisibletwo: false, //弹出框属性设置
      // disabled:false,
      dialogVisiblethere: false,
      imgUrl: "", //图片上传成功后接收的地址
      dialogImageUrl: "",
      uptableData: {
        //修改表单信息
        user_name: "",
        user_email: "",
        user_phone: "",
        user_status: "",
        user_img: "",
        user_no: "",
        user_pwd: "",
        rememberMe: "",
        yam: ""
      },
      yam: "",
      page: 1, //页码
      pageSize: 5, //页容量
      total: 0, //总条数
      addtableData: {
        //添加表单信息
        user_name: "",
        user_email: "",
        user_phone: "",
        user_status: "",
        user_img: "",
        user_no: "",
        user_pwd: "",
        rememberMe: "",
        role_no: "",
        yzm: ""
      },
      userdel: [],
      yzm: "",
      yzform: {
        user_name: "",
        user_pwd: "",
        user_email: "",
        user_phone: "",
        user_no: "",
        user_img: "",
        user_status: "",
        rememberMe: ""
      },
      token:"",
      disabled: false, //禁用属性设置
      formInline: {
        //搜索信息获取
        user: ""
      },
      content: "发送验证码", // 按钮里显示的内容
      totalTime: 90, //记录具体倒计时时间
      canClick: true //添加canClick
    };
  },

  components: {},

  computed: {
    ...mapState(["user"]),
    ...mapMutations(["usermsg"])
  },
  methods: {
    //短信验证，手机号验证
    countDown() {
      var that = this;

      if (this.addtableData.user_phone == "") {
        that.$message({
          message: "你还没有输入手机号哦",
          type: "warning"
        });
      } else if (!reg.test(this.addtableData.user_phone)) {
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
              user_phone: this.addtableData.user_phone
            },
            {
              headers: {
                "Content-Type": "application/json",
                "token":this.token
              }
            }
          )
          .then(res => {
            console.log(res);
            // if(res.data.code==200){

            // }
          });
      }
    },
    cc() {
      this.$axios
        .post(
          "/api/activities/queryActivities.do",
          {
            sta_no: 3,
            act_name: this.InputSelect,
            page: 1,
            limit: 5
          },
          {
            headers: {
              "Content-Type": "application/json",
                "token":this.token
            }
          }
        )
        .then(res => {
          console.log(res);
        });
    },

    //表头背景颜色设置
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return "background-color:lightblue;coloe:#fff";
      }
    },
    //获取用户表信息
    getUserList() {
      console.log("获取数据中");
      this.$axios
        .post(
          "/api/sys/mgr/showAllManeger.do",
          {
            page: this.page,
            pageSize: this.pageSize
          },
          {
            headers: {
              "Content-Type": "application/json",
              "token": this.token
            }
          }
        )
        .then(res => {
          console.log(res);
          console.log("信息获取成功");
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
    },
    //搜索
    onSubmit() {
      var that = this;
      console.log(this.formInline.user)
      console.log("搜索中");
      if (this.page != 1) {
        this.page = 1;
        this.$axios
          .post(
            "/api/sys/mgr/showKeyEmpInfoAbs.do",
            {
              userName: this.formInline.user,
              page: this.page,
              pageSize: this.pageSize
            },
            {
              headers: {
                "Content-Type": "application/json",
                "token":this.token
              }
            }
          )
          .then(res => {
            console.log(res);
            console.log("搜索成功");
            this.tableData = res.data.data;
            that.$message({
              message: res.data.msg,
              type: "success"
            });
            this.total = res.data.count;
          });
      } else {
        this.$axios
          .post(
            "/api/sys/mgr/showKeyEmpInfoAbs.do",
            {
              userName: this.formInline.user,
              page: this.page,
              pageSize: this.pageSize
            },
            {
              headers: {
                "Content-Type": "application/json",
                "token":this.token
              }
            }
          )
          .then(res => {
            console.log(res);
            console.log("搜索成功");
            this.tableData = res.data.data;
            that.$message({
              message: res.data.msg,
              type: "success"
            });
            this.total = res.data.count;
          });
      }
    },
    //添加表单显示
    onAdd() {
      this.dialogFormVisibletwo = true
    },
    //添加表单隐藏
    displayNoneone() {
      this.dialogFormVisibletwo = false
      this.totalTime=0
      // this.yzm=""
    },
    //复选框值转换
    // role_no_checked:false,
    // user_status_checked:false,
    // admin_role_no:1,
    // admin_user_status:1,

    //添加
    addTableData() {
      console.log("获取数据中");
      var that = this;
      this.role_no_checked
        ? (this.admin_role_no = 1)
        : (this.admin_role_no = 2);
      this.user_status_checked
        ? (this.admin_user_status = 1)
        : (this.admin_user_status = 0);
      console.log(this.admin_role_no);
      console.log(this.admin_user_status);
      if (this.addtableData.user_email == "") {
        that.$message({
          message: "你还没有输入邮箱哦",
          type: "warning"
        });
      } else if (this.addtableData.user_name == "") {
        that.$message({
          message: "名字还未输入哦",
          type: "warning"
        });
      } else if (!regemail.test(this.addtableData.user_email)) {
        that.$message({
          message: "请输入正确邮箱哦",
          type: "warning"
        });
      } else if (this.addtableData.user_phone == "") {
        that.$message({
          message: "你还没有输入手机号哦",
          type: "warning"
        });
      } else if (!reg.test(this.addtableData.user_phone)) {
        console.log(this.addtableData.user_phone);
        that.$message({
          message: "请输入正确的手机号",
          type: "warning"
        });
      } else {
        this.$axios
          .post("/api/sys/mgr/addMgr.do", {
            user_email: this.addtableData.user_email,
            user_img: this.imgUrl,
            user_name: this.addtableData.user_name,
            user_no: this.addtableData.user_no,
            user_phone: this.addtableData.user_phone,
            role_no: this.admin_role_no,
            user_status: this.admin_user_status,
            cheakCode: this.yzm
          },
            {
              headers: {
                "Content-Type": "application/json",
                "token":this.token
              }
            })
          .then(res => {
            that.$message({
              message: res.data.msg,
              type: "success"
            });
            console.log(res);
            console.log("添加成功");
            this.getUserList();
            this.displayNoneone();
            this.addtableData.rememberMe = "",
            this.addtableData.user_email = "",
            this.addtableData.user_img = "",
            this.addtableData.user_name = "",
            this.addtableData.user_no = "",
            this.addtableData.user_phone = "",
            this.addtableData.user_pwd = "",
            this.addtableData.user_status = ""
            this.yzm = "";
          });
      }
    },
    //隐藏
    displayNone() {
      this.dialogFormVisible = false
      this.totalTime=0
      this.addtableData.rememberMe = ""
      this.addtableData.user_email = ""
      this.addtableData.user_img = ""
      this.addtableData.user_name = ""
      this.addtableData.user_no = ""
      this.addtableData.user_phone = ""
      this.addtableData.user_pwd = ""
      this.addtableData.user_status = ""
      this.yzm = ""
    },
    handleEdit(index, row) {
      console.log(index, row);
      for (var key in this.uptableData) {
        this.uptableData[key] = row[key];
      }
      console.log(this.uptableData);
      this.row = row;
      this.dialogFormVisible = true;
    },
    // 更新提交
    updata() {
      console.log(this.uptableData.user_status)
      console.log("获取数据中");
      var that = this;
      if (this.uptableData.user_email == "") {
        that.$message({
          message: "你还没有输入邮箱哦",
          type: "warning"
        });
      } else if (!regemail.test(this.uptableData.user_email)) {
        that.$message({
          message: "请输入正确邮箱哦",
          type: "warning"
        });
      } else if (this.uptableData.user_phone == "") {
        that.$message({
          message: "你还没有输入手机号哦",
          type: "warning"
        });
      } else if (!reg.test(this.uptableData.user_phone)) {
        console.log(this.uptableData.user_phone);
        that.$message({
          message: "请输入正确的手机号",
          type: "warning"
        });
      } else {
        this.$axios
          .post(
            "/api/sys/mgr/editMgr.do",
            {
              user_name: this.uptableData.user_name,
              user_email: this.uptableData.user_email,
              user_phone: this.uptableData.user_phone,
              // user_status: this.uptableData.user_status,
              user_img: this.uptableData.user_img,
              user_no: this.uptableData.user_no,
              user_pwd: this.uptableData.user_pwd,
              rememberMe: this.uptableData.rememberMe,
              cheakCode: this.yzm
            },
            {
              headers: {
                "Content-Type": "application/json",
                "token":this.token
              }
            }
          )
          .then(response => {
            console.log(response);
            this.totalTime=0
            this.dialogFormVisible = false;
            this.getUserList();
            this.yzm = "";
            that.$message({
              message: response.data.msg,
              type: "success"
            });
          })
          .catch(response => {
            alert("错误：" + response);
          });
      }
    },
    // for(){
    // for (var key in this.user) {
    //     this.yzform[key] = this.user[key];
    // }
    // },
    //删除方法
    Delete(o, t) {
      console.log("获取数据中");
      console.log(o);
      console.log(t);
      this.userdel=JSON.parse(window.sessionStorage.getItem("userTwo"))
      console.log(this.userdel.user_name)
      var that = this;
      if (
        this.userdel.user_name == t.user_name &&
        this.userdel.user_no == t.user_no
      ) {
        console.log("你不能自己删除自己");
        that.$message({
          message: "你不能自己删除自己",
          type: "warning"
        });
      } else {
        this.$axios
          .post(
            "/api/sys/mgr/delMgr.do",
            {
              user_no: t.user_no,
              user_name: t.user_name
            },
            {
              headers: {
                "Content-Type": "application/json",
                "token":this.token
              }
            }
          )
          .then(res => {
            console.log(res);
            that.$message({
              message: res.data.msg,
              type: "success"
            });
            this.getUserList();
          })
          .catch(res => {
            console.log(res);
          });
      }
    },

    //滑块
    changeValue(index, row) {
      console.log("获取数据中");
      var that = this;
      console.log(row);
      this.$axios
        .post(
          "/api/sys/mgr/chageMgr.do",
          {
            user_name: row.user_name,
            user_email: row.user_email,
            user_phone: row.user_phone,
            user_status: row.user_status,
            user_img: row.user_img,
            user_no: row.user_no,
            user_pwd: row.user_pwd,
            rememberMe: row.rememberMe,
            role_no: row.role_no
          },
          { headers: { "Content-Type": "application/json" ,"token":this.token} }
        )
        .then(function(response) {
          console.log(response);
          console.log("修改成功");
          var a = response;
          that.$message({
            message: a.data.msg,
            type: "success"
          });
        })
        .catch(function(err) {
          // 请求失败处理
          console.log(err);
        });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getUserList();
    },
    handleCurrentChange(currentPage) {
      this.page = currentPage;
      this.getUserList();
    },
    changequanxianValue(index, row) {
      console.log("获取数据中");
      var that = this;
      console.log(row);
      this.$axios
        .post(
          "/api/sys/mgr/isSuperMgr.do",
          {
            user_name: row.user_name,
            user_no: row.user_no,
            role_no: row.role_no
          },
          { headers: { "Content-Type": "application/json","token":this.token } }
        )
        .then(function(response) {
          console.log(response);
          console.log("修改成功");
          var a = response;
          that.$message({
            message: a.data.msg,
            type: "success"
          });
        })
        .catch(function(err) {
          // 请求失败处理
          console.log(err);
        });
    },
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
      this.dialogVisible = true;
    },
    gettoken(){
      this.token=window.sessionStorage.getItem("token")
      console.log(this.token)
    }
  },
  mounted: function() {
    this.getUserList()
    this.gettoken()
  }
};
</script>
<style scoped>
div > .el-form:nth-child(1) {
  margin: 20px 0;
}
.el-table-column {
  background-color: #92b1e8;
}
.el-table {
  margin: 20px 0;
}
.el-image {
  border-radius: 50px;
}
</style>
