<template>
  <div class="DeliveryFees">
    <!--搜索-->
    <div id="searchBox">
      <div>
        <el-input
          placeholder="配送费模板"
          v-model="nameSearch"
          clearable
          autofocus
        >
        </el-input>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </div>
      <!--添加配送费模板-->
      <div>
        <!--<el-button @click="toAdd" type="primary"><i class="el-icon-plus"></i>创建配送费模板</el-button>-->
        <el-button type="primary" @click="dialogFormVisible = true"
          ><i class="el-icon-plus"></i>创建配送费模板</el-button
        >
        <el-dialog
          title="添加配送费模板"
          :visible.sync="dialogFormVisible"
          width="100%"
          lock-scroll="false"
        >
          <el-form :model="form">
            <el-form-item label="模板名称" :label-width="formLabelWidth">
              <el-input
                v-model="form.name"
                autocomplete="off"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="结算方式" :label-width="formLabelWidth">
              <el-radio v-model="radioPay" label="0">普通结算</el-radio>
              <el-radio v-model="radioPay" label="1">模板独立订单结算</el-radio>
              <p style="color: gainsboro;font-size: 15px">
                使用独立结算模板商品，提交订单时系统自动将所有属于该模板商品归于一个订单结算，不和普通结算商品一起结算。
              </p>
            </el-form-item>
            <el-form-item label="是否包邮" :label-width="formLabelWidth">
              <el-radio v-model="radioYou" label="0">自定义配送费</el-radio>
              <el-radio v-model="radioYou" label="1">卖家承担配送费</el-radio>
            </el-form-item>
            <el-form-item label="计价方式" :label-width="formLabelWidth">
              <el-radio v-model="radioPrice" label="0">按件数</el-radio>
              <el-radio v-model="radioPrice" label="1">按重量</el-radio>
            </el-form-item>
            <el-form-item label="配送方式" :label-width="formLabelWidth">
              <el-collapse v-model="activeNames" @change="handleChange">
                <div class="sendWayBox">
                  <el-checkbox v-model="checked1"></el-checkbox>
                  <el-collapse-item title="同城配送" name="1">
                    <template>
                      <!--同城配送默认运费-->
                      <el-row>
                        <div class="sendWay">
                          <el-form-item
                            label="默认运费:"
                            :label-width="formLabelWidth"
                            class="defaultF"
                          >
                            <el-input
                              v-model="form.name1"
                              autocomplete="off"
                              class="el-input"
                              size="mini"
                            >
                              <i slot="suffix">件</i></el-input
                            >
                          </el-form-item>
                          <el-form-item label="" :label-width="formLabelWidth">
                            <el-input
                              v-model="form.name2"
                              autocomplete="off"
                              class="el-input"
                              size="mini"
                              ><i slot="suffix">元</i></el-input
                            >
                          </el-form-item>
                          <el-form-item
                            label="每增加"
                            :label-width="formLabelWidth"
                          >
                            <el-input
                              v-model="form.name3"
                              autocomplete="off"
                              class="el-input"
                              size="mini"
                              ><i slot="suffix">件</i></el-input
                            >
                          </el-form-item>
                          <el-form-item
                            label="增加运费"
                            :label-width="formLabelWidth"
                          >
                            <el-input
                              v-model="form.name4"
                              autocomplete="off"
                              class="el-input"
                              size="mini"
                              ><i slot="suffix">元</i></el-input
                            >
                          </el-form-item>
                        </div>
                      </el-row>
                      <!--配送规则-->
                      <el-row style="margin-top: 20px">
                        <el-table
                          :data="tableCitySend"
                          border
                          style="width: 100%"
                        >
                          <el-table-column
                            prop="destination"
                            label="配送到"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-select
                                v-model="scope.row.value1"
                                multiple
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                >
                                </el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="firstWeight"
                            label="首重/kg"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.firstWeight"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="firstJian"
                            label="首件"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.firstJian"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="firstFee"
                            label="运费(元)"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.firstFee"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="renew"
                            label="续件(元)"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.renew"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="renewFee"
                            label="续费(元)"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.renewFee"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作">
                            <template slot-scope="scope">
                              <el-button @click="delEachCity(scope.row)"
                                >清空</el-button
                              >
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                    </template>
                  </el-collapse-item>
                </div>
                <div class="sendWayBox">
                  <el-checkbox v-model="checked2"></el-checkbox>
                  <el-collapse-item title="快递物流" name="2">
                    <template>
                      <!--快递物流默认运费-->
                      <el-row>
                        <div class="sendWay">
                          <el-form-item
                            label="默认运费:"
                            :label-width="formLabelWidth"
                            class="defaultF"
                          >
                            <el-input
                              v-model="form.name1"
                              autocomplete="off"
                              size="mini"
                            >
                              <i slot="suffix">件</i></el-input
                            >
                          </el-form-item>
                          <el-form-item label="" :label-width="formLabelWidth">
                            <el-input
                              v-model="form.name2"
                              autocomplete="off"
                              size="mini"
                              ><i slot="suffix">元</i></el-input
                            >
                          </el-form-item>
                          <el-form-item
                            label="每增加"
                            :label-width="formLabelWidth"
                          >
                            <el-input
                              v-model="form.name3"
                              autocomplete="off"
                              size="mini"
                              ><i slot="suffix">件</i></el-input
                            >
                          </el-form-item>
                          <el-form-item
                            label="增加运费"
                            :label-width="formLabelWidth"
                          >
                            <el-input
                              v-model="form.name4"
                              autocomplete="off"
                              size="mini"
                              ><i slot="suffix">元</i></el-input
                            >
                          </el-form-item>
                        </div>
                      </el-row>
                      <!--配送规则-->
                      <el-row>
                        <el-table
                          :data="tableQuickSend"
                          border
                          style="width: 100%"
                        >
                          <el-table-column
                            prop="destination"
                            label="配送到"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-select
                                v-model="scope.row.value1"
                                multiple
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                >
                                </el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="firstWeight"
                            label="首重/kg"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.firstWeight"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="firstJian"
                            label="首件"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.firstJian"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="firstFee"
                            label="运费(元)"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.firstFee"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="renew"
                            label="续件(元)"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.renew"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="renewFee"
                            label="续费(元)"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.renewFee"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作">
                            <template slot-scope="scope">
                              <el-button @click="delEachQuick(scope.row)"
                                >清空</el-button
                              >
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                    </template>
                  </el-collapse-item>
                </div>
                <div class="sendWayBox">
                  <el-checkbox v-model="checked3"></el-checkbox>
                  <el-collapse-item title="指定条件包邮" name="3">
                    <template>
                      <!--配送规则-->
                      <el-row>
                        <el-table
                          :data="tableRefSend"
                          border
                          style="width: 100%"
                        >
                          <el-table-column
                            prop="destination"
                            label="选择地区"
                            width="270px"
                          >
                            <template slot-scope="scope">
                              <el-select
                                v-model="scope.row.value1"
                                multiple
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                >
                                </el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="chooseSendWay"
                            label="选择运送方式"
                            width="270px"
                          >
                            <template slot-scope="scope">
                              <el-select v-model="scope.row.chooseSendWay">
                                <el-option
                                  label="同城配送"
                                  value="0"
                                ></el-option>
                                <el-option
                                  label="快递物流"
                                  value="1"
                                ></el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="freeCon"
                            label="设置包邮条件"
                            width="270px"
                          >
                            <template slot-scope="scope">
                              <el-select v-model="scope.row.freeCon">
                                <el-option label="件数" value="0"></el-option>
                                <el-option label="金额" value="1"></el-option>
                              </el-select>
                              <!--包邮条件-->
                              <div>
                                <span>满</span>
                                <el-input
                                  size="mini"
                                  v-model="scope.row.ruleFee"
                                ></el-input>
                                <span v-if="scope.row.freeCon == 0">件</span
                                ><span v-if="scope.row.freeCon == 1">元</span>
                                <span>包邮</span>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" width="270px">
                            <template>
                              <div class="refSendOper">
                                <el-button
                                  type="success"
                                  icon="el-icon-plus"
                                  circle
                                  @click="addRef()"
                                ></el-button>
                                <el-button
                                  type="danger"
                                  icon="el-icon-minus"
                                  circle
                                  @click="delRef()"
                                  :disabled="tableRefSend.length == 1"
                                ></el-button>
                              </div>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                    </template>
                  </el-collapse-item>
                </div>
              </el-collapse>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save()">保存</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <!--配送费-->
    <div id="sendFees">
      <el-row v-for="item in rowData" :key="item.distt_name">
        <!--表头-->
        <div class="bg-sendTable-head">
          <!--左边配送名称-->
          <div>{{ item.distt_name }}</div>
          <!--右边编辑-->
          <div>
            <!--编辑时间-->
            <div class="lastTime">最后编辑时间:{{ item.lastEditTime }}</div>
            <!--操作-->
            <div class="sendOper">
              <span type="text" @click="handleUpdate()">修改</span>
              <el-dialog title="修改模板" :visible.sync="dialogUpdateVisible">
                <el-form :model="formUpdate">
                  <el-form-item label="配送方式" :label-width="formLabelWidth">
                    <el-input
                      v-model="formUpdate.sendMethods"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="配送区域" :label-width="formLabelWidth">
                    <el-input
                      v-model="formUpdate.sendArea"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="首件个数" :label-width="formLabelWidth">
                    <el-input
                      v-model="formUpdate.firstCount"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="默认配送费"
                    :label-width="formLabelWidth"
                  >
                    <el-input
                      v-model="formUpdate.defaultFee"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="续件(个)" :label-width="formLabelWidth">
                    <el-input
                      v-model="formUpdate.renewCount"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="额外配送费"
                    :label-width="formLabelWidth"
                  >
                    <el-input
                      v-model="formUpdate.renewFee"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogUpdateVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="saveUpdate()"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
              <span type="text" @click="delSend()" size="medium">删除</span>
            </div>
          </div>
        </div>
        <!--表身-->
        <el-table :data="item.dispms" style="width: 100%">
          <el-table-column prop="sendWay" label="配送方式" width="180">
          </el-table-column>
          <el-table-column prop="dispm_firfre" label="配送区域" width="180">
          </el-table-column>
          <el-table-column prop="dispm_defpie" label="首件（个）" width="180">
          </el-table-column>
          <el-table-column prop="dispm_deffre" label="配送费（元）">
          </el-table-column>
          <el-table-column prop="dispm_renew" label="续件（个）">
          </el-table-column>
          <el-table-column prop="dispm_use" label="额外配送费（元）">
          </el-table-column>
        </el-table>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeliveryFees",
  data() {
    return {
      // 修改表单里面的数据
      formUpdate: {
        sendMethods: "", //配送方式
        sendArea: "", //配送区域
        firstCount: "", //首件个数
        defaultFee: "", //默认配送费
        renewCount: "", //续件个数
        renewFee: "" //额外配送费
      },
      dialogUpdateVisible: false, //修改表单的显示隐藏
      checked1: true,
      checked2: true,
      checked3: true,
      activeNames: ["1"],
      nameSearch: "",
      rowData: [
        {
          moduleName: "jjj", //模板名称
          lastEditTime: "2016-04-16", //最后编辑信息
          sendInfo: [
            {
              sendWay: "同城配送", //配送方式
              sendArea: "南山，宝安，罗湖", //配送区域
              firstJian: 1, //首件
              deliveryFee: 8, //收件运送费
              continueJian: 1, //续件
              continueSend: 1 //续件配送费
            },
            {
              sendWay: "快递物流", //配送方式
              sendArea: "全国", //配送区域
              firstJian: 1, //首件
              deliveryFee: 8, //收件运送费
              continueJian: 1, //续件
              continueSend: 1 //续件配送费
            }
          ]
        },
        {
          moduleName: "哈哈哈", //模板名称
          lastEditTime: "2016-04-16", //最后编辑信息
          sendInfo: [
            {
              sendWay: "同城配送", //配送方式
              sendArea: "南山，宝安，罗湖", //配送区域
              firstJian: 1, //首件
              deliveryFee: 8, //收件运送费
              continueJian: 1, //续件
              continueSend: 1 //续件配送费
            },
            {
              sendWay: "快递物流", //配送方式
              sendArea: "全国", //配送区域
              firstJian: 1, //首件
              deliveryFee: 8, //收件运送费
              continueJian: 1, //续件
              continueSend: 1 //续件配送费
            }
          ]
        },
        {
          moduleName: "哥哥哥", //模板名称
          lastEditTime: "2016-04-16", //最后编辑信息
          sendInfo: [
            {
              sendWay: "同城配送", //配送方式
              sendArea: "南山，宝安，罗湖", //配送区域
              firstJian: 1, //首件
              deliveryFee: 8, //收件运送费
              continueJian: 1, //续件
              continueSend: 1 //续件配送费
            },
            {
              sendWay: "快递物流", //配送方式
              sendArea: "全国", //配送区域
              firstJian: 1, //首件
              deliveryFee: 8, //收件运送费
              continueJian: 1, //续件
              continueSend: 1 //续件配送费
            }
          ]
        }
      ],
      //添加表单的数据
      dialogFormVisible: false,
      form: {
        name1: "",
        name2: "",
        name3: "",
        name4: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      // 添加模板部分的下拉列表
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "南山区"
        },
        {
          value: "选项3",
          label: "罗湖区"
        },
        {
          value: "选项4",
          label: "福田区"
        },
        {
          value: "选项5",
          label: "武侯区"
        },
        {
          value: "选项5",
          label: "高新区"
        }
      ],
      // 添加模板部分的values下拉列表
      value1: [],
      formLabelWidth: "120px",
      radioPay: 0,
      radioYou: 0,
      radioPrice: 0,
      checkSendList: ["", "", ""], //选择配送方式
      tableCitySend: [
        {
          destination: "",
          firstWeight: "",
          firstJian: "",
          firstFee: "",
          renew: "",
          renewFee: ""
        }
      ],
      tableQuickSend: [
        {
          destination: "",
          firstWeight: "",
          firstJian: "",
          firstFee: "",
          renew: "",
          renewFee: ""
        }
      ],
      tableRefSend: [
        {
          destination: "",
          chooseSendWay: "",
          freeCon: "",
          ruleFee: ""
        }
      ]
    };
  },
  methods: {
    handleUpdate(index, row) {
      this.dialogUpdateVisible = true;
      console.log("index", index);
      console.log("row", row);
    },
    // 保存修改
    // 添加指定包邮
    addRef() {
      let obj = {
        destination: "",
        chooseSendWay: "",
        freeCon: "",
        ruleFee: ""
      };
      this.tableRefSend.push(obj);
    },
    // 删除指定包邮
    delRef(val) {
      console.log("删除指定", val);
      this.tableRefSend.splice(val, 1);
    },
    // 删除快递物流的每一条
    delEachQuick(val) {
      console.log(val);
      this.tableQuickSend[0].destination = "";
      this.tableQuickSend[0].firstWeight = "";
      this.tableQuickSend[0].firstJian = "";
      this.tableQuickSend[0].firstFee = "";
      this.tableQuickSend[0].renew = "";
      this.tableQuickSend[0].renewFee = "";
    },
    // 删除同城配送的每一条
    delEachCity(val) {
      console.log(val);
      this.tableCitySend[0].destination = "";
      this.tableCitySend[0].firstWeight = "";
      this.tableCitySend[0].firstJian = "";
      this.tableCitySend[0].firstFee = "";
      this.tableCitySend[0].renew = "";
      this.tableCitySend[0].renewFee = "";
    },
    handleChange(val) {
      console.log(val);
    },
    save() {
      // this.dialogFormVisible = !this.dialogFormVisible
      console.log("radioPay", this.radioPay);
      console.log("radioYou", this.radioYou);
      console.log("radioPrice", this.radioPrice);
      console.log("form.name", this.form.name1);
      // 请求添加模板
      this.$axios
        .post("/api/sale/addDistt.do", {
          distt_name: this.form.name1,
          distt_setmethod: parseInt(this.radioPay),
          distt_receive: parseInt(this.radioYou),
          distt_pricimethod: parseInt(this.radioPrice)
        })
        .then(res => {
          this.$message(res.data.msg);
          console.log("查询成功返回数据", res);
        })
        .catch(err => {
          console.log("查询出错", err);
        });
      console.log(this.form.name1);
    },
    // 添加配送费模板
    toAdd() {
      console.log("toAdd");
    },
    // 获得配送费模板数据
    getAllData() {
      this.$axios
        .post(
          "/api/sale/queryDistt.do",
          {
            page: 1,
            limit: 3
          },
          {
            headers: { "Content-Type": "application/json" }
          }
        )
        .then(res => {
          this.rowData = res.data.data;
          console.log("接收到的数据", res);
          console.log("this.rowData", this.rowData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateSend(index, row) {
      console.log("updateSend");
      console.log("index", index);
      console.log("row", row);
      // this.formUpdate = row
      // this.dialogUpdateVisible = true
      // this.formUpdate = row;
    },
    delSend(val) {
      this.$confirm("此操作将删除该模板, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.rowData.splice(val, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      console.log("下标", val);
    },
    // 查询
    onSubmit() {
      // 请求查询数据
      this.$axios
        .post("/api/sale/searchDistt.do", {
          distt_name: this.nameSearch,
          page: 1,
          limit: 3
        })
        .then(res => {
          console.log("点击查询获取到的信息", res);
          this.rowData = res.data.data;
        })
        .catch(err => {
          console.log("点击查询出错信息", err);
        });
      console.log("onSubmit");
    }
  },
  mounted() {
    // 获得配送费模板数据
    this.getAllData();
  },
  filters: {
    // 结算方式过滤器
    formCountWay(val) {
      if (val == 0) {
        return "普通结算";
      } else if (val == 1) {
        return "模板独立订单结算";
      }
    }
  }
};
</script>

<style scoped>
/*公共样式*/
.bg-grey {
  background-color: grey;
}
/*头部搜索样式开始*/
#searchBox {
  /*width: 500px;*/
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
}
#searchBox > div:nth-of-type(1) {
  display: flex;
  justify-content: space-between;
}
#searchBox > el-input {
  margin-right: 10px;
}
/*头部搜索样式结束*/
/*配送费表格*/
.bg-sendTable-head {
  background-color: #e4e4e4;
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
}
.bg-sendTable-head > div:nth-of-type(2) {
  display: flex;
  justify-content: space-between;
}
.bg-sendTable-head .lastTime {
  margin-right: 10px;
}
.bg-sendTable-head .sendOper span {
  display: inline-block;
  margin-right: 10px;
  color: #169bd5;
}
/*配送费模板*/
#sendFees > el-row {
  margin-top: 20px;
}
/*添加公共模板样式*/
/*配送方式样式*/
.sendWay {
  display: flex;
  flex-direction: row;
  background-color: gainsboro;
}
.sendWay .el-input {
  height: 30px;
}
.sendWay > defaultF {
  display: flex;
  flex-direction: row;
}
.sendWayBox {
  display: flex;
  flex-direction: row;
}
.sendWayBox > div {
  margin-left: 20px;
}
/*指定包邮条件*/
.icons {
  font-size: 50px;
}
.refSendOper {
  /*指定包邮条件的操作*/
  display: flex;
  flex-direction: row;
}
</style>
