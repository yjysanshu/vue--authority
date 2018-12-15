<template>
    <div class="components-container">
        <div class="filter-container">
            <el-input v-model="tableQuery.name" @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="配置名"></el-input>
            <el-input v-model="tableQuery.desc" @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="配置说明"></el-input>
            <el-button style="margin-left: 10px;" @click="handleFilter" type="primary"><i class="el-icon-search"></i></el-button>
            <el-button @click="handleReset" type="primary"><i class="el-icon-refresh"></i></el-button>
            <el-button @click="showDialog('create')" type="primary"><i class="el-icon-plus"></i> 新增配置</el-button>
        </div>

        <el-table :data="tableData" v-loading.body="tableLoading" element-loading-text="拼命加载中" stripe border fit highlight-current-row style="width: 100%">
            <el-table-column label="ID" prop="id" align="center" width="100px"></el-table-column>
            <el-table-column label="配置名" prop="name" align="center" width="270px"></el-table-column>
            <el-table-column label="配置值" align="center">
                <template slot-scope="scope">
                    <span class="table-big-text">{{scope.row.value}}</span>
                </template>
            </el-table-column>
            <el-table-column label="说明" align="center">
                <template slot-scope="scope">
                    <span class="table-big-text">{{scope.row.description}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180px">
                <template slot-scope="scope">
                    <el-button size="small" @click="showDialog('update', scope.row)" type="primary"><i class="el-icon-edit"></i> </el-button>
                    <el-button size="small" @click="deleteRecord(scope.row.id)" type="danger"><i class="el-icon-delete"></i> </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="tableQuery.current_page" :page-sizes="[10, 20, 50]"
                :page-size="tableQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog :title="formTitle" :visible.sync="formVisible" width="35%">
            <el-form :model="createdItem" label-position="left" label-width="70px" style="width: 80%; margin-left:0px;">
                <el-form-item label="配置名">
                    <el-input v-model="createdItem.name" placeholder="请填写配置名"></el-input>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input v-model="createdItem.description" placeholder="请填写说明"></el-input>
                </el-form-item>
                <el-form-item label="配置类型">
                    <el-switch v-model="jsonEditor" active-color="#13ce66" inactive-color="#ff4949" active-text="JSON" inactive-text="文案" :active-value="true" :inactive-value="false"></el-switch>
                </el-form-item>

                <el-form-item label="配置值">
                        <template v-if="jsonEditor">
                            <json-editor ref="jsonEditor" v-model="createdItem.value" style="line-height: 16px !important;"></json-editor>
                        </template>
                        <template v-else>
                            <el-input type="textarea" :rows="5" v-model="createdItem.value" placeholder="请填写配置值"></el-input>
                        </template>
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
import jsonEditor from 'components/jsonEditor';
import { confirmBox } from 'utils/message';
import { isJson } from 'utils';

export default {
    components: { jsonEditor },
    data() {
        return {
            tableQuery: {
                limit: 10,
                current_page: 1,
                name: null,
                description: null,
            },
            total: null,
            tableData: [],
            tableLoading: true,

            formTitle: null,
            formVisible: false,
            formSubmiting: false,
            createdItem: {
                id: null,
                name: null,
                value: null,
                description: null
            },
            deletedForm: {
                id: null
            },
            jsonEditor: false,
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList() {
            this.tableLoading = true;
            this.$api.system.config.list({
                data: this.tableQuery
            }).then(response => {
                this.total = response.data.data.total;
                this.tableData = response.data.data.list;
                this.tableLoading = false;
            }).catch(error => {
                this.tableLoading = false;
                console.log(error);
            });
        },
        handleFilter() {
            this.getList();
        },
        handleReset() {
            this.tableQuery.limit = 10;
            this.tableQuery.current_page = 1;
            this.tableQuery.name = null;

            this.getList();
        },
        handleSizeChange(val) {
            this.tableQuery.limit = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.tableQuery.current_page = val;
            this.getList();
        },
        clearDialog() {
            this.createdItem.id = null;
            this.createdItem.name = null;
            this.createdItem.value = null;
            this.createdItem.description = null;
            this.jsonEditor = false;
        },
        showDialog(type, row = null) {
            this.formVisible = true;
            this.clearDialog();
            if (type == 'create') {
                this.formTitle = "新建配置";
            } else {
                this.formTitle = "修改配置";
                Object.assign(this.createdItem, row);
                if (isJson(this.createdItem.value)) {
                    this.jsonEditor = true;
                    this.createdItem.value = JSON.parse(this.createdItem.value);
                }
            }
        },
        commitForm() {
            this.formSubmiting = true;
            if (typeof this.createdItem.value == 'object')
            this.createdItem.value = JSON.stringify(this.createdItem.value)
            this.$api.system.config.save({
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
            confirmBox('配置').then(() => {
                this.deletedForm.id = id;
                this.$api.system.config.delete({
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
