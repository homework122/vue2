<!--广告列表-->
<template>
    <div>
        <!--搜索-->
        <el-row :gutter="2">
            <el-col :span="3">
                <div class="grid-content bg-purple">
                <el-input
                        v-model="mypost_titleVal"
                        placeholder="广告名称"
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
            <el-table-column label="广告名字" prop="adver_name"> </el-table-column>
            <el-table-column label="广告链接" prop="adver_link">
            </el-table-column>
            <el-table-column label="归属广告位" prop="adver_belong_page"> </el-table-column>
            <el-table-column label="有效日期" prop="adver_startime"> </el-table-column>
            <el-table-column label="点击数" prop="adver_hits"> </el-table-column>
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
                            <el-form-item label="广告名字" :label-width="formLabelWidth">
                                <el-input
                                        style="width: 220px"
                                        v-model="formxiugai.adver_name"
                                        autocomplete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="广告链接" :label-width="formLabelWidth">
                                <el-input
                                        style="width: 220px"
                                        v-model="formxiugai.adver_link"
                                        autocomplete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="归属广告位" :label-width="formLabelWidth">
                                <el-input
                                        style="width: 220px"
                                        v-model="formxiugai.adver_belong_page"
                                        autocomplete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="有效日期" :label-width="formLabelWidth">
                            <el-input
                                    style="width: 220px"
                                    v-model="formxiugai.adver_endtime"
                                    autocomplete="off"
                            ></el-input>
                        </el-form-item>
                            <el-form-item label="点击数" :label-width="formLabelWidth">
                                <el-input
                                        style="width: 220px"
                                        v-model="formxiugai.adver_hits"
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
                            @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                    >

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
        name: "adlist",
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
                    adver_name: "" ,
                    adver_link:"",
                    adver_belong_page:"",
                    adver_endtime:"",
                    adver_hits:"",
                    adver_effective:"",

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
            /*删除*/
            handleDelete(index, row) {
                this.$axios
                    .post(
                        "/api/ad/deleteByAdverStatus.do",
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
                        "/api/ad/queryAdvertisingByAd.do",
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
                        "/api/ad/queryAdvertisingByAd.do",
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




            // 跳转到详情页
            detailEvent(index, row) {
                console.log(index, row);

                this.$router.push({
                    path: "/home/Tiezguanli/PostDetails",
                    query: { mypostNo: row.mypost_no }
                });
            }
        },
        mounted() {
            this.$axios
                .post(
                    "/api/ad/queryAdByBelong.do",
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
