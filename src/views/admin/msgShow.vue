<!--  -->
<template>
  <div>
    <el-button type="primary" size="small" @click="onAdd">添加</el-button>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="{background:'#96C9FF',color:'#606266'  }"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="user_no" label="ID" width=""> </el-table-column>
      <el-table-column prop="user_name" label="用户昵称" width="">
      </el-table-column>
      <el-table-column prop="user_email" label="用户邮箱" width="">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
              size="mini"
            @click="Delete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <el-dialog :visible.sync="dialogFormVisibletwo">
      <el-table
        ref="addtableData"
        :data="addtableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="addloading"
      >
        <!-- <el-table-column fixed="left" label="添加" width="120">
          <template slot-scope="scope">
            <el-button
              @click="checkAdd(scope.$index, scope.row)"
              type="text"
              icon="el-icon-upload2"
                size="mini"
              id="text"
            ></el-button>
          </template>
        </el-table-column> -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="user_name" label="用户昵称" width="">
        </el-table-column>
        <el-table-column prop="user_email" label="用户邮箱" width="">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="displayNoneone">返回</el-button>
        <el-button @click="up">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
      tableData: [],
      remind_no: 1,
      page: 1,
      pageSize: 5,
      total: 0,
      dialogFormVisibletwo: false,
      addtableData: {
        user_name: "",
        user_email: ""
      },
      sun: [],
      loading: true,
      addloading: true,
      token: window.sessionStorage.getItem("token")
    };
  },

  components: {},

  computed: {},

  mounted: function() {
    this.shuchu();
    this.getShowList();
    this.noUserList();
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      console.log(this.multipleSelection);
    },
    //表头背景颜色设置
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return "background-color:lightblue;coloe:#fff";
      }
    },
    shuchu() {
      console.log(this.addtableData);
    },
    //添加框显示
    onAdd() {
      this.dialogFormVisibletwo = true;
      this.noUserList();
      console.log(this.addtableData);
      this.getShowList();
      console.log(this.tableData);
    },
    //添加框隐藏
    displayNoneone() {
      this.dialogFormVisibletwo = false;
    },
    //获取没有权限收到通知的用户
    up() {
      var that = this;
      console.log(this.multipleSelection);
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.sun.push(this.multipleSelection[i].user_no);
      }
      console.log(this.sun);
      this.$axios
        .post(
          "/api/sys/waring/addWaringMgr.do",
          {
            remind_no: this.remind_no,
            mgrList: this.sun
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
          this.noUserList();
          this.shuchu();
          this.getShowList();
          that.$message({
            message: res.data.msg,
            type: "success"
          });
          this.sun = [];
          if (this.addtableData.length == 0) {
            this.dialogFormVisibletwo = false;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },

    noUserList() {
      this.$axios
        .post(
          "/api/sys/waring/showNoWaringMgr.do",
          {
            remind_no: this.remind_no,
            page: 1,
            pageSize: 5
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: this.token
            }
          }
        )
        .then(res => {
          this.addtableData = res.data.data;
          this.addloading = false;
        });
    },
    //添加
    // addTableData(){
    //     var that=this
    //     this.$axios.post("/api/sys/showNoWaringMgr",{

    //     }).then(res=>{
    //         that.$message({
    //                     message:res.data.msg,
    //                     type: 'success'
    //         })
    //         console.log(res)
    //         this.addtableData=this.res.data.data

    //     })
    // },

    checkAdd(index, row) {
      var that = this;
      console.log(row.user_no);
      row.checked = false;
      this.$axios
        .post(
          "/api/sys/waring/addWaringMgr.do",
          {
            remind_no: this.remind_no,
            mgrList: [row.user_no]
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
          this.noUserList();
          this.shuchu();
          this.getShowList();
          that.$message({
            message: res.data.msg,
            type: "success"
          });
          if (this.addtableData.length == 1) {
            this.dialogFormVisibletwo = false;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },

    //获取列表
    getShowList() {
      this.$axios
        .post(
          "/api/sys/waring/showWaringMgr.do",
          {
            remind_no: this.remind_no,
            page: this.page,
            pageSize: this.pageSize
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
          this.tableData = res.data.data;
          this.total = res.data.count;
          this.loading = false;
        });
    },
    //删除
    Delete(o, t) {
      console.log(o, t);
      var that = this;
      this.$axios
        .post(
          "/api/sys/waring/delWaringMgr.do",
          {
            remind_no: this.remind_no,
            user_no: t.user_no
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
          this.noUserList();
          this.getShowList();
          that.$message({
            message: "用户" + res.data.msg,
            type: "success"
          });
        });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getShowList();
    },
    handleCurrentChange(currentPage) {
      this.page = currentPage;
      this.getShowList();
    }
  }
};
</script>
<style scoped>
/* #text{
    font-size: 22px;
} */
div > .el-button {
  margin-bottom: 10px;
}
.el-table {
  margin: 20px 0;
}
</style>
