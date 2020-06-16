<template>
  <div class="Refund">
    <div id="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="退款编号">
          <el-input
            v-model="formInline.infor_no"
            placeholder="退款编号"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input
            v-model="formInline.order_no"
            placeholder="订单编号"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="买家昵称">
          <el-input
            v-model="formInline.client_no"
            placeholder="买家昵称"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="开始时间"
                v-model="formInline.infor_startime"
                style="width: 100%;"
                size="mini"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker
                placeholder="结束时间"
                v-model="formInline.infor_endtime"
                style="width: 100%;"
                size="mini"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="退款状态">
          <el-select
            v-model="formInline.infor_status"
            placeholder="退款状态"
            size="mini"
          >
            <el-option label="全部" value="全部"></el-option>
            <el-option label="等待处理" value="0"></el-option>
            <el-option label="退款关闭" value="2"></el-option>
            <el-option label="退款成功" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" circle @click="onSubmit"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格-->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="infor_no" label="退款编号" width="180">
      </el-table-column>
      <el-table-column prop="order_no" label="订单编号" width="180">
      </el-table-column>
      <el-table-column prop="client_no" label="买家" width="180">
      </el-table-column>
      <el-table-column prop="order_actcol" label="订单金额" width="180">
      </el-table-column>
      <el-table-column prop="infor_money" label="退款金额" width="180">
      </el-table-column>
      <el-table-column prop="infor_startime" label="申请时间" width="180">
      </el-table-column>
      <el-table-column prop="infor_status" label="退款状态" width="180">
        <template slot-scope="scope">
          <span>{{
            scope.row.infor_status | statusForm(scope.row.infor_status)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="买家">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 6, 9, 12]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Refund",
  data() {
    return {
      formInline: {
        infor_no: "", //退款编号
        infor_startime: "", //申请开始时间
        infor_endtime: "", //申请结束时间
        order_no: "", //订单编号
        client_no: "", //买家
        infor_status: "" //退款状态
      },
      tableData: [],
      // 分页
      currentPage: 1,
      pagesize: 3, // 每页显示的条数
      total: "" //总条数
    };
  },
  methods: {
    // 退款信息总数据
    getAllInfo(currentPage, pagesize) {
      this.$axios
        .post("/api/refund/queryInformationAll.do", {
          page: currentPage, //当前页码数
          pagesize: pagesize //每页显示条数
        })
        .then(res => {
          // this.tableData = res.data
          console.log("res", res);
          console.log("res.data", res.data.data);
          this.tableData = res.data.data;
          this.total = res.data.count;
          console.log("this.tableData", this.tableData);
          console.log("this.total", this.total);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 得到查询信息
    onSubmit() {
      console.log(this.formInline.infor_status);
      // 查询请求数据
      this.$axios
        .post(
          "/api/refund/queryInformationCondition.do",
          {
            infor_no: parseInt(this.formInline.infor_no), //退款编号
            infor_startime: this.formInline.infor_startime, //申请开始时间
            infor_endtime: this.formInline.infor_endtime, //申请结束时间
            order_no: parseInt(this.formInline.order_no), //订单编号
            client_no: parseInt(this.formInline.client_no), //买家
            infor_status: this.formInline.infor_status, //退款状态,
            page: this.currentPage,
            pagesize: this.pagesize
          },
          {
            headers: { "Content-Type": "application/json" }
          }
        )
        .then(res => {
          this.tableData = res.data.date;
          // window.location.reload()
          console.log("查询信息", res.data.date);
        })
        .catch(err => {
          console.log(err);
        });
      console.log("submit!");
    },
    // 改变每页显示条数
    handleSizeChange(val) {
      this.pagesize = val;
      console.log("pagesize");
      console.log(this.pagesize);
      this.getAllInfo(this.currentPage, this.pagesize);
    },
    // 分页改变当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log("currentPage");
      console.log(this.currentPage);
      // 再次请求数据
      this.getAllInfo(this.currentPage, this.pagesize);
    },
    // 重置
    onRestart() {
      console.log("onRestart");
      this.formInline.refundId = "";
      this.formInline.orderId = "";
      this.formInline.status = "";
      this.formInline.userName = "";
      this.formInline.date1 = "";
      this.formInline.date2 = "";
    },

    // 表格
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleClick(row) {
      console.log(row);
      // 点击查看的时候将退款状态传递
      this.$router.push({
        name: "RefundDetail",
        params: {
          statusId: row.infor_status,
          refundId: row.infor_no,
          sendOrderId: row.order_no
        }
      });
      // this.$router.push('/RefundDetail',{params:{statusId:row.status}})
      console.log(row);
    }
  },
  filters: {
    statusForm(status) {
      if (status == 0) {
        return "等待处理";
      } else if (status == 1) {
        return "退款成功";
      } else if (status == 2) {
        return "退款关闭";
      }
    }
  },
  mounted() {
    // 退款信息总数据
    this.getAllInfo(this.currentPage, this.pagesize);
  }
};
</script>

<style scoped></style>
