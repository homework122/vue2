<!--    用户列表-->
<template>
  <div>
    <div>
      <!--搜索和发帖-->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.clientName" placeholder="用户名称">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">搜索</el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <el-table
        :header-cell-style="{ background: '#ADD8E6' }"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column label="用户名称" prop="client_name" width="100px" > </el-table-column>
        <el-table-column label="用户头像" prop="client_logo">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; border-radius: 50px ;height: 50px"
              :src="scope.row.client_logo"
              fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="发帖数" prop="post_sum"> </el-table-column>
        <el-table-column label="回帖数" prop="leavemeg_sum">
          <!--        <el-table-column label="加入时间" prop="leavemeg_sum">-->
        </el-table-column>
        <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.client_mod == 0"
              @click="handleEdit(scope.$index, scope.row)"
              style="cursor: pointer"
              >设置版主</el-tag
            >
            <el-tag
              v-else-if="scope.row.client_mod == 1"
              @click="handleEdit(scope.$index, scope.row)"
              type="success"
              style="cursor: pointer"
              >取消版主</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
      <!--        分页-->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "circle",
  props: {},
  inject: ["reload"],
  data() {
    return {
      // 搜索
      formInline: {
        clientName: ""
      },

      formLabelWidth: "120px",
      tableData: [],

      // 分页
      currentPage: 1, //当前页
      pageSize: 5, //条数
      total: 0 //总数
    };
  },
  methods: {
    // 搜索
    search() {
      this.$axios
        .post(
          "/api/forum/cliSearch.do",
          {
            client_name: this.formInline.clientName
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
    },

    handleEdit(index, row) {
      this.$axios
        .post(
          "/api/forum/alterMod.do",
          {
            client_no: row.client_no,
            client_mod: row.client_mod
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
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.reload();
          }
        });
    },

    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.$axios
        .post(
          "/api/forum/client.do",
          {
            page: this.currentPage,
            pageSize: this.pageSize
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$axios
        .post(
          "/api/forum/client.do",
          {
            page: this.currentPage,
            pageSize: this.pageSize
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
    }
  },
  created: function() {
    this.$axios
      .post(
        "/api/forum/client.do",
        {
          pageSize: this.pageSize,
          page: this.currentPage
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        this.tableData = res.data.data;
        this.total = res.data.count;
      });
  }
};
</script>

<style scoped>
#uploadDiv {
  box-sizing: border-box;
  padding-left: 70px;
}
</style>
