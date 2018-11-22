<template>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" background-color="#324157" text-color="#ffffff" active-text-color="#409EFF">
        <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
export default {
    components: { SidebarItem },
    computed: {
        ...mapGetters([
            'permission_routers',
            'sidebar'
        ]),
        isCollapse() {
            return !this.sidebar.opened
        }
    }
}
</script>

<style lang="scss" scoped>
.el-menu {
    min-height: 100%;
}
</style>