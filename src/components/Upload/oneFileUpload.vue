<template>
    <div>
        <el-upload ref="upload" class="avatar-uploader" :action="remoteURL" :auto-upload="autoUpload" list-type="picture" :show-file-list="false"
            :on-success="afterAvatarSuccess" :before-upload="beforeAvatarUpload" :http-request="myUpload">
            <img v-if="displayImage" :src="displayImage" class="avatar-uploader-image">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
         <el-button v-if="!autoUpload" type="primary" @click="commitForm">确 定</el-button>
    </div>
</template>

<script>
import { createUniqueString } from 'utils';

export default {
    props: {
        autoUpload: {
            type: Boolean,
            default: true,
        },
        defaultImage: {
            type: String,
            default: '',
        },
        defaultFileType: {
            type: Array,
            default: () => [],
        },
        defaultFileSize: {
            type: Number,
            default: 100,
        },
    },
    data() {
        return {
            //remoteHost: 'http://localhost:8080',
            remoteHost: '图片上传地址',     //need change http://122.112.216.51:8080
            remoteURL: '',
            uploadImage: '',
        };
    },
    computed: {
        displayImage() {
            return this.defaultImage;
        }
    },
    mounted() {
        this.getRemoteURL();
    },
    methods: {
        getRemoteURL() {
            this.remoteURL = this.remoteHost + '/upload';
        },
        afterAvatarSuccess(response, file) {
            this.uploadImage = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            let existType = true;
            if (this.defaultFileType.length > 0 && this.defaultFileType.includes(file.type) == false) {
                existType = false;
            }
            const sizeLimit = file.size / 1024 / 1024 < this.defaultFileSize;

            if (!existType) {
                this.$message.error('上传文件格式错误');
            }
            if (!sizeLimit) {
                this.$message.error('上传文件大小超过限制');
            }
            return existType && sizeLimit;
        },
        myUpload(objFile) {
            let file = objFile.file;
            let formURL = this.remoteURL;
            let form = new FormData();
            form.append("op", "upload");
            form.append("fileContent", file);
            form.append("insertOnly", "0");

            let settings = {
                "async": true,
                "crossDomain": true,
                "url": formURL,
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form
            }

            $.ajax(settings).done(response => {
                response = JSON.parse(response);
                // URL的协议使用 https
                response.data.access_url = response.data.access_url;
                response.data.source_url = response.data.source_url;
                response.data.url = response.data.url;

                this.uploadImage = response.data.source_url;
                this.$emit('upload', response.data);
                this.$message.success('文件上传成功');
            }).fail(error => {
                this.$message.error('文件上传失败，请重新上传');
            });
        },
        commitForm() {
            this.$refs.upload.submit();
        },
    }

}
</script>

<style scoped>
.avatar-uploader {
    margin-bottom: 10px;
}

.avatar-uploader-icon {
    border: 1px double #8c939d;
    border-radius: 10px;
    color: #8c939d;
    font-size: 28px;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar-uploader-icon:hover {
    border: 1.5px dashed #20a0ff;
    color: #20a0ff;
}

.avatar-uploader-image {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
