<template>
  <div>
    <!--搜索-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input
          v-model="formInline.com_name"
          placeholder="商品名称"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="下单时间">
        <el-date-picker
          size="small"
          v-model="formInline.date"
          type="datetimerange"
          range-separator="至"
          :start-placeholder="开始日期"
          :end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <br />
      <el-form-item label="买家昵称">
        <el-input
          v-model="formInline.order_nickname"
          placeholder="买家昵称"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input
          v-model="formInline.order_no"
          placeholder="订单编号"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select
          v-model="formInline.order_trasta"
          placeholder="请选择"
          size="small"
        >
          <el-option label="请选择" value=""></el-option>
          <el-option label="全部" value="0"></el-option>
          <el-option label="待付款" value="1"></el-option>
          <el-option label="待发货" value="2"></el-option>
          <el-option label="待收货" value="3"></el-option>
          <el-option label="退款" value="4"></el-option>
          <el-option label="交易成功" value="5"></el-option>
          <el-option label="交易关闭" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit()"
          size="small"
          icon="el-icon-search"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <div
      style="margin-bottom: 20px"
      v-for="item in orderTabel"
      :key="item.order_no"
    >
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            订单编号：{{ item.order_no }}
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            下单时间：{{ item.order_otime | formatDate }}
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            买家：{{ item.order_rename }}
          </div></el-col
        >
      </el-row>

      <el-table
        :data="item.orcoms"
        border
        :show-header="false"
        :span-method="objectSpanMethod"
        style="width: 100%"
      >
        <el-table-column label="" prop="dispm.dispm_name" width="120">
        </el-table-column>
        <el-table-column width="580">
          <template slot-scope="scope">
            <el-image style="width: 120px" :src="scope.row.com_imgs"></el-image>
            <p>{{ scope.row.com_name }}</p>
          </template>
        </el-table-column>
        <el-table-column width="160">
          <template slot-scope="scope">
            <el-tag
              style="width: 70px;text-align: center"
              type="success"
              v-if="item.order_trasta == 1"
              >待付款</el-tag
            >
            <el-tag
              style="width: 70px;text-align: center"
              type="success"
              v-else-if="item.order_trasta == 2"
              >待发货</el-tag
            >
            <el-tag
              style="width: 70px;text-align: center"
              type="success"
              v-else-if="item.order_trasta == 3"
              >待收货</el-tag
            >
            <el-tag
              style="width: 70px;text-align: center"
              type="success"
              v-else-if="item.order_trasta == 4"
              >退款</el-tag
            >
            <el-tag
              style="width: 70px;text-align: center"
              type="success"
              v-else-if="item.order_trasta == 5"
              >交易成功</el-tag
            >
            <el-tag
              style="width: 70px;text-align: center"
              type="success"
              v-else-if="scope.row.order_trasta == 6"
              >交易关闭</el-tag
            >

            <el-tag
              style="width: 70px;text-align: center; cursor: pointer"
              type="info"
              @click="tiao(item.order_no, item.order_status, item.order_trasta)"
              >订单详情</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column width="200">
          <p>{{ item.order_actcol }}</p>
          <p>(含配送费{{ item.order_delpri }})</p>
        </el-table-column>
      </el-table>
    </div>
    <!-- 页码 -->
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
  name: "jinsanyue",
  data() {
    return {
      page: 1, //页码
      pageSize: 5, //页容量
      total: 0, //总条数
      //订单信息买家昵称
      order_nickname: "",
      startTime: "",
      endTime: "",
      //下单时间
      a: "",
      //订单编号
      order_no: "",
      //    搜索值
      formInline: {
        com_name: "", //商品名称
        order_nickname: "", //昵称
        order_no: "", //订单编号
        order_trasta: "", //状态
        //下单时间
        date: ""
      },
      order_otimestart: "2020-06-15",
      order_otimeend: "2020-03-23",
      orderTabel: "", //近三月订单
      tableData: []
    };
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  methods: {
    //查询按钮
    onSubmit() {
      console.log("submit!");
      // console.log(this.formInline.date);
      this.formInline.date = [
        new Date(this.order_otimestart),
        new Date(this.order_otimeend)
      ];
      console.log(this.formInline.date);
    },

    // 查询最近三个月的订单管理
    getThereList() {
      this.$axios
        .post(
          "/api/sale/queryOrderNow.do",
          {
            page: this.page,
            pagesize: this.pageSize
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          this.orderTabel = res.data.data;
          // console.log(this.orderTabel)
          console.log(2, res.data.data);
        });
    },

    // 合并
    objectSpanMethod({ columnIndex }) {
      if (columnIndex > 1) {
        return {
          rowspan: 2,
          colspan: 1
        };
      }
    },

    // 页码获取
    handleSizeChange(size) {
      this.pageSize = size;
      this.getThereList();
    },
    handleCurrentChange(currentPage) {
      this.page = currentPage;
      this.getThereList();
    },

    // 跳转到详情
    tiao(orderNo, status, trasta) {
      this.$router.push({
        path: "/home/orderDetails",
        query: {
          order_no: orderNo,
          order_status: status,
          order_trasta: trasta
        }
      });
    }
  },
  mounted() {
    this.getThereList();
  }
};
</script>

<style scoped></style>
