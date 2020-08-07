
<template>
<div class="app-container">

<div style="display:inline-block">
     <span class="demonstration">时间范围</span>
    <el-date-picker size="mini"
      v-model="daterange"
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
<div class="passengerFlow">
	<h2>门店流量</h2>
    <el-table
            :data="passengerFlow"
            v-loading="passengerFlowLoading"
            border
            style="width: 80%">

        <el-table-column
                label="进店总人次"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.customer_count }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="新人进店"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.customer_new }}</span>
            </template>
        </el-table-column>

      <el-table-column
                label="老顾客进店"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.customer_old }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="男"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.man_count }}</span>
            </template>
        </el-table-column>
           <el-table-column
                label="女"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.woman_count }}</span>
            </template>
        </el-table-column>
           <el-table-column
                label="平均年龄"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.age_avg }}</span>
            </template>
        </el-table-column>
          <el-table-column
                label="峰值时段"
                >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.custom_max_time }}</span>
            </template>
        </el-table-column>
        

    </el-table>
</div>


	
<div class="orderSumber">
	<h2>订单汇总</h2>
	   <div style="display:inline-block;margin-bottom:20px;">
       支付方式： <el-select v-model="paymentTypeId" placeholder="全部" size="mini">
            <el-option
                    v-for="item in paymentOptions"
                    :key="item.payment_type_id"
                    :label="item.payment_provider_name"
                    :value="item.payment_type_id"
                  >
            </el-option>
        </el-select>
        </div>

           <div style="display:inline-block;margin-right:30px;margin-bottom:20px;">
       销售方式： <el-select v-model="sellerTypeId" placeholder="全部" size="mini">
            <el-option
                    v-for="item in sellerOptions"
                    :key="item.sell_type_id"
                    :label="item.sell_type_text"
                    :value="item.sell_type_id"
                  >
            </el-option>
        </el-select>
        </div>
     <el-button type="success" icon="el-icon-search" size="mini" @click="findOrder() ">查找</el-button>        

    <el-table
            :data="orderSumber"
            v-loading="orderSumberLoading"
            border
            style="width: 90%">
        
		   <el-table-column
                label="总收入(元)"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.profit/100 }}</span>
            </template>
        </el-table-column>


        <el-table-column
                label="销售订单数"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.order_num }}</span>
            </template>
        </el-table-column>
     
		     <el-table-column
                label="销售商品数"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.purchase_num }}</span>
            </template>
        </el-table-column>
      <el-table-column
                label="销售额(元)"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.purchase_fee/100 }}</span>
            </template>
        </el-table-column>

        
   
           <el-table-column
                label="退款订单数"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.refund_order_num }}</span>
            </template>
        </el-table-column>
           <el-table-column
                label="退款商品数"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.refund_purchase_num/100 }}</span>
            </template>
        </el-table-column>
          <el-table-column
                width="150"
                label="退款额(元)"
               >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.refund_purchase_fee/100 }}</span>
            </template>
        </el-table-column>

             <el-table-column
                label="销售排名"
               >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.sell_rank_top }}</span>
            </template>
        </el-table-column>
        

    </el-table>

</div>	

<div class="aiyouBusiness">
    <h2>哎呦业务</h2>
	<el-table
            :data="appInfo"
            v-loading="appInfoLoading"
            show-summary
            border
            stripe
            style="width: 80%">

        <el-table-column
                label="APP名称"
                width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.sell_product_name }}</span>
            </template>
        </el-table-column>

           <el-table-column
                label="操作量"
                width="150"
				prop="operate_num"
                >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.operate_num }}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="审批通过量"
                width="150"
                prop="pass_num">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.pass_num }}</span>
            </template>
        </el-table-column>

   
        <el-table-column
                label="店员收益(元)"
                width="150"
				prop="staff_reward"
                >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.staff_reward }}</span>
            </template>
        </el-table-column>
           <el-table-column
                label="店长收益(元)"
                width="150"
				prop="department_reward"
                >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.department_reward }}</span>
            </template>
        </el-table-column>
           <el-table-column
                label="分公司收益(元)"
				prop="company_reward"
                >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.company_reward }}</span>
            </template>
        </el-table-column>
      

    </el-table>
