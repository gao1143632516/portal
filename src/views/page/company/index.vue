<template>
  <div class="app-container">
    <el-button @click="handleAddData()">添加</el-button>
    <el-table :data="tableData" v-loading="listLoading" style="width: 100%">
      <el-table-column label="account_id" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.account_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司名字" width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.corp_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账套id" width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.third_accountid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="orgid" width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.orgid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="門店名字" width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.org_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEditData(scope.$index, scope.row)">查看门店</el-button>
          <el-button size="mini" @click="handleEditDataInfo(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="length">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="temp_form">
        <el-form-item label="公司名字" :label-width="formLabelWidth">
          <el-input v-model.trim="temp_form.corp_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账套id" prop="issue_name" :label-width="formLabelWidth">
          <el-input v-model.trim="temp_form.third_accountid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="orgid" prop="issue_name" :label-width="formLabelWidth">
          <el-input v-model.trim="temp_form.orgid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="org_name" prop="issue_name" :label-width="formLabelWidth">
          <el-input v-model.trim="temp_form.org_name" auto-complete="off"></el-input>
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
import { getCompanyList, addCompany, updateCompany } from '@/api/company';
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
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }

    }
  },
  created() {
    this.getList();

  },
  methods: {
    getList() {
      this.listLoading = true;
      getCompanyList(this.listQuery).then(response => {

        if (response.code == 0) {

          this.tableData = response.data.result;
          this.length = response.data.number
        } else {

        }

        this.listLoading = false
      })

    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },


    handleEditData(index, row) {
      console.log(row);
      var account_id = row.account_id;
      this.$router.push({ path: `/page/company/shop?account_id=${account_id}`});
    },

    handleAddData() {
      this.resetTemp();
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },

    addData() {
      addCompany(this.temp_form).then(response => {
        this.dialogFormVisible = false;
        this.temp_form.account_id = response.data;
        this.tableData.push(this.temp_form);
        this.meassageBox("添加成功", 'success');
      });
    },
    updateData() {
      updateCompany(this.temp_form).then(response => {
        for (const v of this.tableData) {
          if (v.account_id === this.temp_form.account_id) {
            const index = this.tableData.indexOf(v);
            this.tableData.splice(index, 1, this.temp_form);
            break;

          }
        }
        this.meassageBox("修改成功", 'success');

        this.dialogFormVisible = false;

      })
    },
    handleEditDataInfo(index, row) {
      console.log(index, row);
      this.temp_form = Object.assign({}, row);
      this.dialogStatus = 'update'
      this.dialogFormVisible = true;

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
