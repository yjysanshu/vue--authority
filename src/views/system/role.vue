<template>
    <div class="components-container">
        <div class="filter-container">
            <el-select v-model="tableQuery.status" clearable placeholder="请选择角色状态" style="width: 150px">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="tableQuery.type" clearable placeholder="请选择角色类型" style="width: 150px">
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-input v-model="tableQuery.name" @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="角色名称"></el-input>
            <el-button style="margin-left: 10px;" @click="handleFilter" type="primary"><i class="el-icon-search"></i></el-button>
            <el-button @click="handleReset" type="primary"><i class="el-icon-refresh"></i></el-button>
        </div>

        <tree-table :tableData="tableData" @manage="displayManage" @update="updateDialog" @delete="deleteRecord" @create="createDialog">
        </tree-table>

        <el-dialog :title="formTitle" :visible.sync="formVisible">
            <el-form class="small-space" :model="createdItem" label-position="left" label-width="70px" style="width: 60%;">
                <el-form-item label="角色名称">
                    <el-input v-model="createdItem.name" placeholder="请填写角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="createdItem.desc" placeholder="请填写角色描述"></el-input>
                </el-form-item>
                <el-form-item label="角色状态">
                    <el-switch v-model="createdItem.status" :inactive-value="1" :active-value="0" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
                <el-form-item label="角色类型">
                    <el-select v-model="createdItem.type" clearable placeholder="请选择角色类型">
                        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false">取 消</el-button>
                <el-button type="primary" :loading="formSubmiting" @click="commitForm">确 定</el-button>
            </div>
        </el-dialog>

        <menu-manage ref="menuManage"> </menu-manage>

        <action-manage ref="actionManage"> </action-manage>

        <user-manage ref="userManage"> </user-manage>

    </div>
</template>

<script>
import { confirmBox } from 'utils/message';
import MenuManage from 'views/system/roleOperate/MenuManage';
import ActionManage from 'views/system/roleOperate/ActionManage';
import UserManage from 'views/system/roleOperate/UserManage';
import TreeTable from 'views/system/roleOperate/TreeTable';

export default {
    components: {
        MenuManage,
        ActionManage,
        UserManage,
        TreeTable,
    },
    data() {
        return {
            statusOptions: [
                {
                    label: '正常',
                    value: 0
                },
                {
                    label: '停用',
                    value: 1
                }
            ],
            typeOptions: [
                {
                    label: '成员',
                    value: 0
                },
                {
                    label: '群组',
                    value: 1
                }
            ],

            total: null,
            tableData: [],
            tableLoading: false,
            tableQuery: {
                limit: 10,
                currentPage: 1,
                name: null,
                status: null,
                type: null,
            },

            formTitle: null,
            formVisible: false,
            formSubmiting: false,
            createdItem: {
                id: null,
                name: null,
                desc: null,
                status: 0,
                type: 0,
            },
            deletedForm: {
                id: null
            },
        };
    },
    mounted() {
        this.getRoleList();
    },
    methods: {
        getRoleList() {
            this.tableLoading = true;
            this.$api.system.role.list({
                data: this.tableQuery
            }).then(response => {
                this.tableData = response.data.data;
                this.tableLoading = false;
            }).catch(error => {
                this.tableLoading = false;
                console.log(error);
            });
        },
        handleFilter() {
            this.getRoleList();
        },
        handleReset() {
            this.tableQuery.limit = 10;
            this.tableQuery.currentPage = 1;
            this.tableQuery.name = null;
            this.tableQuery.status = null;
            this.tableQuery.type = null;

            this.getRoleList();
        },
        clearDialog() {
            this.createdItem.id = null;
            this.createdItem.name = null;
            this.createdItem.desc = null;
            this.createdItem.status = 0;
            this.createdItem.type = 0;
        },
        createDialog(parentId) {
            this.formVisible = true;
            this.clearDialog();

            this.formTitle = parentId ? "新建子角色" : "新建角色";
            this.createdItem.parentId = parentId;
        },
        updateDialog(row) {
            this.formVisible = true;
            this.clearDialog();

            this.formTitle = "修改角色";
            this.createdItem = Object.assign({}, row);
        },
        commitForm() {
            this.formSubmiting = true;
            this.$api.system.role.save({
                data: this.createdItem
            }).then(response => {
                this.formSubmiting = false;
                this.formVisible = false;
                this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success',
                    duration: 1500,
                });
                this.handleFilter();
                console.log(response);
            }).catch(error => {
                this.formSubmiting = false;
                this.$notify({
                    title: '错误',
                    message: '保存失败',
                    type: 'error',
                    duration: 3000,
                });
                console.log(error);
            });
        },
        deleteRecord(id) {
            confirmBox('角色').then(() => {
                this.deletedForm.id = id;
                this.$api.system.role.delete({
                    data: this.deletedForm
                }).then(response => {
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success',
                        duration: 1500,
                    });
                    this.handleFilter();
                    console.log(response);
                }).catch(error => {
                    this.formSubmiting = false;
                    this.$notify({
                        title: '错误',
                        message: '删除失败',
                        type: 'error',
                        duration: 3000,
                    });
                    console.log(error);
                });
            });
        },
        displayManage(id, type) {
            this.$nextTick(() => {
                switch(type) {
                    case 'menu':
                        this.$refs.menuManage.getRoleMenu(id);
                        break;
                    case 'resource':
                        this.$refs.actionManage.getRoleResource(id);
                        break;
                    case 'user':
                        this.$refs.userManage.getRoleUser(id);
                        break;
                    default: break;
                }
            });
        },
    }
};
</script>

