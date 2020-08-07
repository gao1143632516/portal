

<template>


<div>
    <el-form>
        <el-form-item label="活动名称" >

            <el-input v-model="detailData.name" auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="hideDetail">取 消</el-button>
        <el-button type="primary" @click="is_show = false">确 定</el-button>
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                dialogVisible: false
            };
        },
        props: {
            detailData:Object,
        },

        methods:{
            hideDetail(){
                this.$emit('hideShow');
            }
        },

    };
</script>