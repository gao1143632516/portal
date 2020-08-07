<template>
<div class="app-container">
    <div><span>门店信息：   &nbsp;</span>门店名称：{{store_name}}新顾客：{{customer_new}}人 老顾客：{{customer_old}}人 店员：{{staff_count}}人</div>
    <hr/>
 <div>店员头像</div>
 <hr/>
     <div class="shop-assistant-pic" v-loading="shop_assistant_pic_loading">

         <div class="list" v-for="(item,index) in assitant_items">
            <img :src="item.head_url" style="width:100px;height:100px;margin:1px" ><br/>
               <i class="el-icon-delete" size="b" @click="deleteAssitantVipId(item.vip_id,index)"></i> &nbsp;&nbsp;
         </div>   
     </div>
<hr/>
<div>顾客头像  <el-date-picker
      v-model="default_time"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
   <el-button type="danger" size="mini"
       @click="search()" >确认搜索</el-button>
  
</div>
 <hr/>
 <div class="shop-customer-pic" @scroll="paperScroll()" v-loading="shop_customer_pic_loading">

         <div class="list" v-for="(item,index) in customer_items" >
            <img :src="item.head_url" style="width:100px;height:100px;margin:2px" @click="showMorePic(item.vip_id)"/>
              <div style="text-align:center">
                <span style="font-size:10px;">{{item.visit_time.substr(5)}}{{item.is_new?"新":"老"}}</span><br/>
                <!--<el-button type="danger" size="mini"-->
              <!--@click="deketeVipId(item.vip_id,index)" >删除</el-button>-->
                  <i class="el-icon-delete" size="b" @click="deketeVipId(item.vip_id,index)"></i> &nbsp;&nbsp;
                  <i class="el-icon-edit" size="mini" @click="getvisitRecord(item.vip_id,index)"></i>

              </div>

         </div>   
 </div>

  <el-dialog class="dialogFormVisible" title="会员照片"  :visible.sync="dialogFormVisible">
             <div class="list" v-for="(item,index) in showMorePics" >
              <div>
              <img :src="item.head_url" style="width:100px;height:100px;margin:2px"/>
              <br/>
              <div style="text-align:center">
                <span style="font-size:10px;">{{item.visit_time.substr(5)}}</span><br/>
                <el-button type="danger" size="mini"
              @click="deleteCoustomerPic(item.visit_id,index)" >删除</el-button></div>
          </div>
           </div> 
  </el-dialog>

    <el-dialog class="dialogFormVisibleRecord" title="会员到访记录"  :visible.sync="dialogFormVisibleRecord"
     :before-close="handleClose" center
    >
             <div class="list" v-for="(item,index) in visitRecordList" >
            
              <div>
                 <span style="margin-right:50px;">{{item.store_name}}</span>
                  <span style="margin-right:50px;">{{item.visit_time}}</span>

                <el-button type="danger" size="mini"
              @click="deleteCoustomerRecord(item.visit_id,index)" >删除</el-button>
              <hr/>
          </div>
          </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="showMoreHistory()">{{tip_description}}</el-button>
            </span>
  </el-dialog>

</div>
</template>

