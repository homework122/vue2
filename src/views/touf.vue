<!--投放广告-->
<template>
<<<<<<< HEAD
  <div>
    <p>广告物料</p>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="广告名称" prop="adver_name">
        <el-col :span="6">
          <el-input v-model="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="广告链接" prop="adver_link">
        <el-button type="primary" @click="open">添加链接</el-button>
      </el-form-item>
      <el-form-item label="活动时间" required prop="adver_startime">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="广告图片" prop="adver_image">
        <el-upload
          action="/api/uploadfile.do"
          auto-upload
          list-type="picture-card"
          :on-success="success"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >投放</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "touf",
  data() {
    return {
      value1: "",
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    success(response) {
      console.log(response);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    open() {
      this.$prompt("请输入链接地址", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "链接格式不正确"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的链接地址是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    gettableDataList() {
      this.$axios
        .post(
          "/api/ad/addAd",
          {
            // dis_status:0,
            // page:1,
            // pagesize:5
            /* token*/
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.total = res.data.count;
        });
    }
  },
  created: function() {
    this.gettableDataList();
  }
};
=======
    <div>
        <p>广告物料</p>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="广告名称" >
                <el-col :span="6">
                    <el-input v-model="form.name"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="广告链接" >
                <el-col :span="6">
                    <el-input v-model="form.adver_link"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="活动时间" required >
                <div class="block">
                    <el-date-picker
                            v-model="form.timer"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="广告图片"  >
                <el-upload
                        action="/api/uploadfile.do"
                        auto-upload
                        list-type="picture-card"
                        :on-success="success"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">投放</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "touf",
        data() {
            return {
                value1: '',
                dialogImageUrl: '',
                dialogVisible: false,
             form:{
                 name:'',
                 adver_link:'',
                 timer:'',
             },

                imgUrl:'',
            };
        },
        methods: {
            success(response) {
                console.log(response.newfilepath);
                this.imgUrl = response.newfilepath

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/ad/addAd', {
                                adver_belong_page: 1, /* 起始页*/
                                adver_name: this.form.name, /* 广告名字*/
                                adver_link: this.form.adver_link, /* 广告链接*/
                                adver_startime: this.form.timer[0], /* 开始时间*/
                                adver_endtime: this.form.timer[1], /* 结束时间*/
                                adver_image: this.imgUrl, /* 图片*/
                                adver_effective: 1, /* 广告是否生效*/
                                adver_status: 1,
                            },
                            {
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }
                        )
                            .then(res => {
                                console.log(res);
                                this.tableData = res.data.data;
                                this.total = res.data.count;
                            });
                    }

        })
    },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
        },

        created: function() {
            this.gettableDataList();
        }
    }

>>>>>>> 58926426cc99dfad9933432d83e739d0d32bc3b9
</script>

<style scoped></style>
