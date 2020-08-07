
<template>
    <div class="app-container">
<div> <el-date-picker
      v-model="default_time"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
   <el-button type="danger" size="mini"
       @click="search()" >确认搜索</el-button>
    <el-button class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出数据</el-button>
</div>

        <el-table
                id="cameraid"
                :data="tableData"
                v-loading="listLoading"
                :default-sort="{prop: 'store_name', order: 'descending'}"
                style="width: 100%"
                >

            <el-table-column
                    label="设备id"
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.device_id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="门店名字"
                    width="250">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.store_name }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="设备名"
                    width="250">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.devicename }}</span>
                </template>
            </el-table-column>

                    <el-table-column
                    label="tutk码"
                    width="250"
                   >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.video_p2p_url }}</span>
                </template>
            </el-table-column>
              <el-table-column
                   prop="last_visit_time"
                    label="当天最后抓拍时间"
                    width="200"
                      sortable >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.last_visit_time }}</span>
                </template>
            </el-table-column>

                <el-table-column
                    prop="visit_count"
                    label="当天抓拍数量"
                    width="100"
                      sortable>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.visit_count }}</span>
                </template>
            </el-table-column>
        </el-table>
      
    </div>
</template>

<script>
    import { getCameraAnalysisInfo } from '@/api/camera';
    export default {
        data() {
            return {
                length:0,
                tableData:[],
                listLoading:true,
                default_time:'',
                formLabelWidth: '120px' ,
                downloadLoading: false
               
            }
        },
        created(){

 			this.default_time = this.formatDate(new Date()) ;
            this.getList(this.default_time);

        },
        methods: {
            getList(time){
                this.listLoading = true;

                getCameraAnalysisInfo(time).then(response => {

                    if(response.code==0){

                        this.tableData = response.datalist;
                        // this.length = response.data.number
                    }else{

                    }

                    this.listLoading = false
                })
},

search(){
   this.default_time = this.formatDate(new Date(this.default_time));
   this.customer_items=[];
  this.getList(this.default_time);
},
            handleDownload() {

                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['设备id', '门店名称','设备名称', 'tutk码', '最后抓拍时间', '当天抓拍数量'];
                    const filterVal = ['device_id', 'store_name','devicename', 'video_p2p_url', 'last_visit_time', 'visit_count'];
                    const list = this.tableData;
                    const data = this.formatJson(filterVal, list);
                    //console.log(data);
                    excel.export_json_to_excel(tHeader, data,this.default_time+'table-list')
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    console.log(j);
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            }
           ,

            formatDate (date) {
                var y = date.getFullYear();  
                var m = date.getMonth() + 1;  
                m = m < 10 ? '0' + m : m;  
                var d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                return y + '-' + m + '-' + d;  
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