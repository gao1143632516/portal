<template>
  
    <div class="app-container">

<div>
	    <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleAddData()">添加设备</el-button>

        <el-table
           style="width: 100%"
            :data="deviceData">
            <el-table-column
                    label="device_id"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.device_id }}</span>
                </template>
            </el-table-column>
               <!--<el-table-column-->
                    <!--label="shop_id"-->
                    <!--width="180">-->
                <!--<template slot-scope="scope">-->
                    <!--<span style="margin-left: 10px">{{ scope.row.shop_id }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            
          <el-table-column
                    label="device_no"
                    width="300">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.device_no }}</span>
                </template>
            </el-table-column>
                 <el-table-column
                    label="devicename"
                    width="300">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.devicename }}</span>
                </template>
            </el-table-column>
                 <el-table-column
                    label="tutk"
                    width="300">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.video_p2p_url }}</span>
                </template>
            </el-table-column>
             <el-table-column label="操作" min-width="150">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" @click="handleEditData(scope.$index, scope.row)">修改</el-button>
            
            </template>
        </el-table-column>
        </el-table>
</div>

       <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="temp_form" ref="dataForm">
                <!--<el-form-item label="shop_id"  :label-width="formLabelWidth">-->
                   <!--&lt;!&ndash;  <el-input v-model.trim="temp_form.shop_id" auto-complete="off"></el-input> &ndash;&gt;-->
                <!---->
                <!--<el-select v-model="temp_form.shop_id" placeholder="请选择">-->
			    <!--<el-option-->
			      <!--v-for="item in options"-->
			      <!--:key="item.value"-->
			      <!--:label="item.label"-->
			      <!--:value="item.value">-->
			    <!--</el-option>-->
               <!--</el-select>-->
               <!--</el-form-item>-->
                <el-form-item label="device_no" :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.device_no" auto-complete="off"></el-input>
                    <el-button size="medium" v-on:click="toHex">转换</el-button>
                </el-form-item>
                <el-form-item label="devicename"  :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form.devicename" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="video_p2p_url"  :label-width="formLabelWidth">
                    <el-input  v-model.trim="temp_form.video_p2p_url"></el-input>
                </el-form-item>
                 <el-form-item label="deviceip" :label-width="formLabelWidth">
                    <el-input  v-model.trim="temp_form.deviceip" auto-complete="off"></el-input>
                </el-form-item>
                     <el-form-item label="x" :label-width="formLabelWidth"  v-if="dialogStatus!='create'">
                    <el-input  v-model.trim="temp_form.x" auto-complete="off"></el-input>
                </el-form-item>

                     <el-form-item label="y" :label-width="formLabelWidth"  v-if="dialogStatus!='create'">
                    <el-input  v-model.trim="temp_form.y" auto-complete="off"></el-input>
                </el-form-item>

                     <el-form-item label="angle" :label-width="formLabelWidth"  v-if="dialogStatus!='create'">
                    <el-input  v-model.trim="temp_form.angle" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="addData">确定</el-button>
                <el-button v-else type="primary" @click="updateData">确定</el-button>
            </div>
        </el-dialog>

       



<hr/>
<div>
	热力图相关信息 <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="setHeatMap()">配置</el-button>

</div>

