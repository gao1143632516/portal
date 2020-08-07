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
      <div style="display: inline-block;">
        包号: <el-input v-model.trim="listQuery.user_id" auto-complete="off" size="mini" style="width: 100px"></el-input>
      </div>
      <div style="display:inline-block;width: 120px">
        渠道：<el-select v-model="listQuery.channel_id" placeholder="渠道" size="mini">
          <el-option v-for="item in channelOptions" :key="item.channel_id" :label="item.channel_name" :value="item.channel_id">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="handleFilter()">搜索</el-button>
      <el-popover placement="right" width="200" trigger="click">
        <el-checkbox-group v-model="colOptions">
        <el-col :span="12" v-for="item in colSelect" :key="item" >
          <el-checkbox :label="item"></el-checkbox>
        </el-col>
          
        </el-checkbox-group>
        <el-button slot="reference" size="mini">列选择</el-button>
      </el-popover>
    </div>
    <div class="tableData1">
      <el-table :data="tableData1" v-loading="listLoading1" style="font-size: 10px" stripe :row-style="{height:'0px'}" :cell-style="{padding:'0px'}">
        <el-table-column label="石墨1" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.shimo1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="石墨1%" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.shimo1_percentage}}</span>
          </template>
        </el-table-column>
        <el-table-column label="石墨2" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.shimo2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="石墨2%" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.shimo2_percentage}}</span>
          </template>
        </el-table-column>
        <el-table-column label="石墨3" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.shimo3}}</span>
          </template>
        </el-table-column>
        <el-table-column label="石墨3%" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.shimo3_percentage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="哎呦新增" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.activation_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="石墨新增%" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.shimo_add_percentage}}</span>
          </template>
        </el-table-column>
        <el-table-column label="哎呦有效" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.aiyou_efficacious }}</span>
          </template>
        </el-table-column>
        <el-table-column label="石墨有效%" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.shimo_efficacious_percentage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="石墨1收入" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.shimo1_income }}</span>
          </template>
        </el-table-column>
        <el-table-column label="石墨3收入" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.shimo3_income }}</span>
          </template>
        </el-table-column>
        <el-table-column label="官方结算%" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.shimo_official_settlement_percentage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="截图总量" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.settlement_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="截图支出" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.disburse }}</span>
          </template>
        </el-table-column>
        <el-table-column label="石墨1毛利" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.profits1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="石墨2毛利" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.profits2 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="石墨3毛利" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.profits3 }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableDataTotal">
      <el-table :data="tableDataTotal" v-loading="listLoading2" style="font-size: 10px" stripe :row-style="{height:'0px'}" :cell-style="{padding:'0px'}">
        <el-table-column label="实时" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.real_activation_count}}</span>
          </template>
        </el-table-column>
        <el-table-column label="过滤" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.filter_count}}</span>
          </template>
        </el-table-column>
        <el-table-column label="过滤%" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.filter_count_percentage}}</span>
          </template>
        </el-table-column>
        <el-table-column label="新增" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.activation_num}}</span>
          </template>
        </el-table-column>
        <el-table-column label="IP总量" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.ip_num}}</span>
          </template>
        </el-table-column>
        <el-table-column label="异常IP" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.ex_num}}</span>
          </template>
        </el-table-column>
        <el-table-column label="异IP增量" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.ex_add_num}}</span>
          </template>
        </el-table-column>
        <el-table-column label="异常IP增量%" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.ex_add_num_percentage}}</span>
          </template>
        </el-table-column>
        <el-table-column label="有效量" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.aiyou_efficacious }}</span>
          </template>
        </el-table-column>
        <el-table-column label="有效%" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.aiyou_efficacious_percentage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="截图%" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.settlement_rate_percentage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="截图量" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.settlement_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="截图支出" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.disburse1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="1毛利" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.profits1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="3毛利" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.profits3}}</span>
          </template>
        </el-table-column>
        <el-table-column label="1毛利%" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.profits1_percentage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="3毛利%" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.profits3_percentage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结算单%" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.settlement_rate_percentage3 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结算额" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.disburse3 }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableData2">
      <el-table :data="tableData2" style="font-size: 10px" height="800" v-loading="listLoading3" stripe :row-style="{height:'0px'}" :cell-style="{padding:'0px'}" ref="tableData2">
        <el-table-column label="日期" min-width="80"  prop="data_dt" v-if="colData[0].istrue">
          <template slot-scope="scope">
            <span>{{ scope.row.data_dt}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品" min-width="80" prop="app_name" v-if="colData[1].istrue">
          <template slot-scope="scope">
            <span>{{ scope.row.app_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道" min-width="80" sortable prop="channel_name" v-if="colData[2].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.channel_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包号" min-width="80" prop="user_id" v-if="colData[3].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.user_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实时" min-width="80" prop="real_time_tatol" v-if="colData[4].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.real_activation_count}}</span>
          </template>
        </el-table-column>
        <el-table-column label="过滤" min-width="50" prop="real_filter_num" v-if="colData[5].istrue">
          <template slot-scope="scope">
            <el-button type="text"><span style="margin-left: 10px">{{ scope.row.real_filter_num }}</span></el-button>
          </template>
        </el-table-column>
        <el-table-column label="过滤%" min-width="80" prop="filter_proportion" v-if="colData[6].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.real_filter_proportion }}</span>
          </template>
        </el-table-column>
        <el-table-column label="新增" min-width="80" prop="activation_num" v-if="colData[7].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.activation_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="IP总量" min-width="80" prop="ip_num" v-if="colData[8].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.ip_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="异常IP" min-width="80" prop="ex_num" v-if="colData[9].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.ex_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="异ip增量" min-width="80" prop="ex_add_num" v-if="colData[10].istrue">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.ex_add_num }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="异常ip增量%" min-width="80" prop="exception_proportion" v-if="colData[11].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.exception_proportion }}</span>
          </template>
        </el-table-column>
        <el-table-column label="有效量" min-width="80" prop="valid_add_num" v-if="colData[12].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.valid_add_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="有效%" min-width="80" prop="valid_proportion" v-if="colData[13].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.valid_proportion }}</span>
          </template>
        </el-table-column>
        <el-table-column label="哎呦留存" prop="aiyou_keep" v-if="colData[14].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.aiyou_keep }}</span>
          </template>
        </el-table-column>
        <el-table-column label="截图%" prop="settlement_rate" v-if="colData[15].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.settlement_rate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="截图量"  sortable :sort-method="sort_settlement_num" prop="settlement_num" v-if="colData[16].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.settlement_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="截图支出" prop="disburse" v-if="colData[17].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.disburse }}</span>
          </template>
        </el-table-column>
        <el-table-column label="1毛利" prop="profits" v-if="colData[18].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.profits }}</span>
          </template>
        </el-table-column>
        <el-table-column label="1毛利%" prop="profits1_percentage" v-if="colData[19].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.profits1_percentage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="3毛利" prop="profits3" v-if="colData[20].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.profits3 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="3毛利%" prop="profits3_percentage" v-if="colData[21].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.profits3_percentage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结算单%" min-width="100" prop="settlement_rate3" v-if="colData[22].istrue">
          <template slot-scope="scope">
            <el-input auto-complete="off" @input="recountRate(scope.$index,scope.row)" v-model="scope.row.settlement_rate3"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="结算额" min-width="80" prop="disburse3" v-if="colData[23].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.disburse3 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" cell-class-name="cell-class" size="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="toSave(scope.$index, scope.row)">确认</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="80" prop="status" v-if="colData[24].istrue">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.status==false" type='warning' style="margin-left: 10px">正常</el-tag>
            <el-tag v-show="scope.row.status==true" type='danger' style="margin-left: 10px"> 下线</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="上线时间" min-width="80" prop="start_date" v-if="colData[25].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.start_date.split(" ")[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下线时间" min-width="80" prop="end_date" v-if="colData[26].istrue">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.end_date.split(" ")[0] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[100]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getFilterIpDataList,
  getChuanhshanjiaAppList,
  getChannelList,
  getFilterIpDateDetailList,
  getRetentionByAppID,
  checkChannelUserIdisFull,
  updateChuanshanjiaClientData,
  getFinalStatement,
  getOfficialStaticsData,
  toSetChuanShanjiaData,
  getFinalStatementSum
} from '@/api/channel';
export default {
  data() {
    return {
      length: 0,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      filterData: [],
      channelOptions: [],
      listLoading1: true,
      listLoading2: true,
      listLoading3: true,
      formLabelWidth: '120px',
      tableDataTotal: [],
      listQuery: {
        app_id: 0,
        user_id: '',
        channel_id: 0,
        daterange: [],
        status: 3,
        page: 1,
        limit: 100

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
      appRetention: 0,
      showAppRetention: false,
      dialogFormVisiblePacakge: false,
      needAddPacageList: [],
      colData: [{
        id: 0,
        istrue: true,
        property: "data_dt",
        label: "日期"
      }, {
        id: 1,
        istrue: true,
        property: "app_name",
        label: "产品"
      }, {
        id: 2,
        istrue: true,
        property: "channel_name",
        label: "渠道"
      }, {
        id: 3,
        istrue: true,
        property: "user_id",
        label: "包号"
      }, {
        id: 4,
        istrue: true,
        property: "real_time_tatol",
        label: "实时"
      }, {
        id: 5,
        istrue: true,
        property: "real_filter_num",
        label: "过滤"
      }, {
        id: 6,
        istrue: true,
        property: "filter_proportion",
        label: "过滤%"
      }, {
        id: 7,
        istrue: true,
        property: "activation_num",
        label: "新增"
      }, {
        id: 8,
        istrue: true,
        property: "ip_num",
        label: "IP总量"
      }, {
        id: 9,
        istrue: true,
        property: "ex_num",
        label: "异常IP"
      }, {
        id: 10,
        istrue: true,
        property: "ex_add_num",
        label: "异ip增量"
      }, {
        id: 11,
        istrue: true,
        property: "exception_proportion",
        label: "异常ip增量%"
      }, {
        id: 12,
        istrue: true,
        property: "valid_add_num",
        label: "有效量"
      }, {
        id: 13,
        istrue: true,
        property: "valid_proportion",
        label: "有效%"
      }, {
        id: 14,
        istrue: true,
        property: "aiyou_keep",
        label: "哎呦留存"
      }, {
        id: 15,
        istrue: true,
        property: "settlement_rate",
        label: "截图%"
      }, {
        id: 16,
        istrue: true,
        property: "settlement_num",
        label: "截图量"
      }, {
        id: 17,
        istrue: true,
        property: "disburse",
        label: "截图支出"
      }, {
        id: 18,
        istrue: true,
        property: "profits",
        label: "1毛利"
      }, {
        id: 19,
        istrue: true,
        property: "profits1_percentage",
        label: "1毛利%"
      }, {
        id: 20,
        istrue: true,
        property: "profits3",
        label: "3毛利"
      }, {
        id: 21,
        istrue: true,
        property: "profits3_percentage",
        label: "3毛利%"
      }, {
        id: 22,
        istrue: true,
        property: "settlement_rate3",
        label: "结算单%"
      }, {
        id: 23,
        istrue: true,
        property: "disburse3",
        label: "结算额"
      }, {
        id: 25,
        istrue: true,
        property: "status",
        label: "状态"
      }, {
        id: 26,
        istrue: true,
        property: "start_date",
        label: "上线时间"
      }, {
        id: 27,
        istrue: true,
        property: "end_date",
        label: "下线时间"
      }],
      colOptions: [],
      colSelect: [],
    }
  },




  created() {
    var _this = this;
    for (let i = 0; i < _this.colData.length; i++) {
      _this.colSelect.push(_this.colData[i].label);
      if (_this.colData[i].label == '名称') { //初始化不想展示的列可以放在这个条件里
        continue;
      }
      _this.colOptions.push(_this.colData[i].label);

    }



    var end = new Date();
    var start = new Date();
    var datearray = new Array();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    end.setTime(end.getTime() - 3600 * 1000 * 24 * 25)
    start = this.formatDate(start);
    end = this.formatDate(end);
    datearray = [start, end];

    this.listQuery.daterange = datearray;
    this.getList();
    this.getChuanhshanjiaAppList();
    this.getChannelList();
    this.getOfficialStaticsData();
    this.getFinalStatementSum();

  },

watch: {
  colOptions(valArr) {
    console.log(valArr);
    var arr = this.colSelect.filter(i => valArr.indexOf(i) < 0); // 未选中
    this.colData.filter(i => {
      if (arr.indexOf(i.label) != -1) {
        i.istrue = false;
        this.$nextTick(() => {
         this.$refs.tableData2.doLayout();
        });
      } else {
        i.istrue = true;
        this.$nextTick(() => {
         this.$refs.tableData2.doLayout();
        });
      }
    });
  }
}
,
  methods: {

    getList() {
      this.listLoading3 = true;
      getFinalStatement(this.listQuery).then(response => {
        var current_date = this.dataFormat() + " 00:00:00";
        // console.log(current_date);
        response.data.list.map(item => {
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

          if (new Date(item.end_date).getTime() - new Date(current_date).getTime() >= 0) {
            item.status = false
          } else {
            item.status = true
          }

          item.aiyou_keep = (item.aiyou_keep * 100).toFixed(1) + "%";
          item.data_dt = item.data_dt.split(" ")[0];
          item.settlement_rate = this.toPercent(item.settlement_rate);
          if (item.profits == 0) {
            item.profits1_percentage = 0;
          } else {
            item.profits1_percentage = this.toPercent(item.profits / item.income);
          }
          if (item.profits3 == 0) {
            item.profits3_percentage = 0;
          } else {
            item.profits3_percentage = this.toPercent(item.profits3 / item.income3);
          }
          // item.final_profits = item.profits3 - item.disburse3;
          item.settlement_rate3 = this.toPercentNot(item.settlement_rate3);
        })

        this.tableData2 = response.data.list;
        this.length = response.data.count;

        this.listLoading3 = false
      })

    },
    getOfficialStaticsData() {
      this.listLoading2 = true;
      getOfficialStaticsData(this.listQuery).then(response => {
        response.datalist.forEach(item => {
          if (item.shimo1 != 0) {
            item.shimo1_percentage = this.toPercent(item.shimo3 / item.shimo1);
            item.shimo2_percentage = this.toPercent(item.shimo2 / item.shimo1);
            item.shimo3_percentage = this.toPercent(item.shimo3 / item.shimo1);
            item.shimo_official_settlement_percentage = this.toPercent(item.shimo3 / item.shimo1);

          } else {
            item.shimo1_percentage = 0;
            item.shimo2_percentage = 0;
            item.shimo3_percentage = 0;
            item.shimo_official_settlement_percentage = 0;
          }
          if (item.aiyou_efficacious != 0) {
            item.shimo_efficacious_percentage = this.toPercent(item.shimo3 / item.aiyou_efficacious);
          } else {
            item.shimo_efficacious_percentage = 0
          }
          if (item.activation_num != 0) {
            item.shimo_add_percentage = this.toPercent(item.shimo3 / item.activation_num);
          } else {
            item.shimo_add_percentage = 0;
          }




        })

        this.tableData1 = response.datalist;
        this.listLoading2 = false;
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


      this.getList();
      this.getOfficialStaticsData();
      this.getFinalStatementSum();

    },
    updateChuanshanjiaClientData() {
      updateChuanshanjiaClientData().then(response => {
        if (response.code == 0) {
          this.$message({
            message: "更新成功",
            type: "success"
          });
          return false;
        }
      })
    },
    getRetentionByAppId(start_activation_date, end_activation_date, app_id) {

      getRetentionByAppID(start_activation_date, end_activation_date, app_id).then(response => {
        if (response.data != "underfind") {
          this.appRetention = (response.data.app_retention * 100).toFixed(2) + "%";
        } else {
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


    // handleManage(index, row) { //获得指定返现的详细信息

    //   var receipt_id = row.receipt_id;
    //   this.getDetail(receipt_id);
    // },
    // sort_real_time_tatol(obj1, obj2) {
    //   return obj1.real_activation_count - obj2.real_activation_count;
    // },
    // sort_real_filter_num(obj1, obj2) {
    //   return obj1.real_filter_num - obj2.real_filter_num;
    // },
    // sort_ip_num(obj1, obj2) {
    //   return obj1.ip_num - obj2.ip_num;
    // },
    // sort_filter_proportion(obj1, obj2) {
    //   return this.toNum(obj1.filter_proportion) - this.toNum(obj2.filter_proportion);
    // },
    // sort_ex_num(obj1, obj2) {
    //   return obj1.ex_num - obj2.ex_num;
    // },
    // sort_ex_add_num(obj1, obj2) {
    //   return obj1.ex_add_num - obj2.ex_add_num;
    // },

    // sort_exception_proportion(obj1, obj2) {
    //   return this.toNum(obj1.exception_proportion) - this.toNum(obj2.exception_proportion);
    // },
    // sort_valid_add_num(obj1, obj2) {
    //   return obj1.valid_add_num - obj2.valid_add_num;
    // },
    // sort_valid_proportion(obj1, obj2) {
    //   return this.toNum(obj1.valid_proportion) - this.toNum(obj2.valid_proportion);
    // },
    // sort_user_id(obj1, obj2) {
    //   return obj1.user_id - obj2.user_id;
    // },
    // sort_channel_name(obj1, obj2) {
    //   return obj1.channel_id - obj2.channel_id;
    // },
    // sort_activation_num(obj1, obj2) {
    //   return obj1.activation_num - obj2.activation_num;
    // },
    // sort_app_name(obj1, obj2) {
    //   return obj1.app_name_id - obj2.app_name_id;
    // },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    toPercent(num) {
      var percent = Number(num * 100).toFixed(2) + "%";
      return percent;
    },
    toPercentNot(num) {
      var percent = Number(num * 100).toFixed(2);
      return percent;
    },
    toNumNot(percent) {
      var num = percent / 100;
      return num;
    },
    toNum(percent) {
      var num = percent.replace("%", "") / 100;
      return num;
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
    },
    recountRate(index, row) {
      row.settlement_num3 = Math.round(this.toNumNot(row.settlement_rate3) * row.activation_num);
      row.disburse3 = (row.settlement_num3 * row.outer_settlement_price).toFixed(1);
      row.profits3 = parseFloat(row.income3 - row.disburse3).toFixed(1);

    },
    toSave(index, row) {
      console.log(row);
      var copy = Object.assign({}, row);
      copy['activation_date'] = copy.data_dt;
      copy['activation_count'] = copy.activation_num;
      copy.settlement_rate = this.toNumNot(copy.settlement_rate3);
      copy.settlement_num = copy.settlement_num3;
      copy.disburse = copy.disburse3;
      copy.income = copy.income3;
      copy.profits = copy.profits3;
      copy.type = 3;
      this.toSetChuanShanjiaData(copy);
    },
    toSetChuanShanjiaData(json) {

      toSetChuanShanjiaData(json).then(response => {
        this.$message({
          type: 'info',
          message: '设置成功'
        });

        this.getOfficialStaticsData();
        this.getFinalStatementSum();

      })
    },
    getFinalStatementSum() {
      this.listLoading1 = true;
      getFinalStatementSum(this.listQuery).then(response => {
        console.log(response.datalist);

        response.datalist.forEach(item => {
          item.aiyou_efficacious_percentage = this.toPercent(item.aiyou_efficacious_percentage);
          item.ex_add_num_percentage = this.toPercent(item.ex_add_num_percentage);
          item.filter_count_percentage = this.toPercent(item.filter_count_percentage);
          item.profits1_percentage = this.toPercent(item.profits1_percentage);
          item.profits3_percentage = this.toPercent(item.profits3_percentage);
          item.settlement_rate_percentage = this.toPercent(item.settlement_rate_percentage);

          item.settlement_rate_percentage3 = this.toPercent(item.settlement_rate_percentage3);
        })

        this.tableDataTotal = response.datalist;
        this.listLoading1 = false;
      })
    },
    sort_settlement_num(obj1,obj2){
      return obj1.settlement_num - obj2.settlement_num;
    },

  }
}

</script>
<style>
.filter-header {
  font-size: 8px;
}

</style>
