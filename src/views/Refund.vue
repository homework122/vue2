<template>
  <div class="Refund">
    <!--  退款-->
    <div id="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="退款编号">
          <el-input
            v-model="formInline.refundId"
            placeholder="退款编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input
            v-model="formInline.orderId"
            placeholder="订单编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="买家昵称">
          <el-input
            v-model="formInline.userName"
            placeholder="买家昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="开始时间"
                v-model="formInline.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker
                placeholder="结束时间"
                v-model="formInline.date2"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="退款状态">
          <el-select v-model="formInline.status" placeholder="退款状态">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="等待处理" value="等待处理"></el-option>
            <el-option label="退款关闭" value="退款关闭"></el-option>
            <el-option label="退款成功" value="退款成功"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onRestart">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格-->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="refundId" label="退款编号" width="180">
      </el-table-column>
      <el-table-column prop="orderId" label="订单编号" width="180">
      </el-table-column>
      <el-table-column prop="buyerName" label="买家" width="180">
      </el-table-column>
      <el-table-column prop="orderMoney" label="订单金额" width="180">
      </el-table-column>
      <el-table-column prop="refundMoney" label="退款金额" width="180">
      </el-table-column>
      <el-table-column prop="date" label="申请时间" width="180">
      </el-table-column>
      <el-table-column prop="status" label="退款状态" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.status | statusForm(scope.row.status) }}</span>
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
  </div>
</template>

<script>
export default {
  name: "Refund",
  data() {
    return {
      formInline: {
        refundId: "",
        orderId: "",
        status: "",
        userName: "",
        date1: "",
        date2: ""
      },
      tableData: [
        {
          refundId: "12345678",
          orderId: "123456999",
          buyerName: "王小虎",
          orderMoney: 199,
          refundMoney: 30,
          status: 1
        },
        {
          refundId: "12345678",
          orderId: "123456999",
          buyerName: "王小虎",
          orderMoney: 199,
          refundMoney: 30,
          status: 0
        },
        {
          refundId: "12345678",
          orderId: "123456999",
          buyerName: "王小虎",
          orderMoney: 199,
          refundMoney: 30,
          status: 2
        },
        {
          refundId: "12345678",
          orderId: "123456999",
          buyerName: "王小虎",
          orderMoney: 199,
          refundMoney: 30,
          status: 1
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      // 查询
      console.log("submit!");
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
      // 点击查看的时候将退款状态传递
      this.$router.push({
        name: "/home/RefundDetail",
        params: { statusId: row.status }
      });
      // this.$router.push('/RefundDetail',{params:{statusId:row.status}})
      console.log(row);
    }
  },
  filters: {
    statusForm(status) {
      if (status == 0) {
        return "退款关闭";
      } else if (status == 1) {
        return "退款成功";
      } else if (status == 2) {
        return "等待处理";
      }
    }
  }
};
</script>

<style scoped></style>
