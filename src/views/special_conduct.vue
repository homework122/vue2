<!-- 进行中页面 -->
<template>
  <div>
    <el-row class="SearchRow">
      <!-- 搜索框 -->
      <el-col :span="10"
        ><div>
          <el-input
            placeholder="输入用户名进行搜索"
            v-model="InputSelect"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
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
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="商品分类名称" width="">
        </el-table-column>
        <el-table-column prop="data" label="创建时间" width="">
        </el-table-column>
        <el-table-column prop="Edata" label="有效时间" width="">
        </el-table-column>
        <el-table-column prop="number" label="商品数" width="">
        </el-table-column>
        <el-table-column prop="browse" label="浏览量" width="">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="200">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
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
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="Modify(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="Delete(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 表单数据部分 -->
    <el-row>
      <el-col :span="6" :offset="18">
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
      title="修改"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="Mform" :model="Mform">
        <el-form-item>
          <el-input v-model="Mform.name" placeholder="名字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="Mform.data" placeholder="创建时间"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="Mform.Edata" placeholder="有效时间"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="Mform.number" placeholder="商品数"></el-input>
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="SbBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      InputSelect: "", //输入框的值
      select: "", //搜索下拉框
      page: 1, //当前页
      pageSize: 5, //每页条数
      total: 3, //总条数
      tableData: [], // 列表数据
      Mform: {}, //修改数据
      dialogVisible: false, // 模态框
      value: true //修改内滑块
    };
  },
  methods: {
    SelectBtn() {
      //搜索按钮
      console.log(this.InputSelect);
      console.log(this.select);
    },
    changeValue(i, r) {
      //开关改变
      console.log(r);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getUserList();
    },
    handleCurrentChange(currentPage) {
      this.page = currentPage;
      this.getUserList();
    },
    //编辑
    Modify(r) {
      this.dialogVisible = !this.dialogVisible;
      console.log(r);
    },
    handleClose(done) {
      //模态框关闭
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    SbBtn() {
      // 修改提交
    },
    Delete(r) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message(
            {
              type: "success",
              message: "删除成功!"
            },
            console.log(r)
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getTableDataList() {
      this.$axios.post("activities/showActivities.do", {
        limit: this.pageSize,
        page: 1
      });
    }
  },
  created() {}
};
</script>
<style scoped>
.SearchRow {
  margin-top: -20px;
}
.el-select {
  width: 100px;
}
.el-row:nth-child(3) > .el-col {
  display: flex;
  justify-content: row-reverse;
}
.el-row:nth-child(2) {
  margin: 20px 0;
}
</style>
