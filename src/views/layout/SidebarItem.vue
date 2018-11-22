<template>
    <div>
        <div v-for="item in routes" :key="item.path">
            <router-link v-if="!item.hidden&&item.noDropdown" :to="item.path">
                <el-menu-item :index="item.path">
                    <wscn-icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
                </el-menu-item>
            </router-link>
            <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
                <template slot="title">
                    <wscn-icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
                </template>
                <div v-for="child in item.children" v-if='!child.hidden' :key="child.path">
                    <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
                    <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
                        <el-menu-item :index="item.path+'/'+child.path">
                            {{child.name}}
                        </el-menu-item>
                    </router-link>
                </div>
            </el-submenu>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-icon {
    margin-right: 10px;
}
.hideSidebar .menu-indent {
    display: block;
    text-indent: 10px;
}
</style>

