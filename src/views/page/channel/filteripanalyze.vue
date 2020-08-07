<template>
  <div class="app-container">
    <div class="filter-header">
      <div style="display:inline-block">
        <span class="demonstration">激活日期</span>
        <el-date-picker size="mini" v-model="listQuery.daterange" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" default-value="2018-6-15" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
        </el-date-picker>
      </div>
      <div style="display:inline-block;width: 100px">
        状态： <el-select v-model="listQuery.status" placeholder="请选择" size="mini">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div v-if="category_show" style="display:inline-block;width: 120px">
        产品：
        <el-select v-model="listQuery.app_id" placeholder="请选择" size="mini">
          <el-option v-for="item in categoryoptions" :key="item.app_id" :label="item.app_name" :value="item.app_id">
          </el-option>
        </el-select>
      </div>
      <!--    <div style="display:inline-block">
      哎呦留存：  <el-select v-model="listQuery.aiyou_keep" placeholder="留存" size="mini">
          <el-option v-for="item in aiyouKeepOptions" :key="item.value" :label="item.condition" :value="item.value">
         </el-option>
        </el-select>
    </div> -->
      <div style="display: inline-block;">
        包号: <el-input v-model.trim="listQuery.user_id" auto-complete="off" size="mini" style="width: 100px"></el-input>
      </div>
      <div style="display:inline-block;width: 120px">
        渠道：<el-select v-model="listQuery.channel_id" placeholder="渠道" size="mini">
          <el-option v-for="item in channelOptions" :key="item.channel_id" :label="item.channel_name" :value="item.channel_id">
          </el-option>
        </el-select>
      </div>
      <!--     <div style="display: inline-block;">
        上线时间:<el-date-picker v-model="listQuery.online_date" type="date" size="mini" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <div style="display: inline-block;">
        下线时间:<el-date-picker v-model="listQuery.offline_date" type="date" size="mini" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
        </el-date-picker>
      </div> -->
      <el-button type="primary" icon="el-icon-search" size="mini" @click="handleFilter()">搜索</el-button>
      <el-button type="primary" icon=""  style="margin-left:10px " size="mini" @click="updateChuanshanjiaClientData()">更新数据</el-button>
      <h3 style="font-size: 16px">
      合计：<span style="margin-left: 10px;">实时新增总量:{{ total_real_time_tatol }}</span>
      <span style="margin-left:10px;">过滤数量:{{ total_filter_num }}</span>
      <span style="margin-left: 10px;">过滤占比:{{ total_filter_proportion }}</span>
      <span style="margin-left: 10px;">新增数量:{{ total_activation_num }}</span>
      <span style="margin-left: 10px;">异常ip数:{{ total_ex_num }}</span>
      <span style="margin-left: 10px;">异常ip新增:{{ total_ex_add_num }}</span>
      <span style="margin-left: 10px;">ip总量:{{ total_ip_num }}</span>
      <span style="margin-left: 10px;">异常ip占比:{{ total_exception_proportion }}</span>
      <span style="margin-left: 10px;">有效新增:{{ total_valid_add_num }}</span>
      <span style="margin-left: 10px;">有效占比:{{ total_valid_proportion }}</span>
      <span v-show="showAppRetention" style="margin-left: 5px;">产品当日留存:{{ appRetention }}</span>
   </h3>
    </div>
    <!-- <el-button class="filter-item" type="primary" size="mini" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出数据</el-button> -->
    <el-table :data="tableData" style="font-size: 10px" height="800" v-loading="listLoading" stripe :row-style="{height:'0px'}" :cell-style="{padding:'0px'}" :default-sort="{prop: 'valid_proportion', order: 'ascending'}">
      <el-table-column label="日期" min-width="80" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.day}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品" min-width="100" sortable :sort-method="sort_app_name">
        <template slot-scope="scope">
          <span>{{ scope.row.app_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="渠道" min-width="100" sortable :sort-method="sort_channel_name">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.channel_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="包号" min-width="80" sortable :sort-method="sort_user_id">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实时" min-width="80" prop="real_time_tatol" sortable :sort-method="sort_real_time_tatol" :filters="[{'text':'=0','value':0},{'text':'!=0','value':-1}]" :filter-method="filterFilterRealTimeTatol" filter-placement="bottom-end" :filter-multiple="false">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.real_activation_count}}</span>
        </template>
      </el-table-column>
       <el-table-column label="过滤"   min-width="50" sortable :sort-method="sort_real_filter_num">
        <template slot-scope="scope">
          <el-button type="text" @click="getFilterIpDateDetailList(scope.$index, scope.row)"><span style="margin-left: 10px">{{ scope.row.real_filter_num }}</span></el-button>
        </template>
      </el-table-column>
     <!--  <el-table-column label="过滤数量" min-width="50" sortable :sort-method="sort_filter_num">
        <template slot-scope="scope">
          <el-button type="text" @click="getFilterIpDateDetailList(scope.$index, scope.row)"><span style="margin-left: 10px">{{ scope.row.filter_num }}</span></el-button>
        </template>
      </el-table-column> -->
      <el-table-column label="过滤%" min-width="80" :filters="filter_list" :filter-method="filterFilterProportion" filter-placement="bottom-end" :filter-multiple="false" sortable :sort-method="sort_filter_proportion" prop="filter_proportion">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.real_filter_proportion }}</span>
        </template>
      </el-table-column>
    <!--   <el-table-column label="过滤原因" min-width="100">
        <template slot-scope=" scope">
          <span style="margin-left: 10px">{{ scope.row.reason }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="新增数量" min-width="80" sortable :sort-method="sort_activation_num">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.activation_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="异常ip数量" min-width="50" sortable :sort-method="sort_ex_num">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ex_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="异常ip新增" min-width="50" sortable :sort-method="sort_ex_add_num">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
      
          <p>最后激活时间: {{ scope.row.last_activation_time }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.ex_add_num }}</el-tag>
          </div>
        </el-popover>

          <!-- <span style="margin-left: 10px">{{ scope.row.ex_add_num }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="ip总量" min-width="50" sortable :sort-method="sort_ip_num">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ip_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="异常ip%" min-width="80" prop="exception_proportion" :filters="filter_list" :filter-method="filterExceptionProportion" filter-placement="bottom-end" :filter-multiple="false" sortable :sort-method="sort_exception_proportion">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.exception_proportion }}</span>
        </template>
      </el-table-column>
      <el-table-column label="有效" min-width="50" sortable :sort-method="sort_valid_add_num">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.valid_add_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="有效%" prop="valid_proportion" min-width="80" sortable :sort-method="sort_valid_proportion">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.valid_proportion }}</span>
        </template>
      </el-table-column>
        <el-table-column label="哎呦留存" prop="aiyou_keep" sortable :sort-method="sort_aiyou_keep"
        :filters="[{ 'text': '=0%', 'value': 0 }]" :filter-method="filter_aiyou_keep" filter-placement="bottom-end" :filter-multiple="false">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.aiyou_keep }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="80">
        <template slot-scope="scope">
          <el-tag v-show="scope.row.status==false" type='warning' style="margin-left: 10px">正常</el-tag>
          <el-tag v-show="scope.row.status==true" type='danger' style="margin-left: 10px"> 下线</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="上线时间" min-width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.start_date.split(" ")[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下线时间" min-width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.end_date.split(" ")[0] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="dialogFormVisible1" title="过滤明细" :visible.sync="dialogFormVisible1">
      <template>
        <el-table :data="filterData" stripe :row-style="{height:'5px'}" :cell-style="{padding:'0px'}">
          <el-table-column prop="data_time" label="日期">
          </el-table-column>
          <el-table-column prop="client_ip" label="激活ip">
          </el-table-column>
          <el-table-column prop="user_id" label="包号">
          </el-table-column>
           <el-table-column prop="device_imei" label="imei">
          </el-table-column>
          <el-table-column prop="description" label="原因">
          </el-table-column>
        </el-table>
      </template>
    </el-dialog>
    <el-dialog class="dialogFormVisible" title="请维护一下渠道包,添加到相应渠道" :visible.sync="dialogFormVisiblePacakge">
      <div class="list" v-for="(item,index) in needAddPacageList">
        {{item.user_id}}------{{item.app_name}}
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getFilterIpDataList, getChuanhshanjiaAppList, getChannelList, getFilterIpDateDetailList,getRetentionByAppID,checkChannelUserIdisFull,updateChuanshanjiaClientData} from '@/api/channel';
export default {
  data() {
    return {
      length: 0,
      tableData: [],
      filterData: [],
      channelOptions: [],
      listLoading: true,
      formLabelWidth: '120px',
      listQuery: {
        app_id: 0,
        user_id: '',
        channel_id: 0,
        daterange: [],
        status: 3

      },
      options: [{
        value: 3,
        label: '全部'
      }, {
        value: 0,
        label: '正常'
      }, {
        value: 1,
        label: '下线'
      }],
      filter_list: [
        { "text": '=0%', 'value': -1 },
        { "text": '>0%', 'value': 0 },
        { "text": '>5%', 'value': 0.5 },
        { "text": '>10%', 'value': 0.1 },
        { "text": '>15%', 'value': 0.15 }
      ],
      dialogFormVisible1: false,
      downloadLoading: false,
      category_show: true,
      categoryoptions: [],
      showDetail: false,
      total_real_time_tatol: 0,
      total_filter_num: 0,
      total_filter_proportion: 0,
      total_activation_num: 0,
      total_ex_num: 0,
      total_ex_add_num: 0,
      total_ip_num: 0,
      total_exception_proportion: 0,
      total_valid_proportion: 0,
      total_valid_add_num: 0,
      appRetention:0,
      showAppRetention:false,
      dialogFormVisiblePacakge:false,
      needAddPacageList:[],
    }
  },




  created() {

    var end = new Date();
    var start = new Date();
    var datearray = new Array();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
    start = this.formatDate(start);
    end = this.formatDate(end);
    datearray = [start, end];

    this.listQuery.daterange = datearray;
    this.getList();
    this.getChuanhshanjiaAppList();
    this.getChannelList();


  },
  methods: {
    getListV1() {
      this.listLoading = true;
      getFilterIpDataList(this.listQuery).then(response => {
        var current_date = this.dataFormat() + " 00:00:00";
        if (response.code == 0) {
          response.datalist.map(item => {
            item.real_time_tatol = item.activation_num + item.filter_num;
            if (item.real_time_tatol == 0) {
              item.filter_proportion = '0%';
              item.valid_add_num = 0;

              item.exception_proportion = '0%';
              item.valid_proportion = '0%';
            } else {
              item.filter_proportion = ((item.filter_num / item.real_time_tatol) * 100).toFixed(1) + "%";
              item.valid_add_num = item.activation_num - item.ex_add_num;


              item.exception_proportion = ((item.ex_add_num / item.real_time_tatol) * 100).toFixed(1) + "%";
              item.valid_proportion = ((item.valid_add_num / item.real_time_tatol) * 100).toFixed(1) + "%";
            }


            if (new Date(item.end_date).getTime() - new Date(current_date).getTime() >= 0) {
              item.status = false
            } else {
              item.status = true
            }

             item.aiyou_keep = (item.aiyou_keep*100).toFixed(1) + "%";
             console.log(item.aiyou_keep);
          })
          var total_real_time_tatol = 0;
          var total_filter_num = 0;
          var total_filter_proportion = 0;
          var total_activation_num = 0;
          var total_ex_num = 0;
          var total_ex_add_num = 0;
          var total_ip_num = 0;
          var total_exception_proportion = 0;
          var total_valid_proportion = 0;
          var total_valid_add_num = 0;

          response.datalist.map(item => {
            total_real_time_tatol = total_real_time_tatol + item.real_time_tatol;
            total_filter_num = total_filter_num + item.filter_num;
            total_activation_num = total_activation_num + item.activation_num;
            total_ex_num = total_ex_num + item.ex_num;
            total_ex_add_num = total_ex_add_num + item.ex_add_num;
            total_ip_num = total_ip_num + item.ip_num;
            total_valid_add_num = total_valid_add_num + item.valid_add_num;
          })
          // console.log(total_filter_num / total_real_time_tatol)
          // console.log((total_filter_num / total_real_time_tatol).toFixed(2))
          // console.log((total_filter_num / total_real_time_tatol).toFixed(2)*100);
          total_filter_proportion = ((total_filter_num / total_real_time_tatol)*100).toFixed(2)  + "%";
          total_valid_proportion = ((total_valid_add_num / total_real_time_tatol)* 100).toFixed(2)  + "%";
          total_exception_proportion = ((total_ex_add_num / total_real_time_tatol)* 100).toFixed(2)  + "%";
          this.tableData = response.datalist;

          this.total_real_time_tatol = total_real_time_tatol;
          this.total_filter_num = total_filter_num;
          this.total_filter_proportion = total_filter_proportion;
          this.total_activation_num = total_activation_num;
          this.total_ex_num = total_ex_num;
          this.total_ex_add_num = total_ex_add_num;
          this.total_ip_num = total_ip_num;
          this.total_exception_proportion = total_exception_proportion
          this.total_valid_proportion = total_valid_proportion
          this.total_valid_add_num = total_valid_add_num
          //  this.length = response.data.count
        } else {

        }

        this.listLoading = false
      })

    },
     getList() {
      this.listLoading = true;
      getFilterIpDataList(this.listQuery).then(response => {
        var current_date = this.dataFormat() + " 00:00:00";
        // console.log(current_date);
        if (response.code == 0) {
          response.datalist.map(item => {
            item.real_filter_num = item.real_activation_count - item.activation_num;
            if (item.real_activation_count == 0) {
              item.real_filter_proportion = '0%';
              item.valid_add_num = 0;
              item.exception_proportion = '0%';
              item.valid_proportion = '0%';

            } else {
              item.real_filter_proportion = ((item.real_filter_num / item.real_activation_count) * 100).toFixed(1) + "%";
              item.valid_add_num = item.activation_num - item.ex_add_num;

              item.exception_proportion = ((item.ex_add_num / item.real_activation_count) * 100).toFixed(1) + "%";
              item.valid_proportion = ((item.valid_add_num / item.real_activation_count) * 100).toFixed(1) + "%";
            }



            // console.log(new Date(item.end_date).getTime() , new Date(current_date).getTime());
            if (new Date(item.end_date).getTime() - new Date(current_date).getTime() >= 0) {
              item.status = false
            } else {
              item.status = true
            }
       item.aiyou_keep = (item.aiyou_keep*100).toFixed(1) + "%";


          })
          var total_real_time_tatol = 0;
          var total_filter_num = 0;
          var total_filter_proportion = 0;
          var total_activation_num = 0;
          var total_ex_num = 0;
          var total_ex_add_num = 0;
          var total_ip_num = 0;
          var total_exception_proportion = 0;
          var total_valid_proportion = 0;
          var total_valid_add_num = 0;

          response.datalist.map(item => {
          
            total_real_time_tatol = total_real_time_tatol + Number(item.real_activation_count);
            total_filter_num = total_filter_num + Number(item.real_filter_num);
            total_activation_num = total_activation_num + Number(item.activation_num);
            total_ex_num = total_ex_num + Number(item.ex_num);
            total_ex_add_num = total_ex_add_num + Number(item.ex_add_num);
            total_ip_num = total_ip_num + Number(item.ip_num);
            total_valid_add_num = total_valid_add_num + Number(item.valid_add_num);
          })
          
          // console.log(total_real_time_tatol);
          total_filter_proportion = ((total_filter_num / total_real_time_tatol)*100).toFixed(2)  + "%";
          total_valid_proportion = ((total_valid_add_num / total_real_time_tatol)* 100).toFixed(2)  + "%";
          total_exception_proportion = ((total_ex_add_num / total_real_time_tatol)* 100).toFixed(2)  + "%";
          this.tableData = response.datalist;

          this.total_real_time_tatol = total_real_time_tatol;
          this.total_filter_num = total_filter_num;
          this.total_filter_proportion = total_filter_proportion;
          this.total_activation_num = total_activation_num;
          this.total_ex_num = total_ex_num;
          this.total_ex_add_num = total_ex_add_num;
          this.total_ip_num = total_ip_num;
          this.total_exception_proportion = total_exception_proportion
          this.total_valid_proportion = total_valid_proportion
          this.total_valid_add_num = total_valid_add_num
          //  this.length = response.data.count
        } else {

        }

        this.listLoading = false
      })

    },

    getSummaries(param) {
      // const { columns, data } = param;
      // const sums = [];
      // var datalist = this.tableData;
      // columns.forEach((column, index) => {
      //   if (index === 0) {

      //   var total_real_time_tatol = 0;
      //   var total_filter_num = 0;
      //   var total_filter_proportion = 0;
      //   var total_activation_num = 0;
      //   var total_ex_num = 0;
      //   var total_ex_add_num = 0;
      //   var total_ip_num = 0;
      //   var total_exception_proportion = 0;
      //   var total_valid_proportion = 0;
      //   var total_valid_add_num = 0;
      //    this.tableData.map(item=>{
      //      total_real_time_tatol = item.real_time_tatol;
      //     total_filter_num = item.filter_num;
      //     total_activation_num = item.activation_num;
      //     total_ex_num = item.ex_num;
      //     total_ex_add_num = item.ex_add_num;
      //     total_ip_num = item.ip_num;
      //     total_valid_add_num = item.valid_add_num;
      //   })
      //   total_filter_proportion = (total_filter_num / total_real_time_tatol).toFixed(2)*100 + "%"; 
      //   total_valid_proportion = (total_valid_add_num / total_real_time_tatol).toFixed(2)*100 + "%";
      //   total_exception_proportion = (total_ex_add_num / total_real_time_tatol).toFixed(2);

      //    return 
      //   }else{

      //   }
      // });





      // return ['合计','-','-','-',
      // this.total_real_time_tatol,this.total_filter_num,this.total_filter_proportion,'-',this.total_activation_num,  
      // this.total_ex_num,this.total_ex_add_num,this.total_ip_num,
      // this.total_exception_proportion,this.total_valid_proportion,this.total_valid_add_num];

    },
    filterFilterProportion(value, row) {
      // console.log(value, row);
      if (value == -1) {
        return this.toNum(row.real_filter_proportion) == 0;
      } else {
        return this.toNum(row.real_filter_proportion) > value;
      }



    },
    filter_aiyou_keep(value, row) {
      // console.log(value, row);   
        return this.toNum(row.aiyou_keep) == 0;
  
  },
    filterFilterRealTimeTatol(value, row) {
      // console.log(row.real_time_tatol,value);
      if (value == -1) {
        return row.real_activation_count != 0;
      }
      return row.real_activation_count == value;
    },
    filterExceptionProportion(value, row) {
      if (value == -1) {
        return this.toNum(row.exception_proportion) == 0;
      } else {
        return this.toNum(row.exception_proportion) > value;
      }

    },
    arraySpanMethod({ row, column, rowIndex, colunmIndex }) {
      // console.log({ row, column, rowIndex, colunmIndex });
    },
    getChuanhshanjiaAppList() {
      getChuanhshanjiaAppList().then(response => {
        if (response.code == 0) {
          response.datalist.unshift({ app_id: 0, app_name: '全部' });
          this.categoryoptions = response.datalist;
        }

      })
    },
    getChannelList() {
      getChannelList().then(response => {
        if (response.code == 0) {
          response.datalist.unshift({ channel_id: 0, channel_name: '全部' })
          this.channelOptions = response.datalist;
        }
      })
    },
    getFilterIpDateDetailList(index, row) {
      this.dialogFormVisible1 = true;
      getFilterIpDateDetailList(row).then(response => {
        if (response.code == 0) {
          this.filterData = response.datalist;
        }
      })
    },
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
      this.showAppRetention = false;
     
      if(this.listQuery.app_id != 0){
          // console.log("getRetentionByAppID");
          this.showAppRetention = true;
         this.getRetentionByAppId(this.formatDate(start_date),this.formatDate(end_date),this.listQuery.app_id);
         if(start_date-end_date==0){
            checkChannelUserIdisFull(this.listQuery.app_id,this.formatDate(start_date)).then(response=>{
              if(response.datalist.length==0){

              }else{
                  this.needAddPacageList = response.datalist;
                   this.dialogFormVisiblePacakge = true;
              }
         })
      }
}
      this.getList();

    },
    updateChuanshanjiaClientData(){
        updateChuanshanjiaClientData().then(response=>{
           if(response.code == 0){
                this.$message({
            message: "更新成功",
            type: "success"
          });
          return false;
           }
        })
    },
    getRetentionByAppId(start_activation_date,end_activation_date,app_id){

        getRetentionByAppID(start_activation_date,end_activation_date,app_id).then(response=>{
             if(response.data != "underfind"){
                this.appRetention = (response.data.app_retention*100).toFixed(2) + "%"; 
             }else{
                this.addRetention = 0;
             }
            
        })
    },
    dataFormat() { //author: meizz   
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;

    },


    handleManage(index, row) { //获得指定返现的详细信息

      var receipt_id = row.receipt_id;
      this.getDetail(receipt_id);
    },
    sort_real_time_tatol(obj1, obj2) {
      return obj1.real_activation_count - obj2.real_activation_count;
    },
    sort_real_filter_num(obj1, obj2) {
      return obj1.real_filter_num - obj2.real_filter_num;
    },
    sort_ip_num(obj1, obj2) {
      return obj1.ip_num - obj2.ip_num;
    },
    sort_filter_proportion(obj1, obj2) {
      return this.toNum(obj1.filter_proportion) - this.toNum(obj2.filter_proportion);
    },
    sort_ex_num(obj1, obj2) {
      return obj1.ex_num - obj2.ex_num;
    },
    sort_ex_add_num(obj1, obj2) {
      return obj1.ex_add_num - obj2.ex_add_num;
    },

    sort_exception_proportion(obj1, obj2) {
      return this.toNum(obj1.exception_proportion) - this.toNum(obj2.exception_proportion);
    },
    sort_valid_add_num(obj1, obj2) {
      return obj1.valid_add_num - obj2.valid_add_num;
    },
    sort_valid_proportion(obj1, obj2) {
      return this.toNum(obj1.valid_proportion) - this.toNum(obj2.valid_proportion);
    },
    sort_user_id(obj1, obj2) {
      return obj1.user_id - obj2.user_id;
    },
    sort_channel_name(obj1, obj2) {
      return obj1.channel_id - obj2.channel_id;
    },
    sort_activation_num(obj1, obj2) {
      return obj1.activation_num - obj2.activation_num;
    },
    sort_app_name(obj1, obj2) {
      return obj1.app_name_id - obj2.app_name_id;
    },
    sort_aiyou_keep(obj1,obj2){
      return this.toNum(obj1.aiyou_keep) - this.toNum(obj2.aiyou_keep);
    },

    meassageBox(meassage, type) {
      this.$message({
        message: meassage,
        type: type
      });
    },
    toNum(percent) {
      var num = percent.replace("%", "") / 100;
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
<style>
.filter-header {
  font-size: 8px;
}

</style>
