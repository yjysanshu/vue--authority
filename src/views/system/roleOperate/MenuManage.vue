<template>
    <el-dialog title="角色菜单管理" :visible.sync="menuVisible" v-loading.body="menuLoading" element-loading-text="玩命加载中">
        <el-tree :data="menuData" ref="tree" show-checkbox node-key="id" :default-expanded-keys="expandedKeys" :default-checked-keys="checkedKeys" :props="defaultProps">
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="menuVisible = false">取 消</el-button>
            <el-button type="primary" :loading="formMenuSubmiting" @click="commitMenuForm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            roleId: null,

            // 菜单表单
            menuLoading: false,
            menuVisible: false,
            formMenuSubmiting: false,

            // 菜单数据
            menuData: [],
            expandedKeys: [],
            checkedKeys: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            },
        };
    },
    methods: {
        getRoleMenu(id) {
            this.menuVisible = true;
            this.menuLoading = true;
            this.roleId = id;
            this.$api.system.role.getMenu({
                data: {
                    id: this.roleId,
                }
            }).then(response => {
                this.checkedKeys = response.data.data.checkedKeys;
                this.expandedKeys = response.data.data.expandedKeys;
                this.menuData = response.data.data.list;
                this.menuLoading = false;
            }).catch(error => {
                this.menuLoading = false;
                console.log(error);
            });
        },
        commitMenuForm() {
            this.formMenuSubmiting = true;
            this.$api.system.role.savePrivilege({
                data: {
                    roleId: this.roleId,
                    resourceType: 0,    // 资源类型 0-菜单
                    resourceIds: this.$refs.tree.getCheckedKeys(),
                }
            }).then(response => {
                this.formMenuSubmiting = false;
                this.menuVisible = false;
                this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success',
                    duration: 1500,
                });
                console.log(response);
            }).catch(error => {
                this.formMenuSubmiting = false;
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