<script>
    import { getShopCustomerPic ,getShopAssistantPic,deleteFaceVip,showMorePics,deleteCoustomerPic,getvisitRecordList,getShopInfo} from '@/api/shop';
    export default {
        data() {
            return {
                shop_assistant_pic_loading:true,
                shop_customer_pic_loading:true,
                dialogFormVisible:false,
                dialogFormVisibleRecord:false,
                assitant_items: [],
                customer_items: [],
                showMorePics:[],
                visitRecordList:[],
                zone_id:'',
                default_time:'',
                record_default_time:'',
                record_vip_id:'',
                customer_count:0,
                customer_new:0,
                customer_old:0,
                staff_count:0,
                store_name:'',
                record_listQuery:{
                    page:1,
                    limit: 30
                },
               listQuery: {
                    page: 1,
                    limit: 50,
               
                },
                tip_description:'点击加载更多',
                formLabelWidth: '120px' ,
            }
        },
  
        created(){
            this.default_time = this.formatDate(new Date()) ;
    
             var zone_id = this.$route.query.zone_id
             this.zone_id = zone_id;
            this.getShopAssistantPic(this.zone_id);
            this.getShopCustomerPic(this.zone_id,this.listQuery,this.default_time);
            this.getShopInfo(this.zone_id,this.default_time,this.default_time);
        },
        methods: {
            getShopAssistantPic(zone_id){
               
                getShopAssistantPic(zone_id).then(response => {
                    if(response.code==0){
                        this.assitant_items = response.datalist;

                    }else{

                    }

                  this.shop_assistant_pic_loading = false;
                })

            },
        getShopCustomerPic(zone_id,listQuery,default_time){
               
                getShopCustomerPic(zone_id,listQuery,default_time).then(response => {
                   
                    if(response.code==0){
                       console.log(response.datalist);
                        this.customer_items = this.customer_items.concat(response.datalist);
                     
                    }else{

                    }

                  this.shop_customer_pic_loading = false;
                })

            },

         paperScroll(){
            var el = document.querySelector('.shop-customer-pic');
            var offsetHeight = el.offsetHeight;
            var scrollTop = el.scrollTop;
            var scrollHeight = el.scrollHeight;
            if((offsetHeight+scrollTop) - scrollHeight > -1){
               // console.log('到底部');
                ++this.listQuery.page;
                 this.getShopCustomerPic(this.zone_id,this.listQuery,this.default_time)

            }else{
               // console.log(scrollTop,scrollHeight);
            }
         },
     
         deketeVipId(vip_id,index){
            deleteFaceVip(vip_id).then(response=>{
                    if(response.code==0){
                         this.customer_items.splice(index,1),
                        this.meassageBox("删除成功",'success');  

                    }else{
                        this.meassageBox("删除失败",'error');
                    }
            })
         }
,
deleteAssitantVipId(vip_id,index){
             deleteFaceVip(vip_id).then(response=>{
                    if(response.code==0){
                         this.assitant_items.splice(index,1),
                        this.meassageBox("删除成功",'success');  

                    }else{
                        this.meassageBox("删除失败",'error');
                    }
            })
         }
         ,
showMorePic(vip_id){
    
    showMorePics(vip_id,this.default_time).then(response=>{
          if(response.code==0){
                        this.showMorePics = response.datalist;
                        this.dialogFormVisible = true; 

                    }else{
                        
                    }
    })
},
deleteCoustomerPic(visit_id,index){
   deleteCoustomerPic(visit_id).then(response=>{
    if(response.code==0){
         this.showMorePics.splice(index,1),
         this.meassageBox("删除成功",'success');  
    }
   })
},

search(){
   this.default_time = this.formatDate(new Date(this.default_time));
   this.customer_items=[];
   this.listQuery= {
                    page: 1,
                    limit: 50         
                }
    this.getShopCustomerPic(this.zone_id,this.listQuery,this.default_time);
    this.getShopInfo(this.zone_id,this.default_time,this.default_time);

}, 
getvisitRecord (vip_id){
        
        this.record_vip_id = vip_id; 
        var now = new Date();
        var endDate = this.formatDate(now);
        var startDate =now.setFullYear(now.getFullYear()-1);
            startDate = (this.formatDate(new Date(startDate)));

        getvisitRecordList(this.record_vip_id,startDate,endDate,this.record_listQuery).then(response=>{
            if(response.code==0){
            console.log(response.page.hasmore);
                if(response.page.hasmore==false){
                   
                  this.tip_description = '已加载全部数据';
                  
                }
                 this.visitRecordList = this.visitRecordList.concat(response.datalist);
                 this.dialogFormVisibleRecord = true;
            }
        })

            },
 showMoreHistory(){
       ++this.record_listQuery.page;

       this.getvisitRecord(this.record_vip_id);

 },    
 deleteCoustomerRecord(visit_id,index){
    deleteCoustomerPic(visit_id).then(response=>{
    if(response.code==0){
         this.visitRecordList.splice(index,1),
         this.meassageBox("删除成功",'success');  
    }
   })
 },
 handleClose(){
    this.visitRecordList = [];
    this.record_listQuery = {
                    page: 1,
                    limit: 30   
    };
    this.dialogFormVisibleRecord = false;
     this.tip_description = '点击加载更多数据';
 }
,
 getShopInfo(){
     getShopInfo(this.zone_id,this.default_time,this.default_time).then(response=>{
         if(response.code==0){
             this.customer_new = response.data.customer_new;
             this.customer_old = response.data.customer_old;
             this.staff_count = response.data.staff_count;
             this.store_name = response.data.store_name;
         }
     })
 },

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
<style type="text/css" scoped>
    .shop-assistant-pic{
        display: flex;
        flex-wrap: wrap;
    }
    .shop-customer-pic{
        width: 100%;
        height: 500px;
        display: flex;
        flex-wrap: wrap;
    }
   .shop-customer-pic{
   /* height: 800px;*/
    overflow-y: scroll;
   }
   .app-container{
    overflow-y: hidden;
   }
   .dialogFormVisible .list{
    
        display: inline-flex;
        flex-wrap: wrap;
   }

</style>