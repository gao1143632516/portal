<template>
  <div class="login-container">
    <el-card class="box-card">
      <i class="el-icon-warning" :style="{ display : tottle }">二维码已经失效</i>
      <div class="text item">
        <img :src="qrImgUrl" alt="" style="display: inline-block;">
      </div>
    </el-card>
  </div>
</template>
<script>

import { getQrCode,getAccessToken,getPolling} from '@/api/login';

export default {
  name: 'login',
  data() {

    return {
      client_id: "72f9f947400a00e7a280a5715ce69a0a",
      code: '',
      fullCode:'',
      qrImgUrl:'',
      access_token:'',   
      tottle:'none'
    }

  },
  // computed: {
  //   fullCode(){
  //     return "http://portal.oauth.qr.19w.me/"+this.code;
  //   }
  // },
  methods: {
    getQrCode() {
      getQrCode(this.client_id).then(response => {
        console.log(response);
        if (response.success == true) {
          this.code = response.data.code;
          this.fullCode = "http://portal.oauth.qr.19w.me/"+this.code;
          this.qrImgUrl = process.env.BASE_API + "/oauth2/renderQrCodeImage?width=300&height=300&content="+this.fullCode;
          this.getPolling();
        }

      })
    },
    // getQrImgUrl() {
      
    //   return 
    // },

    getAccessToken(){
      getAccessToken(this.code).then((response)=>{
        console.log(response)
        this.tottle = 'block';
          if(response.success == true){
                 this.access_token = response.data.access_token
                this.handleLogin( this.access_token);
           
          }
      }).catch((error)=>{
        console.error(error);
      })
    }
,
getPolling(){
  getPolling(this.code).then((response)=>{
  
    console.log(response)
    if(response.success==true){
      console.log('getPolling oks')
        this.getAccessToken();

    }
  }).catch((error)=>{
    console.error(error)
       this.getPolling();
  })
},

    handleLogin() {
         
          this.$store.dispatch('LoginByAccessToken', this.access_token).then(() => {
          
         
            this.$router.push({ path: '/' });
            // this.showDialog = true;
          }).catch(() => {
            // this.loading = false;
            console.log()
          });
        } 
        
      },
  created() {
    this.getQrCode();


  },
  mounted(){
    // console.log(this.code);
    // this.getPolling();
   // this.setInterObj =  setInterval(()=>{
   //     this.getPolling()
        
   //    },3000);
  }
}

</script>
<style scoped>
.login-container {

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30vh
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 400px;
  height:400px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

}
.qrinfo{
  display: none;
}

</style>
