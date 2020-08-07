<template>
  <div class="app-container">
    <div style="display:inline-block">
      渠道：<el-select v-model="listQuery.channel_id" placeholder="渠道" size="mini">
        <el-option v-for="item in channelOptions" :key="item.channel_id" :label="item.channel_name" :value="item.channel_id">
        </el-option>
      </el-select>
    </div> 
        <div style="display:inline-block">
      类别：<el-select v-model="listQuery.creater_name_type" placeholder="类别" size="mini">
        <el-option v-for="item in channel_options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
   <!-- <div style="display: inline-block;">
    创建人: <el-input v-model.trim="listQuery.creater_name" auto-complete="off" size="mini" style="width: 100px"></el-input>
   </div>
   <div style="display: inline-block;">
    类别: <el-input v-model.trim="listQuery.creater_name_type" auto-complete="off" size="mini" style="width: 100px"></el-input>
   </div>
   <div style="display: inline-block;">
    联系人: <el-input v-model.trim="listQuery.contact_name" auto-complete="off" size="mini" style="width: 100px"></el-input>
   </div>
   <div style="display: inline-block;">
    联系电话: <el-input v-model.trim="listQuery.contact_name_phone" auto-complete="off" size="mini" style="width: 100px"></el-input>
   </div>
    <div style="display: inline-block;">
    微信: <el-input v-model.trim="listQuery.contact_name_wechat" auto-complete="off" size="mini" style="width: 100px"></el-input>
   </div>
   <div style="display: inline-block;">
    QQ: <el-input v-model.trim="listQuery.contact_name_qq" auto-complete="off" size="mini" style="width: 100px"></el-input>
   </div>
    <div style="display: inline-block;">
    结算方式: <el-input v-model.trim="listQuery.settle_type" auto-complete="off" size="mini" style="width: 100px"></el-input>
   </div> -->
  <el-button type="primary" icon="el-icon-search" size="mini" @click="handleFilter()">搜索</el-button>
  <el-button class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleAddData()">添加</el-button>
  <el-table :data="tableData" v-loading="listLoading" style="width: 100%" :row-style="{height:'5px'}" :cell-style="{padding:'0px'}">
    <el-table-column label="渠道id" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.channel_id }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="channel_name" label="渠道名字" sortable :sort-method="sort_channel_name" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.channel_name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="创建人" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.creater_name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="类别" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.creater_name_type==0 ? '个人' : '公司' }}</span>
      </template>
    </el-table-column>
    <el-table-column label="联系人" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.contact_name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="联系电话" width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.contact_name_phone }}</span>
      </template>
    </el-table-column>
    <el-table-column label="微信" width="140">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.contact_name_wechat }}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column label="QQ" width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.contact_name_qq }}</span>
      </template>
    </el-table-column> -->
    <!-- <el-table-column label="快递地址" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.contact_name_address }}</span>
      </template>
    </el-table-column> -->
    <el-table-column label="结算方式" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.settle_type==0 ? '个人劳务' : '增值税专用发票' }}</span>
      </template>
    </el-table-column>
         <el-table-column
                label="公司名称"
                width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.invoice_company_name }}</span>
            </template>
        </el-table-column>
         <!--  <el-table-column
                label="纳税人识别号"
                width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.invoice_tax_identification_number }}</span>
            </template>
        </el-table-column>
          <el-table-column
                label="注册地址"
                width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.invoice_register_address }}</span>
            </template>
        </el-table-column>
          <el-table-column
                label="注册电话"
                width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.invoice_register_phone }}</span>
            </template>
        </el-table-column>
          <el-table-column
                label="开户行名称"
                width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.invoice_opening_bank }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="银行账号"
                width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.invoice_bank_number }}</span>
            </template>
        </el-table-column> -->
    <el-table-column label="创建时间" width="120" sortable :sort-method="sort_create_ts">
      <template slot-scope="scope">
      <!--   <i class="el-icon-time"></i> -->
        <span style="margin-left: 10px">{{ scope.row.create_ts.split(" ")[0] }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEditData(scope.$index, scope.row)">编辑</el-button>
        <!-- <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        <el-button size="mini" type="danger" @click="handleManage(scope.$index, scope.row)">管理</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :model="temp_form" :rules="rules" ref="dataForm" :inline="true">
      <el-form-item label="渠道名字" prop="channel_name" :label-width="formLabelWidth">
        <el-input v-model.trim="temp_form.channel_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="创建人" prop="creater_name" :label-width="formLabelWidth">
        <el-input v-model.trim="temp_form.creater_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="creater_name_type" :label-width="formLabelWidth">
        <el-select v-model="temp_form.creater_name_type" placeholder="请选择类型" @change="changeSettleType">
          <el-option v-for="item in channel_options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结算方式" prop="settle_type" :label-width="formLabelWidth">
        <el-select v-model="temp_form.settle_type" placeholder="请选择类型" disabled>
          <el-option v-for="item in channel_settle_type_options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人" prop="contact_name" :label-width="formLabelWidth">
        <el-input v-model.trim="temp_form.contact_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="contact_name_phone" :label-width="formLabelWidth">
        <el-input v-model.trim="temp_form.contact_name_phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="contact_name_wechat" :label-width="formLabelWidth">
        <el-input v-model.trim="temp_form.contact_name_wechat" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="contact_name_qq" :label-width="formLabelWidth">
        <el-input v-model.trim="temp_form.contact_name_qq" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="快递地址" prop="contact_name_address" :label-width="formLabelWidth">
        <el-input v-model.trim="temp_form.contact_name_address" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" prop="invoice_company_name" :label-width="formLabelWidth">
        <el-input v-model.trim="temp_form.invoice_company_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="纳税人识别号" prop="invoice_tax_identification_number" :label-width="formLabelWidth">
        <el-input v-model.trim="temp_form.invoice_tax_identification_number" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="注册地址" prop="invoice_register_address" :label-width="formLabelWidth">
        <el-input v-model.trim="temp_form.invoice_register_address" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="注册电话" prop="invoice_register_phone" :label-width="formLabelWidth">
        <el-input v-model.trim="temp_form.invoice_register_phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="开户行名称" prop="invoice_opening_bank" :label-width="formLabelWidth">
        <el-input v-model.trim="temp_form.invoice_opening_bank" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="银行账号" prop="invoice_bank_number" :label-width="formLabelWidth">
        <el-input v-model.trim="temp_form.invoice_bank_number" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="addData">确定</el-button>
      <el-button v-else type="primary" @click="updateData">确定</el-button>
    </div>
  </el-dialog>
  </div>
</template>
<script>
import { getChannelList, addChannel, editChannel, getChannelListData } from '@/api/channel';
export default {
  data() {
    return {
      length: 0,
      tableData: [],
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },

      temp_form: {

      },
      formLabelWidth: '120px',
      listQuery: {
        channel_id: 0,
        creater_name_type:-1



      },
      rules: {
        channel_name: [{ required: true, message: '必填项', trigger: 'blur' }],
        creater_name: [{ required: true, message: '必填项', trigger: 'blur' }],
        creater_name_type: [{ type: 'number', required: true, message: '必须为数字', trigger: 'blur' }],
        contact_name: [{ required: true, message: '必须填入', trigger: 'blur' }],
        contact_name_phone: [{ required: true, message: '必须填入', trigger: 'blur' }],
        contact_name_wechat: [{ required: true, message: '必须填入', trigger: 'blur' }],
        // contact_name_qq:[{type:'number',required:true,message:'必须填入并且是数字',trigger: 'blur'}],
        contact_name_address: [{ required: true, message: '必须填入', trigger: 'blur' }],
        invoice_company_name: [{ required: true, message: '必须填入', trigger: 'blur' }],
        invoice_tax_identification_number: [{ required: true, message: '必须填入', trigger: 'blur' }],
        invoice_register_address: [{ required: true, message: '必须填入', trigger: 'blur' }],
        invoice_register_phone: [{ required: true, message: '必须填入', trigger: 'blur' }],
        invoice_opening_bank: [{ required: true, message: '必须填入', trigger: 'blur' }],
        invoice_bank_number: [{ required: true, message: '必须填入', trigger: 'blur' }],
      },
      channel_options: [
      {
        value:-1,
        label:'全部'
      },{
        value: 0,
        label: '个人'
      }, {
        value: 1,
        label: '公司'
      }],
      channel_settle_type_options: [
        { value: 0, label: '个人劳务' },
        { value: 1, label: '增值税专用发票' }
      ],
      channelOptions: [],
    }
  },

  created() {
    this.getChannelList();
    this.getList(this.listQuery);

  },
  methods: {
    getList() {
      this.listLoading = true;
      getChannelListData(this.listQuery).then(response => {

        if (response.code == 0) {

          this.tableData = response.datalist;

        } else {

        }

        this.listLoading = false
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
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    changeSettleType(val) {
      console.log(val);
      this.temp_form.settle_type = val;
    },

    handleEditData(index, row) {
      console.log(index, row);
      this.temp_form = Object.assign({}, row);
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    handleManage(index, row) {
      // console.log(row);
      var channel_id = row.channel_id;
      //  this.$router.push({ path: '/' });
      this.$router.push({ path: `/page/channel/detail?channel_id=${channel_id}` });
    },
    handleAddData() {
      this.resetTemp();
      this.dialogStatus = 'create'

      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })

    },
    addData() {

      this.$refs['dataForm'].validate((valid) => {
        console.log(this.tableData);
        if (valid) {
          addChannel(this.temp_form).then(response => {
            if (response.code == 0) {
              this.meassageBox('添加成功', 'success');
              this.getList();
              // this.temp_form.channel_id = response.data;
              // this.dialogFormVisible = false;
              // this.tableData.unshift(this.temp_form);

            } else {
              this.meassageBox('添加失败', 'warning');
            }
              this.dialogFormVisible = false;


          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    updateData() {


      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.tableData)
          editChannel(this.temp_form).then(response => {
            if (response.code == 0) {
              for (const v of this.tableData) {
                if (v.channel_id === this.temp_form.channel_id) {
                  const index = this.tableData.indexOf(v);
                  this.tableData.splice(index, 1, this.temp_form);
                  break;

                }
              }
              this.meassageBox('修改成功', 'success');
              this.dialogFormVisible = false;



            } else {
              this.meassageBox('修改失败', 'warning');
            }

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })

    },
    sort_channel_name(obj1, obj2) {
      return obj1.channel_id - obj2.channel_id;
    },
    sort_create_ts(obj1,obj2){
        return new Date(obj1.create_ts).getTime() - new Date(obj2.create_ts).getTime();
    },
    handleFilter() {
      this.getList(this.listQuery);
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
