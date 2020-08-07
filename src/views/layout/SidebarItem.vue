<template>
	<div class='menu-wrapper'>
		<template v-for="menu in menuList" v-if="!menu.hidden">
			<el-submenu :index="''+menu.navigation_id" v-if="!menu.is_leaf" :key="menu.navigation_id">
				<template slot="title">
					<!--<icon-svg v-if='menu.icon' :icon-class="menu.icon"></icon-svg><span>{{menu.navigation_name}}</span>-->
					<icon v-if='menu.icon' :name="menu.icon"></icon><span style="margin-left: 8px">{{menu.navigation_name}}</span>
				</template>
				<template v-for="nmenu in menu.list" v-if="!nmenu.hidden" >
					<sidebar-item class='nest-menu' v-if='!nmenu.is_leaf &&nmenu.list.length>0' :menuList='[nmenu]' :key="nmenu.navigation_id">
					</sidebar-item>
					<router-link v-else :to="nmenu.page_path" :key='nmenu.navigation_id' tag="div">
						<el-menu-item :index="''+nmenu.navigation_id">
								<!--<icon-svg v-if='nmenu.icon' :icon-class="nmenu.icon"></icon-svg><span> {{nmenu.navigation_name}}</span>-->
							<icon v-if="nmenu.icon" :name="nmenu.icon"></icon><span style="margin-left:8px">{{nmenu.navigation_name}}</span>
						</el-menu-item>
					</router-link>
				</template>

			</el-submenu>
			<router-link v-else :key="menu.navigation_id" :to="menu.page_path" tag="div">
				<el-menu-item :index="''+menu.navigation_id"  class='submenu-title-noDropdown'>
					<icon-svg v-if='menu.icon' :icon-class="menu.icon"></icon-svg><span slot="title">{{menu.navigation_name}}</span>
				</el-menu-item>
			</router-link>


		</template>

	</div>
</template>

<script>
  export default {
      name: 'SidebarItem',
      props: {
          menuList: {
              type: Array
          }
      }

  }

</script>

<style  scoped>

	.router-link-active li{
		 background-color:#CCEEFF !important ;
	}
</style>

