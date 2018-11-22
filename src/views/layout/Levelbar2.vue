<template>
    <div class="app-levelbar">
        <span style="font-size: 25px; padding-left: 20px;">你的名称-后台管理</span>
    </div>
</template>

<script>
export default {
    created() {
        this.getBreadcrumb()
    },
    data() {
        return {
            levelList: null
        }
    },
    methods: {
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name);
            const first = matched[0];
            if (first && (first.name !== '首页' || (first.path !== '' && first.path !== '/'))) {
                matched = [{ name: '11111', path: '/' }].concat(matched)
            }
            this.levelList = matched;
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-levelbar {
    background-color: #324553;//#324553;
    color: #ffffff;
    -moz-box-shadow:0px 10px 5px #ffffff;
    -webkit-box-shadow:0px 10px 5px #ffffff;
    box-shadow:0px 10px 5px #ffffff;
}
.app-levelbar.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
.test {
    background-color: #3a71a8;
}
</style>
