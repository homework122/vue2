<template>
  <div class="refundDetail">
    <!--审核过程-->
    <!--获得传过来的值-->
    <div class="steps" :data="date" v-if="sendStatus != 2">
      <el-steps :active="activeCode" simple>
        <el-step title=" 1.提交申请" class="width25" style="font-size: 40px">
        </el-step>
        <el-step title="  2.受理申请" class="width25"> </el-step>
        <el-step title="  3.售后核查" class="width25"> </el-step>
        <el-step title=" 4.成功退款" class="width25"> </el-step>
      </el-steps>
      <!--处理时间-->
      <el-row>
        <el-col :span="6" v-if="dateProcess.submitD != ''">
          <p>申请时间</p>
          <p>{{ dateProcess.submitD | dateFormat }}</p>
        </el-col>
        <el-col :span="6" v-if="dateProcess.acceptD != ''">
          <p>受理时间</p>
          <p>{{ dateProcess.acceptD | dateFormat }}</p>
        </el-col>
        <el-col :span="6" v-if="dateProcess.checkD != ''">
          <p>核查时间</p>
          <p>{{ dateProcess.checkD | dateFormat }}</p>
        </el-col>
        <el-col :span="6" v-if="dateProcess.succesD != ''">
          <p>完成时间</p>
          <p>{{ dateProcess.succesD | dateFormat }}</p>
        </el-col>
      </el-row>
      <!--<el-steps :active="activeCode"  simple style="margin-top: 20px;" class="processDate">-->
      <!--<el-step :title=" date+ ' 提交'" v-show="dateProcess.submitD" class="width20">-->
      <!--</el-step>-->
      <!--<el-step :title=" date+' 受理'" v-show="dateProcess.acceptD" class="width20">-->
      <!--</el-step>-->
      <!--<el-step :title=" date+' 核查'" v-show="dateProcess.checkD" class="width20">-->
      <!--</el-step>-->
      <!--<el-step :title=" date +' 退款'" v-show="dateProcess.succesD" class="width20">-->
      <!--</el-step>-->
      <!--</el-steps>-->
    </div>
    <!--当前退款状态-->
    <div class="bg-refundStatus">
      <p class="publicPadding">当前退款状态:{{ sendStatus | statusForm() }}</p>
      <div v-if="sendStatus == 0" class="showDiffSta publicPadding">
        <ul>
          <li>
            请您在进行同意或拒绝操作前，尽量充分于买家沟通达成一致，避免误解。
          </li>
          <li>尽量在买家退还货物后，同意退款，避免钱货两空!</li>
        </ul>
        <!--按钮-->
        <div>
          <a href="#refundRecord"
            ><el-button plain @click="agreeRefund()">同意退款</el-button></a
          >
          <a href="#refundInfo"
            ><el-button plain @click="rejectRefund()">拒绝退款</el-button></a
          >
        </div>
      </div>
      <div v-if="sendStatus == 2">
        <ul>
          <li>关闭原因: {{ closeResult }}</li>
        </ul>
      </div>
    </div>
    <!--退款信息-->
    <div id="refundInfo" class="publicPadding">
      <!--退款信息-->
      <div>
        <!--标题-->
        <div><h3>退款信息</h3></div>
        <div>
          <p>退款编号：{{ sendRefundId }}</p>
          <p>退款发起:{{ refundInfo.opertor }}</p>
          <p>申请退款时间: {{ refundInfo.date }}</p>
          <p>退款状态:{{ sendStatus | statusForm }}</p>
          <p>退款金额: {{ refundInfo.money }}</p>
          <p>退款原因:{{ refundInfo.result }}</p>
          <p>退款说明：{{ refundInfo.msg }}</p>
        </div>
      </div>
      <!--退款协议记录-->
      <div id="refundRecord">
        <!--标题-->
        <div>
          <el-row>
            <el-col :span="20"><h3>退款协议记录</h3></el-col>
            <el-col :span="4"
              ><el-button @click="hideTable()" v-if="hideProInfo"
                >收起</el-button
              ></el-col
            >
            <el-col :span="4"
              ><el-button @click="showTable()" v-if="!hideProInfo"
                >展开</el-button
              ></el-col
            >
          </el-row>
        </div>
        <!--处理表-->
        <el-table :data="processData" v-if="hideProInfo" style="width: 100%"  :header-cell-style="{background:'#96C9FF',color:'#606266'  }">
          <el-table-column prop="date" label="处理时间" width="380">
          </el-table-column>
          <el-table-column prop="info" label="处理信息" width="380">
          </el-table-column>
          <el-table-column prop="operter" label="操作人"> </el-table-column>
        </el-table>
      </div>
      <!--订单信息-->
      <div>
        <!--标题信息-->
        <div><h3>订单信息</h3></div>
        <!--具体信息-->
        <div>
          <p>订单编号：{{ sendOrderId }}</p>
          <p>下单时间: {{ orderInfo.date | dateFormat }}</p>
          <p>订单状态:{{ orderInfo.status | orderStatusFormat }}</p>
          <p>支付方式: {{ orderInfo.pay | payMethodFormat }}</p>
          <p>买家昵称:{{ orderInfo.buyer }}</p>
        </div>
        <!--订单表格-->
        <el-table
          :data="orderData"
          border
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column prop="com_name" label="商品名称"> </el-table-column>
          <el-table-column prop="stan_no" label="商品规格"> </el-table-column>
          <el-table-column prop="stan_price" label="单价"> </el-table-column>
          <el-table-column prop="number" label="数量"> </el-table-column>
          <el-table-column prop="sum_price" label="总价"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "refundDetail",
  data() {
    return {
      activeCode: 1, //头部处理流程激活状态
      date: "2019/1/1",
      dateProcess: {
        submitD: "",
        acceptD: "",
        checkD: "",
        succesD: ""
      }, //处理时间
      refundStatus: "运营后台申请退款，等待处理",
      rStatus: true,
      closeResult: "沟通不好", //关闭原因
      isClose: false,
      rowSpan: 0, //记录合并的行
      refundInfo: {
        id: 1,
        opertor: "运营后台申请退款",
        date: "2016-09-14 16:04:05",
        status: "退款成功",
        money: "25. 00元",
        result: "卖家缺货 ",
        msg: "vvv"
      },
      orderInfo: {
        id: 1,
        date: "2016-09-14 16:04:05",
        status: "退款成功",
        pay: "微信支付",
        buyer: "YOYO "
      }, //订单信息
      processData: [
        {
          date: "2016-09-14 16:04:05",
          info: "订单退款申请已提交，等待受理",
          operter: "天道客户"
        },
        {
          date: "2016-09-14 16:04:05",
          info: "订单退款申请已提交，等待受理",
          operter: "天道客户"
        },
        {
          date: "2016-09-14 16:04:05",
          info: "订单退款申请已提交，等待受理",
          operter: "天道客户"
        },
        {
          date: "2016-09-14 16:04:05",
          info: "订单退款申请已提交，等待受理",
          operter: "天道客户"
        }
      ],
      sendOrderId: this.$route.params.sendOrderId, //退款管理页面传递过来的订单编号
      sendRefundId: this.$route.params.refundId, //退款管理页面传递过来的退款编号
      sendStatus: this.$route.params.statusId, //退款管理页面传递过来的退款状态
      hideProInfo: true, //退款协议记录是否隐藏
      orderData: [
        {
          com_name: "雷碧",
          stan_no: 38, //商品规格
          stan_name: "大绿龟",
          stan_price: 40, //单价
          number: 1, //数量
          sum_price: 40 //总价
        },
        {
          com_name: "矿泉水",
          stan_no: 39, //商品规格
          stan_name: "小绿龟",
          stan_price: 20, //单价
          number: 2, //数量
          sum_price: 40 //总价
        }
      ],
      // 查看订单接口详情数据
      refundDetail: [
        {
          infor_no: 1, //退款编号
          order_no: 1, //订单编号
          infor_status: 0, //退款状态
          applyTime: "2019-01-01",
          acceptTime: "2091-01-01",
          checkTime: "2019-1-3",
          successTime: "2019-1-4",
          refundInfo: {
            infor_no: 1, //退款编号
            infor_initiation: "运营后台申请退款", //退款发起
            infor_money: 20, //退款金额
            infor_reason: "卖家缺货", //退款原因
            infor_explanation: "哈哈哈哈哈", //退款说明
            infor_startime: "2091-01-01" //退款申请时间
          },
          protocol_agreement: [
            {
              ref_acceptTime: "2016-09-14 16:04:05",
              ref_info: "订单退款申请已提交，等待受理",
              ref_oper: "天道客服"
            },
            {
              ref_acceptTime: "2016-09-14 16:04:05",
              ref_info: "退款申请已受理，等待售后核查",
              ref_oper: "天道客服"
            },
            {
              ref_acceptTime: "2016-09-14 16:04:05",
              ref_info: "退款申请核查通过，等待退款",
              ref_oper: "天道客服"
            },
            {
              ref_acceptTime: "2016-09-14 16:04:05",
              ref_info: "退款服务单退款编号已退款，退款金额129.09元",
              ref_oper: "天道客服"
            }
          ],
          orderInfo: {
            order_no: "2345720005765350", //订单编号
            order_time: "2016-09-14 16:04:05", //下单时间
            order_paymeth: "微信支付", //支付方式
            order_trasta: "交易关闭", //订单状态
            client_no: "YOYO" //买家
          },
          producTable: [
            {
              crawlId: 4,
              stan_no: 123, //商品规格编号
              stan_price: 123, //商品单价
              stan_name: "冲击榴莲",
              stan_price_all: 160
            },
            {
              crawlId: 1,
              stan_no: 123, //商品规格编号
              stan_price: 123, //商品单价
              stan_name: "冲击榴莲",
              stan_price_all: 160
            },
            {
              crawlId: 2,
              stan_no: 123, //商品规格编号
              stan_price: 123, //商品单价
              stan_name: "冲击榴莲",
              stan_price_all: 160
            },
            {
              crawlId: 3,
              stan_no: 123, //商品规格编号
              stan_price: 123, //商品单价
              stan_name: "冲击榴莲",
              stan_price_all: 160
            }
          ]
        },
        {
          infor_no: 2, //退款编号
          order_no: 2, //订单编号
          infor_status: 1, //退款状态,成功
          applyTime: "2019-01-01",
          acceptTime: "2091-01-01",
          checkTime: "2019-1-3",
          successTime: "2019-1-4",
          refundInfo: {
            infor_no: 1, //退款编号
            infor_initiation: "运营后台申请退款", //退款发起
            infor_money: 20, //退款金额
            infor_reason: "卖家缺货", //退款原因
            infor_explanation: "哈哈哈哈哈", //退款说明
            infor_startime: "2091-01-01" //退款申请时间
          },
          protocol_agreement: [
            {
              ref_acceptTime: "2016-09-14 16:04:05",
              ref_info: "订单退款申请已提交，等待受理",
              ref_oper: "天道客服"
            },
            {
              ref_acceptTime: "2016-09-14 16:04:05",
              ref_info: "退款申请已受理，等待售后核查",
              ref_oper: "天道客服"
            },
            {
              ref_acceptTime: "2016-09-14 16:04:05",
              ref_info: "退款申请核查通过，等待退款",
              ref_oper: "天道客服"
            },
            {
              ref_acceptTime: "2016-09-14 16:04:05",
              ref_info: "退款服务单退款编号已退款，退款金额129.09元",
              ref_oper: "天道客服"
            }
          ],
          orderInfo: {
            order_no: "2345720005765350", //订单编号
            order_time: "2016-09-14 16:04:05", //下单时间
            order_paymeth: "微信支付", //支付方式
            order_trasta: "交易关闭", //订单状态
            client_no: "YOYO" //买家
          },
          producTable: [
            {
              crawlId: 4,
              stan_no: 123, //商品规格编号
              stan_price: 123, //商品单价
              stan_name: "冲击榴莲",
              stan_price_all: 160
            },
            {
              crawlId: 1,
              stan_no: 123, //商品规格编号
              stan_price: 123, //商品单价
              stan_name: "冲击榴莲",
              stan_price_all: 160
            },
            {
              crawlId: 2,
              stan_no: 123, //商品规格编号
              stan_price: 123, //商品单价
              stan_name: "冲击榴莲",
              stan_price_all: 160
            },
            {
              crawlId: 3,
              stan_no: 123, //商品规格编号
              stan_price: 123, //商品单价
              stan_name: "冲击榴莲",
              stan_price_all: 160
            }
          ]
        },
        {
          infor_no: 3, //退款编号
          order_no: 3, //订单编号
          infor_status: 2, //退款状态，失败
          applyTime: "2019-01-01",
          acceptTime: "2091-01-01",
          checkTime: "2019-1-3",
          successTime: "2019-1-4",
          refundInfo: {
            infor_no: 1, //退款编号
            infor_initiation: "运营后台申请退款", //退款发起
            infor_money: 20, //退款金额
            infor_reason: "卖家缺货", //退款原因
            infor_explanation: "哈哈哈哈哈", //退款说明
            infor_startime: "2091-01-01" //退款申请时间
          },
          protocol_agreement: [
            {
              ref_acceptTime: "2016-09-14 16:04:05",
              ref_info: "订单退款申请已提交，等待受理",
              ref_oper: "天道客服"
            },
            {
              ref_acceptTime: "2016-09-14 16:04:05",
              ref_info: "退款申请已受理，等待售后核查",
              ref_oper: "天道客服"
            },
            {
              ref_acceptTime: "2016-09-14 16:04:05",
              ref_info: "退款申请核查通过，等待退款",
              ref_oper: "天道客服"
            },
            {
              ref_acceptTime: "2016-09-14 16:04:05",
              ref_info: "退款服务单退款编号已退款，退款金额129.09元",
              ref_oper: "天道客服"
            }
          ],
          orderInfo: {
            order_no: "2345720005765350", //订单编号
            order_time: "2016-09-14 16:04:05", //下单时间
            order_paymeth: "微信支付", //支付方式
            order_trasta: "交易关闭", //订单状态
            client_no: "YOYO" //买家
          },
          producTable: [
            {
              crawlId: 4,
              stan_no: 123, //商品规格编号
              stan_price: 123, //商品单价
              stan_name: "冲击榴莲",
              stan_price_all: 160
            },
            {
              crawlId: 1,
              stan_no: 123, //商品规格编号
              stan_price: 123, //商品单价
              stan_name: "冲击榴莲",
              stan_price_all: 160
            },
            {
              crawlId: 2,
              stan_no: 123, //商品规格编号
              stan_price: 123, //商品单价
              stan_name: "冲击榴莲",
              stan_price_all: 160
            },
            {
              crawlId: 3,
              stan_no: 123, //商品规格编号
              stan_price: 123, //商品单价
              stan_name: "冲击榴莲",
              stan_price_all: 160
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 获得全部信息
    getAllInfos(res) {
      this.refundInfo.opertor = res.data.date[0].infor_initiation;
      this.refundInfo.date = res.data.date[0].infor_startime;
      this.refundInfo.msg = res.data.date[0].infor_explanation;
      this.refundInfo.money = res.data.date[0].infor_money;
      this.refundInfo.result = res.data.date[0].infor_reason;
      this.orderInfo.date = res.data.date[0].infor_startime;
      this.orderInfo.pay = res.data.date[0].order_paymeth;
      this.orderInfo.buyer = res.data.date[0].com_no;
    },
    getAllInfoStatus() {
      this.$axios
        .post(
          "/api/queryInformationByZero.do?infor_no=3",
          {
            infor_no: 2
          },
          {
            // 设置请求头
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          // submitD:'2019/1/1',
          //     acceptD:'',
          //     checkD:'2019/1/1',
          //     succesD:''
          console.log("jjjjjjj", res);
          this.dateProcess.submitD = res.data.infor_applicationtime;
          this.dateProcess.acceptD = res.data.infor_accepttime;
          this.refundInfo.opertor = res.data.infor_initiation;
          this.refundInfo.money = res.data.infor_money;
          this.closeResult = res.data.infor_reason; //退款原因
          this.refundInfo.msg = res.data.infor_explanation;
          this.processData[0].operter = res.data.protocol_people;
          this.processData[1].operter = res.data.protocol_people;
          this.processData[2].operter = res.data.protocol_people;
          this.processData[3].operter = res.data.protocol_people;
          this.orderInfo.date = res.data.order_otime;
          this.orderInfo.pay = res.data.order_paymeth;
          this.orderInfo.status = res.data.order_trasta;
          this.orderInfo.buyer = res.data.order_rename;
          this.orderData = res.data.comWwList;
          // this.tableData = response.data.data
          // this.dialogTable = false;
          // this.$message(response.data.msg)
          // this.reload();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获得等待处理的信息
    getAwait() {
      console.log(this.$route.params.infor_no);
      this.$axios
        .post(
          "/api/queryInformationByZero.do",
          {
            infor_no: 1
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log("kkkkk", res.data.date[0]);
          this.getAllInfos(res);
          console.log("获得等待处理的信息", res);
        })
        .catch(err => {
          console.log("获得等待处理的信息出错信息", err);
        });
    },
    // 获得退款关闭的信息
    getClose() {
      this.$axios
        .post(
          "/api/queryInformationByOne.do",
          {
            infor_no: 1
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log("获得退款关闭的信息", res);
        })
        .catch(err => {
          console.log("获得退款关闭的信息出错信息", err);
        });
    },
    // 获得退款成功的信息
    getSuccess() {
      console.log(this.$route.params.infor_no);
      this.$axios
        .post(
          "/api/queryInformationByTwo.do",
          {
            infor_no: 1
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log("获得退款成功的信息", res);
        })
        .catch(err => {
          console.log("获得退款成功的信息出错信息", err);
        });
    },
    getActiveCode() {
      //处理流程获得当前激活状态
      if (this.sendStatus == 1) {
        this.activeCode = 4;
      } else if (this.sendStatus == 2) {
        this.activeCode = 1;
      }
    },
    hideTable() {
      console.log("hideTable");
      this.hideProInfo = false;
    },
    showTable() {
      this.hideProInfo = true;
    },
    // 同意退款
    agreeRefund() {
      // 改变状态
    },
    // 拒绝退款
    rejectRefund() {
      console.log("hahahha");

      this.$axios
        .post(
          "/api/queryInformationByZero.do",
          {
            infor_no: 2
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log("查看信息1111111", res);
        })
        .catch(err => {
          console.log("出错信息", err);
        });
    }
    // 表格行或列的合并
    // getRowSpan() {
    //   let rowSpan = 0
    //   this.orderData.forEach((item, index) => {
    //     console.log('配送方式',item.sendWay)
    //     console.log('下一行配送方式',this.orderData[index + 1].sendWay);
    //     if (item.sendWay === this.orderData[index + 1].sendWay) {
    //       rowSpan++
    //       console.log(rowSpan)
    //     }
    //   })
    //   return rowSpan
    // },
    // objectSpanMethod({columnIndex}) {
    //   if (columnIndex === 6) {
    //     let rowSpan = 0
    //     this.orderData.forEach((item, index) => {
    //       console.log('配送方式',item.sendWay)
    //       console.log('下一行配送方式',this.orderData[index + 1].sendWay);
    //       if (item.sendWay === this.orderData[index + 1].sendWay) {
    //         rowSpan++
    //         console.log(rowSpan)
    //       }
    //     })
    //     return {
    //       rowspan: rowSpan,
    //       colspan: 1
    //     }
    //   }
    // }
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
    },
    // 时间格式化
    dateFormat(date) {
      let ret = "";
      let fmt = "YYYY-mm-dd HH:MM:SS";
      date = new Date(date);
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (const k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    // 支付方式格式化
    payMethodFormat(payMethod) {
      if (payMethod == 0) {
        return "微信";
      } else if (payMethod == 1) {
        return "支付宝";
      } else if (payMethod == 2) {
        return "钱包";
      }
    },
    // 订单状态格式化
    orderStatusFormat(orderStatus) {
      if (orderStatus == 0) {
        return "下单等待买家付款";
      } else if (orderStatus == 1) {
        return "付款";
      } else if (orderStatus == 2) {
        return "退款中";
      } else if (orderStatus == 3) {
        return "收货";
      } else if (orderStatus == 4) {
        return "交易成功";
      } else if (orderStatus == 5) {
        return "交易关闭";
      }
    }
  },
  mounted() {
    this.getActiveCode();

    // 请求数据
    if (this.sendStatus == 0 || this.sendStatus == 1 || this.sendStatus == 2) {
      console.log("进入订单详情");
      this.getAllInfoStatus();
    }
    // if(this.sendStatus == 1){
    //   console.log('成功');
    //   this.getSuccess()
    // }
    // if(this.sendStatus == 2){
    //   console.log('关闭');
    //   this.getClose()
    // }
  }
};
</script>

<style scoped>
/*步骤条*/
.width25 {
  width: 25%;
}
.width20 {
  width: 20%;
}
.steps {
  margin-top: 26px;
}
.steps p {
  text-align: center;
}
/*步骤条结束*/

/*退款状态开始*/
.bg-refundStatus {
  margin-top: 20px;
  background-color: #f5f7fa;
  padding-top: 20px;
  padding-bottom: 20px;
}
.publicPadding {
  padding-left: 30px;
}
.publicPadding > p {
  padding-left: 50px;
}
/*退款状态开始*/
/*退款信息*/
#refundInfo > div > div:nth-of-type(1) {
  border-bottom: 1px solid #f5f7fa;
}
.processDate {
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
}
/*等待处理样式开始*/
.showDiffSta > div a {
  margin-right: 20px;
  margin-top: 10px;
}
/*等待处理样式结束*/
</style>
