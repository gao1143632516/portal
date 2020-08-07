<template>
    <div class="app-container">


    <el-table
            :data="tableData"
            v-loading="listLoading"
            style="width: 100%">

        <el-table-column
                label="id"
                width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.zone_id }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="名字"
                width="300">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.shop_name }}</span>
            </template>
        </el-table-column>
        
       <el-table-column
                label="创建时间"
                width="300">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.createtime }}</span>
            </template>
        </el-table-column>
        
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEditData(scope.$index, scope.row)">查看</el-button>
                <el-button
                        size="mini"
                        @click="handleSetAssisant(scope.$index, scope.row)">设置店员</el-button>   
                 <el-button
                        size="mini"
                        @click="handleShopReport(scope.$index, scope.row)">门店简报</el-button>                
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
    import { getShopList } from '@/api/shop';
    export default {
        data() {
            return {
                length:0,
                tableData:[],
                listLoading:false,
                dialogFormVisible:false,
       
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
                getShopList(this.listQuery).then(response => {

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
                this.$router.push({path:`/page/shop/detail?zone_id=${zone_id}`});
            },
            handleSetAssisant(index,row){
                var zone_id = row.zone_id;
                this.$router.push({path:`/page/shop/setAssistant?zone_id=${zone_id}`});
            },
            handleShopReport(index,row){
                var zone_id = row.zone_id;
                this.$router.push({path:`/page/shop/shopReport?zone_id=${zone_id}`});
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