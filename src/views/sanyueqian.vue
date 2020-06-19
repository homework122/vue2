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
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
    <!--<el-tab-pane label="近三个月订单" name="dingdanxiangqing"></el-tab-pane>-->
    <!--<router-view></router-view>-->
    <!--</el-tabs>-->
    <!--数据表格-->
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">订单编号：{{ order_no }}</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">下单时间：{{ a }}</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">买家：{{ order_nickname }}</div>
      </el-col>
    </el-row>
    <template>
      <el-table
        :data="tableData"
        :span-method="arraySpanMethod"
        border
        style="width: 100%" 
         :header-cell-style="{background:'#96C9FF',color:'#606266'  }"
      >
        <el-table-column prop="name" label="包裹编号" width="180">
        </el-table-column>
        <el-table-column prop="coms" label="商品"> </el-table-column>
        <el-table-column prop="amount1" sortable label="订单状态">
        </el-table-column>
        <el-table-column prop="amount2" sortable label="实收款">
        </el-table-column>
        <el-table-column sortable label="订单详情">
          <template slot-scope="scope">
            <router-link
              :to="{
                name: '/home/order/dingdanxiangqing',
                params: {
                  dingdanbiaohao: formInline.order_no,
                  zhuantai: scope.row.order_trasta
                }
              }"
              >查看<i class="el-icon-view el-icon--right"></i>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="name" label="包裹编号" width="180">
        </el-table-column>
        <el-table-column prop="coms" label="商品"> </el-table-column>
        <el-table-column prop="order_trasta" sortable label="订单状态">
        </el-table-column>
        <el-table-column prop="amount2" sortable label="实收款">
        </el-table-column>
        <el-table-column prop="" sortable label="订单详情">
          <template slot-scope="scope">
            <router-link
              :to="{
                name: '/home/order/dingdanxiangqing',
                params: {
                  dingdanbiaohao: formInline.order_no,
                  zhuantai: scope.row.order_trasta
                }
              }"
              >查看<i class="el-icon-view el-icon--right"></i>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  name: "dengfukuan",
  data() {
    return {
      //订单信息买家昵称
      order_nickname: "",
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

      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        }
      ]
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
    //表格合并计算
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
      console.log(row, column, rowIndex, columnIndex);
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 5,
            colspan: 1
          };
        }
      }
      console.log(5, 2);
      console.log(row, column, rowIndex, columnIndex);
    }
  }
};
</script>

<style scoped></style>
