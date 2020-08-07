<template>

    <div class="app-container">


    <el-table
            :data="tableData"
            v-loading="listLoading"
            @cell-click="cellClick"
            :row-class-name="tableRowClassName"
            style="width: 100%">

        <el-table-column
                label="请求id"
                width="80">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.request_id }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="商户名字"
                width="200">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.business_name }}</span>
            </template>
        </el-table-column>
		
		  <el-table-column
                label="商户编号"
                width="300">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.business_id }}</span>
            </template>
  </el-table-column>
		   <el-table-column
                label="状态"
                width="300">
            <template slot-scope="scope">
               <el-tag  style="margin-left: 10px">  {{ scope.row.status_name }}</el-tag>
        
            </template>
        </el-table-column>	
          <el-table-column
                label="创建时间"
                width="200">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.createtime }}</span>
            </template>
  </el-table-column>


          <el-table-column
                label="修改时间"
                width="200">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.updatetime }}</span>
            </template>
  </el-table-column>

                 <el-table-column label="操作" width="300">
            <template slot-scope="scope">
                <el-button
                        size="mini">查看</el-button>
                       
            </template>
        </el-table-column>
			

    </el-table>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="listQuery.page" :page-sizes="[10,20,30,50]"  :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length">
            </el-pagination>
        </div>

        <el-dialog
  title="审核"
  :visible.sync="centerDialogVisible"
  width="50%"
  center>
  <el-form ref="form" :model="dialogData" label-width="150px">
 
  <el-form-item label="编号：">
    <div v-html="dialogData.business_id" width="30%"></div>
  </el-form-item>

<el-form-item label="名字：">
    <div v-html="dialogData.business_name" width="30%"></div>
</el-form-item>
  <el-form-item label="发票图片：">
    <img ref="pic1" :src="dialogData.receipt_file_url" style="width:30%">
  <!--   <a @click="toLargenPic()">放大</a> -->
  </el-form-item>
   

<!--     <el-form-item label="快递公司：">
      <div v-if="dialogData.express_name!=''">
      <div v-html="dialogData.express_name" width="30%"></div>
     </div>
     <div v-else>
      <div width="30%">暂无</div>
     </div>

  </el-form-item> -->
     <el-form-item label="快递单：">
     <div v-if="dialogData.express_id_url!=''">
      <img ref="pic2" :src="dialogData.express_id_url" style="width:40%">
     </div>
     <div v-else>
      <div width="30%">还没到邮寄操作</div>
     </div>
  
  <!--   <a @click="toLargenPic()">放大</a> -->
  </el-form-item>


 <el-form-item label="当前状态：">
    <el-tag width="40%">{{ dialogData.status_name }}</el-tag>
  <!--   <a @click="toLargenPic()">放大</a> -->
  </el-form-item>

  <el-form-item label="创建时间：">
    <el-tag width="30%">{{ dialogData.createtime }}</el-tag>
  <!--   <a @click="toLargenPic()">放大</a> -->
  </el-form-item>



  <el-form-item label="操作说明：">
    <el-input type="textarea" v-model="dialogData.description"></el-input>
  </el-form-item>


 </el-form>
  <span slot="footer" class="dialog-footer">

    <p v-if="dialogData.status_id==45">
    <el-button @click="updateInvoiceStatus(10)">确认收到正确的发票，通过</el-button>
      <el-button  @click="updateInvoiceStatus(50)">快递单有误，让用户重新填写</el-button>
    <el-button @click="updateInvoiceStatus(15)">拒绝提现</el-button>
    </p>

    <p v-else-if="(dialogData.status_id==25)">

    <el-button @click="updateInvoiceStatus(40)">发票信息正确</el-button>
    <el-button  @click="updateInvoiceStatus(30)">发票照片有误，让用户重新填写</el-button>
    <el-button type="danger" @click="updateInvoiceStatus(15)">拒绝</el-button>
    </p>

      <p v-else-if="(dialogData.status_id==30)">

        等待用户重新提交发票信息
     </p>

         <p v-else-if="(dialogData.status_id==50)">

        等待用户重新提交发票快递信息
     </p>
       <p v-else-if="(dialogData.status_id==40)">

        等待用户邮寄发票
     </p>


    <p v-else>

     此订单已经处理完成，不需要操作
    </p>
  </span>

</el-dialog>

        
    </div>

</template>

<script>
    import { getInvoiceList ,updateInvoiceStatus} from '@/api/widthdrawcheck';
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
                    request_id:0,
                    business_id:0,
                    business_name:0,
                    description:'',
                    status_name:'',
                    status_id:0,
                    request_item_id:0,
                    receipt_file_url:'',
                    express_id_url:'',
                    express_name:'',
                    createtime:'',
                    updatetime:''

                },

            }
        },
        created(){
          this.getList();

        },
        methods: {
            tableRowClassName(row,rowIndex){
                 if (row.row.status_id === 25||row.row.status_id===45) {
                      return 'warning-row';
                    } else if (row.row.status_id ===5 || row.row.status_id===15 ) {
                      return 'error-row';
                    }
                    return '';
      }
            ,
            getList(){
                this.listLoading = true;
               
                getInvoiceList(this.listQuery).then(response => {

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
            updateInvoiceStatus(status_id){
           
                

               updateInvoiceStatus(this.dialogData.request_id,status_id,this.dialogData.description).then(response=>{
                   
                      this.meassageBox('操作成功', 'success');
                     this.centerDialogVisible = false;
                     this.getList();

               })
            },

            handleCurrentChange(val){
                this.listQuery.page = val
                this.getList()
            },
            handleSizeChange(val){
               this.listQuery.limit = val
               this.getList()
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
            toLargenPic(){
              console.log(this.$refs['pic1'].style.width="100%");
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
    background: #E6A23C;
  }

  .el-table .success-row {
  
  }
   .el-table .error-row {
    background: #FFC0CB;
  }
 .el-table .info-row {
    background: #oldlace;
  }
  .el-table .blue-row {
    background: #409EFF;
  }

</style>