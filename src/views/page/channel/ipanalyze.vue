<template>
  <div class="app-container">
    <div style="display:inline-block">
      <span class="demonstration">激活日期</span>
      <el-date-picker size="mini" v-model="listQuery.daterange" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" default-value="2018-6-15" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
      </el-date-picker>
    </div>
    <div style="display:inline-block">
      状态： <el-select v-model="listQuery.status" placeholder="请选择" size="mini">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div v-if="category_show" style="display:inline-block">
      产品：
      <el-select v-model="listQuery.app_id" placeholder="请选择" size="mini">
        <el-option v-for="item in categoryoptions" :key="item.app_id" :label="item.app_name" :value="item.app_id">
        </el-option>
      </el-select>
    </div>
        <div style="display:inline-block">
      哎呦留存：  <el-select v-model="listQuery.aiyou_keep" placeholder="留存" size="mini">
          <el-option v-for="item in aiyouKeepOptions" :key="item.value" :label="item.condition" :value="item.value">
         </el-option>
        </el-select>
    </div>

    <div style="margin: 10px">
        <div style="display: inline-block;">
        包号: <el-input v-model.trim="listQuery.user_id" auto-complete="off" size="mini" style="width: 100px" ></el-input>
      </div>
      <div style="display:inline-block">
      渠道：<el-select v-model="listQuery.channel_id" placeholder="渠道" size="mini">
        <el-option v-for="item in channelOptions" :key="item.channel_id" :label="item.channel_name" :value="item.channel_id">
        </el-option>
      </el-select>
    </div>
      <div style="display: inline-block;">
        上线时间:<el-date-picker v-model="listQuery.online_date" type="date" size="mini" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <div style="display: inline-block;">
        下线时间:<el-date-picker v-model="listQuery.offline_date" type="date" size="mini" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
    </div>
    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleFilter()">搜索</el-button>
      <el-button class="filter-item" type="primary" size="mini" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出数据</el-button>
    <el-table :data="tableData"  style="font-size: 10px" height="800" v-loading="listLoading" stripe  :row-style="{height:'0px'}"
    :cell-style="{padding:'0px'}"   :default-sort = "{prop: 'activation_date',order: 'descending'}">
      <el-table-column label="日期" min-width="80" fixed>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.activation_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品" min-width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.app_name }}</span>
        </template>
      </el-table-column>
        
        <el-table-column label="渠道" min-width="100" sortable :sort-method="sort_channel_name">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.channel_name }}</span>
        </template>
      </el-table-column> 

      <el-table-column label="包号" min-width="100" sortable :sort-method="sort_user_id">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ip总量" min-width="50" sortable :sort-method="sort_ipnum">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ip_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="异常ip数" min-width="50" sortable :sort-method="sort_exception_ip_num">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.exception_ip_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="异常ip新增数" min-width="50" sortable :sort-method="sort_exception_ip_increased_num">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.exception_ip_increased_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当日总量" min-width="50" sortable :sort-method="sort_total">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.total }}</span>
        </template>
      </el-table-column>
        <el-table-column label="异常占比" min-width="80" sortable :sort-method="sort_exception_proportion">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.exception_proportion }}</span>
        </template>
      </el-table-column>
       <el-table-column label="哎呦留存" min-width="80" sortable :sort-method="sort_aiyou_keep">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.aiyou_keep+"%" }}</span>
        </template>
      </el-table-column>
        <el-table-column label="状态" min-width="80">
        <template slot-scope="scope">
     
           <el-tag v-show="scope.row.status==false" type='warning' style="margin-left: 10px">正常</el-tag>
          <el-tag v-show="scope.row.status==true" type='danger' style="margin-left: 10px"> 已下线</el-tag>
         
        </template>
      </el-table-column>
       <el-table-column label="上线时间" min-width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.online_date }}</span>
        </template>
      </el-table-column>
       <el-table-column label="下线时间" min-width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.offline_date }}</span>
        </template>
      </el-table-column>
    <!--   <el-table-column label="状态" min-width="100">
        <template slot-scope="scope">
          <el-tag v-show="scope.row.status_id==1" type='warning' style="margin-left: 10px"> {{ scope.row.status }}</el-tag>
          <el-tag v-show="scope.row.status_id==3" type='danger' style="margin-left: 10px"> {{ scope.row.status }}</el-tag>
          <el-tag v-show="scope.row.status_id==2" type='success' style="margin-left: 10px"> {{ scope.row.status }}</el-tag>
          <el-tag v-show="scope.row.status_id==5" type='warning' style="margin-left: 10px"> {{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->

    </el-table>
  <!--   <div class="pagination-container">
      <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
import { getActivationIpAnalyz, getChuanhshanjiaAppList ,getChannelList} from '@/api/channel';
export default {
  data() {
    return {
      length: 0,
      tableData: [],
      channelOptions:[],
      listLoading: true,
      formLabelWidth: '120px',
      listQuery: {
        page: 1,
        limit: 100,
        status: 3,
        app_id: 0,
        user_id:'',
        online_date:'',
        offline_date:'',
        channel_id:0,
        daterange: [],
        aiyou_keep:0

      },
      downloadLoading:false,
      category_show: true,
      categoryoptions: [],
      aiyouKeepOptions:[
      {'condition':'全部','value':0},
      {'condition':'<=5%','value':5},
      {'condition':'<=10%','value':10},
      {'condition':'<=15%','value':15},
      {'condition':'<=20%','value':20},
      {'condition':'<=25%','value':25},
      {'condition':'<=30%','value':30},
      {'condition':'<=40%','value':40},
      {'condition':'<=50%','value':50},
      ],

      options: [{
        value: 3,
        label: '全部'
      }, {
        value: 0,
        label: '正常'
      }, {
        value: 1,
        label: '已过期'
      }],
      showDetail: false,
    }
  },

  created() {

    var end = new Date();
    var start = new Date();
    var datearray = new Array();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
    start = this.formatDate(start);
    end = this.formatDate(end);
    datearray = [start, end];

    this.listQuery.daterange = datearray;
      this.getList();
    this.getChuanhshanjiaAppList();
    this.getChannelList();


  },
  methods: {
    getList() {
       this.listLoading = true;
      getActivationIpAnalyz(this.listQuery).then(response => {

        if (response.code == 0) {
          this.tableData = response.datalist;
        //  this.length = response.data.count
        } else {

        }

        this.listLoading = false
      })

    },
    getChuanhshanjiaAppList() {
      getChuanhshanjiaAppList().then(response => {
        if (response.code == 0) {
          response.datalist.unshift({ app_id: 0, app_name: '全部' });
          this.categoryoptions = response.datalist;
        }

      })
    },
    getChannelList(){
        getChannelList().then(response => {
            if(response.code == 0) {
                response.datalist.unshift({channel_id:0,channel_name:'全部'})
                this.channelOptions = response.datalist;
            }
        })
    },
    // handleCurrentChange(val) {
    //   this.listQuery.page = val
    //   this.getList()
    // },
    handleFilter() {
      var start_date = new Date(this.listQuery.daterange[0]);
      var end_date = new Date(this.listQuery.daterange[1])
      if ((end_date - start_date) / (1000 * 60 * 60 * 24) > 60) {
        this.$message({
          message: "最多查询两个月时间",
          type: "error"
        });
        return false;
      }
      this.listQuery.page = 1;
      this.getList();

    },


    handleManage(index, row) { //获得指定返现的详细信息

      var receipt_id = row.receipt_id;
      this.getDetail(receipt_id);
    },
sort_ipnum(obj1,obj2){
   return obj1.ip_num - obj2.ip_num;
},
sort_exception_ip_num(obj1,obj2){
    return obj1.exception_ip_num - obj2.exception_ip_num;
},
sort_exception_ip_increased_num(obj1,obj2){
    return obj1.exception_ip_increased_num - obj2.exception_ip_increased_num;
},
sort_total(obj1,obj2){
    return obj1.total - obj2.total;
}
,
sort_exception_proportion(obj1,obj2){
    return this.toNum(obj1.exception_proportion) - this.toNum(obj2.exception_proportion);
},
sort_aiyou_keep(obj1,obj2){
     return obj1.aiyou_keep - obj2.aiyou_keep;
},
sort_user_id(obj1,obj2){
    return obj1.user_id - obj2.user_id;
},
sort_channel_name(obj1,obj2){
    return obj1.channel_id - obj2.channel_id;
},
   handleDownload() {

                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['激活日期', '产品','渠道', '包号', 'ip总量', '异常ip数','异常ip新增数','当日总量', '异常占比','哎呦留存','状态','上线时间','下线时间'];
                    const filterVal = ['activation_date', 'app_name','channel_name', 'user_id', 'ip_num', 'exception_ip_num','exception_ip_increased_num','total','exception_proportion','aiyou_keep','status','online_date','offline_date'];
                    const list = this.tableData;
                    const data = this.formatJson(filterVal, list);
                    //console.log(data);
                    excel.export_json_to_excel(tHeader, data,'ip统计数据')
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    console.log(j);
                    if (j === 'status') {
                        return v[j]==0 ? '正常' : '已过期'; 
                       // return parseTime(v[j])
                    } else{
                        return v[j];
                    }
                }))
            },


    meassageBox(meassage, type) {
      this.$message({
        message: meassage,
        type: type
      });
    },
     toNum(percent){
        var num=percent.replace("%","")/100;
        return num;
    },
    formatDate(date) {
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
