<template>
  <div>
    <span v-on:click="back" class="el-icon-caret-left">返回</span>
    <!--订单详情-->
    <div v-show="buzoutiao">
      <el-steps
        :active="active"
        :finish-status="zhuantai"
        simple
        style="margin-top: 20px"
      >
        <el-step title="买家下单"></el-step>
        <el-step title="买家付款"></el-step>
        <el-step title="退款" v-if="active == 4"></el-step>
        <el-step
          title="发货"
          v-if="
            !active == 4 ||
              active == 1 ||
              active == 2 ||
              active == 3 ||
              active == 5
          "
        ></el-step>
        <el-step
          title="买家确认收货"
          v-if="
            !active == 4 ||
              active == 1 ||
              active == 2 ||
              active == 3 ||
              active == 5
          "
        ></el-step>
      </el-steps>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple div" v-show="xiadan">
            <p>下单时间</p>
            <p>{{ orderData.order_otime | formatDate }}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple div" v-show="fukuan">
            <p>付款时间</p>
            <p>{{ orderData.order_ptime | formatDate() }}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple div" v-show="fahuo">
            <p>发货时间</p>
            <p>{{ c }}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple div" v-show="shouhuo">
            <p>确认收货时间</p>
            <p>{{ d }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--订单状态说明-->
    <div class="bg">
      <div v-if="active == 1">
        <p>&nbsp;&nbsp;当前订单状态:商品已拍下,等待买家付款</p>
        <p>●买家还有2天23小时59分00秒支付订单,否则系统将自动关闭订单。</p>
        <p>●如果商品被恶意拍下,您可以后台取消订单哟~</p>
        <el-button :type="leixing" @click="guan()"> </el-button>
      </div>
      <el-dialog
        title="请输入取消原因"
        :visible.sync="visible"
        width="30%"
        :before-close="handleClose"
      >
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入"
          v-model="yuanyin"
          clearable
        >
        </el-input>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false"
            >取消</el-button
          >
          <el-button type="primary" size="mini" @click="queding()"
            >确定</el-button
          >
        </div>
      </el-dialog>
      <div v-if="active == 2">
        <div v-if="tui == '申请退款'">
          <p>&nbsp;&nbsp;当前订单状态:买家已付款,等待卖家发货</p>
          <p>
            ●根据商品属性和设置的配送费模板,系统会自动将订单拆分1个或者多个包裹。
          </p>
          <p>
            ●每个包裹的配送方式和商品属性不同,您需要对每个包裹进行单独发货。
          </p>
          <p>●同城配送和同城配送(即时达)包裹系统自动指派给配送员。</p>
          <p>
            ●配送方式为快递物流包裹,
            点击马上发货按钮,弹窗输入物流公司和运单号,确定操作后发货成功。
          </p>
        </div>
        <div v-if="tui == '取消退款'">
          <p>当前订单状态:卖家申请退款,买家已付款</p>
          <p>●申请退款后,用户端用户订单状态改变为退款受理</p>
          <p>●申请退款后,客服核查无误后在退款管理中操作同意申请,订单退款完成</p>
          <p>●如果没有和用户达成一致,请及时取消退款申请</p>
          <p>●取消退款申请后,用户端订单状态还原在当前订单状态</p>
        </div>
        <el-button :type="refund" @click="tuikuan()">{{ tui }}</el-button>
      </div>
      <div v-if="active == 3">
        <p>当前订单状态:卖家已发货等待买家收货</p>
        <p>●任一包裹发货,订单视为已发货(等待买家收货)。</p>
        <p>
          ●同城配送和同城配送(即时达)包裹,跑腿员确认操作后,订单完成发货操作。
        </p>
        <p>
          ●多包裹订单发货后,买家将收到多个包裹,请积极跟踪物流,及时和买家沟通。
        </p>
      </div>
      <div v-if="active == 5">
        <p>当前订单状态:买家确认收货,交易成功</p>
        <p>●交易成功,提醒买家评价商品, 会带来更多购买量哦。</p>
        <p>●交易成功,如果买家提出售后要求,请积极与买家协商,做好售后服务。</p>
        <p>
          如果买家提前确认收货,包裹还未全部送达,记得跟踪物流信息,给买家一一个好的购物体验。
        </p>
      </div>
      <div v-if="active == 6">
        <p>当前订单状态:取消订单,交易关闭</p>
        <p>●取消原因:{{ yuanyin }}</p>
      </div>
    </div>
    <!--买家信息-->
    <div class="bg">
      <div>
        <p>买家信息</p>
        <el-divider></el-divider>
        <p>用户昵称:{{ orderData.order_rename }}</p>
        <p>
          支付方式:
          <el-tag v-if="orderData.order_paymeth == 0">微信</el-tag>
          <el-tag v-else-if="orderData.order_paymeth == 1">支付宝</el-tag>
          <el-tag v-else-if="orderData.order_paymeth == 3">钱包</el-tag>
        </p>
        <p>收件人姓名:{{ orderData.order_rename }}</p>
        <p>收件人电话:{{ orderData.order_recall }}</p>
        <p>收件人地址:{{ orderData.order_readdr }}</p>
      </div>
    </div>
    <!--物流信息-->
    <div class="bg">
      <p>物流信息</p>
      <el-divider></el-divider>
      <!--表格物流-->
      <el-table
        v-if="active >= 2"
        :data="orderData.orcoms"
        header-align="center"
        border
        style="width: 100%; margin-top: 20px"
        :header-cell-style="{background:'#F5F5F5',color:'#606266'  }"
      >
        <el-table-column prop="logistics.dispm_name" label="配送方式">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.logistics.dispm_name"
              placeholder="请选择"
              size="small"
            >
              <el-option label="同城配送" value="同城配送"></el-option>
              <el-option label="快速物流" value="快速物流"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="logistics.logis_name" label="配送公司名称">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.logistics.logis_name"
              size="small"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="物流状态">
          <template>
            <el-tag
              style="width: 70px;text-align: center"
              type="success"
              v-if="orderData.order_trasta == 1"
              >待付款</el-tag
            >
            <el-tag
              style="width: 70px;text-align: center"
              type="success"
              v-else-if="orderData.order_trasta == 2"
              >待发货</el-tag
            >
            <el-tag
              style="width: 70px;text-align: center"
              type="success"
              v-else-if="orderData.order_trasta == 3"
              >待收货</el-tag
            >
            <el-tag
              style="width: 70px;text-align: center"
              type="success"
              v-else-if="orderData.order_trasta == 4"
              >退款</el-tag
            >
            <el-tag
              style="width: 70px;text-align: center"
              type="success"
              v-else-if="orderData.order_trasta == 5"
              >交易成功</el-tag
            >
            <el-tag
              style="width: 70px;text-align: center"
              type="success"
              v-else-if="orderData.order_trasta == 6"
              >交易关闭</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="logistics.order_no" label="订单号">
          <template slot-scope="scope">
            <el-input
              placeholder=""
              v-model="scope.row.logistics.order_no"
              @change="h(scope.$index, scope.row)"
              size="small"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="logistics.logis_detime"
          width="200"
          label="发货日期"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.logistics.logis_name"
              size="small"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.hand"
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >{{ delivery }}
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--物流详情-->
      <div
        v-if="this.delivery == '收起' || this.deliver == '收起'"
        class="margin"
      >
        <div>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </div>
        <div>
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </div>
      </div>
      <!--订单信息-->
      <el-divider></el-divider>
      <p>订单信息</p>

      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            订单编号：{{ orderData.order_no }}
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            下单时间：{{ orderData.order_otime | formatDate }}
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            付款时间：{{ orderData.order_ptime | formatDate }}
          </div>
        </el-col>
      </el-row>
      <!--订单表-->
      <!--表格循环-->
      <div>
        <el-table
          :data="orderData.orcoms"
          border
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column type="index" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="com_name" label="商品"> </el-table-column>
          <el-table-column prop="standards.stan_price" label="单价">
          </el-table-column>
          <el-table-column prop="number" label="数量"> </el-table-column>
          <el-table-column prop="standards.stan_pprice" label="总价">
          </el-table-column>
          <!--                      <el-table-column prop="coupons" label="优惠券">-->

          <!--                      </el-table-column>-->
        </el-table>
      </div>

      <div class="right">
        <div>
          <p>订单商品总金额:{{ orderData.order_prices }}元</p>
          <p>订单总配送费:{{ orderData.order_delpri }}元</p>
          <p>订单优惠金额:{{ orderData.order_prepri }}元</p>
          <p>实收金额:{{ orderData.order_actcol }}元</p>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dingdanxiangqing",
  data() {
    return {
      // true:true,/
      //表头
      fal: false,
      //订单状态
      active: "",
      // 订单信息
      orderData: "",
      zhuantai: "success",
      buzoutiao: true,
      //退款原因
      visible: false,
      yuanyin: "",
      //    下单时间
      a: "2020-11-03",
      b: "2020-11-03",
      c: "2020-11-03",
      d: "2020-11-03",
      xiadan: false,
      fukuan: false,
      fahuo: false,
      shouhuo: false,
      //    关闭交易按钮
      guanbi: "关闭交易",
      //存订单状态
      cunchu: "",
      //    按钮类型
      leixing: "primary",
      //    申请退款
      tui: "申请退款",
      //    退款按钮类型
      refund: "primary",
      //    买家基本信息
      user: "石头", //用户昵称
      pay: "微信支付", //支付方式
      name: "陈小姐", //用户姓名
      phone: "18270246040", //用户电话
      address: "广东省深圳市福田区华强北街道华强北路1019号华强广场酒店", //收件地址
      //    物流信息
      tableData: [
        {
          order_no: "",
          peisong: "",
          wuliu: "",
          wuliuzhuangtai: "",
          danhao: "",
          date: "",
          show: true,
          hand: true
        }
      ],
      tableData2: [
        {
          order_no: "",
          peisong: "",
          wuliu: "",
          wuliuzhuangtai: "",
          danhao: "",
          date: "",
          show: true,
          hand: true
        }
      ],
      // 物流信息操作
      delivery: "发货",
      deliver: "发货",
      // hand: true,
      // 配送费
      order_delpri: "",
      //优惠金额
      order_prepri: "",
      //订单总金额
      order_prices: "",
      // 实收金额
      order_actcol: "",
      //循环数组
      tableDatas: [
        {
          tableData: [
            {
              order_no: "", //包裹
              coms: "", //商品
              price: "", //单价
              numberof: "", //数量
              totalPrice: "", //总价
              coupons: "" //优惠券
            },
            {
              order_no: "",
              coms: "",
              price: "",
              numberof: "",
              totalPrice: "", //总价
              coupons: ""
            }
          ]
        },
        {
          tableData: [
            {
              order_no: "",
              peisong: "王小虎",
              wuliu: "234",
              wuliuzhuangtai: "3.2",
              danhao: 10,
              date: "5"
            },
            {
              order_no: "",
              peisong: "252",
              wuliu: "232524",
              wuliuzhuangtai: "252",
              danhao: 10,
              date: "5"
            }
          ]
        }
      ],
      // 订单编号
      order_no: this.$route.params.dingdanbiaohao,
      //    存储单号的值
      ding: "",
      din: ""
    };
  },
  methods: {
    //返回上一层
    back() {
      this.$router.go(-1); //返回上一层
    },
    //    关闭交易按钮
    guan() {
      setTimeout(function() {
        this.active = 6;
        this.zhuantai = "finish";
        this.guanbi = "恢复交易";
        this.yuanyin = "超时未支付,系统自动取消( 2016-09-14 16:04:05 )";
      }, 90000);

      if (this.guanbi == "关闭交易") {
        this.visible = true;
        this.cunchu = this.active;
        this.active = 6;
        this.guanbi = "恢复交易";
        this.leixing = "danger";
        this.zhuantai = "error";
        this.buzoutiao = false;
      } else if (this.guanbi == "恢复交易") {
        this.guanbi = "关闭交易";
        this.leixing = "primary";
        this.zhuantai = "success";
        this.buzoutiao = true;
        this.active = this.cunchu;
      }
    },
    //申请退款
    tuikuan() {
      if (this.tui == "申请退款") {
        this.visible = true;
      } else {
        this.tui = "申请退款";
        this.refund = "primary";
      }
    },
    //    申请退款或申请关闭原因说明
    queding() {
      if (this.tui == "申请退款") {
        // this.active=4
        this.visible = false;
        this.tui = "取消退款";
        this.refund = "danger";
      }
    },
    // // 发布规格表添加
    // add2() {
    //     console.log(265959)
    //     this.tableData.push(
    //         {order_no: '', peisong: '', wuliu: '', wuliuzhuangtai: '', danhao: '', date: ''}
    //     )
    // },
    // //删除
    // shan(val) {
    //     console.log(val)
    //
    //     if (this.tableData.length > 1) {
    //         this.tableData.splice(val, 1)
    //     }
    // },
    handleEdit(index, row) {
      console.log(index, row);
      if (row.danhao != "" && this.delivery == "发货") {
        this.delivery = "查看";
        (row.show = false), (this.ding = row.danhao);
        (this.xiadan = true), (this.fukuan = true), (this.fahuo = true);
        row.date = this.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
        this.c = row.date;
        return;
      } else if (this.delivery == "查看") {
        this.delivery = "收起";
        console.log(this.delivery);
      } else if (this.delivery == "收起") {
        this.delivery = "查看";
      }
    },
    handleEdi(index, row) {
      console.log(index, row);
      if (row.danhao != "" && this.deliver == "发货") {
        this.deliver = "查看";
        (row.show = false), (this.din = row.danhao);
        (this.xiadan = true), (this.fukuan = true), (this.fahuo = true);
        row.date = this.dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
        this.c = row.date;
        return;
      } else if (this.deliver == "查看") {
        this.deliver = "收起";
        console.log(this.deliver);
      } else if (this.deliver == "收起") {
        this.deliver = "查看";
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
      row.show = true;
      this.delivery = "发货";
    },
    handleDelet(index, row) {
      console.log(index, row);
      row.show = true;
      this.deliver = "发货";
    },
    h(index, row) {
      console.log(row);
      console.log(index);
      console.log(typeof row.danhao);
      row.hand = false;
      // if((typeof row.danhao)=='number') {
      for (var i = 0; i < this.tableData.length; i++) {
        if (i == index) {
          if (row.danhao == "") {
            row.date = "";
            row.hand = true;
          } else if (row.danhao != this.ding) {
            this.delivery = "发货";
          } else if (row.danhao != this.din) {
            this.deliver = "发货";
          }
        }
      }
      // }else {
      //     row.danhao=''
      //     this.$alert('请输入数字')
      // }
    },
    h1(index, row) {
      console.log(row);
      console.log(index);
      console.log(typeof row.danhao);
      row.hand = false;
      // if((typeof row.danhao)=='number') {
      if (row.danhao == "") {
        row.date = "";
        row.hand = true;
      } else if (row.danhao != this.din) {
        this.deliver = "发货";
      }
    }

    //日期转换
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
  mounted() {
    this.active = this.$route.query.order_trasta;
    if (this.active == 1) {
      this.xiadan = true;
    } else if (this.active == 2) {
      this.xiadan = true;
      this.fukuan = true;
    } else if (this.active == 3) {
      this.xiadan = true;
      this.fukuan = true;
      this.fahuo = true;
    } else if (this.active == 4) {
      this.xiadan = true;
      this.fukuan = true;
    } else if (this.active == 5) {
      this.xiadan = true;
      this.fukuan = true;
      this.fahuo = true;
      this.shouhuo = true;
    }

    console.log(this.$route.query.order_no);
    this.$axios
      .post(
        "/api/sale/queryOrderOne.do",
        {
          order_no: parseInt(this.$route.query.order_no)
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token")
          }
        }
      )
      .then(res => {
        this.orderData = res.data.data;
        console.log(this.orderData);
      })
      .catch(err => {
        console.log(err);
      });
  },
  compute: {
    // 订单总金额
    // totalAmount(){
    //     this.tableDatas.tableData.totalPrice=parseInt(this.tableDatas.tableData.price)+parseInt(this.tableDatas.tableData.numberof)
    // return this.tableDatas.tableData.totalPrice
    // }
  }
};
</script>

<style scoped>
.div {
  text-align: center;
}

.bg {
  background-color: aliceblue;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
}

.right {
  text-align: right;
}
.margin {
  margin: 20px;
}
</style>
