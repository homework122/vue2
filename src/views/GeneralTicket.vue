<!--这个是发布优惠券**通用券-->
<template>
   <div class="tongyong">
       <el-row >
           <el-col :span="2">通用券名称：</el-col>
           <el-col :span="4">
               <el-input
                       placeholder="请输入优惠券名称"
                       v-model="input1"
                       clearable>
               </el-input>
           </el-col>
       </el-row>
       <br>
       <el-row>
           <el-col :span="2">面值</el-col>
           <el-col :span="4">
               <el-input
                       placeholder="请输入面值应为1~99之间的整数"
                       v-model="input2"
                       clearable>
               </el-input>
           </el-col>
           <el-col :span="2">元</el-col>
       </el-row>
       <br>
       <el-row>
           <el-col :span="2">发放总量</el-col>
           <el-col :span="4">
               <el-input
                       placeholder="发放总量应为1~9999之间的整数"
                       v-model="input3"
                       clearable>
               </el-input>
           </el-col>
           <el-col :span="2">张</el-col>
       </el-row>
       <br>
       <el-row>
           <el-col :span="2">使用条件</el-col>
           <el-col :span="1">订单满</el-col>
           <el-col :span="4">
               <el-input
                       placeholder="不填则默认为0"
                       v-model="input4"
                       clearable>
               </el-input>
           </el-col>
           <el-col :span="2">元可使用</el-col>
       </el-row>
       <br>
       <el-row>
           <el-col :span="2">有效期:</el-col>
           <el-col :span="10">
               <div class="block">
                   <el-date-picker
                           v-model="value1"
                           type="datetimerange"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           :default-time="['12:00:00']">
                   </el-date-picker>
               </div>
           </el-col>

       </el-row>
       <br>

       <el-row>
           <el-col :span="2">
               选择商品
           </el-col>
           <el-col :span="12">
               <el-button type="primary" @click="show" >选择商品</el-button>
               <el-table
                       :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                       style="width: 100%">
                   <el-table-column
                           prop="com_imgs"
                           label="图片"
                           width="150">
                       <template slot-scope="scope">
                           <el-image style="width: 100px;height: 100px" :src="scope.row.com_imgs"></el-image>
                       </template>
                   </el-table-column>
                   <el-table-column
                           label="商品分类"
                           prop="comc_name">
                   </el-table-column>
                   <el-table-column
                           label="商品单格"
                           prop="com_price"
                   >
                   </el-table-column>
                   <el-table-column
                           label="总库存"
                           prop="com_stock"
                   >
                   </el-table-column>
                   <el-table-column
                           align="right"
                           label="编辑"
                           prop="AllInventory"
                   >
                       <template>
                           <el-button
                                   size="medium"
                                   type="danger"
                                   @click="ondel(index)">移除
                           </el-button>
                       </template>
                   </el-table-column>
               </el-table>
           </el-col>
       </el-row>
       <br>
        <el-row>
            <el-col :span="4">
                <el-button type="primary">发布</el-button>
            </el-col>
            <el-col :span="6">
                <el-button type="info">返回</el-button>
            </el-col>
        </el-row>
       <div id="tanChuKuang" v-show="form.show">
           <el-form ref="form" :model="form" label-width="100px" id="tanChuKuang-from">
               <el-form-item label="商品图片" >
                   <el-input v-model="form.com_imgs"></el-input>
               </el-form-item>
               <el-form-item label="商品名字" >
                   <el-input type="textarea" v-model="form.comc_name"></el-input>
               </el-form-item>
               <el-form-item label="商品价格" >
                   <el-input type="textarea" v-model="form.com_price"></el-input>
               </el-form-item>
               <el-form-item label="总库存" >
                   <el-input type="textarea" v-model="form.com_stock"></el-input>
               </el-form-item>
              <!-- <el-form-item label="状态" v-show="form.showStatus">
                   <el-switch v-model="form.status"></el-switch>
               </el-form-item>-->
               <el-form-item>
                   <el-button type="primary" @click="onSubmit()">确定</el-button>
                   <el-button @click="hid">取消</el-button>
               </el-form-item>
           </el-form>
       </div>
   </div>
</template>

<script>
    export default {
        name: "GeneralTicket",
        data() {
            return {
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                value1: '',
                search: '',
                tableData: [
                    {   com_imgs:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2008226404,3147945130&fm=26&gp=0.jpg',
                        comc_name: '桃子',
                        com_price: '50',
                        com_stock: '600'
                },
                    {   com_imgs:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2627773914,3421626523&fm=26&gp=0.jpg',
                        comc_name: '葡萄',
                        com_price: '100',
                        com_stock: '500'
                },
                    { com_imgs:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=206532381,1737578614&fm=26&gp=0.jpg",
                        comc_name: '西瓜',
                        com_price: '90',
                        com_stock: '600'
                },
                    { com_imgs:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1095835747,121715261&fm=26&gp=0.jpg",
                        comc_name: '香梨',
                        com_price: '80',
                        com_stock: '400'
                }
                ],
                form:{
                    index:-1,
                 /*   showStatus:true,*/
                    show:false,
                    com_imgs:'',
                    comc_name:'',
                    com_price:'',
                    com_stock:'',
                 /*   status:true*/
                },
            }


        },
        methods: {
            /*删除*/
            ondel(index) {
                //点击删除后，将删除数据的下标传入，进行删除
                this.tableData.splice(index, 1);
            },
            /*显示*/
            show(){
             /*   this.form.showStatus = false;*/
                this.form.show = true;
                this.form.index = -1
            },
            //隐藏弹出框
            hid(){
                this.form.show = false;
                this.form.com_imgs = '';
                this.form.com_price = '';
                this.form.comc_name= '';
                this.form.com_stock='';
             /*   this.form.status = true*/
            },
            // 添加
            onAdd(){
                var obj = {
                    mycatImg:this.form.com_imgs,
                    mycatName:this.form.comc_name,
                    mycatPrice:this.form.com_price,
                    mycatStock:this.form.com_stock,
                };
                this.$axios.post("/api/category/add",{"mycatImg":obj.com_imgs,"mycatName":obj.comc_name}).then((response)=>{
                    alert(response.data.msg)
                })
            },
            /*确定*/
            onSubmit(){
                if (this.form.index == -1) {
                    this.onAdd();
                }else {
                  /*  let myStatus;*/
                   /* if (this.form.status) {
                        myStatus = 1
                    }else {
                        myStatus = 0
                    }*/
                    var obj = {
                    /*    id:this.tableData[this.form.index].id,*/
                        img:this.form.com_imgs,
                        name:this.form.comc_name,
                     /*   status:myStatus*/
                    };
                    this.$axios.post("/api/category/edit",{"mycatImg":obj.img,"comc_name": obj.name}).then((response)=>{
                        alert(response.data.msg)
                    })
                }
                this.funCategoryList();
                this.hid()
            },

            funCategoryList:function () {
                this.$axios.post("/api/category/list",{"catName": this.searchCategory.name,"page": 1,"pageSize": 10}).then((response)=>{
                    console.log(response.data.data.list);
                    this.categoryList = response.data.data.list
                })
            },
        },
    }
</script>

<style scoped>
    .el-row {

    }
    .el-col {
        border-radius: 4px;
    }
.tongyong{
    margin-left: 100px;
}
</style>