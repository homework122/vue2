<!--广告位管理-->
<template>
    <div>
        <!--搜索-->
        <el-row :gutter="2">
            <el-col :span="3">
                <div class="grid-content bg-purple">
                    <el-input
                            v-model="mypost_titleVal"
                            placeholder="广告位名称"
                    ></el-input>
                </div>
            </el-col>
            <el-col :span="3"
            >
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click="search">搜索</el-button>
                </div>
            </el-col>

        </el-row>

        <!--表格-->
        <el-table
                :header-cell-style="{ background: '#ADD8E6' }"
                :data="tableData"
                style="width: 100%"
        >
            <el-table-column label="广告位名字" prop="ad_name"> </el-table-column>
            <el-table-column label="广告尺寸" prop="ad_size">
            </el-table-column>
            <el-table-column label="所属页面" prop="adver_belong_page"> </el-table-column>
            <el-table-column label="播放方式" prop="ad_piay"> </el-table-column>
            <el-table-column label="在线广告数" prop="ad_online"> </el-table-column>
            <el-table-column label="拍期广告数" prop="ad_description"> </el-table-column>
            <el-table-column label="状态" prop="mypost_megsum">
            </el-table-column>

            <el-table-column label="操作" width="220" align="right">
                <template slot-scope="scope">
                    <el-button
                            type="primary"
                            size="mini "
                            @click="handleEdit(scope.$index, scope.row)"
                    >修改
                    </el-button>
                    <!--修改的弹出框-->
                    <el-dialog id="form" title="" :visible.sync="onxiugai">
                        <el-form :model="formxiugai">
                            <el-form-item label="主题" :label-width="formLabelWidth">
                            </el-form-item>
                            <el-form-item label="广告位名字" :label-width="formLabelWidth">
                                <el-input
                                        style="width: 220px"
                                        v-model="formxiugai.ad_name"
                                        autocomplete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="广告尺寸" :label-width="formLabelWidth">
                                <el-input
                                        style="width: 220px"
                                        v-model="formxiugai.ad_size"
                                        autocomplete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="所属页面" :label-width="formLabelWidth">
                                <el-input
                                        style="width: 220px"
                                        v-model="formxiugai.adver_belong_page"
                                        autocomplete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="播放方式" :label-width="formLabelWidth">
                                <el-input
                                        style="width: 220px"
                                        v-model="formxiugai.ad_piay"
                                        autocomplete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="在线广告数" :label-width="formLabelWidth">
                                <el-input
                                        style="width: 220px"
                                        v-model="formxiugai.ad_online"
                                        autocomplete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="排期广告数" :label-width="formLabelWidth">
                                <el-input
                                        style="width: 220px"
                                        v-model="formxiugai.ad_description"
                                        autocomplete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="状态" :label-width="formLabelWidth">
                                <el-input
                                        style="width: 220px"
                                        v-model="formxiugai.adver_effective"
                                        autocomplete="off"
                                ></el-input>
                            </el-form-item>
                        </el-form>


                        <div slot="footer" class="dialog-footer">
                            <el-button @click="onxiugai = false">取 消</el-button>
                            <el-button type="primary" @click="onxiugai = false"
                            >确 定</el-button
                            >
                        </div>
                    </el-dialog>
                    <el-button
                            style="margin-left: 3px"
                            size="mini "
                            type="danger"
                            @click="goadlist">查看
                    </el-button>
                    <el-button
                            style="margin-left: 3px"
                            size="mini "
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>


                </template>
            </el-table-column>
        </el-table>
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
    </div>
</template>

<script>
    export default {
        name: "adweilist",
        data() {
            return {
                circle_noVal: "",
                mypost_titleVal: "",
                options_1: "",

                // 修改
                onxiugai: false,
                formxiugai: {
                    mypost_title: "",
                    posttype_name: "",
                    ad_name: "" ,
                    ad_piay:"",
                    adver_belong_page:"",
                    ad_online:"",
                    ad_description:"",
                    ad_size:"",

                },
                formLabelWidth: "120px",
                tableData: [],
                // 分页
                currentPage: 1,
                pageSize: 5,
                total: 0,

                // 图片
                dialogImageUrl: "",
                ImgdialogVisible: false
            };
        },
        methods: {
            //跳转到adlist页面
            goadlist(){
                this.$router.push({
                    path: "/home/adlist",
                });
            },
            /*删除*/
            handleDelete(index, row) {
                this.$axios
                    .post(
                        "/api/ad/deleteAdverByAdverNo.do",
                        {
                            mypost_no: row.mypost_no
                        },
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }
                    )
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message(res.data.msg);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 搜索
            search() {
                this.$axios
                    .post(
                        "/api/ad/queryAdverAll.do",
                        {
                            mypost_title: this.mypost_titleVal,
                            circle_no: this.circle_noVal,
                            page: 1,
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

            onSubmit() {
                console.log("submit!");
            },

            // 修改
            handleEdit(index, row) {
                this.onxiugai = true;
                console.log(row);
                for (var key in this.formxiugai) {
                    this.formxiugai[key] = row[key];
                }
            },
            dialogFormVisible() {
                console.log("11");
            },
            // 分页
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                this.$axios
                    .post(
                        "/api/forum/postShow.do",
                        {
                            Page: this.currentPage,
                            Pagesize: this.pageSize
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
                        "/api/ad/queryAd.do",
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





        },
        mounted() {
            this.$axios
                .post(
                    "/api/ad/queryAd.do",
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
                    console.log(res);
                    this.tableData = res.data.data;
                    this.total = res.data.count;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
</script>

<style scoped>
    #form .el-form-item__content .el-select {
        left: -300px;
    }
    #form .el-form-item .el-input {
        left: -300px;
    }

    #imgdiv {
        position: absolute;
        right: 60px;
        top: 60px;
    }
</style>