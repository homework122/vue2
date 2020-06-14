<!--    圈子管理-->
<template>
  <div>
    <div>
      <!--搜索和发帖-->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="圈子">
          <el-select v-model="formInline.region" placeholder="选择圈子">
            <el-option label="圈子一" value="quanzi1"></el-option>
            <el-option label="圈子2" value="quanzi2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.user" placeholder="帖子主题">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fatie = true">
            创建圈子+
          </el-button>
          <!--发帖的弹出框-->
          <el-dialog title="发帖" :visible.sync="fatie">
            <el-form :model="form">
              <el-form-item label="帖子名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="帖子数量" :label-width="formLabelWidth">
                <el-input v-model="form.num" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户数" :label-width="formLabelWidth">
                <el-input v-model="form.user" autocomplete="off"></el-input>
              </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="fatie = false">取 消</el-button>
              <el-button type="primary" @click="fatie = false">确 定</el-button>
            </div>
          </el-dialog>
        </el-form-item>
      </el-form>
      <!--表格-->
      <el-table
              :header-cell-style="{background:'#ADD8E6'}"
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
        <el-table-column
                label="圈子名称"
                prop="circle_name">
        </el-table-column>
        <el-table-column
                label="帖子数"
                prop="circle_postsum">
        </el-table-column>
        <el-table-column
                label="用户数"
                prop="circle_clientsum">
        </el-table-column>
        <el-table-column
                label="操作"
                align="right">
          <template slot-scope="scope">
            <el-button
                    type="primary"
                    size="medium "
                    @click="onxiugai = true">修改
            </el-button>
            <!--修改的弹出框-->
            <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->
            <el-dialog title="" :visible.sync="onxiugai">
              <el-form :model="formxiugai">
                <el-form-item label="帖子名称" :label-width="formLabelWidth">
                  <el-input v-model="formxiugai.circle_postsum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="帖子数" :label-width="formLabelWidth">
                  <el-input v-model="formxiugai.circle_postsum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户数" :label-width="formLabelWidth">
                  <el-input v-model="formxiugai.circle_clientsum" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="onxiugai = false">取 消</el-button>
                <el-button type="primary" @click="onxiugai = false">确 定</el-button>
              </div>
            </el-dialog>
            <el-button
                    size="medium "
                    type="danger"
                    @click="ondel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>


    </div>
  </div>
</template>

<script>
export default {
  name: "circle",
  props: {},
    data() {
        return {
            formInline: {
                user: '',
                region: '',
            },
            fatie: false,
            form: {
                circle_name: '',
                circle_postsum: '',
                circle_clientsum: '',

                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            onxiugai: false,
            formxiugai: {
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
            tableData: [
                {
                },
            ],
        }
    },
    methods: {
        /*删除*/
        ondel(index) {
            this.tableData.splice(index, 1);
        },
        onSubmit() {
            console.log('submit!');
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        dialogFormVisible() {
            console.log("11");
        },
        gettableDataList() {
            this.axios.post("/api/forum/cirMagShow.do",{
                    pageSize:5,
                    page:1
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

  // data: function() {
  //   return {
  //     search_input:'',
  //   };
  // }
};
</script>

<style scoped>


</style>
