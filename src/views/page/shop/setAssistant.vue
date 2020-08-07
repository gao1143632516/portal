<template>
    <div class="app-container">

         <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="addData()">设置店员</el-button>

          <el-upload
            class="upload-demo"
            drag
            :action="getUploadUlr()"
            :on-success="uploadSuccess"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
       </el-upload>

        <el-table
                :data="assistantList"
                v-loading="listLoading"
                style="width: 100%">
            <el-table-column
                    label="vipId"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.vip_id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="店员名字"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.vip_name }}</span>
                </template>
            </el-table-column>
               <el-table-column
                    label="店员照片"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px"><img :src="scope.row.head_url" width="100" height="100"></span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                
                    <el-button
                            size="mini"
                            type="danger"
                            @click="deleteAssistant(scope.$index, scope.row)">删除店员</el-button>
                </template>
            </el-table-column>
        </el-table>




        <el-dialog title="设置店员"  :visible.sync="dialogFormVisible" >
            <el-form :model="temp_form"  ref="dataForm">
                <el-form-item label="vip_id" :label-width="formLabelWidth">
                    <el-input v-model.trim.number="temp_form.vip_id"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="店员名字" prop="question_stem" :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.vip_name"   auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAddData">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getShopAssistantPic,setShopAssistant,deleteFaceVip} from '@/api/shop';
    export default {
        data() {
            return {
                assistantList :[],
                listLoading:true,
                temp_form:{vip_id:'',vip_name:''},
                dialogFormVisible:false,
                formLabelWidth: '120px' ,
            }
        },
        created(){

            this.getShopAssistantList();
        },
        methods: {
            getShopAssistantList(){
                this.listLoading = true;
                getShopAssistantPic(this.$route.query.zone_id).then(response => {
                    if(response.code==0){
                        this.assistantList = response.datalist;
                    }else{

                    }

                    this.listLoading = false
                })

            },
            addData(){
                 this.dialogFormVisible = true;   
            }
            ,

            confirmAddData(){
                 if(this.temp_form.vip_id==''){
                    return false;
                 }
                 console.log(this.temp_form);
                 setShopAssistant(this.temp_form).then(response =>{
                    if(response.code==0){
                        this.temp_form = {};
                        this.meassageBox('添加成功','success');
                        this.dialogFormVisible=false;
                        this.getShopAssistantList();
                    }else{

                    }

                 })
            }  
            ,
            deleteAssistant(index,row){
                deleteFaceVip(row.vip_id).then(response=>{
                    if(response.code==0){
                    
                        this.meassageBox('设置成功','success');
                        this.getShopAssistantList();
                    }else{

                    }
                })
            }
,
         getUploadUlr(){
              var url = process.env.BASE_API + "/portal/shop/addAssistant?zone_id="+this.$route.query.zone_id;
              return url;
         },
         uploadSuccess(response, file, fileList){
         // this.getShopAssistantList();
         console.log(response,file,fileList)
         console.log(response);
         if(response.data!=0){
               this.getShopAssistantList();
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