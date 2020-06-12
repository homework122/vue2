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
          label="规则说明"
          width=""
        ></el-table-column>
        <el-table-column
          prop="act_views"
          label="浏览量"
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
            <el-button @click="deletes(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 修改框 -->
    <el-dialog
      title="修改基础信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="Mform" :model="Mform" label-width="80px">
        <el-form-item label="活动编号">
          <el-input v-model="Mform.act_no" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="Mform.act_name"></el-input>
        </el-form-item>
        <el-form-item label="活动模板编号">
          <el-input v-model="Mform.tem_no"></el-input>
        </el-form-item>
        <el-form-item label="活动创建时间">
          <el-input v-model="Mform.act_creat_time" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="开始时间"
              v-model="Mform.act_start_time"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="结束时间"
              v-model="Mform.act_end_time"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="浏览量">
          <el-input v-model="Mform.act_views" disabled></el-input>
        </el-form-item>
        <el-form-item label="规则说明">
          <el-input type="textarea" v-model="Mform.act_rule"></el-input>
        </el-form-item>
        <el-form-item label="头部图片">
          <el-input type="textarea" v-model="Mform.act_img"></el-input>
        </el-form-item>
        <el-form-item label="组件主题">
          <el-input v-model="Mform.act_parts_name"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="Mform.com_count"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      tableData: [], // 数据表单
      Mform: {
        act_no: "",
        act_name: "",
        tem_no: "",
        act_creat_time: "",
        act_start_time: "",
        act_end_time: "",
        act_views: "",
        act_rule: "",
        act_img: "",
        act_parts_name: "",
        com_count: ""
      }, // 修改数组
      page: 1, // 当前页
      pageSize: 5, // 每页数量
      total: 0, // 总条数
      dialogVisible: false //修改框
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
              sta_no: 2,
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
          });
      } else {
        this.$axios
          .post(
            "/api/activities/queryActivities.do",
            {
              sta_no: 2,
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
          });
      }
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
      this.$axios
        .post(
          "/api/activities/changeActivities.do",
          {
            act_no: r.act_no,
            sta_no: 1
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
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
      this.dialogVisible = !this.dialogVisible;
      for (var key in r) {
        this.Mform[key] = r[key];
      }
    }, //修改
    onSubmit() {
      this.dialogVisible = !this.dialogVisible;
    }, // 修改提交按钮  修改没做完
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    }, //关闭按钮
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
    }, //删除
    handleSizeChange(i) {
      this.page = i;
      this.getTableDataList();
    }, // 分页下标
    handleCurrentChange(i) {
      this.page = i;
      this.getTableDataList();
    } //分页输入框
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
