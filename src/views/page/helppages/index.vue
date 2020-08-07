<template>

    <div class="app-container">

            <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleAddData()">添加</el-button>

    <el-table
            :data="tableData"
            v-loading="listLoading"
            style="width: 100%">

        <el-table-column
                label="page_id"
                width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.page_id }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="标题"
                width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
            </template>
        </el-table-column>
		
		  <el-table-column
                label="查看"
                width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.file_url }}</span>
            </template>
        </el-table-column>

         <el-table-column
                label="状态"
                width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.status_text }}</span>
            </template>
        </el-table-column>
		   <el-table-column
                label="修改时间"
                width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.update_ts }}</span>
            </template>
        </el-table-column>	
			
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEditData(scope.$index, scope.row)">编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
               
            </template>
        </el-table-column>
    </el-table>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange"  :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length">
            </el-pagination>
        </div>

        
    </div>

</template>

<script>
    import { getHtmlList } from '@/api/article';
    export default {
        data() {
            return {
                length:0,
                tableData:[],
                detailData:{
                    name:'',

                },
                listLoading:false,
                showDetail:false,
                formLabelWidth: '120px' ,
                listQuery: {
                    page: 1,
                    limit: 10,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },

            }
        },
        created(){
          this.getList();

        },
        methods: {
            getList(){
                this.listLoading = true;
               
                getHtmlList(this.listQuery).then(response => {

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

            handleEditData(index, row) {
                 var page_id = row.page_id; 
            	this.$router.push({path:`/page/helppages/edit?page_id=${page_id}`});
            

            },
        
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableData.splice(index,1);
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


            },
            handleManage(index,row){
                console.log(row);
                  var user_id = row.id;
              //  this.$router.push({ path: '/' });
                this.$router.push({path:`/page/privilege/detail?user_id=${user_id}`});
            },
            handleAddData(){
                this.resetTemp();
                this.dialogStatus = 'create'
                let length =
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })

            },
            addData(){

                this.$refs['dataForm'].validate((valid) => {
                    console.log(this.tableData);
                    if (valid) {
                        addQuizIssue(this.temp_form).then(response => {
                            if (response.code == 0) {
                                this.meassageBox('添加成功', 'success');
                                this.temp_form.issue_id = response.data;
                                this.dialogFormVisible = false;
                                this.tableData.unshift(this.temp_form);

                            } else {
                                this.meassageBox('添加失败', 'warning');
                            }

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },


            updateData(){
                this.$refs['dataForm'].validate((valid) => {
                  if(valid){
                      console.log(this.tableData)
                      editQuizIssue(this.temp_form).then(response => {
                          if (response.code == 0) {
                              for(const v of this.tableData){
                                  if(v.issue_id === this.temp_form.issue_id){
                                      const index = this.tableData.indexOf(v);
                                      this.tableData.splice(index,1,this.temp_form);
                                      break;

                                  }
                              }
                              this.meassageBox('修改成功', 'success');
                              this.dialogFormVisible = false;



                          } else {
                              this.meassageBox('修改失败', 'warning');
                          }

                      })
                  }else{
                      console.log('error submit!!');
                      return false;
                  }
                })

            },
            resetTemp() {
                this.temp_form = {
                       issue_id:'',
                        issue_no:'',
                        issue_name: '',
                        issue_question_number: '',
                        issue_bonus:''
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