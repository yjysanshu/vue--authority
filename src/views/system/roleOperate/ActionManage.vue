<template>
    <el-dialog title="角色资源管理" :visible.sync="resourceVisible" v-loading.body="resourceLoading" element-loading-text="玩命加载中">
        <el-tabs v-model="resourceActiveName">
            <el-tab-pane v-for="(parentMenu, parentIndex) in resourceData" :key="parentIndex" :label="parentMenu.title" :name="String(parentIndex)">
                <div v-for="(sonMenu, sonIndex) in parentMenu.children" :key="sonIndex" class="panel-menu-item">
                    <span class="panel-menu-item-title">{{ sonMenu.title }}</span>
                    <el-checkbox-group v-model="checkedResourceIds">
                        <el-checkbox v-for="resource in sonMenu.children" :label="resource.id" :key="resource.id">{{resource.url}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-tab-pane>
        </el-tabs>

        <div slot="footer" class="dialog-footer">
            <el-button @click="resourceVisible = false">取 消</el-button>
            <el-button type="primary" :loading="formResourceSubmiting" @click="commitResourceForm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            roleId: null,
                        
            // 资源表单
            resourceLoading: false,
            resourceVisible: false,
            formResourceSubmiting: false,

            // 资源数据
            resourceData: [],
            checkedResourceIds: [],
            resourceActiveName: '0',
            resourceActiveIndex: 0,
        };
    },
    methods: {
        getRoleResource(id) {
            this.resourceVisible = true;
            this.resourceLoading = true;
            this.roleId = id;
            this.$api.system.role.getResource({
                data: {
                    id: this.roleId,
                }
            }).then(response => {
                this.resourceData = response.data.data.list;
                this.checkedResourceIds = response.data.data.checked.map(item => parseInt(item));
                this.resourceLoading = false;
            }).catch(error => {
                this.resourceLoading = false;
                console.log(error);
            });
        },
        commitResourceForm() {
            this.formResourceSubmiting = true;
            this.$api.system.role.savePrivilege({
                data: {
                    roleId: this.roleId,
                    resourceType: 1,    // 资源类型 1-接口
                    resourceIds: this.checkedResourceIds,
                }
            }).then(response => {
                this.formResourceSubmiting = false;
                this.resourceVisible = false;
                this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success',
                    duration: 1500,
                });
                console.log(response);
            }).catch(error => {
                this.formResourceSubmiting = false;
                this.$notify({
                    title: '错误',
                    message: error,
                    type: 'error',
                    duration: 3000,
                });
                console.log(error);
            });
        },
    }
}
</script>

<style scoped>
.panel-menu-item {
    width: 90%;
    max-height: 60px;
    border-radius: 5px;
    display: inline-block;
    margin: 10px 10px 10px 0px;
}

.panel-menu-item-title {
    float: left;
    padding: 5px;
    margin-right: 10px;
    border-right: 1px solid #20a0ff;
}

.el-checkbox-group {
    display: inline;
    margin: 5px;
}
</style>