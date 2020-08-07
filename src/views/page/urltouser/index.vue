<template>
  <div class="app-container">
    <div class="header">
      用户编号
      <el-input placeholder="请输入用户编号" v-model.number="userId"  type="number" style="width:200px;"></el-input>
      类型 <el-select v-model="typeId" placeholder="请选择">
        <el-option v-for="item in typeList" :key="item.type_id" :label="item.text" :value="item.type_id">
        </el-option>
      </el-select>
      <el-button type="primary" @click="getProductlistByType" :loading="loading">查询</el-button>
    </div>
    <div class="content">
      <el-table id="cameraid" :data="prodoctList" style="width: 100%">
        <el-table-column label="应用名字" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.product_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="product_channel_id" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.product_channel_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="version" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.version }}</span>
          </template>
        </el-table-column>
        <el-table-column label="短链" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.filepath }}
				
			<el-button class="ml10" type="text" size="medium"
        v-clipboard:copy="scope.row.filepath"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">点击复制</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="用户编号" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.user_id }}</span>
          </template>
        </el-table-column>
         <el-table-column label="promotionkey" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.promotionkey }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped="scoped">
</style>
<script>
import { getProductChanelTypeList, getProductlistByType } from "@/api/productChannel"
export default {
  data() {
    return {
      userId: 0,
      typeList: [],
      typeId: "",
      loading: false,
      prodoctList:[]
    }
  },
  created() {
    this.getProductChanelTypeList();
  },
  methods: {

    getProductChanelTypeList() {
      getProductChanelTypeList().then(response => {
        console.log(response.datalist)
        this.typeList = response.datalist;
      })
    },
    getProductlistByType() {
      if(this.userId==0){
      	this.meassageBox("请输入用户编号",'error')
      	return false;
      }	
      if(this.typeId==""){
      	this.meassageBox("请选择类型",'error');
      	return false;
      }
      this.loading = true;
      getProductlistByType(this.userId, this.typeId).then(response => {
        this.loading = false;
        this.prodoctList = response.datalist;
      })
    },
    onCopy:function(e){
    	  this.$message("复制成功")
    },
    onError:function(e){
          this.$message("复制失败");
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
