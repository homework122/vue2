<!-- 进行中页面 -->
<template>
  <div>
    <el-row class="SearchRow">
      <!-- 搜索框 -->
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
    <el-row>
      <!-- 表单 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#ADD8E6' }"
      >
        <el-table-column width="10"> </el-table-column>
        <el-table-column prop="act_no" label="专题活动编号" width="">
        </el-table-column>
        <el-table-column prop="act_name" label="专题活动名称" width="">
        </el-table-column>
        <el-table-column prop="act_views" label="浏览量" width="">
        </el-table-column>
        <el-table-column prop="act_rule" label="规则说明" width="">
        </el-table-column>
        <el-table-column prop="sta_no" label="状态" width="">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.act_del_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="2"
              @change="changeValue(scope.$index, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="details(scope.row)" type="text" size="small"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 表单数据部分 -->
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
      <!-- 表单分页部分 -->
    </el-row>
    <!-- 弹出框 -->
    <el-dialog
      title="所有信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="detailsForm" :model="detailsForm" label-width="100px">
        <el-form-item label="专题活动编号">
          <el-input v-model="detailsForm.act_no" disabled></el-input>
        </el-form-item>
        <el-form-item label="专题活动名称">
          <el-input v-model="detailsForm.act_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动模板编号">
          <el-input v-model="detailsForm.tem_no" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
                type="date"
                placeholder="开始时间"
                v-model="detailsForm.act_creat_time"
                size="mini"
                style="width: 100%;"
                disabled
              ></el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
                type="date"
                placeholder="开始时间"
                v-model="detailsForm.act_start_time"
                size="mini"
                style="width: 100%;"
                disabled
              ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
           <el-date-picker
                type="date"
                placeholder="开始时间"
                v-model="detailsForm.act_end_time"
                size="mini"
                style="width: 100%;"
                disabled
              ></el-date-picker>
        </el-form-item>
        <el-form-item label="浏览量">
          <el-input v-model="detailsForm.act_views" disabled></el-input>
        </el-form-item>
        <el-form-item label="规则说明">
          <el-input v-model="detailsForm.act_rule" disabled></el-input>
        </el-form-item>
        <el-form-item label="模板头部图片">
           <el-upload
            :file-list="[{ url: detailsForm.act_img }]"
            action="/api/uploadfile.do"
            auto-upload
            list-type="picture-card"
            disabled
            style="width:150px;height:150px;overflow: hidden"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品组件主题">
          <el-input v-model="detailsForm.act_parts_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="detailsForm.sta_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="detailsForm.com_count" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      InputSelect: "", //输入框的值
      page: 1, //当前页
      pageSize: 5, //每页条数
      total: 0, //总条数
      tableData: [], // 列表数据
      detailsForm: {}, //详情数据
      dialogVisible: false, // 模态框
      value: true //修改内滑块
    };
  },
  methods: {
    SelectBtn() {
      //搜索按钮
      if (this.page != 1) {
        this.page = 1;
        this.$axios
          .post(
            "/api/activities/queryActivities.do",
            {
              sta_no: 1,
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
            console.log(res);
            this.tableData = res.data.data;
            this.total = res.data.count;
          });
      } else {
        this.$axios
          .post(
            "/api/activities/queryActivities.do",
            {
              sta_no: 1,
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
            this.tableData = res.data.data;
            this.total = res.data.count;
          });
      }
    },
    changeValue(i, r) {
      //开关改变
      this.$axios
        .post(
          "/api/activities/changeActivities.do",
          {
            act_no: r.act_no,
            sta_no: r.act_del_status
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
    },
    // 页码改变
    handleSizeChange(size) {
      this.page = size;
      this.getTableDataList();
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage);
      this.page = currentPage;
      this.getTableDataList();
    },
    //详情
    details(r) {
      this.dialogVisible = !this.dialogVisible;
      this.detailsForm = r;
    },
    handleClose(done) {
      //模态框关闭
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 获取数据
    getTableDataList() {
      this.$axios
        .post(
          "/api/activities/showActivities.do",
          {
            limit: this.pageSize,
            page: this.page,
            sta_no: 1
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
  created() {
    this.getTableDataList();
  }
};
</script>

<style scoped>
.SearchRow {
  margin-top: 10px;
}
.el-select {
  width: 100px;
}
.el-row:nth-child(2) {
  margin: 20px 0;
}
</style>
