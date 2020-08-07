<template>
<el-upload
        multiple
        class="upload-demo"
        ref="upload"
        :limit="1"
        :action="uploadUrl()"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :before-upload="beforeUpload" 
        :on-progress="onProgress"
        :on-success="onSuccess"
        >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">只能上传xlsx或xls结尾的文件</div>
</el-upload>

</template>
<script>
    export default {
        data() {
            return {
                fileList: []
            };
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeUpload(file){
            
                if(/\.xlsx$/.test(file.name)||/\.xls$/.test(file.name)){
                    return true;
                } 
                this.$message({
                            message:"只能上传xlsx或xls文件",
                            type:"error"
                        });
                return false;
            },
            onProgress(event, file, fileList){
                console.log(event,file,fileList)
            },
            uploadUrl(){
                var url = process.env.BASE_API + "/portal/yitao/uploadYitaoExcel";
                return url;
            },
            onSuccess(response, file, fileList){
                console.log(response);
                if(response.success==false){
                    this.$message({
                            message:response.status.message,
                            type:"error"
                        });
                }else{
                    this.$message({
                            message:'上传成功',
                            type:"success"
                        });
                window.reload();

                }
            }

        
        }
    }
</script>