<template>
    <el-input v-if="field.field_type='text'" v-model="currentValue" :placeholder="field.label" :class="itemclass" style="width: 200px;">
    </el-input>
    <el-input v-else-if="field.field_type='password'" type="password" v-model="currentValue" :class="itemclass" :placeholder="field.label"></el-input>
    <el-select v-else-if="field.field_type='select'" :class="itemclass" v-mode="currentValue">
        <el-option v-for="item of field.item_list" :label="item.label" :value="currentValue" :key="item.value">
        </el-option>
    </el-select>
    <el-date-picker v-else-if="field.field_type='date'" :class="itemclass" v-model="currentValue" type="date" format="yyyy-MM-dd" :placeholder="field.label">
    </el-date-picker>
    <el-date-picker v-else-if="field.field_type='datetime'" :class="itemclass" v-model="currentValue" type="datetime" format="yyyy-MM-dd HH:mm:ss" :placeholder="field.label">
    </el-date-picker>
    <el-date-picker v-else-if="field.field_type='daterange'" :class="itemclass" v-model="currentValue" type="daterange"  :placeholder="field.label">
    </el-date-picker>
    <el-switch v-else-if="field.field_type='switch'" :class="itemclass" v-model="value" >
    </el-switch>
    <span v-else>
        {{feild.holder}}
    </span>
</template>

<script>

export default {
    props: {
        field: {
            type: Object
        },
        itemclass:{
            type:String
        },
        value:[String,Number]
    },
    data() {
        return {
            currentValue:this.value
        }
    },
    watch: {
        'value'(val,oldValue) {
            console.log('value:',val);
            this.setCurrentValue(val);
        },
        'currentValue'(val,oldValue) {
            console.log('currentValue:',val);
            this.$emit('input', val);
        },
    },
    created() {
    },
    methods: {
         setCurrentValue(value) {
            if (value === this.currentValue) return;
            this.currentValue=value;
         }
    }
}
</script>
