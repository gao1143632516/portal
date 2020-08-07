<template>
  <div class="app-container">
 
    <div style="display:inline-block;width: 100px;">
      app： <el-select v-model="app_id"  placeholder="请选择APP" @change="changeDate" size="mini">
        <el-option v-for="item in appList" :key="item.app_id" :label="item.app_name" :value="item.app_id">
        </el-option>
      </el-select>
    </div>
    <div style="display:inline-block;width:150px;">
      <span>日期</span>
      <el-date-picker size="mini" v-model="activation_date" @change="changeDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
      </el-date-picker>
    </div>
    <div style="display: inline-block;width: 100px;">
      <span>结算单价(元)</span>
      <el-input v-model.trim="settlement_price" :disabled="true" auto-complete="off" size="mini"></el-input>
    </div>
    <div style="display: inline-block;width: 100px;">
      <span>穿山甲量</span>
      <el-input v-model.trim="chuanshanjia_num" :disabled="true" auto-complete="off" size="mini"></el-input>
    </div>
    <div style="display: inline-block;width: 100px;">
      <span>穿山甲实时</span>
      <el-input v-model.trim="chuanshanjia_num_infact" :disabled="true" auto-complete="off" size="mini"></el-input>
    </div>
    <div style="display: inline-block;width: 100px;">
      <span>实时差异</span>
      <el-input v-model.trim="chuanshanjia_num_infact_difference" :disabled="true" auto-complete="off" size="mini"></el-input>
    </div>
    <div style="display: inline-block;width: 100px;">
      <span>穿山甲留存(%)</span>
      <el-input v-model.trim="chuanshanjia_keep" :disabled="true" @blur.prevent="change_retained_coefficient()" auto-complete="off" size="mini"></el-input>
    </div>

    <div style="display: inline-block;width: 100px;">
      <el-button size="mini">石墨量2</el-button>
      <!-- <span @click="getShimoNumHistory">  <i class="el-icon-caret-top"></i></span> -->
      <el-input v-model.trim="shimo_num" auto-complete="off" size="mini"></el-input>
    </div>
    <div style="display: inline-block;width: 100px;">
      <span>石墨量占比(%)</span>
      <!-- <span>{{chuanshanjia_proportion}}</span> -->
      <el-input v-model.trim="shimo_proportion" auto-complete="off" size="mini" :disabled="true"></el-input>
    </div>
      <div style="display: inline-block;width: 100px;">
      <span>穿山甲占比(%)</span>
      <!-- <span>{{chuanshanjia_proportion}}</span> -->
      <el-input v-model.trim="chuanshanjia_proportion" auto-complete="off" size="mini" :disabled="true"></el-input>
    </div>

      <div style="display: inline-block;width: 100px;">
      <span>毛利率(%)</span>
      <el-input v-model.trim="gross_margin" auto-complete="off" size="mini" :disabled="true"></el-input>
    </div>

     <div style="display: inline-block;width: 100px;">
      <span>留存系数(%)</span>
      <el-input v-model.trim="retained_coefficient" auto-complete="off"  size="mini" :disabled="true" ></el-input>
    </div>
      <div style="display: inline-block;">
      <el-button type="primary" icon="" @click="confirm" size="mini">确认</el-button>
    </div>


  <!--   <div style="display: inline-block;width: 100px;">
      <span>哎呦总量</span>
      <el-input v-model.trim="aiyou_num" auto-complete="off" :disabled="true" size="mini"></el-input>
    </div>
    <div style="display: inline-block;width: 100px;">
      <span>哎呦总留存(%)</span>
      <el-input v-model.trim="aiyou_keep" auto-complete="off" :disabled="true" size="mini"></el-input>
    </div>
    <div style="margin: 20px;">
    <div style="display: inline-block;">
      <el-button type="primary" icon="" @click="confirm" size="mini">确认</el-button>
    </div>
    <div style="display: inline-block;margin-left: 50px">
      <el-button type="primary" size="mini" icon="" @click="find">查询</el-button>
    </div>

    <div style="display: inline-block;margin-left: 50px">
      <el-button type="primary" size="mini" icon="" @click="batchCommit()">批量提交</el-button>
    </div>
   </div>
  -->

   <div class="total" style="margin: 20px">


       汇总： 
        <span style="margin-left:20px; ">包总数：{{package_count}}</span>
       <span style="margin-left:20px; ">结算数：{{settlement_count}}</span>
       <span style="margin-left:20px; ">结算占比：{{toPercent(settlement_count/package_count)=='NaN%' ? 0 : toPercent(settlement_count/package_count)}}</span>
       <span style="margin-left:20px;">支出总额：{{disburse_count}}</span>
       <span style="margin-left:20px;">收入总额：{{income_count}}</span>
       盈利： <el-tag v-show="profits_count>=0" type='success' style="margin-left: 10px"> {{profits_count }}</el-tag>
        <el-tag v-show="profits_count<0" type='danger' style="margin-left: 10px"> {{profits_count }}</el-tag>
         <span style="margin-left:20px;">最终毛利率：{{toPercent(profits_count/income_count)=='NaN%' ? 0 : toPercent(profits_count/income_count)}}</span>
     
      <span>哎呦总量：<el-input v-model.trim="aiyou_num" style="display: inline-block;width: 100px;" auto-complete="off" :disabled="true" size="mini"></el-input></span>
      
    
    
      <span>哎呦总留存(%)：<el-input v-model.trim="aiyou_keep"  style="display: inline-block;width: 100px;" auto-complete="off" :disabled="true" size="mini"></el-input></span>
        <el-button type="primary" size="mini" icon="" @click="find">查询</el-button>
         <el-button type="primary" size="mini" icon="" @click="batchCommit()">批量提交</el-button>
   </div>

 
  

    <el-table :data="dataList" v-loading="listLoading" :row-class-name="tableRowClassName"
     style="width: 100%;font-size: 10px" header-row-class-name="tableHead" height="800"
     stripe
     :row-style="{height:'0px'}"
    :cell-style="{padding:'0px'}"
   >

    <el-table-column cell-class-name="cell-class"
      type="index"
      width="50" >
    </el-table-column>
     <el-table-column label="渠道" width="100" cell-class-name="cell-class">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.channel_name }}</span>
        </template>
      </el-table-column>
       <el-table-column label="包号" width="100" cell-class-name="cell-class" fixed>
        <template slot-scope="scope">
          <a href="javascript:;"><span style="margin-left: 10px;color: blue;" @click="getUserIdKeepAndRetenttionHistory(scope.$index, scope.row)">{{ scope.row.user_id }}</span></a>
        </template>
      </el-table-column>
      <el-table-column label="哎呦激活数" width="100" cell-class-name="cell-class" >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.activation_count }}</span>
        </template>
      </el-table-column>
           <el-table-column label="ip个数" width="200" cell-class-name="cell-class" >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ip }} </span>
        </template>
      </el-table-column>
     <!--  <el-table-column label="哎呦留存" width="100" cell-class-name="cell-class">
        <template slot-scope="scope"> 
          <span style="margin-left: 10px">{{ toPercent(toNumNot(retained_coefficient) * scope.row.aiyou_keep) }}</span>
        </template>
      </el-table-column> -->
     


           <el-table-column label="外放单价（元）" width="100" cell-class-name="cell-class">
        <template slot-scope="scope">
          <el-input auto-complete="off" type="number" size="mini" :disabled="true" v-model="scope.row.outer_settlement_price" @input="recount(scope.$index,scope.row)"></el-input>
        </template>
        <!--   <template slot-scope="scope" v-else>
                  
                      <el-input auto-complete="off" v-model="scope.row.outer_settlement_price" v-else></el-input>
                 
                </template> -->
      </el-table-column>
      <!--     <el-table-column
                    label="设置单价"
                    width="100">
                <template slot-scope="scope">
                     <el-input auto-complete="off" v-model="scope.row.outer_settlement_price"></el-input>
               
                </template>
            </el-table-column> -->
      <el-table-column label="结算比例%" width="100" cell-class-name="cell-class">
        <template slot-scope="scope">
          <el-input auto-complete="off" size="mini" :disabled="true" v-model="scope.row.settlement_rate" @input="recountRate(scope.$index,scope.row)"></el-input>
         
        </template>
      </el-table-column>
      <el-table-column label="结算数" width="100" cell-class-name="cell-class">
        <template slot-scope="scope">
            <span>{{scope.row.settlement_num}}</span><!-- 
           <el-input auto-complete="off" v-model="scope.row.settlement_num"></el-input> -->
          <!--   <span style="margin-left: 10px">{{  }}</span> -->
        </template>
      </el-table-column>
        <el-table-column label="截图留存" width="100" cell-class-name="cell-class">
        <template slot-scope="scope">
          <!-- <span style="margin-left: 10px">{{ scope.row.chuanshanjia_keep }}</span> -->
          <el-input auto-complete="off" size="mini" :disabled="true" v-model="scope.row.chuanshanjia_keep"></el-input>
        </template>
      </el-table-column>
  <!--     <el-table-column label="channel_id" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.channel_id }}</span>
        </template>
      </el-table-column> -->
 
       <el-table-column label="收入（元）" width="100" cell-class-name="cell-class">
        <template slot-scope="scope">
          <!-- <el-input auto-complete="off" v-model="scope.row.income"></el-input> -->
          <span>{{scope.row.income}}</span>
        </template>
      </el-table-column>
     
     
      
      
 

      
      <el-table-column label="支出（元）" width="100" cell-class-name="cell-class">
        <template slot-scope="scope">
            <span>{{scope.row.disburse}}</span>
          <!-- <el-input auto-complete="off" v-model="scope.row.disburse"></el-input> -->
        </template>
      </el-table-column>
   
      <el-table-column label="盈收（元）" width="100" cell-class-name="cell-class">

        <template slot-scope="scope">
                  <el-tag v-show="scope.row.profits>=0" type='success' style="margin-left: 10px"> {{ scope.row.profits }}</el-tag>
                  <el-tag v-show="scope.row.profits<0" type='danger' style="margin-left: 10px"> {{ scope.row.profits }}</el-tag>
        
        </template>
      </el-table-column>
       <el-table-column label="支出占比(%)" width="100" cell-class-name="cell-class">

        <template slot-scope="scope">
                <span>{{toPercent(scope.row.disburse/disburse_count)}}</span> 
        
        </template>
      </el-table-column>
      <el-table-column label="毛利率(%)" width="100" cell-class-name="cell-class">

        <template slot-scope="scope">
                  <span>{{toPercent(scope.row.profits/scope.row.income)=="NaN%" ? 0 : toPercent(scope.row.profits/scope.row.income) }}</span>
        
        </template>
      </el-table-column>


      <!--<el-table-column-->
      <!--label="创建时间"-->
      <!--width="180">-->
      <!--<template slot-scope="scope">-->
      <!--<i class="el-icon-time"></i>-->
      <!--<span style="margin-left: 10px">{{ scope.row.createdate }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
     <!--  <el-table-column label="操作" cell-class-name="cell-class" size="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="toSave(scope.$index, scope.row)">出图</el-button>
          <el-button size="mini" type="danger" @click="findPicDetail(scope.$index, scope.row)">明细</el-button>
        </template>
      </el-table-column> -->
    </el-table>


    <el-dialog class="dialogFormVisible" title="出图明细" :visible.sync="dialogFormVisible">
      <div class="list" v-for="(item,index) in PicsDetailList">
        {{item.create_ts}}
      </div>
    </el-dialog>
     <el-dialog class="dialogFormVisible" title="请维护一下渠道包,添加到相应渠道" :visible.sync="dialogFormVisiblePacakge">
      <div class="list" v-for="(item,index) in needAddPacageList">
        {{item.user_id}}------{{item.app_name}}
      </div>
    </el-dialog>
    <el-dialog class="dialogFormVisibleIp" title="ip留存" :visible.sync="dialogFormVisibleIp">
      <div class="list" v-for="(item,index) in retentionIpList">
        {{item.client_ip}}------{{item.percentage}}
      </div>
    </el-dialog>
    <el-dialog class="dialogFormVisible1" title="留存比例明细 " :visible.sync="dialogFormVisible1">
      <div style="margin: 0;padding:0" v-if="userIdKeepAndRentiontionList.length!=0">
        {{userIdKeepAndRentiontionList[0].user_id}}
      </div>
     
      <!--  <div class="list" v-for="(item,index) in userIdKeepAndRentiontionList" >
               {{item.activation_date}} --- {{item.activation_count}} ---- {{item.aiyou_keep}} --- {{item.settlement_rate}}
            </div>  -->
      <template>
        <el-table :data="userIdKeepAndRentiontionList" stripe :row-style="{height:'5px'}"
    :cell-style="{padding:'0px'}">
          <el-table-column prop="activation_date" label="日期" >
          </el-table-column>
          <el-table-column prop="activation_count" label="激活数" >
          </el-table-column>
          <el-table-column prop="aiyou_keep1" label="1日留存">
          </el-table-column>
          <el-table-column prop="aiyou_keep2" label="2日留存">
          </el-table-column>
          <el-table-column prop="aiyou_keep3" label="3日留存">
          </el-table-column>
          <el-table-column prop="aiyou_keep4" label="4日留存">
          </el-table-column>
          <el-table-column prop="aiyou_keep5" label="5日留存">
          </el-table-column>
          <el-table-column prop="aiyou_keep6" label="6日留存">
          </el-table-column>
          <el-table-column prop="aiyou_keep7" label="7日留存">
          </el-table-column>
          <el-table-column prop="settlement_rate" label="结算比例">
          </el-table-column>
        </el-table>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import {getRententionIP,checkChannelUserIdisFull, toSetChuanShanjiaData, getChuanhshanjiaAppList, setChannelAppData, getChannelAppData, getChannelAppUserData, getChuanshanjiaHistory, getUserIdKeepAndRetenttionHistory,getShimoNumHistory,batchCommit} from '@/api/channel';
export default {
  data() {
    return {
      type:0,
      appList: [],
      shiMoHistoryList:[],
      app_id:'',
      activation_date: '',
      settlement_price: 10,
      chuanshanjia_num: 0,
      chuanshanjia_num_infact:0,
      chuanshanjia_keep: 0,
      shimo_num: 0,
     needAddPacageList:[],
      aiyou_num: 0,
      aiyou_keep: 0,
      dataList: [],
      settlement_count:0,
      disburse_count:0,
      income_count:0,
      profits_count:0,
      package_count:0,
      dialogFormVisiblePacakge:false,
      dialogFormVisibleIp:false,
      retentionIpList:[],
      listLoading: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      PicsDetailList: [],
      userIdKeepAndRentiontionList: [],
      gross_margin:0,
      retained_coefficient:0,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },

      },
      value: '',
    }
  },
  created() {
    //this.getList();
    var start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
    start = this.formatDate(start);
    this.activation_date = start;
    this.getChuanhshanjiaAppList();
    this.getType();

  },
  computed:{
          chuanshanjia_proportion:function(){
                if(isNaN(this.chuanshanjia_num/this.aiyou_num)){
                    return 0;
                }
                return this.toPercentNot((this.chuanshanjia_num/this.aiyou_num).toFixed(4));
          },
           shimo_proportion:function(){
            if(isNaN(this.shimo_num/this.aiyou_num)){
                return 0;
            }
                 return this.toPercentNot((this.shimo_num/this.aiyou_num).toFixed(4));
           },
           chuanshanjia_num_infact_difference:function(){
              return this.chuanshanjia_num_infact - this.chuanshanjia_num;
           }     
  },

  methods: {
      change_retained_coefficient(){
          this.retained_coefficient = this.toPercentNot((this.chuanshanjia_keep/this.aiyou_keep).toFixed(4));
      },
    getChuanhshanjiaAppList() {
      getChuanhshanjiaAppList().then(response => {
        if (response.code == 0) {
          this.appList = response.datalist;
        }
      })
    },
    // getShimoNumHistory(){
    //   getShimoNumHistory(this.activation_date,this.app_id).then(response => {
    //     if(response.code == 0){
    //         this.shiMoHistoryList = response.datalist;

    //     }
    //   })
    // },
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
    confirm() {
      var app_id = this.app_id;
      if(app_id==''){
        this.$message({
            type: 'error',
            message: '请先选择应用'
          });
        return false;
      }
      var activation_date = this.activation_date;
      var settlement_price = this.settlement_price;
      var chuanshanjia_num = this.chuanshanjia_num;
      var chuanshanjia_num_infact = this.chuanshanjia_num_infact;
      var chuanshanjia_keep = this.toNumNot(this.chuanshanjia_keep);
      var shimo_num = this.shimo_num
      var aiyou_num = this.aiyou_num
      var aiyou_keep = this.toNumNot(this.aiyou_keep);
      var retained_coefficient = this.toNumNot(this.retained_coefficient);
     // var retained_coefficient = 0;
      var gross_margin = this.toNumNot(this.gross_margin);
      var json = {
        app_id: app_id,
        activation_date: activation_date,
        settlement_price: settlement_price,
        chuanshanjia_num: chuanshanjia_num,
        chuanshanjia_num_infact:chuanshanjia_num_infact,
        chuanshanjia_keep: chuanshanjia_keep,
        shimo_num: shimo_num,
        aiyou_num: aiyou_num,
        aiyou_keep: aiyou_keep,
        retained_coefficient:retained_coefficient,
        gross_margin:gross_margin,
        type:2
      };
      setChannelAppData(json).then(response => {
        if (response.code == 0) {
          this.$message({
            type: 'info',
            message: '设置成功'
          });
        } else {
          alert(response.data.meassage);
        }

      });

    },

    changeDate(e) {
      console.log(e);
      var app_id = this.app_id;
      var  activation_date = this.activation_date
      this.getChannelAppData(app_id, activation_date);
      // this.getShimoNumHistory();
      this.dataList = [];
    },
    getChannelAppData(app_id, activation_date) {
      getChannelAppData(app_id, activation_date).then(response => {
        if (response.code == 0) {
          this.aiyou_keep = (typeof response.data.aiyou_keep == "undefined") ? 0 : response.data.aiyou_keep;
          this.aiyou_num = (typeof response.data.aiyou_num == "undefined") ? 0 : response.data.aiyou_num;
          this.chuanshanjia_keep = typeof response.data.chuanshanjia_keep == "undefined" ? 0 : response.data.chuanshanjia_keep;
          this.chuanshanjia_num = typeof response.data.chuanshanjia_num == "undefined" ? 0 : response.data.chuanshanjia_num;
          this.chuanshanjia_num_infact = typeof response.data.chuanshanjia_num_infact == "undefined" ? 0 : response.data.chuanshanjia_num_infact;
          this.settlement_price = typeof response.data.settlement_price == 'undefined' ? 0 : response.data.settlement_price;
          this.shimo_num = typeof response.data.shimo_num2 == "undefined" ? 0 : response.data.shimo_num2;
          this.retained_coefficient = typeof response.data.retained_coefficient == "undefined" ? 0 :response.data.retained_coefficient;
          this.gross_margin = typeof response.data.gross_margin == "underfined" ? 0 :response.data.gross_margin;
          this.settlement_price = typeof response.data.settlement_price == "underfined" ? 0 :response.data.settlement_price;
          this.aiyou_keep = this.toPercentNot(this.aiyou_keep);
          this.chuanshanjia_keep = this.toPercentNot(this.chuanshanjia_keep);
          this.gross_margin = this.toPercentNot(this.gross_margin); 
            
          this.retained_coefficient = this.toPercentNot(this.retained_coefficient);  

        }

      })
    },
    find() {
      var app_id = this.app_id;
      var activation_date = this.activation_date;
      if(app_id==""){
           this.meassageBox("请先选择app", 'error');
           return false;
    
      }
      console.log(app_id, activation_date)
      checkChannelUserIdisFull(app_id,activation_date).then(response=>{
        if(response.datalist.length==0){
              this.listLoading = true;
      this.getChannelAppUserData(app_id, activation_date,2);
     
  }else{
        this.needAddPacageList = response.datalist;
        this.dialogFormVisiblePacakge = true;
  }
      });
  }
    
    ,
    getChannelAppUserData(app_id, activation_date,type) {
      getChannelAppUserData(app_id, activation_date,type).then(response => {
        var datalist = response.datalist;
         var shimo_num = this.shimo_num;
        var aiyou_num = this.aiyou_num;
        var settlement_price = this.settlement_price;
        var settlement_count = 0;
        var disburse_count = 0;
        var income_count = 0;
        var profits_count = 0;
        var package_count = 0;
        var retained_coefficient = this.toNum(this.retained_coefficient);
         console.log(retained_coefficient);
        if (response.code == 0) {
          datalist.forEach(item => {
               if(item.settlement_rate == 0 && item.settlement_num==0 && item.income==0 && item.disburse==0){//没有结算过
                    
                    //item.income = item.settlement_num * settlement_price;
                    item.income = (item.activation_count * this.toNum(this.shimo_proportion) * settlement_price).toFixed(1) ;
                   var yuqishouru = item.income * this.toNum(this.gross_margin);

                  // console.log(yuqishouru);
                    var shijishouru = item.income;
                   // console.log(item.income);
                   var kezhichuchengben = item.income - yuqishouru;
                   var kegeiqudaoxinzeng = Math.round(kezhichuchengben / item.outer_settlement_price);

                   if(item.activation_count < 5){
                      item.settlement_rate = 0;
                   }else{
                      item.settlement_rate =  (kegeiqudaoxinzeng/item.activation_count).toFixed(4);  
                   }
                   if(item.settlement_rate-1>0){
                    item.settlement_rate = 1;
                    }
                   if(item.is_expire==1){//过期
                      item.settlement_rate = 0;
                   }
                   
                    item.settlement_num = Math.round(item.settlement_rate * item.activation_count);
                    item.disburse = (item.settlement_num * item.outer_settlement_price).toFixed(1);
                    // console.log("item disburse:"+item.disburse);
                    item.profits = parseFloat(item.income - item.disburse).toFixed(1);
                    if(Math.round(item.activation_count*item.settlement_rate)==0){
                         item.chuanshanjia_keep = 0;
                    }else{
                           item.chuanshanjia_keep = (Math.round(item.settlement_num*item.aiyou_keep*retained_coefficient)/ Math.round(item.activation_count*item.settlement_rate)).toFixed(3); 

                    }


                  
                 

               } 
                // item.aiyou_keep = this.toPercent(retained_coefficient * item.aiyou_keep);
               //console.log("aiyoukeep:"+ item.aiyou_keep);
                // item.aiyou_keep = (item.aiyou_keep*100).toFixed(2);
                // item.chuanshanjia_keep = (item.chuanshanjia_keep*100).toFixed(2);
                item.chuanshanjia_keep = this.toPercentNot(item.chuanshanjia_keep)   
                item.settlement_rate = this.toPercentNot(item.settlement_rate);   



          });



           
          datalist.forEach(item => {
                settlement_count = settlement_count + item.settlement_num;
                disburse_count = Number(disburse_count) + Number(item.disburse) ;
                //income_count = income_count + item.income;
                package_count = package_count + item.activation_count;
          });
          
          //console.log(  this.shimo_proportion * this.settlement_price);
          income_count = this.shimo_num  * this.settlement_price;
          console.log("disburse_count:"+disburse_count);

          this.settlement_count = settlement_count;
          // console.log(disburse_count);
          this.disburse_count = parseFloat(disburse_count).toFixed(1);
          this.income_count = parseFloat(income_count).toFixed(1);
          this.profits_count = parseFloat((this.income_count - this.disburse_count)).toFixed(1);
          this.package_count = package_count;
          this.dataList = datalist;
          console.log(this.dataList);
        }

         this.listLoading = false;
      })
    },
    toSave(index, row) {
      console.log(row);
      var copy = Object.assign({}, row);
    
      copy['activation_date'] = this.activation_date;
      if(copy.outer_settlement_price ==0 || copy.outer_settlement_price==''){
        this.$message({
          type: 'info',
          message: '外放单价设置不能为零或者为空！'
        });
        return false;
      }
      if(copy.settlement_rate==''){
        this.$message({
          type: 'info',
          message: '计算比例不能为空！'
        });
        return false;
      }
      // console.log(row.aiyou_keep);
      // console.log(row.chuanshanjia_keep);
      // return false;
       //row.aiyou_keep = this.toNumNot(row.aiyou_keep);
       copy.chuanshanjia_keep = this.toNumNot(copy.chuanshanjia_keep);
       copy.settlement_rate = this.toNumNot(copy.settlement_rate);
       copy.type = 2;
      this.toSetChuanShanjiaData(copy);
      //console.log(index,row);

    },
    toSetChuanShanjiaData(json) {
      toSetChuanShanjiaData(json).then(response => {
        this.$message({
          type: 'info',
          message: '设置成功'
        });
      })
    },
    findPicDetail(index, row) {
console.log(row);
      var app_id = row.app_name_id;
      var activation_date = this.activation_date;
      var user_id = row.user_id
      getChuanshanjiaHistory(app_id, activation_date, user_id).then(response => {
        this.PicsDetailList = response.datalist;
      });
      this.dialogFormVisible = true;
    },

    getRententionIP(index,row){
        console.log(row);
        var app_id = row.app_name_id;
        var activation_date = this.activation_date;
        var user_id = row.user_id;

        getRententionIP(app_id,activation_date,user_id).then(response=>{
            var datalist = response.datalist;
            var count = 0;
            datalist.forEach(item=>{
               count = count + item.percentage ;
            })
            datalist.forEach(item=>{
             item.percentage = this.toPercent(item.percentage/count);
            })

           


            this.retentionIpList = response.datalist;
            this.dialogFormVisibleIp = true;
        })
    },

    getUserIdKeepAndRetenttionHistory(index, row) {
      this.dialogFormVisible1 = true;
      var app_id = row.app_name_id;
      var activation_date = this.activation_date;
      var user_id = row.user_id
      getUserIdKeepAndRetenttionHistory(app_id, activation_date, user_id).then(response => {
         var data = response.datalist;
         data.forEach(item=>{
            item.aiyou_keep1 = this.toPercent(item.aiyou_keep1);
              item.aiyou_keep2 = this.toPercent(item.aiyou_keep2);
                item.aiyou_keep3 = this.toPercent(item.aiyou_keep3);
                  item.aiyou_keep4 = this.toPercent(item.aiyou_keep4);
                    item.aiyou_keep5 = this.toPercent(item.aiyou_keep5);
                      item.aiyou_keep6 = this.toPercent(item.aiyou_keep6);
                        item.aiyou_keep7 = this.toPercent(item.aiyou_keep7);

                        item.settlement_rate = this.toPercent(item.settlement_rate);
                        item.user_id = user_id;

         })
         // console.log(data);

        this.userIdKeepAndRentiontionList = data;
      })
    },

     recount(index,row){
        

                    var outer_settlement_price = row.outer_settlement_price;
                     // var settlement_rate =  this.toNumNot(row.settlement_rate);
                     var settlement_price = this.settlement_price;
                    row.income = (row.activation_count * this.toNumNot(this.shimo_proportion) * settlement_price).toFixed(1) ;
                    console.log("income:"+row.income);
                   var yuqishouru = row.income * this.toNumNot(this.gross_margin);
                     console.log("yuqishouru:"+yuqishouru);
                   var retained_coefficient = this.toNumNot(this.retained_coefficient);

                  // console.log(yuqishouru);
                    var shijishouru = row.income;
                   // console.log(row.income);
                   var kezhichuchengben = row.income - yuqishouru;
                     console.log("kezhichuchengben:"+kezhichuchengben);
                     console.log("outer_settlement_price"+row.outer_settlement_price)
                   var kegeiqudaoxinzeng = Math.round(kezhichuchengben / row.outer_settlement_price);
                   console.log("kegeiqudaoxinzeng"+kegeiqudaoxinzeng);
                   var settlement_rate;
                   if(row.activation_count == 0){
                      settlement_rate = 0;
                   }else{
                      settlement_rate =  (kegeiqudaoxinzeng/row.activation_count).toFixed(4);  
                   }

                    if(settlement_rate-1>0){
                    settlement_rate = 1;
                    }
                    
                    console.log("settlement_rate:"+row.settlement_rate);
                    row.settlement_num = Math.round(settlement_rate * row.activation_count);
                    row.disburse = (row.settlement_num * row.outer_settlement_price).toFixed(1);

                    row.profits = parseFloat(row.income - row.disburse).toFixed(1);
                    if(Math.round(row.activation_count*settlement_rate)==0){
                         row.chuanshanjia_keep = 0;
                    }else{
                           row.chuanshanjia_keep = this.toPercentNot(Math.round(row.settlement_num*row.aiyou_keep*retained_coefficient)/ Math.round(row.activation_count*settlement_rate)); 

                    }
                    row.settlement_rate = this.toPercentNot(settlement_rate);
                    // row.aiyou_keep = (this.retained_coefficient * item.aiyou_keep).toFixed(3);
                 



         var settlement_count = 0;
         var disburse_count = 0;
         var income_count = 0;
         var package_count = 0;

            this.dataList.forEach(item => {
                settlement_count = settlement_count + item.settlement_num;
                disburse_count = Number(disburse_count) + Number(item.disburse) ;
                //income_count = income_count + item.income;
                package_count = package_count + item.activation_count;
          });


         income_count = this.shimo_num  * this.settlement_price;

          this.settlement_count = settlement_count;
          console.log(this.disburse_count);
          this.disburse_count = parseFloat(disburse_count).toFixed(1);
          this.income_count = parseFloat(income_count).toFixed(1);
          this.profits_count = parseFloat((this.income_count - this.disburse_count)).toFixed(1);
          this.package_count = package_count;
     

        
        //console.log(index,row);

    },


       recountRate(index,row){
        
                    var outer_settlement_price = row.outer_settlement_price;
                    var settlement_rate = this.toNumNot(row.settlement_rate);
                     var settlement_price = this.settlement_price;
                    row.income = (row.activation_count * this.toNumNot(this.shimo_proportion) * settlement_price).toFixed(1) ;
                   var yuqishouru = row.income * this.toNumNot(this.gross_margin);
                   var retained_coefficient = this.toNumNot(this.retained_coefficient);

                  // console.log(yuqishouru);
                    var shijishouru = row.income;
                   // console.log(item.income);
                   var kezhichuchengben = row.income - yuqishouru;
                   var kegeiqudaoxinzeng = Math.round(kezhichuchengben / row.outer_settlement_price);
                   // if(item.activation_count == 0){
                   //    item.settlement_rate = 0;
                   // }else{
                   //    item.settlement_rate =  (kegeiqudaoxinzeng/item.activation_count).toFixed(2);  
                   // }
                    
                   // console.log(item.settlement_rate);
                    row.settlement_num = Math.round(settlement_rate * row.activation_count);
                    row.disburse = (row.settlement_num * row.outer_settlement_price).toFixed(1);

                    row.profits = parseFloat(row.income - row.disburse).toFixed(1);
                    if(Math.round(row.activation_count*settlement_rate)==0){
                         row.chuanshanjia_keep = 0;
                    }else{
                           row.chuanshanjia_keep = this.toPercentNot((Math.round(row.settlement_num*row.aiyou_keep*retained_coefficient)/ Math.round(row.activation_count*settlement_rate))); 

                    }
                   // console.log("coefficient:"+this.retained_coefficient);
                    //console.log("aiyou_keep"+row.aiyou_keep);
                    // row.aiyou_keep = (this.retained_coefficient * row.aiyou_keep).toFixed(3);
                    //  console.log(row.aiyou_keep);



         var settlement_count = 0;
         var disburse_count = 0;
         var income_count = 0;
         var package_count = 0;

            this.dataList.forEach(item => {
                settlement_count = settlement_count + item.settlement_num;
                disburse_count = Number(disburse_count) + Number(item.disburse) ;
                //income_count = income_count + item.income;
                package_count = package_count + item.activation_count;
          });


         income_count = this.shimo_num  * this.settlement_price;

          this.settlement_count = settlement_count;
          console.log(this.disburse_count);
          this.disburse_count = parseFloat(disburse_count).toFixed(1);
          this.income_count = parseFloat(income_count).toFixed(1);
          this.profits_count = parseFloat((this.income_count - this.disburse_count)).toFixed(1);
          this.package_count = package_count;
     

        //console.log(index,row);

    },

    toPercent(num){
        var percent=Number(num*100).toFixed(2)+"%";
        return percent;
    },
    toPercentNot(num){
        var percent=Number(num*100).toFixed(2);
        return percent;
    },
    toNumNot(percent){
         var num=percent/100;
        return num;
    },
    toNum(percent){
        var num=percent.replace("%","")/100;
        return num;
    },
       tableRowClassName(row,rowIndex){
        var row = row.row;
                 if (row.is_expire === 1) {
                      return 'warning-row';
                    } 
                    return '';
      },
      batchCommit(){
      // var copy = Object.assign([], this.dataList);
      var copy = JSON.parse(JSON.stringify(this.dataList));//对象的深度拷贝
     
      copy.forEach(item=>{
       item['activation_date'] = this.activation_date;
       item.chuanshanjia_keep = this.toNumNot(item.chuanshanjia_keep);
       item.settlement_rate = this.toNumNot(item.settlement_rate);
       item.type = 2;
        delete item.channel_name;
       delete item.end_date;
        delete item.is_expire;
       delete item.ip;
       delete item.unit_price;
       delete item.is_out;
       delete item.update_ts;
       delete item.efficacious_num;
       delete item.settle_is_zero;
      }) 
        console.log(copy);
       batchCommit(copy).then(response=>{
          this.meassageBox("提交成功",'success');
       })
      
      },

    getType(){
      var page_path  = this.$route.path;
      // console.log(page_path);
      if(page_path.lastIndexOf("setting") != -1){
          this.type = 1;
      }else if(page_path.lastIndexOf("setting2") != -1){
         this.type = 2;
      }else if(page_path.lastIndexOf("setting3") != -1){
        this.type = 3;
      }else{

      }
    },
    resetTemp() {
      this.temp_form = {

      }
    },
    meassageBox(meassage, type) {
      this.$message({
        message: meassage,
        type: type
      });
    },

  }
}

</script>

<style>
    .app-container{
        font-size: 12px;
    }
      .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .tableHead{
    font-size: 12px;
  }
/* .cell-class{
    font-size: 12px;
 }*/

</style>
