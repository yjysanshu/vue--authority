<template>
    <div class="components-container">
        <div class="iframe-container">
            <iframe :src="ifameSrc" id="biz-frame" frameborder="0" width="100%" height="820px" scrolling="auto"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ifameSrc: '',
        }
    },
    created() {
        this.request();
    },
    methods: {
        request() {
            /*this.$api.system.basic.signBiUrl({
            }).then(response => {
                var data = response.data.data;
                var url = window.location.pathname;
                if (data[url]) {
                    this.ifameSrc = data[url];
                } else {
                    console.log("the frame url source don't exsit!!!");
                }
                console.log(url, this.ifameSrc);
            }).catch(error => {
                console.log(error);
            });*/
            this.$router.push({ path: '/index' });
            // 需要重新刷新页面 请求 路由表 和 用户信息
            location.reload();
        }
    }
}
</script>
