<template>
  <div>
    <!--分类新增弹出框-->
    <el-dialog title="商品分类" :visible.sync="dialogTable" width="50%">
      <el-row>
        <el-col :span="15">
          <div class="grid-content bg-purple">
            上级分类名称：
            <template>
              <el-select v-model="val" clearable placeholder="上级分类名称">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
            <div>
              分类名称：
              <el-input
                placeholder="分类名称"
                v-model="comc_name"
                clearable
                class="width"
              ></el-input>
            </div>
            <div class="center">
              <p>分类描述：</p>
              <textarea
                name="maosu"
                id=""
                cols="30"
                rows="10"
                v-model="comc_desc"
                placeholder="分类描述"
              ></textarea>
              <!--<el-input type="textarea" v-model="maosu"  placeholder="分类描述"></el-input>-->
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <!--上传图片-->
            <el-upload
              class="avatar-uploader"
              action=" http://localhost:8081/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTable = delet">取 消</el-button>
        <el-button type="primary" @click="determine">确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "fenleixinzeng",
  data() {
    return {
      // 图片上传
      imageUrl: "",
      val: "",
      options: [
        {
          value: 1,
          label: "黄金糕"
        },
        {
          value: 2,
          label: "双皮奶"
        },
        {
          value: 3,
          label: "蚵仔煎"
        },
        {
          value: 4,
          label: "龙须面"
        },
        {
          value: 5,
          label: "北京烤鸭"
        }
      ],
      // 新增商品分类
      dialogTable: false,
      a: ""
    };
  },
  methods: {
    // 新增提交
    determine() {
      // this.dialogTable=false
    },
    //新增分类
    newClassification() {
      this.a = 0;
      // this.dialogTable=true
    },
    delet() {
      // 下面的语句配合开头写的 .sync 就会更新父组件中的 panelShow 变量
      this.dialogTable = this.$emit("update:panelShow", false); //弹框隐藏，意为panelShow为false
    }
  }
};
</script>

<style scoped></style>