</div>	

   

</div>
</template>

<script>
  import {getShopInfo,getOderSumber,getAppRewardInfo} from '@/api/shop';
  export default {
    data() {
        return {
            passengerFlow:[],
            orderSumber:[],
            appInfo:[],
            daterange:[],
            paymentTypeId:0,
            sellerTypeId:0,
            paymentOptions:[],
            sellerOptions:[],
            passengerFlowLoading:true,
            orderSumberLoading:true,
            appInfoLoading:true
        }
    },
    created(){
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              this.daterange = [this.formatDate(start) ,this.formatDate(start)];
              this.getpassengerFlow(this.daterange[0],this.daterange[1]);
             this.getOderSumberInfo(this.daterange[0],this.daterange[1],this.sellerTypeId,this.paymentTypeId);
             this.getAppRewardInfo(this.daterange[0],this.daterange[1]);
    },
    methods:{

    	getpassengerFlow(start_time,end_time){
    		 getShopInfo(this.$route.query.zone_id,start_time,end_time).then(response => {

                    if(response.code==0){
                    //	console.log(response.data);
                        
                        //this.passengerFlow[0] = response.data;
                      //  Vue.set(this.passengerFlow,0,response.data);
                      this.passengerFlow.splice(0,1,response.data);
                    }else{

                    }

               this.passengerFlowLoading = false;     

    	}).catch(function(err){
    		console.log(err);
    		console.log(this);
         	this.passengerFlowLoading = false;  
         	this.passengerFlow = [];   
        })
    
        },

        	getOderSumberInfo(start_time,end_time,sell_type_id,payment_type_id){
        		console.log(start_time,end_time,sell_type_id,payment_type_id)
    		 getOderSumber(this.$route.query.zone_id,start_time,end_time,sell_type_id,payment_type_id).then(response => {

                    if(response.code==0){
                   
                      this.orderSumber.splice(0,1,response.data);
                      this.paymentOptions = response.data.available_payment_type;
                     // this.paymentOptions.push({payment_provider_name:'全部',payment_type_id:0});
                     this.paymentOptions.unshift({payment_provider_name:'全部',payment_type_id:0});
                      this.sellerOptions = response.data.sell_type_list;
                      this.sellerOptions.unshift({sell_type_id:0,sell_type_text:'全部'})
                      //this.sellerOptions.push({sell_type_id:0,sell_type_text:'全部'})
                   
                    }else{

                    }

               this.orderSumberLoading = false;     

    	}).catch(function(err){
         	 this.orderSumberLoading = false;  
         	this.paymentOptions = []; 
         	 this.sellerOptions = [];  
        })
    
        },
        getAppRewardInfo(start_time,end_time){
        	getAppRewardInfo(this.$route.query.zone_id,start_time,end_time).then(response=>{
        		if(response.code==0){
        			console.log(response);
        			this.appInfo = response.datalist;
        		}
        		this.appInfoLoading = false;
        	}).catch(function(err){
         	this.appInfoLoading = false;
         	this.appInfo = [];
        })
        },


        findOrder(){

        	//console.log(this.paymentTypeId,	this.sellerTypeId);
        	this.getOderSumberInfo(this.daterange[0],this.daterange[1],this.sellerTypeId,this.paymentTypeId);
        
        },
    handleFilter(){
    	         this.passengerFlowLoading = true;   
    	         this.orderSumberLoading = true; 
    	         this.appInfoLoading = true;      
    	       var start_date = new Date(this.daterange[0]);
               var end_date = new Date(this.daterange[1])
                if((end_date-start_date)/(1000 * 60 * 60 * 24)>20){
                    this.$message({
                            message:"最多查询20天时间",
                            type:"error"
                        });
                  this.passengerFlowLoading = false;   
    	          this.orderSumberLoading = false; 
    	          this.appInfoLoading = false; 
                    return false;
                }else{
                 this.getpassengerFlow(this.daterange[0],this.daterange[1]);
                this.getOderSumberInfo(this.daterange[0],this.daterange[1],this.sellerTypeId,this.paymentTypeId);
                this.getAppRewardInfo(this.daterange[0],this.daterange[1]);
                }
               
    }    
,
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



<style>


</style>
