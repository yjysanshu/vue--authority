<template>
    <div class='tabs-view-container'>
        <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
            <el-tag :closable="true" :type="isActive(tag.path)"  @close='closeViewTabs(tag,$event)'>
                {{tag.name}}
            </el-tag>
        </router-link>
    </div>
</template>

<script>
export default {
    computed: {
        visitedViews() {
            return this.$store.state.app.visitedViews.slice(-6)
        }
    },    
    watch: {
        $route() {
            this.addViewTabs()
        }
    },
    methods: {
        closeViewTabs(view, $event) {
            this.$store.dispatch('delVisitedViews', view)
            $event.preventDefault()
        },
        generateRoute() {
            let index = -1;
            // 找到最后一个带有名字的路由
            this.$route.matched.forEach((item, arrIndex) => {
                if (item.name){
                    index = arrIndex;
                }
            });
            // console.log(this.$route.matched);
            // console.log(index);
            if (index == -1) return false;
            return this.$route.matched[index];
        },
        addViewTabs() {
            let route = this.generateRoute();
            if (route) {
                this.$store.dispatch('addVisitedViews', route);
            }
        },
        isActive(path) {
            return path === this.$route.path ? '' : 'info';
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tabs-view-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    .tabs-view {
        margin-left: 10px;
    }
}
</style>
