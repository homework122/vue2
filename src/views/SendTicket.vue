<!--正在派券-->
<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
                <el-select v-model="formInline.region" placeholder="请选择类型">
                    <el-option label="通用券" value="tongyongquan"></el-option>
                    <el-option label="运费券" value="yunfeiquan"></el-option>
                    <el-option label="单品券" value="danpinquan"></el-option>
                    <el-option label="品类券" value="pinleiquan"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-input
                        v-model="formInline.user" placeholder="优惠券名称"
                        clearable
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button id="sendyouhuiquan" type="primary" @click="dialogFormVisible = true">发布优惠券</el-button>
                <!--发布优惠券的弹出框-->
                <el-dialog title="发布优惠券" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="优惠券类型" :label-width="formLabelWidth">
                            <el-select v-model="form.kind_name" placeholder="请选择活动区域">
                                <el-option label="单品券" value="danpinquan"></el-option>
                                <el-option label="通用券" value="tongyongquan"></el-option>
                                <el-option label="运费券" value="yunfeiquan"></el-option>
                                <el-option label="品类券" value="pinleiquan"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="优惠券名字" :label-width="formLabelWidth">
                            <el-input v-model="form.dis_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="面值" :label-width="formLabelWidth">
                            <el-input v-model="form.dis_val" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="创建时间" :label-width="formLabelWidth">
                            <el-input v-model="form.dis_start" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="有效时间" :label-width="formLabelWidth">
                            <el-input v-model="form.dis_end" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="发放总量" :label-width="formLabelWidth">
                            <el-input v-model="form.dis_count" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="已领取数" :label-width="formLabelWidth">
                            <el-input v-model="form.dis_drwa" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="已使用数" :label-width="formLabelWidth">
                            <el-input v-model="form.dis_use" autocomplete="off"></el-input>
                        </el-form-item>

                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div>
                </el-dialog>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="类型"
                    prop="kind_name">
            </el-table-column>
            <el-table-column
                    label="优惠券名称"
                    prop="dis_name">
            </el-table-column>
            <el-table-column
                    label="面值"
                    prop="dis_val">
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    prop="dis_start">
            </el-table-column>
            <el-table-column
                    label="结束时间"
                    prop="dis_end">
            </el-table-column>
            <el-table-column
                    label="发放总量"
                    prop="dis_count">
            </el-table-column>
            <el-table-column
                    label="已领取数"
                    prop="dis_drwa">
            </el-table-column>
            <el-table-column
                    label="已使用量"
                    prop="dis_use">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="right">

                <template>
                    <el-button type="text" @click="dialogFormVisible2 = true">领取详情

                    </el-button>

                    <el-dialog title="领取详情" :visible.sync="dialogFormVisible2">
                        <el-form :model="form2">
                            <el-form-item label="类型" :label-width="formLabelWidth">
                                <el-input v-model="form2.kind_name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="优惠券名字" :label-width="formLabelWidth">
                                <el-input v-model="form2.dis_name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="面值" :label-width="formLabelWidth">
                                <el-input v-model="form2.dis_val" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="创建时间" :label-width="formLabelWidth">
                                <el-input v-model="form.dis_start" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="有效时间" :label-width="formLabelWidth">
                                <el-input v-model="form2.dis_end" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="发放总量" :label-width="formLabelWidth">
                                <el-input v-model="form.dis_count" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible= false">取 消</el-button>
                            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                        </div>
                    </el-dialog>

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "SendTicket",
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                tableData: [
                    {
                     },
                ],
                search: '',
                dialogFormVisible: false,
                form: {
                    dis_name: '',
                    dis_val: '',
                    kind_name: '',
                    dis_start: '',
                    dis_end: '',
                    dis_count: '',
                    dis_drwa: '',
                    dis_use: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                dialogFormVisible2: false,
                form2: {
                    kind_name: '',
                    dis_val: '',
                    dis_name: '',
                    dis_start: '',
                    dis_end: '',
                    dis_count: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },

            handleEdit(index, row) {
                console.log(index, row);
            },
          /*  onxiangqing(index) {
                console.log(index);
            },*/
            gettableDataList() {
                this.axios.post("/api/discount/selectCouponKind.do",{
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
                ).then(res => {
                    console.log(res);
                    this.tableData = res.data.data;
                    this.total = res.data.count;
                })
            }
        },
        created:function () {
            this.gettableDataList()
        },
    }
</script>

<style scoped>
#sendyouhuiquan{
    margin-right:100px ;
}

</style>