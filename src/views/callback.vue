<template>
    <div>这里是首页</div>
</template>
<script>
import { getQueryString } from 'utils';
export default {
    data() {
        return {
        }
    },
    mounted() {
        this.redirectUrl();
    },
    methods: {
        redirectUrl() {
            //let token = getQueryString('token');
            //设置locaStorage
            //localStorage.setItem('x-token', token);
            //console.log("11111111");
            //alert(this.$router.path);
            //this.$router.push({ path: '/' });
            // 需要重新刷新页面 请求 路由表 和 用户信息
            //location.reload();
        }
    },
}
</script>
