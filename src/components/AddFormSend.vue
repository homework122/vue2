<template>
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
                          <el-input v-model="scope.row.dispm_defpie"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="dispm_defpie"
                        label="首件"
                        width="180"
                        v-if="radioPrice == 0"
                      >
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.dispm_defpie"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="dispm_deffre"
                        label="运费(元)"
                        width="180"
                      >
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.dispm_deffre"></el-input>
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
                          <el-input v-model="scope.row.dispm_addpie"></el-input>
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
                          <el-input v-model="scope.row.dispm_addpie"></el-input>
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
                          <el-input v-model="scope.row.dispm_defpie"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="dispm_defpie"
                        label="首件"
                        width="180"
                        v-if="radioPrice == 0"
                      >
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.dispm_defpie"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="dispm_deffre"
                        label="运费(元)"
                        width="180"
                      >
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.dispm_deffre"></el-input>
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
                          <el-input v-model="scope.row.dispm_addpie"></el-input>
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
                          <el-input v-model="scope.row.dispm_addpie"></el-input>
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
                            @change="juadgeFreeAddre(scope.row.value1)"
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
                            @change="judgeSendWay(scope.row)"
                          >
                            <el-option label="请选择" value=""></el-option>
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
                            @change="judgeConMoney(scope.row)"
                          >
                            <el-option label="件数" value="0"></el-option>
                            <el-option label="金额" value="1"></el-option>
                          </el-select>
                          <!--包邮条件-->
                          <div v-if="scope.row.free_condi == 0">
                            <span>满</span>
                            <el-input
                              size="mini"
                              v-model="scope.row.free_pies"
                              @change="judgeConCount(scope.row)"
                            ></el-input>
                            <span>件</span>
                            <span>包邮</span>
                          </div>
                          <div v-if="scope.row.free_condi == 1">
                            <span>满</span>
                            <el-input
                              size="mini"
                              v-model="scope.row.free_money"
                              @change="judgeConCount"
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
</template>

<script>
export default {
  name: "AddFormSend"
};
</script>

<style scoped></style>
