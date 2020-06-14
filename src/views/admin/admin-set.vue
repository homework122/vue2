<!--  -->
<template>
<div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item>
        <el-input
        v-model="formInline.user"
        placeholder="请输入查询用户名"
        ></el-input>
    </el-form-item>
    <el-form-item>
        <el-button icon="el-icon-search" circle @click="onSubmit"></el-button>
    </el-form-item>
    <el-form-item>
        <el-button
        type="primary"
        icon="el-icon-plus"
        circle
        @click="onAdd"
        ></el-button>
    </el-form-item>
    </el-form>
    <!--        数据显示-->
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    :header-cell-style="tableHeaderColor"
    >
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column prop="user_no" label="ID" width=""> </el-table-column>
    <el-table-column prop="user_name" label="用户昵称" width="">
    </el-table-column>
    <el-table-column prop="user_email" label="邮箱账号" width="">
    </el-table-column>
    <el-table-column prop="user_phone" label="手机号码" width="">
    </el-table-column>
    <el-table-column prop="status" label="状态" width="200">
        <template slot-scope="scope">
        <el-switch
            v-model="scope.row.user_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="changeValue(scope.$index, scope.row)"
        >
        </el-switch>
        </template>
    </el-table-column>
    <el-table-column prop="time" label="创建时间" width=""> </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
        <el-button
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
            icon="el-icon-edit"
            circle
        ></el-button>
        <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="Delete(scope.$index, scope.row)"
        ></el-button>
        </template>
    </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible">
    <el-form ref="uptableData" :model="uptableData">
        <el-form-item label="用户昵称">
        <el-input v-model="uptableData.user_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
        <el-input v-model="uptableData.user_email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
        <el-input v-model="uptableData.user_phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
        <el-input v-model="uptableData.user_pwd"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
        <el-select v-model="uptableData.user_status" placeholder="请选择">
            <el-option value="1"></el-option>
            <el-option value="0"></el-option>
        </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="displayNone">取 消</el-button>
        <el-button type="primary" @click="updata">确 定</el-button>
    </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisibletwo">
    <el-form ref="addtableData" :model="addtableData">
        <el-form-item label="用户昵称">
        <el-input v-model="addtableData.user_name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
        <el-input v-model="addtableData.user_email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
        <el-input v-model="addtableData.user_phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
        <el-input v-model="addtableData.user_pwd"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
        <el-select v-model="addtableData.user_status" placeholder="请选择">
            <el-option value="1"></el-option>
            <el-option value="0"></el-option>
        </el-select>
        </el-form-item>
        <!-- <el-table-column
                            prop="status"
                            label="状态"
                            width="200">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.user_status"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    :active-value="1"
                                    :inactive-value="0"
                                    active-text="启用"
                                    inactive-text="禁用"
                                    @change="changeValue(scope.$index, scope.row)"
                            >
                            </el-switch>
                        </template>
                    </el-table-column> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="displayNoneone">取 消</el-button>
        <el-button type="primary" @click="addTableData">确 定</el-button>
    </div>
    </el-dialog>
    <el-row>
    <el-col :span="6" :offset="8">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        >
        </el-pagination>
    </el-col>
    </el-row>
</div>
</template>

