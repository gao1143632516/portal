<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{dataObj.name}}</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div class="text item">
        <el-tag>金额</el-tag> :&nbsp; {{dataObj.reward}}
      </div>
      <div class="text item">
        <el-tag>用户昵称</el-tag>:&nbsp;{{dataObj.nickname}}
      </div>
      <div class="text item">
        <el-tag>imei</el-tag>:&nbsp;{{dataObj.imei}}
      </div>
      <div class="text item">
        <el-tag>imei2</el-tag>:&nbsp; {{dataObj.imei2}}
      </div>
      <div class="text item">
        <el-tag>状态</el-tag>:&nbsp; {{dataObj.status}}
      </div>
      <div class="text item">
        <el-tag>创建时间</el-tag>:&nbsp; {{dataObj.createdate}}
      </div>
      <div class="picture">
        <img v-if="dataObj.p1" :src="dataObj.p1" alt="图片" style="width:20%;height:50%">
        <img v-if="dataObj.p2" :src="dataObj.p2" alt="图片" style="width:20%;height:50%">
        <img v-if="dataObj.p3" :src="dataObj.p3" alt="图片">
        <img v-if="dataObj.p4" :src="dataObj.p4" alt="图片">
        <img v-if="dataObj.p5" :src="dataObj.p5" alt="图片">
        <img v-if="dataObj.p6" :src="dataObj.p6" alt="图片">
      </div>
      <br/> 操作信息
      <el-input type="textarea" :rows="2" placeholder="请输入操作原因" v-model="dataObj.remark">
      </el-input>
      <div class="button">
        <el-button class="filter-item" type="success" round @click="agree()">通过</el-button>
        <el-button class="filter-item" type="danger" round @click="disagree()">拒绝</el-button>
      </div>
    </el-card>
  </div>
</template>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 600px;
}

.picture {
  display: inline-flex;
}

img {
  flex-direction: row;
  justify-content: center;
  margin: 2px;
}

.button {
  margin: 20px;
}

</style>
<script>
import { agree, disagree } from '@/api/receipt';
export default {
  props: {
    dataObj: Object
  },
  methods: {

    agree() {
      var postData = { receipt_id: this.dataObj.receipt_id, remark: this.dataObj.remark };
      agree(postData).then(response => {
        if (response.code == 0) {
          this.meassageBox('修改成功', 'success');
          this.dataObj.status = '待返现';
          var res = [this.dataObj.receipt_id, 5, '待返现'];
          this.$emit('hideDetail', res);
        }
      })
    },
    disagree() {
      var postData = { receipt_id: this.dataObj.receipt_id, remark: this.dataObj.remark };
      disagree(postData).then(response => {
        if (response.code == 0) {
          this.meassageBox('修改成功', 'success')
          this.dataObj.status = '未通过';
          var res = [this.dataObj.receipt_id, 3, '未通过'];
          this.$emit('hideDetail', res);
        }
      })
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
