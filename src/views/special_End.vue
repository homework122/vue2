<!-- 已结束页面 -->
<template>
  <div>
    <!-- 搜索框 -->
    <el-row class="SearchRow">
      <el-col :span="10"
        ><div>
          <el-input
            placeholder="输入活动名称进行搜索"
            v-model="InputSelect"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="SelectBtn"
            ></el-button>
          </el-input></div
      ></el-col>
    </el-row>
    <!-- 表单数据 -->
    <el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#ADD8E6' }"
      >
        <el-table-column width="10"> </el-table-column>
        <el-table-column
          prop="act_no"
          label="专题活动编号"
          width=""
        ></el-table-column>
        <el-table-column
          prop="act_name"
          label="专题活动名称"
          width=""
        ></el-table-column>
        <el-table-column
          prop="act_end_time"
          label="专题结束时间"
          width=""
        ></el-table-column>
        <el-table-column
          prop="act_views"
          label="浏览量"
          width=""
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="deletes(scope.row)" type="text" size="small"
              >删除记录</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页 -->
    <el-row>
      <el-col :span="6" :offset="8">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
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
      InputSelect: "", // 搜索框
      tableData: [], // 数据数组
      pageSize: 5, // 每页条数
      page: 1, // 当前页
      total: 0 // 总条数
    };
  },
  methods: {
    SelectBtn() {
      if (this.page != 1) {
        this.page = 1;
        this.$axios
          .post(
            "/api/activities/queryActivities.do",
            {
              sta_no: 3,
              act_name: this.InputSelect,
              limit: this.pageSize,
              page: this.page
            },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => {
            (this.tableData = res.data.data), (this.total = res.data.count);
            console.log(res);
          });
      } else {
        this.$axios
          .post(
            "/api/activities/queryActivities.do",
            {
              sta_no: 3,
              act_name: this.InputSelect,
              limit: this.pageSize,
              page: this.page
            },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => {
            console.log(res)((this.tableData = res.data.data)),
              (this.total = res.data.count);
          });
      }
    }, //搜索功能
    getTableDataList() {
      this.$axios
        .post(
          "/api/activities/showActivities.do",
          {
            limit: this.pageSize,
            page: this.page,
            sta_no: 3
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
    }, //获取列表数据
    deletes(r) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(
              "/api/activities/delActivities.do",
              {
                act_no: r.act_no
              },
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
            .then(res => {
              this.getTableDataList();
              this.$message({
                type: "success",
                message: res.data.msg
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }, // 删除
    handleSizeChange(i) {
      console.log(i);
      this.page = i;
      this.getTableDataList();
    }, //页码下标
    handleCurrentChange(i) {
      console.log(i);
      this.page = i;
      this.getTableDataList();
    } // 页码数字
  },
  created() {
    this.getTableDataList();
  }
};
</script>

<style scoped>
.SearchRow {
  margin-top: 10px;
}
.el-row:nth-child(2) {
  margin: 20px 0;
}
</style>