<script>
export default {
data() {
    return {
    tableData: [], //数据表信息
    dialogFormVisible: false, //弹出框属性设置
    dialogFormVisibletwo: false, //弹出框属性设置
    uptableData: {
        //修改表单信息
        user_name: "",
        user_email: "",
        user_phone: "",
        user_status: "",
        user_img: "",
        user_no: "",
        user_pwd: "",
        rememberMe: ""
    },
    page: 1, //页码
    pageSize: 5, //页容量
    total: 0, //总条数
    addtableData: {
        //添加表单信息
        user_name: "",
        user_email: "",
        user_phone: "",
        user_status: "",
        user_img: "",
        user_no: "",
        user_pwd: "",
        rememberMe: ""
    },
    disabled: false, //禁用属性设置
    formInline: {
        //搜索信息获取
        user: ""
    }
    };
},

components: {},

computed: {},
methods: {
    cc() {
    this.$axios
        .post(
        "/api/activities/queryActivities.do",
        {
            sta_no: 3,
            act_name: this.InputSelect,
            page: 1,
            limit: 5
        },
        {
            headers: {
            "Content-Type": "application/json"
            }
        }
        )
        .then(res => {
        console.log(res);
        });
    },

    //表头背景颜色设置
    tableHeaderColor({ rowIndex }) {
    if (rowIndex === 0) {
        return "background-color:lightblue;coloe:#fff";
    }
    },
    //获取用户表信息
    getUserList() {
    console.log("获取数据中");
    this.$axios
        .post(
        "/api/sys/mgr/showAllManeger.do",
        {
            page: this.page,
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
        console.log("信息获取成功");
        this.tableData = res.data.data;
        this.total = res.data.count;
        
        });
    },
    //搜索
    onSubmit() {
    var that = this;
    console.log("搜索中");
    if (this.page != 1) {
        this.page = 1;
        this.$axios
        .post(
            "/api/sys/mgr/showKeyManeger.do",
            {
            userName: this.formInline.user,
            page: this.page,
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
            console.log("搜索成功");
            this.tableData = res.data.data;
            that.$message({
            message: res.data.msg,
            type: "success"
            });
            this.total = res.data.count;
        });
    } else {
        this.$axios
        .post(
            "/api/sys/mgr/showKeyManeger.do",
            {
            userName: this.formInline.user,
            page: this.page,
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
            console.log("搜索成功");
            this.tableData = res.data.data;
            that.$message({
            message: res.data.msg,
            type: "success"
            });
            this.total = res.data.count;
        });
    }
    },
    //添加表单显示
    onAdd() {
    this.dialogFormVisibletwo = true;
    },
    //添加表单隐藏
    displayNoneone() {
    this.dialogFormVisibletwo = false;
    },
    //添加
    addTableData() {
    console.log("获取数据中");
    var that = this;
    this.$axios
        .post("/api/sys/mgr/addMgr.do", {
        rememberMe: this.addtableData.rememberMe,
        user_email: this.addtableData.user_email,
        user_img: this.addtableData.user_img,
        user_name: this.addtableData.user_name,
        user_no: this.addtableData.user_no,
        user_phone: this.addtableData.user_phone,
        user_pwd: this.addtableData.user_pwd,
        user_status: this.addtableData.user_status
        })
        .then(res => {
        that.$message({
            message: res.data.msg,
            type: "success"
        });
        console.log(res);
        console.log("添加成功");
        this.getUserList();
        this.displayNoneone();
        (this.addtableData.rememberMe = ""),
            (this.addtableData.user_email = ""),
            (this.addtableData.user_img = ""),
            (this.addtableData.user_name = ""),
            (this.addtableData.user_no = ""),
            (this.addtableData.user_phone = ""),
            (this.addtableData.user_pwd = ""),
            (this.addtableData.user_status = "");
        });
    },
    //隐藏
    displayNone() {
    this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
    console.log(index, row);
    for (var key in this.uptableData) {
        this.uptableData[key] = row[key];
    }
    console.log(this.uptableData);
    this.row = row;
    this.dialogFormVisible = true;
    },
    // 更新提交
    updata() {
    console.log("获取数据中");
    var that = this;
    this.$axios
        .post(
        "/api/sys/mgr/editMgr.do",
        {
            user_name: this.uptableData.user_name,
            user_email: this.uptableData.user_email,
            user_phone: this.uptableData.user_phone,
            user_status: this.uptableData.user_status,
            user_img: this.uptableData.user_img,
            user_no: this.uptableData.user_no,
            user_pwd: this.uptableData.user_pwd,
            rememberMe: this.uptableData.rememberMe
        },
        {
            headers: {
            "Content-Type": "application/json"
            }
        }
        )
        .then(response => {
        console.log(response);
        this.dialogFormVisible = false;
        this.getUserList();
        that.$message({
            message: response.data.msg,
            type: "success"
        });
        })
        .catch(response => {
        alert("错误：" + response);
        });
    },
    //删除方法
    Delete(o, t) {
    console.log("获取数据中");
    var that = this;
    this.$confirm("删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    })
        .then(() => {
        this.$axios
            .post(
            "/api/member/delete",
            {
                id: t.id
            },
            {
                headers: {
                "Content-Type": "application/json"
                }
            }
            )
            .then(res => {
            this.tableData.splice(t.id, 1);
            that.$message({
                message: res.data.msg,
                type: "success"
            });
            this.total = res.data.count;
            });
        })
        .catch(() => {
        this.$message({
            type: "info",
            message: "已取消删除"
        });
        });
    },

    //滑块
    changeValue(index, row) {
    console.log("获取数据中");
    var that = this;
    console.log(row);
    this.$axios
        .post(
        "/api/sys/mgr/chageMgr.do",
        {
            user_name: row.user_name,
            user_email: row.user_email,
            user_phone: row.user_phone,
            user_status: row.user_status,
            user_img: row.user_img,
            user_no: row.user_no,
            user_pwd: row.user_pwd,
            rememberMe: row.rememberMe
        },
        { headers: { "Content-Type": "application/json" } }
        )
        .then(function(response) {
        console.log(response);
        console.log("修改成功");
        var a = response;
        that.$message({
            message: a.data.msg,
            type: "success"
        });
        })
        .catch(function(err) {
        // 请求失败处理
        console.log(err);
        });
    },
    handleSizeChange(size) {
    this.pageSize = size;
    this.getUserList();
    },
    handleCurrentChange(currentPage) {
    this.page = currentPage;
    this.getUserList();
    }
},
mounted: function() {
    this.getUserList();
}
};
</script>
<style scoped>
div > .el-form:nth-child(1) {
margin: 20px 0;
}
.el-table-column {
background-color: #92b1e8;
}
.el-table {
margin: 20px 0;
}
</style>
