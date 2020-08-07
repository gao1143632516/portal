<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
      <!--  <sticky :className="'sub-navbar '+postForm.status"> -->
      <template v-if="fetchSuccess">
        <!--     <router-link style="margin-right:15px;" v-show='isEdit' :to="{ path:'create-form'}">
            <el-button type="info">创建form</el-button>
          </router-link> -->
        <el-dropdown trigger="click">
          <el-button plain>
            外链
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu class="no-padding no-border" style="width:300px" slot="dropdown">
            <el-form-item label-width="0px" style="margin-bottom: 0px" prop="source_uri">
              <el-input placeholder="请输入内容" v-model="postForm.source_uri">
                <template slot="prepend">填写url</template>
              </el-input>
            </el-form-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>
      </template>
      <template v-else>
        <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
      </template>
      <!--  </sticky> -->
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="21">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="postForm.title" required :maxlength="100">
                标题
              </MDinput>
              <span v-show="postForm.title.length>=26" class='title-prompt'>app可能会显示不全</span>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="editor-container">
          <tinymce :height=400 ref="editor" v-model="postForm.content"></tinymce>
        </div>
        <!-- <div style="margin-bottom: 20px;">
          <Upload v-model="postForm.image_uri"></Upload>
        </div> -->
      </div>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect' // 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css' // 多选框组件css
import Sticky from '@/components/Sticky' // 粘性header组件
import { validateURL } from '@/utils/validate'
import { toDraftForm, toPublishForm, fetchDataInfo } from '@/api/article'
//import { userSearch } from '@/api/remoteSearch'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  source_uri: '', // 文章外链
  id: undefined,
}

export default {
  name: 'articleDetail',
  components: { Tinymce, MDinput, Upload, Multiselect, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(null)
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      fetchSuccess: true,
      loading: false,
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    }
  },
  created() {
    if (this.isEdit) {

      this.fetchDataHtml()
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    fetchDataHtml() {
      fetchDataInfo(this.$route.query.page_id).then(response => {
        console.log(response.data.content);
        this.postForm = response.data;

        // console.log(this.postForm);
      }).catch(err => {
        this.fetchSuccess = false
        console.log(err)
      })
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.toPublishForm();
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      //.log(this.postForm); 
      this.toDraftForm();
      this.postForm.status = 'draft'
    },
    toDraftForm() {
      var page_id = 0;
      if (this.isEdit) {
        var page_id = this.$route.query.page_id;
      }
      var content = this.insertStr(this.postForm.content);
   
      toDraftForm(this.postForm.title, content, page_id).then(response => {

        this.$message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 1000
        });
        this.$router.push({ path: `/page/helppages/index` });

      })
    },
    toPublishForm() {

      var page_id = 0;
      if (this.isEdit) {
        var page_id = this.$route.query.page_id;
      }
      var content = this.insertStr(this.postForm.content);
      console.log(content);

      toPublishForm(this.postForm.title, content, page_id).then(response => {
        this.loading = true
        this.$notify({
          title: '成功',
          message: '发布文章成功',
          type: 'success',
          duration: 2000
        })
        this.postForm.status = 'published'
        this.loading = false;
        this.$router.push({ path: `/page/helppages/index` });
      })
    },
    insertStr(text) {
      var newStr = `<!DOCTYPE html><html lang="zh-CN">
<head>
     <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
    <style>
        *{
          margin:0;
          padding:0;
          font-size: 17px;
          box-sizing:border-box;
        }
        html,body{
            width:100%;
          font-family: -apple-system-font,BlinkMacSystemFont,"Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft YaHei UI","Microsoft YaHei",Arial,sans-serif;
          line-height: 1.6;
          color:#333;
          letter-spacing: .034em
        }
        #content{
            padding: 20px 16px 12px;
        }
        #content p{
           min-height: 1em;

        }
         img,video { max-width:100%; display:block;height:auto; }
    </style>
</head>
<body id="content">

      #CONTENT

</body>
 
</html>`;

 return newStr.replace(/\#CONTENT/g,text);;
}
}
}

  </script>


  <style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .title-prompt {
    position: absolute;
    right: 0px;
    font-size: 12px;
    top: 10px;
    color: #ff4949;
  }

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          float: left;
        }
      }

      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;

        .editor-upload-btn-container {
          text-align: right;
          margin-right: 10px;

          .editor-upload-btn {
            display: inline-block;
          }
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }

  </style>
