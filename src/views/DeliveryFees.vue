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
        <el-button type="primary" @click="onSubmit" class="formMarginLeft"
          >查询</el-button
        >
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
          lock-scroll
          center
        >
          <el-form :model="addForm">
            <el-form-item label="模板名称" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.name"
                autocomplete="off"
                style="width: 300px"
                class="formMarginLeft"
              ></el-input>
            </el-form-item>
            <el-form-item label="结算方式" :label-width="formLabelWidth">
              <el-radio-group v-model="radioPay" class="formMarginLeft">
                <el-radio :label="0">普通结算</el-radio>
                <el-radio :label="1">模板独立订单结算</el-radio>
              </el-radio-group>
              <p style="color: gainsboro;font-size: 15px">
                使用独立结算模板商品，提交订单时系统自动将所有属于该模板商品归于一个订单结算，不和普通结算商品一起结算。
              </p>
            </el-form-item>
            <el-form-item label="是否包邮" :label-width="formLabelWidth">
              <el-radio-group v-model="radioYou" class="formMarginLeft">
                <el-radio :label="0">自定义配送费</el-radio>
                <el-radio :label="1">卖家承担配送费</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="计价方式" :label-width="formLabelWidth">
              <el-radio-group v-model="radioPrice" class="formMarginLeft">
                <el-radio :label="0">按件数</el-radio>
                <el-radio :label="1">按重量</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="配送方式" :label-width="formLabelWidth">
              <el-collapse
                v-model="activeNames"
                @change="handleChange"
                class="formMarginLeft"
              >
                <!--同城配送-->
                <div class="sendWayBox">
                  <el-checkbox v-model="checked1"></el-checkbox>
                  <el-collapse-item title="同城配送" name="1">
                    <template>
                      <!--同城配送默认运费-->
                      <!--配送规则-->
                      <el-row style="margin-top: 20px" v-if="checked1">
                        <el-table
                          :data="addForm.sendWays1"
                          border
                          style="width: 100%"
                          :header-cell-style="{background:'#F5F5F5',color:'#606266'  }"
                        >
                          <el-table-column
                            prop="dispm_address"
                            label="配送到"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-select
                                v-model="scope.row.dispm_address"
                                multiple
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="item in areaOptions"
                                  :key="item.area_no"
                                  :label="item.area_name"
                                  :value="item.area_no"
                                >
                                </el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="dispm_defpie"
                            label="首重/kg"
                            width="180"
                            v-if="radioPrice == 1"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_defpie"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="dispm_defpie"
                            label="首件"
                            width="180"
                            v-if="radioPrice == 0"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_defpie"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <!--默认呈现首件-->
                          <el-table-column
                            prop="dispm_defpie"
                            label="首件"
                            width="180"
                            v-if="radioPrice == -1"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_defpie"
                              ></el-input>
                            </template>
                          </el-table-column>

                          <el-table-column
                            prop="dispm_deffre"
                            label="运费(元)"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_deffre"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <!--默认是续件-->
                          <el-table-column
                            prop="dispm_addpie"
                            label="续件"
                            width="180"
                            v-if="radioPrice == -1"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_addpie"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <!--续件-->
                          <el-table-column
                            prop="dispm_addpie"
                            label="续件"
                            width="180"
                            v-if="radioPrice == 0"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_addpie"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <!--续重-->
                          <el-table-column
                            prop="dispm_addpie"
                            label="续重"
                            width="180"
                            v-if="radioPrice == 1"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_addpie"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="dispm_addfreight"
                            label="续费(元)"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_addfreight"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" width="180">
                            <template slot-scope="scope">
                              <el-button @click="delEachCity(scope.row)"
                                >清空</el-button
                              >
                              <el-button
                                @click="addEachCity(scope.$index, scope.row)"
                                >保存</el-button
                              >
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                    </template>
                  </el-collapse-item>
                </div>
                <!--快递物流-->
                <div class="sendWayBox">
                  <el-checkbox v-model="checked2"></el-checkbox>
                  <el-collapse-item title="快递物流" name="2">
                    <template>
                      <!--快递物流默认运费-->
                      <!--配送规则-->
                      <el-row v-if="checked2">
                        <el-table
                          :data="addForm.sendWays2"
                          border
                          style="width: 100%"
                        >
                          <el-table-column
                            prop="dispm_address"
                            label="配送到"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-select
                                v-model="scope.row.dispm_address"
                                multiple
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="item in areaOptions"
                                  :key="item.area_no"
                                  :label="item.area_name"
                                  :value="item.area_no"
                                >
                                </el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="dispm_defpie"
                            label="首重/kg"
                            width="180"
                            v-if="radioPrice == 1"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_defpie"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="dispm_defpie"
                            label="首件"
                            width="180"
                            v-if="radioPrice == 0"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_defpie"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <!--默认呈现首件-->
                          <el-table-column
                            prop="dispm_defpie"
                            label="首件"
                            width="180"
                            v-if="radioPrice == -1"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_defpie"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="dispm_deffre"
                            label="运费(元)"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_deffre"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <!--默认是续件-->
                          <el-table-column
                            prop="dispm_addpie"
                            label="续件"
                            width="180"
                            v-if="radioPrice == -1"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_addpie"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <!--续件-->
                          <el-table-column
                            prop="dispm_addpie"
                            label="续件"
                            width="180"
                            v-if="radioPrice == 0"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_addpie"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <!--续重-->
                          <el-table-column
                            prop="dispm_addpie"
                            label="续重"
                            width="180"
                            v-if="radioPrice == 1"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_addpie"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="dispm_addfreight"
                            label="续费(元)"
                            width="180"
                          >
                            <template slot-scope="scope">
                              <el-input
                                v-model="scope.row.dispm_addfreight"
                              ></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" width="180">
                            <template slot-scope="scope">
                              <el-button @click="delEachQuick(scope.row)"
                                >清空</el-button
                              >
                              <el-button
                                @click="addEachQuick(scope.$index, scope.row)"
                                >保存</el-button
                              >
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                    </template>
                  </el-collapse-item>
                </div>
                <!--指定条件包邮-->
                <div class="sendWayBox">
                  <el-checkbox v-model="checked3"></el-checkbox>
                  <el-collapse-item title="指定条件包邮" name="3">
                    <template>
                      <!--配送规则-->
                      <el-row v-if="checked3">
                        <el-table
                          :data="addForm.youRule"
                          border
                          style="width: 100%"
                        >
                          <el-table-column
                            prop="free_addrs"
                            label="选择地区"
                            width="270px"
                          >
                            <template slot-scope="scope">
                              <el-select
                                v-model="scope.row.value1"
                                multiple
                                placeholder="请选择"
                                ref="free_addrs"
                              >
                                <el-option
                                  v-for="item in areaOptions"
                                  :key="item.area_no"
                                  :label="item.area_name"
                                  :value="item.area_no"
                                >
                                </el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="free_method"
                            label="选择运送方式"
                            width="270px"
                          >
                            <template slot-scope="scope">
                              <el-select
                                v-model="scope.row.free_method"
                                placeholder="请选择"
                                ref="free_method"
                              >
                                <el-option
                                  label="同城配送"
                                  value="同城配送"
                                ></el-option>
                                <el-option
                                  label="快递物流"
                                  value="快递物流"
                                ></el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="free_condi"
                            label="设置包邮条件"
                            width="270px"
                          >
                            <template slot-scope="scope">
                              <el-select
                                v-model="scope.row.free_condi"
                                :style="{ width: '200px' }"
                                ref="free_condi"
                              >
                                <el-option label="件数" value="0"></el-option>
                                <el-option label="金额" value="1"></el-option>
                              </el-select>
                              <!--包邮条件-->
                              <div
                                v-if="scope.row.free_condi == 0"
                                :style="{ width: '200px' }"
                              >
                                <span>满</span>
                                <el-input
                                  v-model="scope.row.free_pies"
                                  
                                  ref="free_pies"
                                ></el-input>
                                <span>件</span>
                                <span>包邮</span>
                              </div>
                              <div
                                v-if="scope.row.free_condi == 1"
                                :style="{ width: '100px' }"
                              >
                                <span>满</span>
                                <el-input
                                  v-model="scope.row.free_money"
                                  :style="{ width: '200px' }"
                                  ref="free_money"
                                ></el-input>
                                <span>元</span>
                                <span>包邮</span>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" width="270px">
                            <template slot-scope="scope">
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
                                  @click="delRef(scope.row)"
                                  :disabled="addForm.youRule.length == 1"
                                ></el-button>
                                <!--保存当前包邮条件-->
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
      <el-row v-for="(item, index) in rowData" :key="item.distt_name">
        <!--表头-->
        <div class="bg-sendTable-head">
          <!--左边配送名称-->
          <div>{{ item.distt_name }}</div>
          <!--右边编辑-->
          <div>
            <!--编辑时间-->
            <!--操作-->
            <div class="sendOper">
              <span type="text" @click="handleUpdate(index)">修改</span>
              <el-dialog title="修改模板" :visible.sync="dialogUpdateVisible">
                <el-form :model="formUpdate">
                  <el-form-item label="模板名称" :label-width="formLabelWidth">
                    <el-input
                      v-model="formUpdate.moduleName"
                      autocomplete="off"
                      class="formMarginLeft"
                      :style="{ width: '280px' }"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="结算方式" :label-width="formLabelWidth">
                    <el-radio-group
                      v-model="formUpdate.radioPay"
                      class="formMarginLeft"
                    >
                      <el-radio :label="0">普通结算</el-radio>
                      <el-radio :label="1">模板独立订单结算</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否包邮" :label-width="formLabelWidth">
                    <el-radio-group
                      v-model="formUpdate.radioYou"
                      class="formMarginLeft"
                    >
                      <el-radio :label="0">自定义配送费</el-radio>
                      <el-radio :label="1">卖家承担配送费</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="计价方式" :label-width="formLabelWidth">
                    <el-radio-group
                      v-model="formUpdate.radioPrice"
                      class="formMarginLeft"
                    >
                      <el-radio :label="0">按件数</el-radio>
                      <el-radio :label="1">按重量</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="配送方式" :label-width="formLabelWidth">
                    <el-checkbox-group
                      v-model="formUpdate.sendWays"
                      class="formMarginLeft"
                    >
                      <el-checkbox
                        label="同城配送"
                        disabled="true"
                      ></el-checkbox>
                      <el-checkbox
                        label="快递物流"
                        disabled="true"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox
                      v-model="formUpdate.checked3"
                      :label="1"
                      v-if="formUpdate.checked3"
                      class="formMarginLeft"
                      disabled="true"
                      >指定包邮</el-checkbox
                    >
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
          <el-table-column prop="dispm_name" label="配送方式" width="180">
          </el-table-column>
          <el-table-column prop="dispm_address" label="配送区域" width="180">
          </el-table-column>
          <el-table-column prop="dispm_deffre" label="首件（个）" width="180">
          </el-table-column>
          <el-table-column prop="dispm_addpie" label="默认件数内运费（元）">
          </el-table-column>
          <el-table-column prop="dispm_addpie" label="续件（个）">
          </el-table-column>
          <el-table-column prop="dispm_addfreight" label="额外配送费（元）">
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <!--分页-->
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prive-click="hadleq"
        :current-page="currentPage"
        :page-sizes="[3, 6, 9, 12]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeliveryFees",
  inject: ["reload"],
  data() {
    return {
      selecteds: true,
      updateFormSend: [], //修改配送模式数组
      updateFormFree: [], //修改免邮规则数组
      searchJudge: false, //判断是否查询
      areaOptions: [], //地区数组
      updateIndex: 0, //记录当前修改的下标
      // 分页
      currentPage: 1,
      pageSize: 3, // 每页显示的条数
      total: 0, //总条数
      // 修改表单里面的数据
      formUpdate: {
        moduleName: "", //模板名称
        radioPay: 1, //结算方式
        radioYou: 1, //包邮方式
        radioPrice: 1, //计价方式
        sendWays: [], //配送方式
        checked1: false, //同城配送
        checked2: false, //快递物流
        checked3: false //指定包邮
      },
      dialogUpdateVisible: false, //修改表单的显示隐藏
      checked1: false,
      checked2: false,
      checked3: false,
      activeNames: ["1"],
      nameSearch: "",
      rowData: [],
      //添加表单的数据
      dialogFormVisible: false,
      addForm: {
        //添加表单
        name: "", //模板名称
        radioPay: 0, //结算方式
        radioYou: 0, //包邮方式
        radioPrice: 0, //计价方式
        // 同城配送
        sendWays1: [
          {
            dispm_name: "", //配送方式
            dispm_defpie: "", //默认件数
            dispm_deffre: "", //默认件数内运费
            dispm_addpie: "", //每增加件数
            dispm_addfreight: "", //每增加件数运费
            dispm_address: "", //配送地址范围
            dispm_firfre: "", //首费
            dispm_cont: "", //续件
            dispm_renew: "", //续费
            dispm_use: "" //配送方式
          }
        ], //配送方式
        // 快遞物流
        sendWays2: [
          {
            dispm_defpie: "", //默认件数
            dispm_deffre: "", //默认件数内运费
            dispm_addpie: "", //每增加件数
            dispm_addfreight: "", //每增加件数运费
            dispm_address: "", //配送地址范围
            dispm_firfre: "", //首费
            dispm_cont: "", //续件
            dispm_renew: "" //续费
          }
        ], //配送方式
        sendWays: [],
        youRule: [
          {
            free_addrs: "", //包邮地区
            free_method: "", //同城配送/快递配送
            free_condi: "", //包邮条件
            free_pies: "", //包邮件数
            free_money: "", //包邮金额
            free_use: 0
          }
        ] //包邮规则
      },
      // 添加模板部分的下拉列表
      optionsCity: [
        {
          value: "双流区",
          label: "双流区"
        },
        {
          value: "南山区",
          label: "南山区"
        },
        {
          value: "罗湖区",
          label: "罗湖区"
        },
        {
          value: "福田区",
          label: "福田区"
        },
        {
          value: "武侯区",
          label: "武侯区"
        },
        {
          value: "高新区",
          label: "高新区"
        }
      ],
      optionsQuick: [
        {
          value: "全国",
          label: "全国"
        },
        {
          value: "四川",
          label: "四川"
        },
        {
          value: "云南",
          label: "云南"
        },
        {
          value: "贵州",
          label: "贵州"
        },
        {
          value: "深圳",
          label: "深圳"
        },
        {
          value: "武汉",
          label: "武汉"
        }
      ],
      optionsFree: [
        {
          value: "全国",
          label: "全国"
        },
        {
          value: "四川",
          label: "四川"
        },
        {
          value: "云南",
          label: "云南"
        },
        {
          value: "贵州",
          label: "贵州"
        },
        {
          value: "深圳",
          label: "深圳"
        },
        {
          value: "武汉",
          label: "武汉"
        }
      ],
      // 添加模板部分的values下拉列表
      value1: [],
      formLabelWidth: "120px",
      radioPay: 0,
      radioYou: 0,
      radioPrice: 0,
      checkSendList: ["", "", ""], //选择配送方式
      // rules: {
      //   free_addrs: [
      //     { required: true, message: "请选择配送地区", trigger: "blur" }
      //   ],
      //   free_method: [
      //     { required: true, message: "请选择配送方式", trigger: "change" }
      //   ],
      //   free_condi: [
      //     { required: true, message: "请选择包邮条件", trigger: "change" }
      //   ],
      //   free_pies: [
      //     { required: true, message: "请选择包邮件数", trigger: "change" }
      //   ],
      //   free_money: [
      //     { required: true, message: "请选择包邮金额", trigger: "change" }
      //   ]
      // }
    };
  },
  methods: {
    // 免邮规则失去焦点时的判断
    // judgeConCount(val) {
    //   console.log(val);
    //   console.log(val.free_money);
    //   if (val.free_money == "" || val.free_pies == "") {
    //     this.$message("包邮条件不能为空");
    //   }
    // },
    // judgeConMoney(val) {
    //   console.log(val);
    //   console.log(val.free_condi);
    //   if (val.free_condi == "") {
    //     this.$message("包邮计价方式不能为空");
    //   }
    // },
    // judgeSendWay(val) {
    //   console.log(val);
    //   console.log(val.free_method);
    //   if (val.free_method == "") {
    //     this.$message("运送方式不能为空");
    //   }
    // },
    // juadgeFreeAddre(val) {
    //   console.log("配送区域");
    //   console.log(val);
    //   console.log(val.length);
    //   console.log(this.addForm.youRule.free_addrs);
    //   if (val.length == 0) {
    //     this.$message("配送区域不能为空");
    //   }
    // },
    hadleq() {
      console.log("hadleq");
    },
    // 改变每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      console.log("pagesize");
      console.log(this.pageSize);
      this.getAllData(this.currentPage, this.pageSize);
    },
    // 分页改变当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log("currentPage");
      console.log("当前页", this.currentPage);
      // 再次请求数据
      this.onSubmit();
      // this.getAllData(this.currentPage,this.pageSize)
    },
    handleUpdate(index) {
      // 测试对象中是否存在某个键
      // let item
      // for(item in this.test1){
      //   if(item.indexOf('t')>-1){
      //     console.log("hhahahkkkk")
      //   }
      // }
      this.dialogUpdateVisible = true;
      this.updateIndex = index; //将修改下标存起来
      this.formUpdate.moduleName = this.rowData[index].distt_name;
      console.log("支付方式", this.rowData[index].distt_setmethod);
      console.log("包邮方式", this.rowData[index].distt_receive);
      console.log("计价方式", this.rowData[index].distt_pricimethod);
      console.log("当前编号", this.rowData[index].distt_no);
      // 请求具体的数据
      this.$axios
        .post(
          "/api/sale/queryDisttOne.do",
          {
            distt_no: this.rowData[index].distt_no
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log("获取指定数据", res);
          for (var i = 0; i < res.data.data.frees.length; i++) {
            console.log("22222222", res.data.data.frees[i].free_use);
            if (res.data.data.frees[i].free_use == 1) {
              this.formUpdate.checked3 = true;
              return;
            }
          }
          for (var j = 0; j < res.data.data.dispms.length; j++) {
            console.log(res.data.data.dispms[j].dispm_name);
            if (res.data.data.dispms[j].dispm_name == "快递物流") {
              this.formUpdate.sendWays.push("快递物流");
              return;
            }
            if (res.data.data.dispms[j].dispm_name == "同城配送") {
              this.formUpdate.sendWays.push("同城配送");
              return;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });

      // this.formUpdate.radioPay = this.rowData[index].distt_setmethod
      // this.formUpdate.radioYou = this.rowData[index].distt_receive
      // this.formUpdate.radioPrice = this.rowData[index].distt_pricimethod
      // if(this.rowData[index].frees[0].free_use == 1){
      //   this.formUpdate.checked3 = true
      // }
      // if(this.rowData[index].dispms[0].dispm_use == 1||this.rowData[index].dispms[1].dispm_use == 1){
      //   this.formUpdate.sendWays = ['快递物流','同城配送']
      // }
      // console.log('index',index);
      // 请求修改
      // console.log('row',row);
    },
    // 提交修改
    saveUpdate() {
      this.dialogFormVisible = false;
      // 表单里面的值赋值给当前下标的数据
      this.rowData[this.updateIndex].distt_name = this.formUpdate.moduleName;
      this.rowData[this.updateIndex].distt_setmethod = this.formUpdate.radioPay;
      this.rowData[this.updateIndex].distt_receive = this.formUpdate.radioYou;
      this.rowData[
        this.updateIndex
      ].distt_pricimethod = this.formUpdate.radioPrice;
      this.rowData[
        this.updateIndex
      ].frees[0].free_use = this.formUpdate.checked3;
      let objFree = {};
      let obj = {};
      for (var i = 0; i < this.rowData[this.updateIndex].dispms.length; i++) {
        console.log(
          "1111",
          this.rowData[this.updateIndex].dispms[i].dispm_name
        );
        obj.dispm_no = this.rowData[this.updateIndex].dispms[i].dispm_no;
        obj.dispm_use = this.rowData[this.updateIndex].dispms[i].dispm_use;
        obj.dispm_name = this.rowData[this.updateIndex].dispms[i].dispm_name;
        this.updateFormSend.push(obj);
      }
      for (var j = 0; i < this.rowData[this.updateIndex].dispms.length; j++) {
        objFree.free_use = this.rowData[this.updateIndex].frees[j].free_use;
        objFree.distt_no = this.rowData[this.updateIndex].frees[j].distt_no;
        this.updateFormFree.push(objFree);
      }
      this.$axios
        .post(
          "/api/sale/editDisttSub.do",
          {
            dispms: this.updateFormSend,
            distt_name: this.rowData[this.updateIndex].distt_name,
            distt_no: this.rowData[this.updateIndex].distt_no,
            distt_pricimethod: this.rowData[this.updateIndex].distt_pricimethod,
            distt_receive: this.rowData[this.updateIndex].distt_receive,
            distt_setmethod: this.rowData[this.updateIndex].distt_setmethod,
            frees: this.updateFormFree
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$message(res.data.msg);
            this.dialogUpdateVisible = false;
            this.reload();
          }
          console.log("修改返回来的数据", res);
        })
        .catch(err => {
          console.log("出错信息", err);
        });
    },
    // 保存修改
    // 添加指定包邮
    addRef() {
      let obj = {
        free_addrs: "", //包邮地区
        free_method: "", //同城配送/快递配送
        free_condi: "", //包邮条件
        free_pies: "", //包邮件数
        free_money: ""
      };
      this.addForm.youRule.push(obj);
    },
    // 删除指定包邮
    delRef(val) {
      console.log("删除指定");
      this.addForm.youRule.splice(val, 1);
    },
    // 添加同城配送方式
    addEachCity(index, val) {
      if (this.checked1 == true) {
        // this.addForm.sendWays1.dispm_name = '同城配送'
        val.dispm_name = "同城配送";
      }
      let obj = {};
      obj.dispm_addfreight = val.dispm_addfreight;
      obj.dispm_addpie = val.dispm_addpie;
      obj.dispm_address = val.dispm_address[0];
      obj.dispm_deffre = val.dispm_deffre;
      obj.dispm_defpie = val.dispm_defpie;
      obj.dispm_name = val.dispm_name;
      console.log("zy1", this.addForm.sendWays1.dispm_name);
      this.addForm.sendWays1.dispm_use = parseInt(
        this.addForm.sendWays1.dispm_use
      );
      this.addForm.sendWays.push(obj);
      console.log("配送方式添加后", this.addForm.sendWays);
    },
    // 添加快遞物流配送方式
    addEachQuick(index, val) {
      console.log(index);
      console.log("添加配送当前行", val);
      if (this.checked2 == true) {
        val.dispm_name = "快递物流";
      }
      console.log(val);
      let obj = {};
      obj.dispm_addfreight = val.dispm_addfreight;
      obj.dispm_addpie = val.dispm_addpie;
      obj.dispm_address = val.dispm_address[0];
      obj.dispm_deffre = val.dispm_deffre;
      obj.dispm_defpie = val.dispm_defpie;
      obj.dispm_name = val.dispm_name;

      console.log("zy2", this.addForm.sendWays2.dispm_name);
      console.log("this.addForm.sendWays2", this.addForm.sendWays2);
      this.addForm.sendWays.push(obj);
      console.log("配送方式添加后", this.addForm.sendWays);
    },
    // 删除快递物流的每一条
    delEachQuick(val) {
      console.log(val);
      val.dispm_defpie = "";
      val.dispm_defpie = ""; //默认件数
      val.dispm_deffre = ""; //默认件数内运费
      val.dispm_addpie = ""; //每增加件数
      val.dispm_addfreight = ""; //每增加件数运费
      val.dispm_address = ""; //配送地址范围
      val.dispm_firfre = ""; //首费
      val.dispm_cont = ""; //续件
      val.dispm_renew = ""; //续费
    },
    // 清空同城配送的每一条
    delEachCity(val) {
      console.log("hahah");
      console.log(val);
      // console.log(this.sendWays1.dispm_defpie)
      // console.log('zy',this.sendWays1.dispm_defpie);
      val.dispm_defpie = "";
      val.dispm_defpie = ""; //默认件数
      val.dispm_deffre = ""; //默认件数内运费
      val.dispm_addpie = ""; //每增加件数
      val.dispm_addfreight = ""; //每增加件数运费
      val.dispm_address = ""; //配送地址范围
      val.dispm_firfre = ""; //首费
      val.dispm_cont = ""; //续件
      val.dispm_renew = ""; //续费
    },
    handleChange(val) {
      console.log(val);
    },
    // 添加配送费模板
    save() {
      if (this.checked3) {
        this.addForm.youRule.free_use = 1;
        if (this.$refs.free_addrs.length == 0) {
          this.$message("配送地区不能为空");
        } else if (this.$refs.free_method == "") {
          this.$message("配送方式不能为空");
        } else if (this.$refs.free_condi == "") {
          this.$message("配送计价方式不能为空");
        } else if (
          this.$refs.free_pies == "" ||
          this.$refs.free_money == ""
        ) {
          this.$message("配送条件不能为空");
        } else {
          console.log("的是哈哈哈哈");
          // if(this.$refs.free_addrs.value.length != 0
          //     &&this.$refs.free_method.value != ''&&
          //     this.$refs.free_condi.value != ''&&
          //     this.$refs.free_pies.value != '' &&
          //     this.$refs.free_money.value != ''){
          //   console.log(1111111111199999)
          //   console.log('kknnn',this.addForm.youRule)
          //   // 请求添加模板
          this.$axios
            .post(
              "/api/sale/addDistt.do",
              {
                dispms: this.addForm.sendWays, //配送方式
                distt_name: this.addForm.name,
                distt_pricimethod: parseInt(this.radioPrice),
                distt_receive: parseInt(this.radioYou),
                distt_setmethod: parseInt(this.radioPay),
                frees: this.addForm.youRule //包邮规则
              },
              {
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                  token: window.sessionStorage.getItem("token")
                }
              }
            )
            .then(res => {
              console.log("查询成功返回数据", res);

              this.$message(res.data.msg);
              if (res.data.code === 200) {
                console.log("查询快快快", this.rowData);
                this.dialogFormVisible = false;
                this.reload();
              }
            })
            .catch(err => {
              console.log("添加出错", err);
            });
        }

        // }
        // else {
        //   this.$message("指定包邮后请输入相关信息，否则不能进行提交")
        // }
      } else {
        // 请求添加模板
        console.log(1)
        this.$axios
          .post(
            "/api/sale/addDistt.do",
            {
              dispms: this.addForm.sendWays, //配送方式
              distt_name: this.addForm.name,
              distt_pricimethod: parseInt(this.radioPrice),
              distt_receive: parseInt(this.radioYou),
              distt_setmethod: parseInt(this.radioPay),
              frees: this.addForm.youRule //包邮规则
            },
            {
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                token: window.sessionStorage.getItem("token")
              }
            }
          )
          .then(res => {
            console.log("查询成功返回数据", res);
            this.reload();
            this.$message(res.data.msg);
            if (res.data.code === 200) {
              console.log("查询快快快", this.rowData);
              this.dialogFormVisible = false;
            }
          })
          .catch(err => {
            console.log("添加出错", err);
          });
      }

      // console.log(this.addForm.name)
      // console.log('添加查看包邮规则',this.addForm.youRule)
      // console.log(111)
      // console.log('radioPay',this.radioPay)
      // console.log('radioYou',this.radioYou)
      // console.log('radioPrice',this.radioPrice)
      // console.log('form.name',this.addForm.name)
      // console.log('配送方式',this.addForm.sendWays);
      // console.log('免邮规则',this.addForm.youRule);
      // 如果快递物流选中则状态改为1，若指定条件输入框有一个为空则提示输入
    },
    // 添加配送费模板
    toAdd() {
      console.log("toAdd");
    },
    // 获得配送费模板数据
    getAllData(currentPage, pageSize) {
      this.$axios
        .post(
          "/api/sale/queryDistt.do",
          {
            page: currentPage,
            pagesize: pageSize
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log(res);
          this.rowData = res.data.data;
          this.total = res.data.count;
          console.log("quannbu接收到的数据", res);
          console.log("this.rowData", this.rowData);
        })
        .catch(err => {
          console.log("所有信息的出错", err);
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
          // 请求删除数据
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
      console.log(typeof this.pageSize);
      console.log(typeof this.currentPage);
      this.$axios
        .post(
          "/api/sale/searchDistt.do",
          {
            distt_name: this.nameSearch,
            page: parseInt(this.currentPage),
            pagesize: parseInt(this.pageSize)
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: window.sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log("点击查询获取到的信息", res);
          if (res.data.data.length > 0) {
            // this.$message("查询成功")
            this.total = res.data.count;
            this.rowData = res.data.data;
          } else if (res.data.data.length == 0) {
            this.$message("没有该模版，请重新查询");
          }
        })
        .catch(err => {
          console.log("点击查询出错信息", err);
        });
      console.log("onSubmit");
    }
  },
  mounted() {
    // 获得配送费模板数据
    console.log("当前pageSize", this.pageSize);
    this.getAllData(this.currentPage, this.pageSize);
    // 请求地区
    this.$axios
      .post(
        "/api/sys/area/showArea.do",
        {
          page: 1,
          pageSize: 3
        },
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            token: window.sessionStorage.getItem("token")
          }
        }
      )
      .then(res => {
        console.log("请求地区", res);
        this.areaOptions = res.data.data;
        console.log("请求地区数组", this.areaOptions);
      })
      .catch(err => {
        console.log("请求地区出错", err);
      });
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
.formMarginLeft {
  margin-left: 25px;
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
  font-size: 18px;
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
.refSendOper .el-button {
  margin-left: 15px;
}
#sendFees empty {
  content: "暂无数据";
  color: gainsboro;
  text-align: center;
}
</style>
