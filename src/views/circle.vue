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
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="isShow">
            创建圈子+
          </el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <el-table
        :header-cell-style="{ background: '#ADD8E6' }"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column label="圈子名称" prop="circle_name"> </el-table-column>
        <el-table-column label="帖子数" prop="circle_postsum">
        </el-table-column>
        <el-table-column label="用户数" prop="circle_clientsum">
        </el-table-column>
        <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <el-button type="primary" size="medium " @click="onxiugai = true"
              >修改
            </el-button>

            <el-button
              size="medium "
              type="danger"
              @click="ondel(scope.$index, scope.row)"
              >删除</el-button
            >
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
      <el-dialog title="发帖" :visible.sync="fatie">
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
                  <el-radio v-model="form.posttypeNo" label="1">话题</el-radio>
                  <el-radio v-model="form.posttypeNo" label="2">商品</el-radio>
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
              <div id="uploadDiv">
                <el-row>
                  <el-col :span="10"
                    ><div class="grid-content bg-purple-dark">
                      <el-upload
                        action="/api/uploadfile.do"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-success="success"
                        :on-remove="handleRemove"
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
          <el-button @click="fatie = false">取 消</el-button>
          <el-button type="primary" @click="sub">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改的弹出框-->

      <el-dialog title="" :visible.sync="onxiugai">
        <el-form :model="formxiugai">
          <el-form-item label="帖子名称" :label-width="formLabelWidth">
            <el-input
              v-model="formxiugai.circle_postsum"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="帖子数" :label-width="formLabelWidth">
            <el-input
              v-model="formxiugai.circle_postsum"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户数" :label-width="formLabelWidth">
            <el-input
              v-model="formxiugai.circle_clientsum"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="onxiugai = false">取 消</el-button>
          <el-button type="primary" @click="onxiugai = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "circle",
  props: {},
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
      circletype: [], //圈子类型

      onxiugai: false,
      formxiugai: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      tableData: [],

      // 分页
      currentPage: 1, //当前页
      pageSize: 5, //条数
      total: 0, //总数

      // 图片上传
      dialogImageUrl: "",
      dialogVisibleImg: false,
      imgUrl: "" //图片上传成功后接收的地址
    };
  },
  methods: {
    /*删除*/
    ondel(index) {
      this.tableData.splice(index, 1);
    },
    // 搜索
    search() {
      console.log("submit!");
    },

    // 显示弹框
    isShow() {
      this.fatie = true;
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
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "创建成功",
              type: "success"
            });
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
          "/api/forum/postShow.do",
          {
            page: this.currentPage,
            pageSize: this.pageSize
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$axios
        .post(
          "/api/forum/postShow.do",
          {
            page: this.currentPage,
            pageSize: this.pageSize
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.count;
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
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res.data);
        this.tableData = res.data.data;
        this.total = res.data.count;
      });

    this.$axios
      .post("/api/forum/cirType.do", {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.circletype = res.data.data;
      });
  }
};
</script>

<style scoped>
#uploadDiv {
  box-sizing: border-box;
  padding-left: 70px;
}
</style>
