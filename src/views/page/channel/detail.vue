<template>
  <div class="app-container">
    <div style="display:inline-block;">
      产品：
      <el-select v-model="listQuery.app_id" placeholder="请选择" size="mini">
        <el-option v-for="item in categoryoptions" :key="item.app_id" :label="item.app_name" :value="item.app_id">
        </el-option>
      </el-select>
    </div>
    <div style="display: inline-block;">
      包号: <el-input v-model.trim="listQuery.user_id" auto-complete="off" size="mini" style="width: 100px"></el-input>
    </div>
    <div style="display: inline-block;">
      管理人: <el-input v-model.trim="listQuery.sign_by_name" auto-complete="off" size="mini" style="width: 100px"></el-input>
    </div>
    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleFilter()">搜索</el-button>
    <el-button class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleAddData()">添加</el-button>
    <el-table :data="questionTableData" v-loading="listLoading" style="width: 100%">
      <el-table-column label="id" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.channel_detail_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="包号" width="100" sortable :sort-method="sort_user_id">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.unit_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品" width="120" sortable :sort-method="sort_product_name">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.product_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理人" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sign_by_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.start_date.split(" ")[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.end_date.split(" ")[0] }}</span>
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click="findPriceHistory(scope.$index, scope.row)">价格历史</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="objData" :rules="rules" ref="dataForm">
        <el-form-item label="用户编号" prop="user_id" :label-width="formLabelWidth">
          <el-input v-model.trim.number="objData.user_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品" prop="app_name_id" :label-width="formLabelWidth">
          <el-select v-model="objData.app_name_id" placeholder="请选择" size="mini">
            <el-option v-for="item in categoryoptions" :key="item.app_id" :label="item.app_name" :value="item.app_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加者" prop="sign_by_name" :label-width="formLabelWidth">
          <el-input v-model.trim="objData.sign_by_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="unit_price" :label-width="formLabelWidth">
          <el-input v-model.trim="objData.unit_price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="start_date" :label-width="formLabelWidth">
          <el-date-picker v-model="objData.start_date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="end_date" :label-width="formLabelWidth">
          <el-date-picker v-model="objData.end_date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="dialogFormVisiblePrice" title="改价记录" :visible.sync="dialogFormVisiblePrice">
      <div class="list" v-for="(item,index) in PriceDetailList">
        {{item.create_ts}} -----{{item.price}} 元
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getChannelPriceHistory, queryChannelDetail, addUserChannelDetail, editUserChannelDetail, deleteChannelDetail, getChuanhshanjiaAppList } from '@/api/channel';
export default {
  data() {
    return {
      dialogFormVisiblePrice: false,
      PriceDetailList: [],
      questionTableData: [],
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      objData: {

      },
      listQuery: {
        user_id: 0,
        app_id: 0,
        sign_by_name:''

      },

      typeOptions: [

      ],
      rules: {
        // question_no:[ { required: true, message: '请输入编号'}],
        // question_stem:[ { required: true, message: '请输入名字', trigger: 'blur' }],
        // question_option:[{required:true,message:'必须为填入',trigger:'blur'}],
        //  question_right_answer:[{required:true,message:'必须填入'}],

      },

      formLabelWidth: '120px',
      categoryoptions:[]
    }
  },
  created() {

    this.getChannelDetailList();
    this.getChuanhshanjiaAppList();
  },

  methods: {
    getChannelDetailList() {
      this.listLoading = true;
      queryChannelDetail(this.$route.query.channel_id,this.listQuery.user_id,this.listQuery.app_id,this.listQuery.sign_by_name).then(response => {
        if (response.code == 0) {
          this.questionTableData = response.datalist;
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
    handleEdit(index, row) {
      console.log(index, row);
      row.app_name_id = parseInt(row.app_name_id);
      this.objData = Object.assign({}, row);
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })

    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm(`你确定要删除包${row.user_id}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var channel_detail_id = row.channel_detail_id;
        deleteChannelDetail(channel_detail_id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getChannelDetailList();
        });

      }).catch(() => {

      })



    },

    findPriceHistory(index, row) {
      getChannelPriceHistory(row.channel_id, row.app_name_id, row.user_id).then(response => {
        this.dialogFormVisiblePrice = true;
        this.PriceDetailList = response.datalist;
      })
    },
    handleAddData() {
      this.resetTemp();
      this.dialogStatus = 'create'
      let length =
        this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    addData() {
      var channel_id = this.$route.query.channel_id;
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.objData.app_name_id == 0) {
            this.meassageBox('请选择appname', 'warning');
            return false;
          }

          addUserChannelDetail(this.objData, channel_id).then(response => {
            if (response.code == 0) {
              this.meassageBox('添加成功', 'success');
              this.objData.channel_detail_id = response.data;
              this.dialogFormVisible = false;
              this.questionTableData.push(this.objData);

            } else {
              this.meassageBox('添加失败', 'warning');
            }

          })
        } else {

        }
      })


    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          editUserChannelDetail(this.objData).then(response => {
            for (const v of this.questionTableData) {
              if (v.channel_detail_id === this.objData.channel_detail_id) {
                const index = this.questionTableData.indexOf(v);
                this.questionTableData.splice(index, 1, this.objData);
                break;

              }
            }
            this.meassageBox('修改成功', 'success');
            this.dialogFormVisible = false;
          })

        } else {

        }
      })

    },
    handleFilter(){
        this.getChannelDetailList();
    },
    sort_user_id(obj1,obj2){
        return obj1.user_id - obj2.user_id;
    },
    sort_product_name(obj1,obj2){
        return obj1.app_name_id - obj2.app_name_id;
    },

    meassageBox(meassage, type) {
      this.$message({
        message: meassage,
        type: type
      });
    },
    resetTemp() {
      this.objData = {

      }
    },


  }
}

</script>
