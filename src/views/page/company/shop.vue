<template>
    <div class="app-container">

       <el-button @click="handleAddData()">添加</el-button>       
        <el-table
                :data="tableData"
                v-loading="listLoading"
                style="width: 100%">

            <el-table-column
                    label="zone_id"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.zone_id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="门店名字"
                    width="300">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.store_name }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="账套id"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.third_accountid }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="部门id"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.third_store_id }}</span>
                </template>
            </el-table-column>

               <el-table-column
                    label="门店码"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.zone_code }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="store_type(是否接e商1:不接2:接)"
                    width="300">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.store_type }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEditData(scope.$index, scope.row)">详情</el-button>
                             <el-button
                        size="mini"
                           @click="handleEditDataInfo(scope.$index, scope.row)">修改</el-button>   
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange"  :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length">
            </el-pagination>
        </div>

         <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="temp_form" >
                <el-form-item label="store_name"   :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.store_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="third_accountid"  :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.third_accountid" auto-complete="off"></el-input>
                </el-form-item>
              <el-form-item label="third_store_id" :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.third_store_id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="store_type" :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.store_type" auto-complete="off"></el-input>
                </el-form-item>

                <!--   <el-form-item label="zone_code" :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.zone_code" auto-complete="off"></el-input>
                </el-form-item> -->

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="addData">确定</el-button>
                <el-button v-else type="primary" @click="updateData">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { getShopListBythird_accountid ,addStore,updateStore} from '@/api/company';
    export default {
        data() {
            return {
                length:0,
                tableData:[],
                listLoading:false,
                dialogFormVisible:false,
                dialogStatus:'',
                textMap: {
                    update: '修改',
                    create: '添加'
                },
                temp_form:{
                    store_name:'',
                    third_accountid:'',
                    third_store_id:'',
                    account_id:0



                },
                formLabelWidth: '120px' ,
                listQuery: {
                    page: 1,
                    limit: 10,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                }

            }
        },
        created(){
            this.getList();

        },
        methods: {
            getList(){
                this.listLoading = true;
                getShopListBythird_accountid(this.listQuery,this.$route.query.account_id).then(response => {

                    if(response.code==0){

                        this.tableData = response.data.result;
                        this.length = response.data.number
                    }else{

                    }

                    this.listLoading = false
                })

            },
            handleCurrentChange(val){
                this.listQuery.page = val
                this.getList()
            },


            handleEditData(index,row){
                console.log(row);
                var zone_id = row.zone_id;
                this.$router.push({path:`/page/company/shopInfo?zone_id=${zone_id}`});
            },
            handleAddData(){
                this.resetTemp();
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
            },
           addData(){
                addStore(this.$route.query.account_id,this.temp_form).then(response=>{
                      this.dialogFormVisible = false;
                      this.temp_form.zone_id = response.data;
                      this.tableData.push(this.temp_form);
                      this.meassageBox("添加成功",'success');
                });
               },
           updateData(){
                updateStore(this.temp_form).then(response=>{
                        for(const v of this.tableData){
                                    if(v.zone_id === this.temp_form.zone_id){
                                        const index = this.tableData.indexOf(v);
                                        this.tableData.splice(index,1,this.temp_form);
                                        break;

                                        }
                                    }
                        this.meassageBox("修改成功",'success');

                        this.dialogFormVisible = false;

            })
       }     
         ,
        handleEditDataInfo(index, row) {
                        console.log(index, row);
                        this.temp_form = Object.assign({},row);
                        this.dialogStatus = 'update'
                        this.dialogFormVisible = true;
                      
                    },

           resetTemp(){
                this.temp_form={

                }
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