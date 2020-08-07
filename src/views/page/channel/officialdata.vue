<template>
    <div class="app-container">

        <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleAddData()">添加</el-button>

        <el-table
                :data="questionTableData"
                v-loading="listLoading"
                style="width: 100%">
            <el-table-column
                    label="id"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.official_data_id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="日期"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.data_dt }}</span>
                </template>
            </el-table-column>
             <el-table-column
                    label="产品名字"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.app_name }}</span>
                </template>
            </el-table-column>

                <el-table-column
                    label="石墨1"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.shimo1 }}</span>
                </template>
            </el-table-column>
             <el-table-column
                    label="石墨2"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.shimo2 }}</span>
                </template>
            </el-table-column>
             <el-table-column
                    label="石墨3"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.shimo3 }}</span>
                </template>
            </el-table-column>
             <el-table-column
                    label="穿山甲1"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.chuanshanjia1 }}</span>
                </template>
            </el-table-column>
             <el-table-column
                    label="穿山甲2"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.chuanshanjia2 }}</span>
                </template>
            </el-table-column>

     <!--       
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="findPriceHistory(scope.$index, scope.row)">价格历史</el-button>        
                </template>
            </el-table-column> -->
        </el-table>




        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="objData" :rules="rules" ref="dataForm">
                <el-form-item label="石墨1" prop="shimo1" :label-width="formLabelWidth">
                    <el-input v-model.trim.number="objData.shimo1"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="石墨2" prop="shimo2" :label-width="formLabelWidth">
                    <el-input v-model.trim.number="objData.shimo2"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="石墨3" prop="shimo3" :label-width="formLabelWidth">
                    <el-input v-model.trim.number="objData.shimo3"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="穿山甲1" prop="chuanshanjia1" :label-width="formLabelWidth">
                    <el-input v-model.trim.number="objData.chuanshanjia1"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="穿山甲2" prop="chuanshanjia2" :label-width="formLabelWidth">
                    <el-input v-model.trim.number="objData.chuanshanjia2"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品名字" prop="app_name_id" :label-width="formLabelWidth">
                                  
       <el-select v-model="objData.app_name_id" placeholder="请选择" size="mini">
            <el-option
                    v-for="item in typeOptions"
                    :key="item.app_id"
                    :label="item.app_name"
                    :value="item.app_id"
                  >
            </el-option>
        </el-select>
                </el-form-item>
               
                 <el-form-item label="日期" prop="data_dt" :label-width="formLabelWidth">
                          <el-date-picker v-model="objData.data_dt"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>
           
           
            

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
    import {getChuanhshanjiaAppList,getOfficialDataList,addOfficialData} from '@/api/channel';
    export default {
        data() {
            return {
                dialogFormVisiblePrice:false,
                PriceDetailList:[],
                questionTableData: [],
                listLoading:false,
                dialogFormVisible:false,
                dialogStatus:'',
                textMap: {
                    update: '修改',
                    create: '添加'
                },
                objData:{
                    
                },
           
                typeOptions:[
                    
                ],
                rules:{
                    // question_no:[ { required: true, message: '请输入编号'}],
                    // question_stem:[ { required: true, message: '请输入名字', trigger: 'blur' }],
                    // question_option:[{required:true,message:'必须为填入',trigger:'blur'}],
                   //  question_right_answer:[{required:true,message:'必须填入'}],

                },

                formLabelWidth: '120px' ,
            }
        },
        created(){
            this.getOfficialDataList();
            this.getChuanhshanjiaAppList();
        },
  
        methods: {
            getOfficialDataList(){
                this.listLoading = true;
                getOfficialDataList().then(response => {
                    if(response.code==0){
                        this.questionTableData = response.datalist;
                    }else{

                    }

                    this.listLoading = false
                })

            },
            getChuanhshanjiaAppList(){
                getChuanhshanjiaAppList().then(response => {
                    if(response.code==0){
                      this.typeOptions = response.datalist ;
                    }
                })
            },
            handleEdit(index, row) {
                console.log(index, row);
                row.app_name_id = parseInt(row.app_name_id);
                this.objData = Object.assign({},row);
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })

            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm(`你确定要删除包${row.user_id}吗？`,'提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                            var channel_detail_id = row.channel_detail_id;
                            deleteChannelDetail(channel_detail_id).then(response=>{
                              this.$message({
                                type: 'success',
                                message: '删除成功!'
                              });    
                            this.getChannelDetailList();
                });

                }).catch(()=>{

                })
          


            },

            findPriceHistory(index,row){
                getChannelPriceHistory(row.channel_id,row.app_name_id,row.user_id).then(response=>{
                    this.dialogFormVisiblePrice = true;
                    this.PriceDetailList = response.datalist;
                })
            },
            handleAddData(){
                // this.resetTemp();
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                // this.$nextTick(() => {
                //     this.$refs['dataForm'].clearValidate()
                // })
            },
            addData(){
                    
                         if(this.objData.app_name_id==0){
                            this.meassageBox('请选择appname', 'warning');
                            return false;
                        }
                        addOfficialData(this.objData).then(response => {
                            if (response.code == 0) {
                                this.meassageBox('添加成功', 'success');
                                 this.dialogFormVisible = false;
                               this.getOfficialDataList();

                            } else {
                                this.meassageBox('添加失败', 'warning');
                            }

                        })
                
               


            },
            updateData(){
                this.$refs['dataForm'].validate((valid) => {
                    if(valid){
                        editUserChannelDetail(this.objData).then(response => {
                            for(const v of this.questionTableData){
                                if(v.channel_detail_id === this.objData.channel_detail_id){
                                    const index = this.questionTableData.indexOf(v);
                                    this.questionTableData.splice(index,1,this.objData);
                                    break;

                                }
                            }
                            this.meassageBox('修改成功', 'success');
                            this.dialogFormVisible = false;
                        })

                    }else{

                    }
                })

            },
            meassageBox(meassage,type){
                this.$message({
                    message:meassage,
                    type:type
                });
            },
            resetTemp() {
                this.objData={
                   
                }
            },


        }
    }
</script>