<!--投放广告-->
<template>
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

</script>

<style scoped>

</style>