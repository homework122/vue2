<template>
  <div class="DeliveryFees">
    <!--搜索-->
    <div id="searchBox">
      <div>
        <el-input
                placeholder="配送费模板"
                v-model="nameSearch"
                clearable
                autofocus >
        </el-input>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </div>
      <!--添加配送费模板-->
      <div>
        <!--<el-button @click="toAdd" type="primary"><i class="el-icon-plus"></i>创建配送费模板</el-button>-->
        <el-button type="primary" @click="dialogFormVisible = true"><i class="el-icon-plus"></i>创建配送费模板</el-button>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="100%" lock-scroll="false">
          <el-form :model="form">
            <el-form-item label="模板名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="结算方式" :label-width="formLabelWidth">
              <el-radio v-model="radioPay" label="1">普通结算</el-radio>
              <el-radio v-model="radioPay" label="2">模板独立订单结算</el-radio>
              <p>使用独立结算模板商品，提交订单时系统自动将所有属于该模板商品归于一个订单结算，不和普通结算商品一起结算。</p>
            </el-form-item>
            <el-form-item label="是否包邮" :label-width="formLabelWidth">
              <el-radio v-model="radioYou" label="1">自定义配送费</el-radio>
              <el-radio v-model="radioYou" label="2">卖家承担配送费</el-radio>
            </el-form-item>
            <el-form-item label="计价方式" :label-width="formLabelWidth">
              <el-radio v-model="radioPrice" label="1">按件数</el-radio>
              <el-radio v-model="radioPrice" label="2">按重量</el-radio>
            </el-form-item>
            <el-form-item label="配送方式" :label-width="formLabelWidth">
              <el-checkbox-group v-model="checkSendList">
                <el-checkbox label="同城配送"></el-checkbox>
                <template>
                  <!--同城配送默认运费-->
                  <el-row>
                    <div class="sendWay">
                      <el-form-item label="默认运费:" :label-width="formLabelWidth" class="defaultF">
                        <el-input v-model="form.name" autocomplete="off"></el-input><span>件</span>
                      </el-form-item>
                      <el-form-item label="" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input><span>元</span>
                      </el-form-item>
                      <el-form-item label="每增加" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input><span></span>件
                      </el-form-item>
                      <el-form-item label="增加运费" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>元
                      </el-form-item>
                    </div>
                  </el-row>
                  <!--配送规则-->
                  <el-row>
                    <el-table
                            :data="tableCitySend"
                            border
                            style="width: 100%">
                      <el-table-column
                              prop="destination"
                              label="配送到"
                              width="180">
                        <template >
                          <el-input v-model="scope.row.destination"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                              prop="firstWeight"
                              label="首重/kg"
                              width="180">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.firstWeight"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                              prop="firstJian"
                              label="首件"
                              width="180">
                        <template >
                          <el-input v-model="scope.row.firstJian"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                              prop="firstFee"
                              label="运费(元)"
                              width="180">
                        <template >
                          <el-input v-model="scope.row.firstFee"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                              prop="renew"
                              label="续件(元)"
                              width="180">
                        <template >
                          <el-input v-model="scope.row.renew"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                              prop="renewFee"
                              label="续费(元)"
                              width="180">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.renewFee"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                              label="操作">
                        <template >
                            <span>删除</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-row>
                </template>
                <el-checkbox label="快递物流"></el-checkbox>
                <el-checkbox label="指定条件包邮"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
    <!--配送费-->
    <div id="sendFees">
      <el-row v-for="item in rowData" :key="item.distt_name">
        <!--表头-->
        <div class="bg-sendTable-head">
          <!--左边配送名称-->
          <div>{{item.distt_name}}</div>
          <!--右边编辑-->
          <div>
            <!--编辑时间-->
            <div class="lastTime">最后编辑时间:{{item.lastEditTime}}</div>
            <!--操作-->
            <div class="sendOper"><span @click="updateSend">修改</span><span @click="delSend()">删除</span></div>
          </div>
        </div>
        <!--表身-->
          <el-table
                  :data="item.dispms"
                  style="width: 100%">
            <el-table-column
                    prop="sendWay"
                    label="配送方式"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="dispm_firfre"
                    label="配送区域"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="dispm_defpie"
                    label="首件（个）"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="dispm_deffre"
                    label="配送费（元）">
            </el-table-column>
            <el-table-column
                    prop="dispm_renew"
                    label="续件（个）">
            </el-table-column>
            <el-table-column
                    prop="dispm_use"
                    label="额外配送费（元）">
            </el-table-column>
          </el-table>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DeliveryFees",
    data(){
      return{
        nameSearch:'',
        rowData:[
            {
          moduleName:'jjj',//模板名称
          lastEditTime:'2016-04-16',//最后编辑信息
          sendInfo:[{
            sendWay:'同城配送',//配送方式
            sendArea:'南山，宝安，罗湖',//配送区域
            firstJian:1,//首件
            deliveryFee:8,//收件运送费
            continueJian:1,//续件
            continueSend:1,//续件配送费
          },
            {
              sendWay:'快递物流',//配送方式
              sendArea:'全国',//配送区域
              firstJian:1,//首件
              deliveryFee:8,//收件运送费
              continueJian:1,//续件
              continueSend:1,//续件配送费
            }],
        },
          {
            moduleName:'哈哈哈',//模板名称
            lastEditTime:'2016-04-16',//最后编辑信息
            sendInfo:[{
              sendWay:'同城配送',//配送方式
              sendArea:'南山，宝安，罗湖',//配送区域
              firstJian:1,//首件
              deliveryFee:8,//收件运送费
              continueJian:1,//续件
              continueSend:1,//续件配送费
            },
              {
                sendWay:'快递物流',//配送方式
                sendArea:'全国',//配送区域
                firstJian:1,//首件
                deliveryFee:8,//收件运送费
                continueJian:1,//续件
                continueSend:1,//续件配送费
              }],
          },
          {
            moduleName:'哥哥哥',//模板名称
            lastEditTime:'2016-04-16',//最后编辑信息
            sendInfo:[{
              sendWay:'同城配送',//配送方式
              sendArea:'南山，宝安，罗湖',//配送区域
              firstJian:1,//首件
              deliveryFee:8,//收件运送费
              continueJian:1,//续件
              continueSend:1,//续件配送费
            },
              {
                sendWay:'快递物流',//配送方式
                sendArea:'全国',//配送区域
                firstJian:1,//首件
                deliveryFee:8,//收件运送费
                continueJian:1,//续件
                continueSend:1,//续件配送费
              }],
          },],
        //添加表单的数据
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        radioPay:1,
        radioYou:1,
        radioPrice:1,
        checkSendList:['','',''],//选择配送方式
        tableCitySend:[{
          destination:'',
          firstWeight:'',
          firstJian:'',
          firstFee:'',
          renew:'',
          renewFee:''
        }]

      }
    },
    methods:{
      // 添加配送费模板
      toAdd(){
        console.log('toAdd')
      },
      // 获得配送费模板数据
      getAllData(){
        this.$axios.post('/api/sale/queryDistt.do',{
          page:1,
          limit:3
        },{
          headers:{"Content-Type": "application/json"}
        }).then((res)=>{
          this.rowData = res.data.data
          console.log('接收到的数据',res)
          console.log('this.rowData',this.rowData);
        }).catch((err)=> {
          console.log(err);
        })
      },
      updateSend(){

      },
      delSend(val){
        this.$confirm('此操作将删除该模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.rowData.splice(val,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        console.log('下标',val)
      },
      // 查询
      onSubmit(){
        // 请求查询数据
        this.$axios.post('/api/sale/searchDistt.do',{
          distt_name:this.nameSearch,
          page:1,
          limit:3
        }).then((res)=>{
          console.log('点击查询获取到的信息',res)
          this.rowData = res.data.data
        }).catch((err) =>{
          console.log('点击查询出错信息',err)
        })
        console.log('onSubmit');
      }
    },
    mounted(){
      // 获得配送费模板数据
      this.getAllData()
    }
  }
</script>

<style scoped>
  /*公共样式*/
  .bg-grey{
    background-color:grey;
  }
/*头部搜索样式开始*/
#searchBox{
  /*width: 500px;*/
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
}
#searchBox>div:nth-of-type(1){
  display: flex;
  justify-content: space-between;
}
#searchBox>el-input{
  margin-right: 10px;
}
  /*头部搜索样式结束*/
  /*配送费表格*/
  .bg-sendTable-head{
    background-color: #E4E4E4;
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
  }
  .bg-sendTable-head>div:nth-of-type(2){
    display: flex;
    justify-content: space-between;
  }
  .bg-sendTable-head .lastTime{
   margin-right: 10px;
 }
  .bg-sendTable-head .sendOper span{
    display: inline-block;
    margin-right: 10px;
    color: #169BD5;
  }
  /*配送费模板*/
  #sendFees>el-row{
    margin-top: 20px;
  }
  /*添加公共模板样式*/
  /*配送方式样式*/
  .sendWay{
    display: flex;
    flex-direction: row;
  }
  .sendWay>defaultF{
    display: flex;
    flex-direction: row;
  }
</style>