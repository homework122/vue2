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



    <div v-for="(item) in orderTabel" :key="item.order_no" >


      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple">
          订单编号：{{item.order_no}}
          </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">
          下单时间：{{item.order_otime}}
          </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">
          买家：{{item.order_rename}}
        </div></el-col>
      </el-row>
      <table>
        <tr v-for="goodItem in item.orcoms">
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>


      </table>
        <el-table
                :data="item.orcoms"
                border
                style="width: 100%">
          <el-table-column
                  label=""
                  prop="dispm.dispm_name"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="com_name"
                  width='200'
          >
          </el-table-column>
          <el-table-column
                  prop="amount1"
                  width='120'

          >
          </el-table-column>
          <el-table-column
                  prop="amount2"
                  width='120'

          >
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
      startTime: '',
      endTime: '',
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
      orderTabel:"",//近三月订单
      tableData: [ ]
    };
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
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.orderTabel=res.data.data
          // console.log(this.orderTabel)
          console.log(2, res.data.data)



        });
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
  },
  mounted() {
    this.getThereList();
  }
};
</script>

<style scoped></style>
