<template>
<div>
    <el-menu mode="vertical" theme="dark" background-color="#ddd" text-color="#000"  unique-opened :default-active="$route.path" :collapse="isCollapse">
      <sidebar-item :menuList='menuList'></sidebar-item>
    </el-menu>

</div>
</template>


<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';
  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'menuList',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }


    }


  }


</script>
