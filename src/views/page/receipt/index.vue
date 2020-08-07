<template>
    <div class="app-container">
        <div style="display:inline-block">
       状态： <el-select v-model="listQuery.status" placeholder="请选择" size="mini">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
            </el-option>
        </el-select>
        </div>
        <div  v-if="category_show" style="display:inline-block">
       类型：
       <el-select v-model="listQuery.category" placeholder="请选择" size="mini">
            <el-option
                    v-for="item in categoryoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
            </el-option>
        </el-select>
          </div>
          <div style="display:inline-block">
              <span class="demonstration">时间范围</span>
    <el-date-picker size="mini"
      v-model="listQuery.daterange"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      default-value="2018-6-15"
      value-format="yyyy-MM-dd"
       format="yyyy 年 MM 月 dd 日"
      >
    </el-date-picker>

          </div>  

    <el-button type="primary" icon="el-icon-search" @click="handleFilter()">搜索</el-button>     

    <el-table
            :data="tableData"
            v-loading="listLoading"
            stripe
            style="width: 100%">

        <el-table-column
                label="現返id"
                min-width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.receipt_id }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="现返产品"
                min-width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="用户编号"
                min-width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.user_id }}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="imei"
                min-width="190">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.imei }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="imei2"
                min-width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.imei2 }}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="imei3"
            min-width="80">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.imei3 }}</span>
        </template>
    </el-table-column>
        <el-table-column
            label="imei4"
            min-width="80">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.imei4 }}</span>
        </template>
    </el-table-column>

        <el-table-column
                label="状态"
                min-width="100">
            <template slot-scope="scope">

                   <el-tag v-show="scope.row.status_id==1" type='warning' style="margin-left: 10px"> {{ scope.row.status }}</el-tag>
                  <el-tag v-show="scope.row.status_id==3" type='danger' style="margin-left: 10px"> {{ scope.row.status }}</el-tag>
                    <el-tag v-show="scope.row.status_id==2" type='success' style="margin-left: 10px"> {{ scope.row.status }}</el-tag>
                       <el-tag v-show="scope.row.status_id==5" type='warning' style="margin-left: 10px"> {{ scope.row.status }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
                label="创建时间"
                width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.createdate }}</span>
            </template>
        </el-table-column>



        <el-table-column label="操作" min-width="150">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" @click="handleManage(scope.$index, scope.row)">查看</el-button>
            
            </template>
        </el-table-column>
    </el-table>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange"  :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length">
            </el-pagination>
        </div>
        <el-dialog :visible.sync="showDetail" :modal="true" title="返现详情" top="10px">

        <getReceiptDetail  v-on:hideDetail="hideDetail" v-bind:dataObj="dataObj"></getReceiptDetail>
        </el-dialog>

    </div>
</template>

<script>
    import {getReceiptList,getReceiptDetail} from '@/api/receipt';
    import receiptDetail from './detail';
    export default {
        data() {
            return {
                length:0,
                tableData:[],
                listLoading:true,
                formLabelWidth: '120px' ,
                listQuery: {
                    page: 1,
                    limit: 10,
                    status:0,
                    category:0,
                    daterange:[],

                },
                category_show:true,
                categoryoptions:[
                    {
                        value: 0,
                        label: '全部'
                    }
                    ,{
                    value: 55,
                    label: '应用宝'
                }, {
                    value: 61,
                    label: '手淘拉新活动现返'
                }, {
                    value: 62,
                    label: '微视递推现返'
                }],
                options: [
                    {
                        value: 0,
                        label: '全部'
                    }
                    ,{
                    value: 1,
                    label: '待处理'
                }, {
                    value: 2,
                    label: '已通过'
                }, {
                    value: 3,
                    label: '未通过'
                }, {
                    value: 5,
                    label: '待返现'
                }
                ],
                showDetail:false,
                dataObj:{
                    name:'',
                    reward:'',
                    imei:'',
                    imei2:'',
                    imei3:'',
                    imei4:'',
                    status:'',
                    nickname:'',
                    cretedate:'',
                    p1:'',
                    p2:'',
                    p3:'',
                    p4:'',
                    p5:'',
                    p6:'',
                    remark:''

                },

            }
        },
        components:{'getReceiptDetail':receiptDetail},
        created(){
        
                if(this.$route.query.status&&this.$route.query.status){
                this.category_show = false;
                 
                this.listQuery.status= parseInt(this.$route.query.status);
                this.listQuery.category = this.$route.query.category;
        
            }

          var end = new Date();
          var start = new Date();
          var datearray = new Array();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 5);
          start = this.formatDate(start);
          end = this.formatDate(end);
          datearray = [start,end];
         
          this.listQuery.daterange = datearray;
          this.getList();

        },
        methods: {
            getList(){
                this.listLoading = true;
                getReceiptList(this.listQuery).then(response => {

                    if(response.code==0){
                        this.tableData = response.data.data;
                        this.length = response.data.count
                    }else{

                    }

                   this.listLoading = false
                })

            },
            handleCurrentChange(val){
                this.listQuery.page = val
                this.getList()
            },
            handleFilter(){
                var start_date = new Date(this.listQuery.daterange[0]);
                var end_date = new Date(this.listQuery.daterange[1])
                if((end_date-start_date)/(1000 * 60 * 60 * 24)>60){
                    this.$message({
                            message:"最多查询两个月时间",
                            type:"error"
                        });
                    return false;
                }
                this.listQuery.page = 1;
                this.getList();
                
            },


            handleManage(index,row){//获得指定返现的详细信息

                  var receipt_id = row.receipt_id;
                  this.getDetail(receipt_id);
            },
            hideDetail(res){
               this.showDetail = false;
                for(const v of this.tableData){
                    if(v.receipt_id === res[0]){
                        console.log(v);
                        this.$set(v,'status_id',res[1]);
                        this.$set(v,'status',res[2])
                        break;

                    }
                }
            },
            getDetail(receipt_id){
                getReceiptDetail(receipt_id).then(response => {
                    if(response.code==0){
                        console.log(response.data);
                        this.dataObj = response.data;
                        this.showDetail = true;

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
            formatDate (date) {  
                var y = date.getFullYear();  
                var m = date.getMonth() + 1;  
                m = m < 10 ? '0' + m : m;  
                var d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                return y + '-' + m + '-' + d;  
            }

        }
    }
</script>