<!--直营订单-->
<template>
  <div class="FlowRecord">
    <!--头部-->
    <!--内容-->
    <div id="containerRecord">
      <el-row
        ><el-col :span="24"
          ><div class="grid-content bg-purple publicPadding titleRecord">
            今日关键指标
          </div></el-col
        ></el-row
      >
      <!--关键指标-->
      <el-row class="keyIndex">
        <el-col :span="6" class="rightBorder publicPadding">
          <div class="contentCenter width100">
            <p>下单数</p>
            <h3>{{ today_order_no }}</h3>
          </div>
        </el-col>
        <el-col :span="6" class="rightBorder publicPadding">
          <div class="contentCenter width100">
            <p>支付订单数</p>
            <h3>{{ today_order_no_4 }}</h3>
          </div>
        </el-col>
        <el-col :span="6" class="rightBorder publicPadding">
          <div class="contentCenter width100">
            <p>下单总金额</p>
            <h3>{{ today_order_actcol }}</h3>
          </div>
        </el-col>
        <el-col :span="6" class="rightBorder publicPadding">
          <div class="contentCenter width100">
            <p>实际成交额</p>
            <h3>{{ today_order_actcol_4 }}</h3>
          </div>
        </el-col>
      </el-row>
      <!--经营状况-->
      <el-row class="operateConditions titleRecord">
        <!--经营状况echart图-->
        <el-row>
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label">最近一周</span>
              <div
                id="operConChartWeek"
                :style="{ width: '1100px', height: '400px', margin: '0 auto' }"
                ref="chartWeek"
              ></div>
            </el-tab-pane>
            <el-tab-pane label="最近两周"
              ><div
                id="operConChartWeeks"
                :style="{ width: '1100px', height: '400px', margin: '0 auto' }"
                ref="chartWeeks"
              ></div
            ></el-tab-pane>
            <el-tab-pane label="最近30天"
              ><div
                id="operConChartMonth"
                :style="{ width: '1100px', height: '400px', margin: '0 auto' }"
                ref="chartMonth"
              ></div
            ></el-tab-pane>
            <!--<el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>-->
          </el-tabs>
        </el-row>
        <el-row class="chartRow">
          <!--echart图-->
          <!--总成交-->
          <div id="myChart" :style="{ width: '400px', height: '400px' }"></div>
          <!--今日关键指标-->
          <div id="keyIndex" :style="{ width: '400px', height: '400px' }"></div>
          <!-- @ckick="scaleBar" -->
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "FlowRecord",
  data() {
    return {
      dataAxis: ["下单数", "支付订单数", "下单总金额", "实际成交额"], //柱状图x坐标
      // dataAxis:['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'],
      barData: [], //柱状图数据
      // barData :[220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220],
      yMax: 500,
      dataShadow: [],
      charts: "", //直方图
      option: undefined, //直方图参数
      dataOne: [], //一周
      dataTwo: [], //两周
      dataMonth: [], //一月
      // 点击按钮改变最近的经营状况
      changeLine1: true,
      changeLine2: false,
      changeLine3: false,
      index: 0,
      sum_order_no: 0, //总订单数
      sum_order_actcol: 0, //总成交额
      today_order_no: 0, //今日下单数
      today_order_actcol: 0, //今日下单总金额
      today_order_no_4: 0, //今日支付订单数
      today_order_actcol_4: 0 //今日实际成交额
    };
  },
  watch: {
    index(idx) {
      console.log(idx);
    }
  },
  methods: {
    // 点击直方图，条状图发生变化
    drawPie() {
      console.log("this.sum_order_no", this.sum_order_no);
      console.log("this.sum_order_actcol", this.sum_order_actcol);
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "总成交" },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          top: "bottom",
          data: ["总订单数", "总成交额"]
        },
        series: [
          {
            name: "总成交",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: this.$data.sum_order_no * 100, name: "总订单数" },
              { value: this.$data.sum_order_actcol, name: "总成交额" }
            ],
            color: ["#0059FF", "#FB5F0C"]
          }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      });
    },
    drawKeyIndex() {
      this.charts = this.$echarts.init(document.getElementById("keyIndex"));
      for (var i = 0; i < this.barData.length; i++) {
        this.dataShadow.push(this.yMax);
      }
      this.option = {
        title: {
          text: "今日关键指标"
        },
        xAxis: {
          data: this.dataAxis,
          axisLabel: {
            inside: true,
            textStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 4
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              color: "rgba(0,0,0,0.05)"
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            data: this.dataShadow,
            animation: false
          },
          {
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            data: this.barData
          }
        ]
      };
      this.charts.setOption(this.option);
    },
    drawWeek() {
      var bar1 = this.$refs.chartWeek;
      if (bar1) {
        let weekLine = this.$echarts.init(bar1);
        weekLine.setOption({
          title: {
            text: "最近一周经营状况"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          legend: {
            data: ["下单数", "下单总金额", "支付订单数", "实际成交额"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "下单数",
              type: "line",
              stack: "总量",
              smooth: true,
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: "下单总金额",
              type: "line",
              stack: "总量",
              smooth: true,
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: "支付订单数",
              type: "line",
              stack: "总量",
              smooth: true,
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: "实际成交额",
              type: "line",
              stack: "总量",
              smooth: true,
              data: [320, 332, 301, 334, 390, 330, 320]
            }
          ]
        });
      }
    },
    // 最近两周
    drawWeeks() {
      var bar2 = this.$refs.chartWeeks;
      if (bar2) {
        let weeksLine = this.$echarts.init(bar2);
        weeksLine.setOption({
          title: {
            text: "最近两周经营状况"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          legend: {
            data: ["下单数", "下单总金额", "支付订单数", "实际成交额"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: [
                "2020/6/22",
                "2020/6/21",
                "2020/6/20",
                "2020/6/19",
                "2020/6/18",
                "2020/6/17",
                "2020/6/16",
                "2020/6/15",
                "2020/6/14",
                "2020/6/13",
                "2020/6/12",
                "2020/6/11",
                "2020/6/10",
                "2020/6/9"
              ]
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "下单数",
              type: "line",
              stack: "总量",
              smooth: true,
              data: [
                120,
                132,
                101,
                134,
                90,
                230,
                210,
                127,
                67,
                101,
                134,
                90,
                230,
                210
              ]
            },
            {
              name: "下单总金额",
              type: "line",
              stack: "总量",
              smooth: true,
              data: [
                220,
                182,
                191,
                234,
                290,
                330,
                310,
                220,
                182,
                191,
                234,
                290,
                330,
                310
              ]
            },
            {
              name: "支付订单数",
              type: "line",
              stack: "总量",
              smooth: true,
              data: [
                150,
                232,
                201,
                154,
                190,
                330,
                410,
                150,
                232,
                201,
                154,
                190,
                330,
                410
              ]
            },
            {
              name: "实际成交额",
              type: "line",
              stack: "总量",
              smooth: true,
              data: [
                320,
                332,
                301,
                334,
                390,
                330,
                320,
                320,
                332,
                301,
                334,
                390,
                330,
                320
              ]
            }
          ]
        });
      }
    },
    // 最近30天
    drawMonth() {
      var bar3 = this.$refs.chartMonth;
      if (bar3) {
        let monthLine = this.$echarts.init(bar3);
        monthLine.setOption({
          title: {
            text: "最近30天经营状况"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          legend: {
            data: ["下单数", "下单总金额", "支付订单数", "实际成交额"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: [
                "2020/6/22",
                "2020/6/21",
                "2020/6/20",
                "2020/6/19",
                "2020/6/18",
                "2020/6/17",
                "2020/6/16",
                "2020/6/15",
                "2020/6/14",
                "2020/6/13",
                "2020/6/12",
                "2020/6/11",
                "2020/6/10",
                "2020/6/9",
                "2020/6/8",
                "2020/6/7",
                "2020/6/6",
                "2020/6/5",
                "2020/6/4",
                "2020/6/3",
                "2020/6/2",
                "2020/6/1",
                "2020/5/31",
                "2020/5/29",
                "2020/5/28",
                "2020/5/27",
                "2020/5/26",
                "2020/5/25"
              ]
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "下单数",
              type: "line",
              stack: "总量",
              smooth: true,
              data: [
                120,
                132,
                101,
                134,
                90,
                230,
                210,
                127,
                67,
                101,
                134,
                90,
                230,
                210,
                80,
                32,
                101,
                34,
                90,
                130,
                110,
                127,
                67,
                101,
                134,
                112,
                125,
                245
              ]
            },
            {
              name: "下单总金额",
              type: "line",
              stack: "总量",
              smooth: true,
              data: [
                220,
                182,
                191,
                234,
                290,
                330,
                310,
                220,
                182,
                191,
                234,
                290,
                330,
                310,
                220,
                182,
                191,
                234,
                290,
                330,
                310,
                220,
                182,
                191,
                234,
                290,
                330,
                310
              ]
            },
            {
              name: "支付订单数",
              type: "line",
              stack: "总量",
              smooth: true,
              data: [
                150,
                232,
                201,
                154,
                190,
                330,
                410,
                150,
                232,
                201,
                154,
                190,
                330,
                410,
                150,
                232,
                201,
                154,
                190,
                330,
                410,
                150,
                232,
                201,
                154,
                190,
                330,
                410
              ]
            },
            {
              name: "实际成交额",
              type: "line",
              stack: "总量",
              smooth: true,
              data: [
                320,
                332,
                301,
                334,
                390,
                330,
                320,
                320,
                332,
                301,
                334,
                390,
                330,
                320,
                320,
                332,
                301,
                334,
                390,
                330,
                320,
                320,
                332,
                301,
                334,
                390,
                330,
                320
              ]
            }
          ]
        });
      }
    },
    showChart(idx) {
      this.index = idx;
    },
    changeChart1() {
      console.log("changeChart1");
      this.changeLine1 = true;
      this.changeLine2 = false;
      this.changeLine3 = false;
      console.log("this.changeLine1", this.changeLine1);
      console.log("this.changeLine2", this.changeLine2);
      console.log("this.changeLine3", this.changeLine3);
    },
    changeChart2() {
      console.log("changeChart2");
      this.changeLine1 = false;
      this.changeLine2 = true;
      this.changeLine3 = false;
      console.log("this.changeLine1", this.changeLine1);
      console.log("this.changeLine2", this.changeLine2);
      console.log("this.changeLine3", this.changeLine3);
    },
    changeChart3() {
      console.log("changeChart3");
      this.changeLine1 = false;
      this.changeLine2 = false;
      this.changeLine3 = true;
      console.log("this.changeLine1", this.changeLine1);
      console.log("this.changeLine2", this.changeLine2);
      console.log("this.changeLine3", this.changeLine3);
    },
    // 访问总订单数和总成交额数据
    getdataOrder() {
      let that = this;
      // 访问总订单数和总成交额数据
      this.$axios
        .post(
          "/api/order/queryOrderAll.do",
          {},
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log("访问总订单数和总成交额数据");
          console.log(res);
          this.$data.sum_order_no = res.data.data.sum_order_no;
          this.$data.sum_order_actcol = res.data.data.sum_order_actcol;
          console.log("this.sum_order_no", this.sum_order_no);
          console.log("this.sum_order_actcol", this.sum_order_actcol);
        })
        .then(function() {
          that.drawPie();
        })
        .catch(err => {
          console.log("访问总订单数和总成交额数据", err);
        });
    },

    // 获取今日下单数
    getToday() {
      let that = this;
      this.$axios
        .post(
          "/api/order/queryOrderToday.do",
          {},
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log("今日订单数接收数据");
          console.log(res);
          this.$data.today_order_no = res.data.data.today_order_no;
          this.$data.today_order_actcol = res.data.data.today_order_actcol;
          this.$data.today_order_no_4 = res.data.data.today_order_no_four;
          this.$data.today_order_actcol_4 =
            res.data.data.today_order_actcol_four;
          // 将今日订单数放到直方图数组里面去
          this.barData.push(this.$data.today_order_no);
          this.barData.push(this.$data.today_order_no_4);
          this.barData.push(this.$data.today_order_actcol);
          this.barData.push(this.$data.today_order_actcol_4);
          console.log("this.sum_order_no", this.barData);
          // console.log('this.sum_order_actcol',this.sum_order_actcol);
        })
        .then(function() {
          // that.findMaxToday(this.barData)
          that.drawKeyIndex();
          // 今日关键指标
          // let that = this;
          let myChart = echarts.init(document.getElementById("keyIndex"));

          // Enable data zoom when user click bar.
          var zoomSize = 6;
          myChart.on("click", function(params) {
            console.log("params", params);
            myChart.dispatchAction({
              type: "dataZoom",
              startValue:
                that.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
              endValue:
                that.dataAxis[
                  Math.min(
                    params.dataIndex + zoomSize / 2,
                    that.barData.length - 1
                  )
                ]
            });
          });
        })
        .catch(err => {
          console.log("今日订单数接收数据出错", err);
        });
    },
    //获取今日指标指标中最大的数
    findMaxToday(arr) {
      let max = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
        }
      }
      this.yMax = max;
    },
    //获取经营状况
    // 获取一周
    getOneWeek() {
      this.$axios
        .post(
          "/api/order/queryOneWeek.do",
          {},
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log("接收经营状况一周");
          this.dataOne = res.data.data;
          console.log(res);
        })
        .catch(err => {
          console.log("接收经营状况一周，出错信息");
          console.log(err);
        });
    },
    // 获取两周
    getTwoWeek() {
      this.$axios
        .post(
          "/api/order/queryTwoWeek.do",
          {},
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log("接收经营状况两周");
          console.log(res);
          this.dataTwo = res.data.data;
        })
        .catch(err => {
          console.log("接收经营状况两周，出错信息");
          console.log(err);
        });
    },
    // 获取一个月
    getMonth() {
      this.$axios
        .post(
          "/api/order/queryOneMonth.do",
          {},
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log("接收经营状况一个月");
          console.log(res);
          this.dataMonth = res.data.data;
        })
        .catch(err => {
          console.log("接收经营状况一个月，出错信息");
          console.log(err);
        });
    }
  },
  mounted() {
    //获取经营状况一周
    this.getOneWeek();
    // 获取两周
    this.getTwoWeek();
    // 获取一个月
    this.getMonth();
    // 访问总订单数和总成交额数据
    console.log("mounted");
    this.getdataOrder();
    // 获取今日下单数
    this.getToday();
    // 总成交饼图
    // 经营状况最近一周
    this.$nextTick(function() {
      this.drawWeek();
    });
    // 经营状况最近两周
    this.$nextTick(function() {
      this.drawWeeks();
    });
    // 经营状况最近30天
    this.$nextTick(function() {
      this.drawMonth();
    });
    this.findMaxToday(this.barData);
    console.log("直方图数据", this.barData);
  }
};
</script>

<style scoped>
/*流水记录页面公共padding*/
.publicPadding {
  padding-left: 30px;
}
.titleRecord {
  height: 40px;
  line-height: 40px;
}
.contentCenter {
  /*内容居中*/
  margin: 0 auto;
}
.width100 {
  width: 100px;
}
/*右边框*/
.rightBorder {
  border-right: 1px solid gainsboro;
}
/*头部*/
#headRecord {
  border-bottom: 1px solid gainsboro;
  margin-bottom: 20px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
/*紫色背景*/
.bg-purple {
  background-color: #90ade5;
}
/*今日关键指标开始*/
.keyIndex el-col {
  border-right: 1px solid red;
}
.keyIndex {
  margin-top: 20px;
}
#myChart {
  margin: 0 auto;
}
/*经营状况*/
.operateConditions {
  margin-top: 40px;
}
.operateConditions > div > span {
  display: inline-block;
  margin-right: 8px;
}
/*最下面两张图*/
.chartRow {
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
}
</style>
