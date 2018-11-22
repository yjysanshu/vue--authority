<template>
    <div class="components-container">
        <one-file-upload @upload="getResponseImage"> </one-file-upload>

        <el-table :data="responseImage" element-loading-text="拼命加载中" stripe border fit highlight-current-row style="width: 70%">
            <el-table-column label="属性说明" align="center" width="150px">
                <template slot-scope="scope">
                    <span>{{scope.row.attribute}}</span>
                </template>
            </el-table-column>
            <el-table-column label="路径URL" align="center">
                <template slot-scope="scope">
                    <span :id="scope.row.id">{{scope.row.value}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200px">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" class="clipboard" :data-clipboard-target="'#' + scope.row.id"> 复制 </el-button>
                    <el-button v-if="scope.row.operate == 'download'" size="small" type="primary"><a :href="scope.row.value">下载</a></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import OneFileUpload from 'components/Upload/oneFileUpload';
import Clipboard from 'clipboard'; // 浏览器复制组件 - 不依赖Flash - 每个子组件都需要重新引用

export default {
    components: { OneFileUpload },
    data() {
        return {
            responseImage: [],
        };
    },
    mounted() {
        var clipboard = new Clipboard('.clipboard');
    },
    methods: {
        getResponseImage(response) {
            // this.responseImage = response;
            this.responseImage = [];
            this.responseImage.push({ 'attribute': 'CDN访问路径', 'id': 'clipboard-access_url', 'value': response.access_url, 'operate': '' });
            this.responseImage.push({ 'attribute': '资源相对路径', 'id': 'clipboard-resource_path', 'value': response.resource_path, 'operate': '' });
            this.responseImage.push({ 'attribute': '直接访问路径', 'id': 'clipboard-source_url', 'value': response.source_url, 'operate': 'download' });
            this.responseImage.push({ 'attribute': '文件存储路径', 'id': 'clipboard-url', 'value': response.url, 'operate': '' });
            this.responseImage.push({ 'attribute': '文件标识ID', 'id': 'clipboard-vid', 'value': response.vid, 'operate': '' });
        }
    }
}
</script>
