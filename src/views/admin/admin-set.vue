<!--  -->
<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--        数据显示-->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="user_no" label="ID" width=""> </el-table-column>
      <el-table-column prop="user_name" label="用户昵称" width="">
      </el-table-column>
      <el-table-column prop="user_email" label="邮箱账号" width="">
      </el-table-column>
      <el-table-column prop="user_phone" label="手机号码" width="">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="200">
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
      </el-table-column>
      <el-table-column prop="time" label="创建时间" width=""> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button
            @click="Delete(scope.$index, scope.row)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="uptableData" :model="uptableData">
        <el-form-item label="用户昵称">
          <el-input v-model="uptableData.user_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input v-model="uptableData.user_email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="uptableData.user_phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="uptableData.user_pwd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="displayNone">取 消</el-button>
        <el-button type="primary" @click="updata">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      uptableData: {
        user_name: "",
        user_email: "",
        user_phone: "",
        user_status: "",
        user_img: "",
        user_no: "",
        user_pwd: "",
        rememberMe: ""
      },
      disabled: false
    };
  },

  components: {},

  computed: {},

  mounted: function() {
    this.getUserList();
  },

  methods: {
    getUserList() {
      this.axios
        .post(
          "/api/sys/mgr/showAllManeger.do",
          {
            page: 1,
            pageSize: 5
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
        });
    },
    displayNone() {
      this.dialogFormVisible = false;
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
      this.axios
        .post(
          "/api/sys/mgr/editMgr.do",
          {
            user_name: this.uptableData.user_name,
            user_email: this.uptableData.user_email,
            user_phone: this.uptableData.user_phone,
            user_status: this.uptableData.user_status,
            user_img: this.uptableData.user_img,
            user_no: this.uptableData.user_no,
            user_pwd: this.uptableData.user_pwd,
            rememberMe: this.uptableData.rememberMe
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(response => {
          alert("错误：" + response);
        });
    },
    Delete(o, t) {
      this.$confirm("删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post(
              "/api/member/delete",
              {
                id: t.id
              },
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
            .then(res => {
              this.tableData.splice(t.id, 1);
              this.$message(res.data.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //滑块
    changeValue(index, row) {
      console.log(row);
      this.axios
        .post(
          "/api/sys/mgr/editMgr.do",
          {
            user_name: row.user_name,
            user_email: row.user_email,
            user_phone: row.user_phone,
            user_status: row.user_status,
            user_img: row.user_img,
            user_no: row.user_no,
            user_pwd: row.user_pwd,
            rememberMe: row.rememberMe
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(err) {
          // 请求失败处理
          console.log(err);
        });
    }
  }
};
</script>
<style scoped></style>
