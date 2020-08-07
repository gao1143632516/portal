<template>

    <div class="app-container">


    <el-table
            :data="tableData"
            v-loading="listLoading"
            @cell-click="cellClick"
            :row-class-name="tableRowClassName"
            style="width: 100%">

        <el-table-column
                label="info_id"
                width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.info_id }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="用户编号"
                width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.user_id }}</span>
            </template>
        </el-table-column>
		
		  <el-table-column
                label="名字"
                width="300">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
        </el-table-column>
              <el-table-column
                label="工行户编号"
                width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.business_id }}</span>
            </template>
        </el-table-column>

         <el-table-column
                label="照片"
                >
            <template slot-scope="scope">
         
                <img :src="scope.row.images" alt="" style="width:100px">
            </template>
        </el-table-column>
		   <el-table-column
                label="状态"
                width="180">
            <template slot-scope="scope">
                <span>{{ scope.row.status_name }}</span>
            </template>
        </el-table-column>	

           <el-table-column
                label="原因"
                >
            <template slot-scope="scope">
                <span>{{ scope.row.status_text }}</span>
            </template>
        </el-table-column>

                <el-table-column
                label="创建时间"
                >
            <template slot-scope="scope">
                <span>{{ scope.row.create_ts }}</span>
            </template>
        </el-table-column>
			

    </el-table>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"  :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length">
            </el-pagination>
        </div>

        <el-dialog
  title="审核"
  :visible.sync="centerDialogVisible"
  width="50%"
  center>
  <el-form ref="form" :model="dialogData" label-width="80px">
 
  <el-form-item label="编号">
    <div v-html="dialogData.business_id" width="30%"></div>
  </el-form-item>

<el-form-item label="名字">
    <div v-html="dialogData.name" width="30%"></div>
  </el-form-item>
  <el-form-item label="图片">
    <img :src="dialogData.images" width="30%">
  </el-form-item>

  <el-form-item label="操作说明">
    <el-input type="textarea" v-model="dialogData.status_text"></el-input>
  </el-form-item>


 </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="pass(2)">通过</el-button>
    <el-button type="danger" @click="pass(3)">拒绝</el-button>
  </span>
</el-dialog>

        
    </div>

</template>

<script>
    import { getApplyForList ,pass} from '@/api/businessmancheck';
    export default {
        data() {
            return {
                length:0,
                tableData:[],
                centerDialogVisible:false,
                listLoading:false,
                formLabelWidth: '120px' ,
                listQuery: {
                    page: 1,
                    limit: 10,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },
                dialogData : {
                    info_id:0,
                    user_id:0,
                    status_id:0,
                    images:'',
                    status_name:'',
                    status_text:'',
                    name:''

                },

            }
        },
        created(){
          this.getList();

        },
        methods: {
            tableRowClassName(row,rowIndex){
                 if (row.row.status_id === 3) {
                      return 'warning-row';
                    } else if (row.row.status_id === 2) {
                      return 'success-row';
                    }
                    return '';
      }
            ,
            getList(){
                this.listLoading = true;
               
                getApplyForList(this.listQuery).then(response => {

                    if(response.code==0){

                        this.tableData = response.datalist;
                        this.length = response.page.total;
                    }else{

                    }

                   this.listLoading = false
                })

            },
            cellClick(row, column, cell, event){
               this.dialogData = Object.assign({},row);
               this.centerDialogVisible = true;
            },
            pass(status_id){
           
                if(this.dialogData.status_id!=1){
                     this.meassageBox('此数据已经处理过不能重复处理', 'error');
                     this.centerDialogVisible = false;
                    return false;
                }

               pass(this.dialogData.info_id,status_id,this.dialogData.status_text).then(response=>{
                   
                    this.meassageBox('操作成功', 'success');
                     this.centerDialogVisible = false;
                     this.getList();

               })
            },

            handleCurrentChange(val){
                this.listQuery.page = val
                this.getList();
            },

            handleSizeChange(val){
              this.listQuery.limit = val;
              this.getList();
            },

  

            updateData(){
                this.$refs['dataForm'].validate((valid) => {
                  if(valid){
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

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>