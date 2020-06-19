<!--    圈子管理-->
<template>
  <div>
    <div>
      <!--搜索和发帖-->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.circleName" placeholder="圈子名称">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="search"
            >搜索</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="isShow">
            创建圈子+
          </el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <el-table
        :header-cell-style="{background:'#96C9FF',color:'#606266'  }"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column label="圈子名称" prop="circle_name"> </el-table-column>
        <el-table-column label="帖子数" prop="mypostsum"> </el-table-column>
        <el-table-column label="用户数" prop="clientsum"> </el-table-column>
        <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="showUpdata(scope.$index, scope.row)"
              >修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--        分页-->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <!--创建圈子弹出框-->
      <el-dialog title="创建圈子" :visible.sync="fatie">
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form :model="form">
                <el-form-item label="圈子名称" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.circleName"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="圈子分类" :label-width="formLabelWidth">
                  <el-select v-model="form.circletypeNo" placeholder="请选择">
                    <el-option
                      v-for="item in circletype"
                      :key="item.circletype_no"
                      :label="item.circletype_name"
                      :value="item.circletype_no"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="发帖类型" :label-width="formLabelWidth">
                  <el-radio-group v-model="form.posttypeNo">
                    <el-radio :label="0">话题</el-radio>
                    <el-radio :label="1">商品</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="圈子简介" :label-width="formLabelWidth">
                  <textarea
                    v-model="form.circleIntro"
                    style="width: 195px;height: 100px"
                  ></textarea>
                </el-form-item>
              </el-form></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <el-tag
                style="margin-left: 70px; margin-bottom: 10px;cursor: pointer"
                @click="addImg"
                >上传图片</el-tag
              >
              <div class="uploadDiv">
                <el-row>
                  <el-col :span="10"
                    ><div class="grid-content bg-purple-dark">
                      <el-upload
                        ref="my-upload"
                        action="/api/uploadfile.do"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-success="success"
                        :on-remove="handleRemove"
                        :auto-upload="false"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisibleImg">
                        <img width="100%" :src="dialogImageUrl" alt="" />
                      </el-dialog></div
                  ></el-col>
                </el-row>
              </div></div
          ></el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelsEV">取 消</el-button>
          <el-button type="primary" @click="sub">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改的弹出框-->

      <el-dialog title="" :visible.sync="isupdatashow">
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form :model="updataForm">
                <el-form-item label="圈子名称" :label-width="formLabelWidth">
                  <el-input
                    v-model="updataForm.circle_name"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="圈子分类" :label-width="formLabelWidth">
                  <el-select
                    v-model="circletype_no"
                    :placeholder="updataForm.circletype_name"
                  >
                    <el-option
                      v-for="item in circletype"
                      :key="item.circletype_no"
                      :label="item.circletype_name"
                      :value="item.circletype_no"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="发帖类型" :label-width="formLabelWidth">
                  <el-radio-group v-model="updataForm.posttype_no">
                    <el-radio :label="0">话题</el-radio>
                    <el-radio :label="1">商品</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="圈子简介" :label-width="formLabelWidth">
                  <textarea
                    v-model="updataForm.circle_intro"
                    style="width: 195px;height: 100px"
                  ></textarea>
                </el-form-item>
              </el-form></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">
              <div class="updiv" v-if="upshow">
                <el-tag
                  style="margin-left: 70px; margin-bottom: 10px;cursor: pointer"
                  @click="recanted"
                  >撤销</el-tag
                >
                <div class="uploadDiv">
                  <el-row>
                    <el-col :span="10"
                      ><div class="grid-content bg-purple-dark">
                        <el-upload
                          ref="upload"
                          action="/api/uploadfile.do"
                          list-type="picture-card"
                          :on-preview="handlePictureCardPreview"
                          :on-success="success"
                          :on-remove="handleRemove"
                          :auto-upload="false"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload></div
                    ></el-col>
                  </el-row>
                </div>
                <div style="margin:20px 0 0 70px ">
                  <el-button type="info" @click="shangEv">上传图片</el-button>
                </div>
              </div>

              <div class="imgdiv" v-if="imgshow" @click="displayImg">
                <p>点击图片切换</p>
                <el-image :src="updataImgUrl" style="width: 200px"></el-image>
              </div>
            </div>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="(isupdatashow = false), (circletype_no = '')"
            >取 消</el-button
          >
          <el-button type="primary" @click="alter">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "circle",
  props: {},
  inject: ["reload"],
  data() {
    return {
      // 搜索
      formInline: {
        circleName: ""
      },

      // 创建圈子弹出框显示隐藏
      fatie: false,
      // 创建圈子
      form: {
        circleName: "", //圈子名称
        posttypeNo: "", //帖子编号
        circleIntro: "", //圈子简介
        circletypeNo: "" //圈子类型编号
      },

      // 创建圈子取消按钮

      circletype: [], //圈子类型

      //修改
      isupdatashow: false,
      updataForm: {
        circle_name: "", //圈子名称
        posttype_no: "", //帖子类型编号
        circle_intro: "", //圈子简介
        circletype_name: "" //圈子类型名称
      },
      circletype_no: "", //圈子类型id
      formLabelWidth: "120px",
      tableData: [],

      // 分页
      currentPage: 1, //当前页
      pageSize: 5, //条数
      total: 0, //总数

      // 图片上传
      dialogImageUrl: "",
      dialogVisibleImg: false,
      imgUrl: "", //图片上传成功后接收的地址

      updataImgUrl: "", // 修改图片地址

      upshow: false,
      imgshow: true
    };
  },
  methods: {
    // 搜索
    search() {
      this.$axios
        .post(
          "/api/forum/cirSearch.do",
          {
            circle_name: this.formInline.circleName
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
    },

    cancelsEV() {
      for (var key in this.form) {
        this.form[key] = " ";
      }
      this.$refs["my-upload"].clearFiles();
      this.fatie = false;
    },

    // 显示添加弹框
    isShow() {
      this.fatie = true;
    },
    // 创建圈子图片上传
    addImg() {
      this.$refs["my-upload"].submit();
    },
    // 保存提交
    sub() {
      this.fatie = false;

      this.$axios
        .post(
          "/api//forum/cirEsta.do",
          {
            circle_name: this.form.circleName,
            circletype_no: this.form.circletypeNo,
            posttype_no: this.form.posttypeNo,
            circle_intro: this.form.circleIntro,
            circle_img: this.imgUrl
            // form: {
            //   circleName: "", //圈子名称
            //   posttypeNo: "", //帖子编号
            //   circleIntro: "", //圈子简介
            //   circletypeNo: "" //圈子类型编号
            // },
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "创建成功",
              type: "success"
            });

            this.imgUrl = "";
            this.reload();
          }
        });
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    dialogFormVisible() {
      console.log("11");
    },
    // 上传图片成功
    success(response) {
      this.imgUrl = "";
      console.log(response);
      this.imgUrl = response.newfilepath;
    },
    // 图片移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleImg = true;
    },

    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.$axios
        .post(
          "/api/forum/cirMagShow.do",
          {
            page: this.currentPage,
            pageSize: this.pageSize
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          for (var i = 0; i < res.data.data.length; i++) {
            if (parseInt(res.data.data[i].mypostsum) > 0) {
              this.tableData.push(res.data.data[i]);
              this.total++;
            }
          }
          // this.tableData = res.data.data;
          // this.total = res.data.count;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$axios
        .post(
          "/api/forum/cirMagShow.do",
          {
            page: this.currentPage,
            pageSize: this.pageSize
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          // console.log(res.data);
          for (var i = 0; i < res.data.data.length; i++) {
            if (parseInt(res.data.data[i].mypostsum) > 0) {
              this.tableData.push(res.data.data[i]);
              this.total++;
            }
          }
          // this.tableData = res.data.data;
          // this.total = res.data.count;
        });
    },

    // 修改
    // 添加上传按钮
    shangEv() {
      this.$refs.upload.submit();
    },
    // 撤销
    recanted() {
      this.upshow = false;
      this.imgshow = true;
    },

    displayImg() {
      this.upshow = true;
      this.imgshow = false;
    },
    showUpdata(index, row) {
      console.log(row);
      this.upshow = false;
      this.imgshow = true;
      for (var key in this.updataForm) {
        this.updataForm[key] = row[key];
      }
      this.isupdatashow = true;
      this.updataImgUrl = row.circle_img;
      // 通过类型名称获取类型id
      for (var i = 0; i < this.circletype.length; i++) {
        if (
          this.updataForm.circletype_name == this.circletype[i].circletype_name
        ) {
          this.circletype_no = this.circletype[i].circletype_no;
        }
      }
    },

    // 提交修改信息
    alter() {
      if (this.imgUrl.trim() == "") {
        this.imgUrl = this.updataImgUrl;
      }
      console.log(this.circletype_no);

      this.isupdatashow = false;
      this.$axios
        .post(
          "/api/forum/cirEsta.do",
          {
            circle_name: this.updataForm.circle_name,
            circletype_no: this.circletype_no,
            posttype_no: this.updataForm.posttype_no,
            circle_intro: this.updataForm.circle_intro,
            circle_img: this.imgUrl

            // updataForm: {
            //   circle_name: "", //圈子名称
            //   posttype_no: "", //帖子类型编号
            //   circle_intro: "", //圈子简介
            //   circletype_name: ""
            // },
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.reload();
          }
        });
    }
  },
  created: function() {
    this.$axios
      .post(
        "/api/forum/cirMagShow.do",
        {
          pageSize: this.pageSize,
          page: this.currentPage
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token")
          }
        }
      )
      .then(res => {
        for (var i = 0; i < res.data.data.length; i++) {
          if (parseInt(res.data.data[i].mypostsum) > 0) {
            this.tableData.push(res.data.data[i]);
            this.total++;
          }
        }

        // this.tableData = res.data.data;
        // this.total = res.data.count;
      });

    this.$axios
      .post("/api/forum/cirType.do", {
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token")
        }
      })
      .then(res => {
        this.circletype = res.data.data;
      });
  }
};
</script>

<style scoped>
.uploadDiv {
  box-sizing: border-box;
  padding-left: 70px;
  width: 265px;
  height: 150px;
  overflow: hidden;
}
.imgdiv {
  margin-left: 70px;
}
</style>
