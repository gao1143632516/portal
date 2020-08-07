
<template>
    <div class="app-container">
        <div> 
        
         <el-input v-model.trim="listQuery.search"  style="width:200px;"></el-input>
        <el-button type="success" 
           @click="search()" >确认搜索
        </el-button>
        &nbsp;&nbsp;    &nbsp;&nbsp;  &nbsp;&nbsp;    &nbsp;&nbsp;  &nbsp;&nbsp;    &nbsp;&nbsp;
         <el-button type="" 
           @click="addRfid()" >添加
        </el-button>
        </div>

        <el-table
                :data="tableData"
                v-loading="listLoading"
                style="width: 100%"
				
                >

            <el-table-column
                    label="设备号"
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.device_unique_code }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="天线编号"
                    width="200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ant_unique_code }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="智能APP编码"
                    width="200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.device_code }}</span>
                </template>
            </el-table-column>

                    <el-table-column
                    label="描述"
                    width="300"
                   >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.description }}</span>
                </template>
            </el-table-column>
     
        </el-table>

        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange"  :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length">
            </el-pagination>
        </div>




        <el-dialog title="添加" :visible.sync="dialogFormVisible">
            <el-form :model="temp_form" >
                <el-form-item label="设备号"   :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.device_unique_code" auto-complete="off"  placeholder="053F3F78"></el-input>
                </el-form-item>
                <el-form-item label="类型"  :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.type" auto-complete="off" placeholder="1,4"></el-input>
                </el-form-item>
                 <el-form-item label="描述"  :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.description" auto-complete="off"></el-input>
                </el-form-item>
        
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addData">确定</el-button>
            </div>
        </el-dialog>
      
    </div>
</template>

<script>
    import { getRfidDataList,addRfid } from '@/api/rfid';
    export default {
        data() {
            return {
                length:0,
                tableData:[],
                listLoading:true,
                length:0,
                dialogFormVisible:false,
                formLabelWidth: '120px',
                listQuery: {
                    page: 1,
                    limit: 10,
                    search:''
                },
                temp_form:{
                    device_unique_code:'',
                    type:'',
                    description:''

                }
               
            }
        },
        created(){

            this.getList();

        },
        methods: {
            getList(){
                this.listLoading = true;
                getRfidDataList(this.listQuery).then(response => {

                    if(response.code==0){

                        this.tableData = response.data.data;
                         this.length = response.data.count;
                    }else{

                    }

                    this.listLoading = false
                })
},

     handleCurrentChange(val){
                this.listQuery.page = val
                this.getList()
         },
      addRfid(){
        this.dialogFormVisible = true;
        this.temp_form={};
      }   ,
       addData(){
            addRfid(this.temp_form).then(response=>{
                this.meassageBox('添加成功','success')
                location.reload();
            })
       }
       ,

        search(){

         this.getList();
        }, 

            meassageBox(meassage,type){
                this.$message({
                    message:meassage,
                    type:type
                });
            },

        }
    }
</script>