<div>
        <el-table
           style="width: 100%"
            :data="heatData">
               <el-table-column
                    label="门店名称"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.shop_name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="x"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.max_x_axis }}</span>
                </template>
            </el-table-column>
            
          <el-table-column
                    label="y"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.max_y_axis }}</span>
                </template>
            </el-table-column>
                 <el-table-column
                    label="sn号"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sn_number }}</span>
                </template>
            </el-table-column>
            
                 <el-table-column
                    label="description"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.description
 }}</span>
                </template>
            </el-table-column>
                   <el-table-column
                    label="背景图"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px"><img :src="scope.row.bg_img_url" style="width:100px"></span>
                </template>
            </el-table-column>
        </el-table>

 <el-dialog title="门店热力图配置" :visible.sync="heatdialogFormVisible">
            <el-form :model="temp_form_heat" ref="dataForm">
            	
                <el-form-item label="门店名称"  :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form_heat.shop_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="x" :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form_heat.max_x_axis" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="y"  :label-width="formLabelWidth">
                    <el-input v-model.trim="temp_form_heat.max_y_axis" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="sn_number"  :label-width="formLabelWidth">
                    <el-input  v-model.trim="temp_form_heat.sn_number"></el-input>
                </el-form-item>
                 <el-form-item label="description" :label-width="formLabelWidth">
                    <el-input  v-model.trim="temp_form_heat.description" auto-complete="off"></el-input>
                </el-form-item>
               <el-form-item label="bg_img_url" :label-width="formLabelWidth">
                    <el-input  v-model.trim="temp_form_heat.bg_img_url" auto-complete="off"></el-input>
                </el-form-item>
           
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="heatdialogFormVisible = false">取 消</el-button>
 
                <el-button type="primary" @click="tosetHeatMap()">确定</el-button>
            </div>
        </el-dialog>



</div>

</div>

</template>

<script>
    import { getShopInfo,addDevice,editDevice,tosetHeatMap } from '@/api/company';
    export default {
        data() {
            return {

                deviceData:[],
                heatData:[],
                 heatdialogFormVisible:false,
                dialogFormVisible:false,
                dialogStatus:'',
                textMap: {
                    update: '修改',
                    create: '添加'
                },

                temp_form: {

                    device_no:'',
                    devicename: '',
                    video_p2p_url: '',
                    deviceip:'',
                    x:'',
                    y:'',
                    angle:''
                },
                temp_form_heat:{
                    
                },
                formLabelWidth: '120px' ,
         

            }
        },
        created(){
             
             this.getInfo();

        },
        methods: {
            getInfo(){
              
                getShopInfo(this.$route.query.zone_id).then(response => {

                    if(response.code==0){

                        this.deviceData = response.data.deviceInfo;
                        console.log(this.deviceData);
                        this.heatData = response.data.heatInfo;

                    }else{

                    }

                   
                })

            },
       handleAddData(){
                this.resetTemp();
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
            },

       handleEditData(index, row) {
                console.log(index, row);
                this.temp_form = Object.assign({},row);
                this.dialogStatus = 'update'
                this.dialogFormVisible = true;
              
            },

        addData(){
        	addDevice(this.$route.query.zone_id,this.temp_form).then(response=>{
        		  this.dialogFormVisible = false;
        		  this.temp_form.device_id = response.data;
        		  this.deviceData.push(this.temp_form);
                   this.meassageBox("添加成功",'success');
        	})
        },
        updateData(){
            editDevice(this.temp_form).then(response=>{
            	for(const v of this.deviceData){
                            if(v.device_id === this.temp_form.device_id){
                                const index = this.deviceData.indexOf(v);
                                this.deviceData.splice(index,1,this.temp_form);
                                break;

                                }
                            }
                this.meassageBox("修改成功",'success');

            	this.dialogFormVisible = false;

            }) 
        }
          ,
        setHeatMap(){

        	this.temp_form_heat = Object.assign({},this.heatData[0]);

        	this.heatdialogFormVisible = true;
        },
        tosetHeatMap(){
        	console.log('tosetheatmap');
        	 tosetHeatMap(this.$route.query.zone_id,this.temp_form_heat).then(response =>{
        	 	console.log(this.temp_form_heat);
        	 	    window.location.reload();

        	 })
        },
        toHex(event){
             var device_no = this.temp_form.device_no;

             var s = device_no.substring(7);
                var val = '';

                for(var i=0;i<s.length;i++){
                  val += s.charCodeAt(i).toString(16);
                }
                val +="00";
                
               this.temp_form.device_no = val;
        },
        resetTemp() {
                this.temp_form = {
                       
                }
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

  
