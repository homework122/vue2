<template>
  <div>
    <el-container>
      <!-- 头部步骤条 -->
      <el-header>
        <el-steps :active="step" simple>
          <el-step title="选择模板" icon="el-icon-picture"></el-step>
          <el-step title="填写专题信息" icon="el-icon-edit"></el-step>
          <el-step title="专题头部图片" icon="el-icon-picture"></el-step>
          <el-step title="确定组件商品" icon="el-icon-edit"></el-step>
          <el-step title="创建完成" icon="el-icon-success"></el-step>
        </el-steps>
      </el-header>
      <el-main>
        <!-- 第一步 选择模板 -->
        <div class="step1" v-show="this.step == 0">
          <div class="demo-image__preview" v-for="(v, i) in MurlL" :key="i">
            <el-image :src="v.tem_img" :preview-src-list="srcList" fit="fill">
            </el-image>
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              style="position: absolute;top:calc(50% - 20px);left:calc(50% - 20px)"
              class="step1Btn"
              @click="step1Btn(v.tem_no, i)"
            ></el-button>
          </div>
        </div>
        <!-- 第二步 基本信息 -->
        <div class="step2" v-show="this.step == 1">
          <el-container>
            <el-aside
              width="25%"
              style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);height:100%"
            >
              <el-row
                style="height:30px;border-bottom: 1px solid #909399;text-align: center;line-height: 30px;"
              >
                <el-col :span="24">{{ this.basicForm.name }}</el-col>
              </el-row>
              <el-row
                style="height:180px;border-bottom: 1px solid #909399;text-align: center;line-height: 50px;"
              >
                <el-col :span="24"
                  ><el-image :src="this.SelecM" alt=""></el-image
                ></el-col>
              </el-row>
              <el-row
                style="height:180px;border-bottom: 1px solid #909399;text-align: center;line-height: 50px;"
              >
                <el-col :span="24"></el-col>
              </el-row>
              <el-row
                style="height:30px;border-bottom: 1px solid #909399;text-align: center;line-height: 30px;"
              >
                <el-col :span="24">{{ this.basicForm.desc }}</el-col>
              </el-row>
            </el-aside>
            <el-main
              width="70%"
              style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);height:100%"
            >
              <el-row
                style="height:30px;border-left:5px solid #409EFF;line-height: 30px;padding-left: 20px;"
              >
                <el-col :span="24">
                  填写基本信息
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form
                    :model="basicForm"
                    :rules="basicrules"
                    ref="basicForm"
                    label-width="100px"
                    class="demo-basicForm"
                    size="mini"
                  >
                    <el-form-item label="活动名称" prop="name">
                      <el-input
                        v-model="basicForm.name"
                        style="width:300px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="规则说明" prop="desc">
                      <el-input
                        type="textarea"
                        v-model="basicForm.desc"
                        style="width:300px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="有效期" required>
                      <el-col :span="6">
                        <el-form-item prop="date1">
                          <el-date-picker
                            type="date"
                            placeholder="开始日期"
                            v-model="basicForm.date1"
                            style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="1">-</el-col>
                      <el-col :span="6">
                        <el-form-item prop="date2">
                          <el-date-picker
                            type="date"
                            placeholder="结束日期"
                            v-model="basicForm.date2"
                            style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        type="primary"
                        @click="submitbasic('basicForm')"
                        >下一步</el-button
                      >
                      <el-button @click="Reset('basicForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </div>
        <!-- 第三步 头部图片 -->
        <div class="step3" v-show="this.step == 2">
          <el-container>
            <el-aside
              width="25%"
              style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);height:100%"
            >
              <el-row
                style="height:30px;border-bottom: 1px solid #909399;text-align: center;line-height: 30px;"
              >
                <el-col :span="24">{{ this.basicForm.name }}</el-col>
              </el-row>
              <el-row
                style="height:180px;border-bottom: 1px solid #909399;text-align: center;line-height: 50px;"
              >
                <el-col :span="24">
                  <el-image :src="this.SelecM" alt=""></el-image>
                </el-col>
              </el-row>
              <el-row
                style="height:180px;border-bottom: 1px solid #909399;text-align: center;line-height: 50px;"
              >
                <el-col :span="24">
                  <el-image :src="this.headImgUrl">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </el-col>
              </el-row>
              <el-row
                style="height:30px;border-bottom: 1px solid #909399;text-align: center;line-height: 30px;"
              >
                <el-col :span="24">{{ this.basicForm.desc }}</el-col>
              </el-row>
            </el-aside>
            <el-main
              width="70%"
              style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);height:500px"
            >
              <el-row
                style="height:30px;border-left:5px solid #409EFF;line-height: 30px;padding-left: 20px;"
              >
                <el-col :span="24">
                  专题头部图片
                </el-col>
              </el-row>
              <el-row style="margin-top:80px;margin-left:43%">
                <el-col
                  :span="24"
                  style=" width:150px;height:150px;overflow: hidden;"
                >
                  <el-upload
                    action="/api/uploadfile.do"
                    auto-upload
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-success="success"
                    :on-remove="handleRemove"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="headImg" alt="" />
                  </el-dialog>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" :offset="12" style="margin-top:50px">
                  <el-button type="primary" size="mini" @click="step3Btn"
                    >确定提交</el-button
                  >
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </div>
        <!-- 第四步 组件商品 -->
        <div class="step4" v-show="this.step == 3">
          <el-container>
            <el-aside
              width="25%"
              style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);height:100%"
            >
              <el-row
                style="height:30px;border-bottom: 1px solid #909399;text-align: center;line-height: 30px;"
              >
                <el-col :span="24">{{ this.basicForm.name }}</el-col>
              </el-row>
              <el-row
                style="height:180px;border-bottom: 1px solid #909399;text-align: center;line-height: 50px;"
              >
                <el-col :span="24">
                  <el-image :src="this.SelecM" alt=""></el-image>
                </el-col>
              </el-row>
              <el-row
                style="height:180px;border-bottom: 1px solid #909399;text-align: center;line-height: 50px;"
              >
                <el-col :span="24">
                  <el-image :src="this.headImgUrl">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </el-col>
              </el-row>
              <el-row
                style="height:30px;border-bottom: 1px solid #909399;text-align: center;line-height: 30px;"
              >
                <el-col :span="24">{{ this.basicForm.desc }}</el-col>
              </el-row>
            </el-aside>
            <el-main
              width="70%"
              style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);height:500px;position:relative;"
            >
              <el-row
                style="height:30px;border-left:5px solid #409EFF;line-height: 30px;padding-left: 20px;"
              >
                <el-col :span="24">
                  专题组件商品
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form
                    :model="themeForm"
                    :rules="themerule"
                    ref="themeForm"
                    class="demo-ruleForm"
                    inline-message
                  >
                    <el-form-item
                      label="组件主题"
                      prop="name"
                      style="width:300px;margin-top:10px;margin-left:-10px;"
                      size="mini"
                      label-width="80px"
                    >
                      <el-input v-model="themeForm.name"></el-input
                      ><label>输入3/8个字符</label>
                    </el-form-item>
                    <el-form-item label="选择商品" style="margin-top:-20px">
                      <el-row>
                        <el-col :span="6">
                          <el-button type="primary" size="mini" @click="choice"
                            >选择商品</el-button
                          >
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item label="" width="500px">
                      <el-table
                        :data="SelectList"
                        border
                        style="width: 100%"
                        height="230px"
                        :header-cell-style="{background:'#96C9FF',color:'#606266'  }"
                      >
                        <el-table-column
                          fixed
                          prop="stan_no"
                          label="编号"
                          width="50"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="com_imgs"
                          label="图片"
                          width="100px"
                        >
                          <template slot-scope="scope">
                            <img
                              :src="scope.row.com_imgs"
                              alt=""
                              style="width:50px;height:50px"
                            />
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="stan_name"
                          label="商品名称"
                          width="100px"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="stan_price"
                          label="商品原价"
                          width="100px"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="stan_pprice"
                          label="商品现价"
                          width="100px"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="stan_stock"
                          label="库存"
                          width="100px"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="comc_name"
                          label="类型"
                          width="100px"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="distt_name"
                          label="快递方式"
                          width="100px"
                        >
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100">
                          <template slot-scope="scope">
                            <el-button
                              @click="Del(scope.$index)"
                              type="text"
                              size="small"
                              >删除</el-button
                            >
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-form-item>
                    <el-form-item style="margin-top:-20px">
                      <el-row>
                        <el-col :span="6" :offset="18">
                          <el-button
                            type="primary"
                            @click="step4Btn('themeForm')"
                            size="mini"
                            >立即创建</el-button
                          >
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </div>
        <!-- 第五步 完成页面 -->
        <div class="step5" v-show="this.step == 4">
          <el-row style="height:50px;margin-top:30px">
            <el-col :span="2" :offset="9">
              <i
                class="el-icon-success"
                style="font-size:60px;color:#67C23A"
              ></i>
            </el-col>
            <el-col :span="8" style="margin-top:20px;margin-left:-25px">
              <span>恭喜您，专题活动创建完成!</span><br />
              <span style="margin-top:-50px;font-size:10px"
                >通过app广告位推荐专题，可以大大的增加专题的曝光哟~</span
              >
            </el-col>
          </el-row>
          <el-row style="margin-top:40px">
            <el-col :span="10" :offset="10">
              <el-button type="primary" size="mini" @click="again"
                >继续创建</el-button
              >
              <el-button
                type="primary"
                size="mini"
                style="margin-left:60px"
                @click="extension"
                >APP推广</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
    <!-- 商品选择模态框 -->
    <el-dialog
      title="商品列表"
      :visible.sync="dialogTableVisible"
      width="900px"
    >
      <el-row class="SearchRow">
        <el-col :span="10" style="margin-bottom:10px"
          ><div>
            <el-input
              placeholder="输入商品名称进行搜索"
              v-model="SearchInput"
              class="input-with-select"
              size="mini"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="SelectBtn"
              ></el-button>
            </el-input></div
        ></el-col>
      </el-row>
      <el-table :data="ShopList" border style="width: 100%">
        <el-table-column fixed prop="stan_no" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="com_imgs" label="图片" width="100px">
          <template slot-scope="scope">
            <img
              :src="scope.row.com_imgs"
              alt=""
              style="width:50px;height:50px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="stan_name" label="商品名称" width="100px">
        </el-table-column>
        <el-table-column prop="stan_price" label="商品原价" width="100px">
        </el-table-column>
        <el-table-column prop="stan_pprice" label="商品现价" width="100px">
        </el-table-column>
        <el-table-column prop="stan_stock" label="库存" width="100px">
        </el-table-column>
        <el-table-column prop="comc_name" label="类型" width="100px">
        </el-table-column>
        <el-table-column prop="distt_name" label="快递方式" width="100px">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="Add(scope.row)" type="text" size="small"
              >添加</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="6" :offset="9">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="limit"
            layout="total, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      NewId: "", // 新建活动id
      step: 0, // 头部步骤条
      limit: 5, // 每页总条数
      page: 1, // 当前页
      total: 0, // 总条数
      SearchInput: "", // 搜索框
      dialogTableVisible: false, // 模态框开关
      MurlL: [], // 模板图片
      srcList: [], // 大图
      SelecM: "", // 选中模板
      basicForm: {
        name: "",
        desc: "",
        date1: "",
        date2: ""
      }, // 基础信息
      basicrules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      }, // 基础信息验证
      dialogVisible: false, // 图片放大
      headImg: "", // 头像
      headImgUrl:
        "http://47.101.61.203/files/c0934b06-bb4d-43dd-b220-61038cc1223b.jpg", // 上传图片地址
      themeForm: {
        name: ""
      }, // 主题名称
      themerule: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }, //主推名称验证
      ShopList: [], // 商品列表
      SelectList: [], //选中商品
      SelectId: [] // 商品ID
    };
  },
  methods: {
    step1Btn(index, img) {
      this.SelecM = this.MurlL[img].tem_img;
      this.$axios
        .post(
          "/api/activities/chooseTemplate.do",
          {
            tem_no: index
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.NewId = res.data.data.act_no;
        });
      this.step++;
    }, // 模板选择按钮
    step2Reset(basicForm) {
      this.$refs[basicForm].resetFields();
    }, // 步骤二重置按钮
    submitbasic(basicForm) {
      this.$refs[basicForm].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/api/activities/addInformation.do",
              {
                act_no: this.NewId,
                act_name: this.basicForm.name,
                act_rule: this.basicForm.besc,
                act_start_time: this.basicForm.date1,
                act_end_time: this.basicForm.date2
              },
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
            .then(res => {
              if (res.data.code) {
                this.step++;
              }
            });
        } else {
          this.$message({
            message: "请填写必填信息",
            type: "warning"
          });
          return false;
        }
      });
    }, // 步骤二提交按钮
    success(response) {
      console.log(response);
      this.headImgUrl = response.newfilepath;
    }, // 上传成功后
    handlePictureCardPreview(file) {
      this.headImg = file.url;
      this.dialogVisible = true;
    }, // 图片改变
    handleRemove() {
      this.headImgUrl =
        "http://47.101.61.203/files/c0934b06-bb4d-43dd-b220-61038cc1223b.jpg";
    }, // 移除事件
    step3Btn() {
      this.step++;
    }, // 步骤三提交按钮 未完成 暂无接口保存图片信息
    choice() {
      this.dialogTableVisible = !this.dialogTableVisible;
      this.getChoice();
    }, // 选择商品按钮
    getChoice() {
      this.$axios
        .post(
          "/api/activities/chooseCommodity.do",
          {
            act_no: this.NewId,
            limit: this.limit,
            page: this.page
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.ShopList = res.data.data;
          this.total = res.data.count;
        });
    }, //获取商品数据
    Add(v) {
      this.SelectList.push(v);
    }, //添加商品
    Del(index) {
      this.SelectList.splice(index, 1);
    }, // 删除商品
    step4Btn(themeForm) {
      this.$refs[themeForm].validate(valid => {
        if (valid) {
          if (this.SelectList.length != 0) {
            for (var i = 0; i < this.SelectList.length; i++) {
              this.SelectId.push(this.SelectList[i].stan_no);
            }
            console.log(this.headImgUrl);
            this.$axios
              .post(
                "/api/activities/chooseOverCommodity.do",
                {
                  act_no: this.NewId,
                  stan_no: this.SelectId,
                  act_img: this.headImgUrl
                },
                {
                  headers: {
                    "Content-Type": "application/json"
                  }
                }
              )
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
            this.step++;
          } else {
            this.$message({
              message: "商品不能为空",
              type: "warning"
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }, // 第四步提交 后端还未完成  未测试
    handleSizeChange(i) {
      this.page = i;
      this.getChoice();
    }, // 下标改变
    handleCurrentChange(i) {
      this.page = i;
      this.getChoice();
    }, // 页码改变
    SelectBtn() {
      if (this.page != 1) {
        this.page = 1;
        this.$axios
          .post(
            "/api/activities/queryCommodity.do",
            {
              comc_no: 0,
              stan_name: this.SearchInput,
              limit: this.limit,
              page: this.page
            },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => {
            this.ShopList = res.data.data;
            this.total = res.data.count;
          });
      } else {
        this.$axios
          .post(
            "/api/activities/queryCommodity.do",
            {
              comc_no: 0,
              stan_name: this.SearchInput,
              limit: this.limit,
              page: this.page
            },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => {
            this.ShopList = res.data.data;
            this.total = res.data.count;
          });
      }
    }, // 搜索按钮
    get() {
      this.$axios
        .post(
          "/api/activities/creatTemplate.do",
          {},
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.MurlL = res.data.data;
          for (var i = 0; i < this.MurlL.length; i++) {
            this.srcList.push(this.MurlL[i].tem_img);
          }
        });
    }, // 获取模板
    again() {
      this.reload();
    }, // 继续创建
    extension() {
      this.reload();
      this.$router.push("/home/touf");
    }
  },
  created() {
    this.get();
  }
};
</script>

<style scoped>
.step1 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.step1 > div {
  margin: 10px 50px;
  width: 20%;
  position: relative;
}
.step1Btn {
  display: none;
}
.step1 > div:hover .step1Btn {
  display: block;
}
</style>
