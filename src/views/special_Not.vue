<!-- 未进行 -->
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
    <!-- 表单 -->
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
          prop="act_rule"
          label="浏览量"
          width=""
        ></el-table-column>
        <el-table-column
          prop="sta_name"
          label="状态"
          width=""
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="open(scope.row)" type="text" size="small"
              >开启</el-button
            >
            <el-button @click="details(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button @click="details(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 修改框 -->
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>修改基础信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      InputSelect: "", // 搜索框
      tableData: [], // 数据表单
      page: 1, // 当前页
      pageSize: 5, // 每页数量
      total: 0, // 总条数
      dialogVisible:false //修改框
    };
  },
  methods: {
    SelectBtn() {
      console.log(this.InputSelect);
    }, //搜索
    getTableDataList() {
      this.$axios
        .post(
          "/api/activities/showActivities.do",
          {
            limit: this.pageSize,
            page: this.page,
            sta_no: 2
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
    }, // 获取数据
    open(r) {
      this.$axios.post("/api/activities/changeActivities.do", {
        act_no:r.act_no,
        sta_no:1
      },{
         headers: {
              "Content-Type": "application/json"
            }
      }).then(res => {
        if (res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          }
        this.getTableDataList();
      });
    }, //开启
    details(r) {
      console.log(r)
    }
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
