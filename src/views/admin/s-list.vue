<!--  -->
<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="{background:'#F5F5F5',color:'#606266'  }"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="area_no" label="ID" width=""> </el-table-column>
      <el-table-column prop="area_name" label="区/县名称" width="">
      </el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
              size="mini"
            @click="Delete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column> -->
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      loading: true,
      token: window.sessionStorage.getItem("token")
    };
  },

  components: {},

  computed: {},

  mounted: function() {
    this.getServiceList();
  },

  methods: {
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
    // noUserList() {
    //   this.$axios
    //     .post(
    //       "/api/sys/mgr/showNoWaringMgr.do",
    //       {
    //         remind_no: this.remind_no,
    //         page: 1,
    //         pageSize: 5
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json"
    //         }
    //       }
    //     )
    //     .then(res => {
    //       this.addtableData = res.data.data;
    //     });
    // },
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

    // checkAdd(index, row) {
    //   console.log(row.user_no);
    //   row.checked = false;
    //   this.$axios
    //     .post(
    //       "/api/sys/mgr/addWaringMgr.do",
    //       {
    //         remind_no: this.remind_no,
    //         mgrList: [row.user_no]
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json"
    //         }
    //       }
    //     )
    //     .then(res => {
    //       console.log(res);
    //       this.noUserList();
    //       this.shuchu();
    //       this.getShowList();
    //       if (this.addtableData.length == 0) {
    //         this.dialogFormVisibletwo = false;
    //       }
    //     })
    //     .catch(res => {
    //       console.log(res);
    //     });
    // },

    //获取列表
    getServiceList() {
      this.$axios
        .post(
          "/api/sys/area/showArea.do",
          {
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
          console.log("获取信息成功");
          this.loading = false;
        });
    },
    //删除
    Delete(o, t) {
      console.log(o, t);
      this.$confirm("删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .post(
            "/api/sys/delWaringMgr.do",
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
#text {
  font-size: 22px;
}
.el-table {
  margin: 20px 0;
}
</style>
