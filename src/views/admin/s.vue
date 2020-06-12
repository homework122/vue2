<!--  -->
<template>
    <div>
    <el-table
    ref="tableData"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    >
    <el-table-column
    prop="smgr_time1"
    label="开始时间"
    width="">
    </el-table-column>
    <el-table-column
    prop="smgr_time2"
    label="结束时间"
    width="">
    </el-table-column>
    <el-table-column
    prop="smgr_housecall"
    label="仓库电话"
    width="">
    </el-table-column>
    <el-table-column
    prop="smgr_houseaddr"
    label="仓库地址"
    width="">
    </el-table-column>
    <el-table-column
            fixed="right"
            label="操作"
            width="120">
        <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index,scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
        </template>
    </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form :model="uptableData">
        <el-form-item label="开始时间" :label-width="formLabelWidth">
        <el-select v-model="uptableData.smgr_time1" placeholder="请选择">
            <el-option label="08:00:00" value="08:00:00"></el-option>
            <el-option label="08:30:00" value="08:30:00"></el-option>
            <el-option label="09:00:00" value="09:00:00"></el-option>
        </el-select>
        结束时间
        <el-select v-model="uptableData.smgr_time2" placeholder="请选择">
            <el-option label="22:00:00" value="22:00:00"></el-option>
            <el-option label="22:30:00" value="22:30:00"></el-option>
            <el-option label="23:00:00" value="23:00:00"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="送达时间" :label-width="formLabelWidth">
        <el-select v-model="uptableData.smgr_arrive1" placeholder="请选择">
            <el-option label="24" value="24"></el-option>
            <el-option label="48" value="48"></el-option>
            <el-option label="72" value="72"></el-option>
        </el-select>
        即时配送
        <el-select v-model="uptableData.smgr_arrive2" placeholder="请选择">
            <el-option label="0.5" value="0.5"></el-option>
            <el-option label="1" value="1"></el-option>
            <el-option label="1.5" value="1.5"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="仓库电话">
        <el-input v-model="uptableData.smgr_housecall" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址">
        <el-input v-model="uptableData.smgr_houseaddr" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updata">确 定</el-button>
    </div>
    </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
        tableData:[],
        uptableData:[],
        
        dialogFormVisible: false,
        form:[],
        formLabelWidth: '120px'
        };
    },

    components: {},

    computed: {},

    mounted:function () {
        this.getStoreList()
    },

    methods: {
        getStoreList(){
        console.log("获取信息中")
        this.$axios.post("/api/sys/showSendMgr.do",{
            page:1,pageSize:5
        },{
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(res =>{
            console.log(res)
            console.log("信息获取成功")
            this.tableData=res.data.data
            // console.log(this.tableData)
            // console.log(this.tableDataTwo)
        })
        },
        displayNone(){
            this.dialogFormVisible=false
        },
        handleEdit(index, row) {
                this.uptableData=row
                console.log(this.uptableData)
                console.log(this.uptableData+"这是修改后的表单")
                this.dialogFormVisible=true
                console.log(this.uptableData.smgr_time2)
        },
        updata(){
                console.log('获取数据中')
                var that =this
                this.$axios.post("/api/sys/saveSendMgr.do",{
                    smgr_arrive1:this.uptableData.smgr_arrive1 ,
                    smgr_arrive2: this.uptableData.smgr_arrive2, 
                    smgr_houseaddr: this.uptableData.smgr_houseaddr,
                    smgr_housecall: this.uptableData.smgr_housecall,
                    smgr_no:this.uptableData.smgr_no,
                    smgr_time1:this.uptableData.smgr_time1,
                    smgr_time2:this.uptableData.smgr_time2,
                    
                },{
                    headers: {
                "Content-Type": "application/json"
            }
                }).then((response) => {
                    this.getStoreList()
                    console.log(response)
                    this.dialogFormVisible=false
                    that.$message({
                        message:response.data.msg,
                        type: 'success'
            })
        })
            }
    }
}

</script>
<style  scoped>
</style>