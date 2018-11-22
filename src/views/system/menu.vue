<template>
    <div class="components-container">
        <div class="filter-container">
            <el-select v-model="tableQuery.parentId" clearable placeholder="请选择父菜单">
                <el-option v-for="item in fatherMenuOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button style="margin-left: 10px;" @click="handleFilter" type="primary"><i class="el-icon-search"></i></el-button>
            <el-button @click="handleReset" type="primary"><i class="el-icon-refresh"></i></el-button>
            <el-button @click="createDialog(0)" type="primary"><i class="el-icon-plus"></i> 新增菜单</el-button>
        </div>

        <expand-table :tableData="tableData" @update="updateDialog" @delete="deleteRecord" @create="createDialog">
        </expand-table>

        <el-dialog :title="formTitle" :visible.sync="formVisible">
            <el-form class="small-space" :model="createdItem" label-position="left" label-width="70px" style='width: 60%; margin-left:0px;'>
                <el-form-item label="父菜单">
                    <el-select v-model="createdItem.parentId" clearable placeholder="请选择父菜单">
                        <el-option v-for="item in fatherMenuOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单名称">
                    <el-input v-model="createdItem.title" placeholder="请填写菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="url">
                    <el-input v-model="createdItem.url" placeholder="请填写url"></el-input>
                </el-form-item>
                <el-form-item label="path">
                    <el-input v-model="createdItem.path" placeholder="请填写path"></el-input>
                </el-form-item>
                <el-form-item label="组件类型">
                    <el-select v-model="createdItem.type" clearable placeholder="请选择组件类型">
                        <el-option v-for="item in componentTypes" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序权重">
                    <el-inputNumber v-model="createdItem.seq"></el-inputNumber>（数值越大排名越靠前）
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false">取 消</el-button>
                <el-button type="primary" :loading="formSubmiting" @click="commitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
const _import = require('../../router/_import_' + process.env.NODE_ENV);
import ExpandTable from 'components/table/ExpandTable';
import { confirmBox } from 'utils/message';

export default {
    components: { ExpandTable },
    data() {
        return {
            tableQuery: {
                limit: 100,
                currentPage: 1,
                parentId: null
            },
            tableData: [],
            fatherMenuOptions: [
                {
                    label: '无',
                    value: 0
                }
            ],
            componentTypes: ['layout', 'iframe', 'default'],
            formTitle: null,
            formVisible: false,
            formSubmiting: false,
            createdItem: {
                id: null,
                title: null,
                parentId: null,
                path: null,
                url: null,
                icon: null,
                seq: null,
                type: null
            },
            deletedForm: {
                id: null
            },
        };
    },
    mounted() {
        this.getList();
        this.getMenuIds();
    },
    methods: {
        getList(parentId = 0) {
            this.$api.system.menu.list({
                data: this.tableQuery
            }).then(response => {
                let data = response.data.data;

                let changeData = data.filter(item => item.parentId == parentId);
                data.forEach(item => {
                    if (item.parentId <= 0) return;
                    let index = changeData.map(element => element.id).indexOf(item.parentId);

                    if (index < 0) return;
                    if (changeData[index].children === undefined || changeData[index].children === null) {
                        changeData[index].children = [];
                    }
                    item.level = 1;
                    changeData[index].children.push(item);
                    changeData[index].isParent = true;
                    changeData[index].isExpand = false;
                    changeData[index].level = 0;
                });
                this.tableData = changeData;
                // console.log(changeData);
            }).catch(error => {
                console.log(error);
            });
        },
        getMenuIds() {
            this.$api.system.menu.map({

            }).then(response => {
                let data = response.data.data;
                let list = Object.keys(data).map(key => ({ label: data[key].title, value: data[key].id }));
                let init = { label: '无', value: 0 };
                this.fatherMenuOptions = [init, ...list];
            }).catch(error => {
                console.log(error);
            });
        },
        handleFilter() {
            if (this.tableQuery.parentId !== null && this.tableQuery.parentId !== '') {
                this.showExpand = false;
                this.getList(this.tableQuery.parentId);
            } else {
                this.showExpand = true;
                this.getList();
            }
        },
        handleReset() {
            this.tableQuery.limit = 100;
            this.tableQuery.currentPage = 1;
            this.tableQuery.parentId = null;
            this.showExpand = true;
            this.getList();
            this.getMenuIds();
            this.formSubmiting = false;
            this.formVisible = false;
        },
        clearDialog() {
            this.createdItem.id = null;
            this.createdItem.title = null;
            this.createdItem.path = null;
            this.createdItem.url = null;
            this.createdItem.icon = null;
            this.createdItem.parentId = null;
            this.createdItem.seq = null;
            this.createdItem.type = null;
        },
        createDialog(parentId) {
            this.formVisible = true;
            this.clearDialog();

            if (parentId == 0) {
                this.formTitle = "新建菜单";
            } else {
                this.formTitle = "新建子菜单";
            }

            this.createdItem.parentId = parentId;
        },
        updateDialog(row) {
            this.formVisible = true;
            this.clearDialog();

            this.formTitle = "修改菜单";
            this.createdItem = JSON.parse(JSON.stringify(row));
        },
        commitForm() {
            this.formSubmiting = true;

            if (this.createdItem.type == 'default') {
                try {
                    console.log('@/views/' + this.createdItem.path + '.vue');
                    require('@/views/' + this.createdItem.path + '.vue');
                } catch (error) {
                    this.$notify({
                        title: '保存失败',
                        message: '请检查菜单类型，未找到对应的' + this.createdItem.path + '.vue',
                        type: 'error',
                        duration: 3000,
                    });
                    this.formSubmiting = false;
                    return false;
                } finally {

                }
            }

            console.log(this.createdItem);
            this.$api.system.menu.save({
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
            confirmBox('菜单').then(() => {
                this.deletedForm.id = id;
                this.$api.system.menu.delete({
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
    }
};
</script>
