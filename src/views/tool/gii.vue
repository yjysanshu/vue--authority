<template>
    <div class="components-container">
        <div class="filter-container">
            <el-select v-model="tableQuery.databaseName" @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="请选择数据库名称">
                <el-option v-for="item in databaseData" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button style="margin-left: 10px;" @click="handleFilter" type="primary"><i class="el-icon-search"></i></el-button>
            <el-button @click="handleReset" type="primary"><i class="el-icon-refresh"></i></el-button>
            <el-button @click="showDialog('create')" type="primary"><i class="el-icon-plus"></i> 新增数据库</el-button>
        </div>

        <el-table :data="tableData" v-loading.body="tableLoading" element-loading-text="拼命加载中" stripe border fit highlight-current-row style="width: 100%" max-height="500">
            <el-table-column label="数据表名" prop="tableName" width="160" align="center"></el-table-column>
            <el-table-column label="数据表引擎" prop="engine" align="center" width="120px"></el-table-column>
            <el-table-column label="数据表编码" prop="tableCollation" align="center" width="260px"></el-table-column>
            <el-table-column label="表数据行数" prop="tableRows" align="center" width="120px"></el-table-column>
            <el-table-column label="数据表说明" prop="tableComment" width="150" align="center"></el-table-column>
            <el-table-column label="创建时间" prop="createTime" align="center" width="180px"></el-table-column>
            <el-table-column fixed="right" label="操作" width="320" align="center">
                <template slot-scope="scope">
                    <el-button size="small" @click="showGeneratorDialog(scope.row)" type="primary"><i class="el-icon-edit"></i> 生成代码</el-button>
                    <el-button size="small" @click="showDialog(scope.row)" type="primary"><i class="el-icon-edit"></i> 查看表</el-button>
                    <el-button size="small" @click="deleteRecord(scope.row.id)" type="danger"><i class="el-icon-delete"></i> 删除表</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           current-page.sync="100" :page-sizes="[100, 200, 500]"
                           :page-size="tableQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog :title="formTitle" :visible.sync="formVisible" width="60%">
            <el-table :data="columnData" v-loading.body="tableLoading" element-loading-text="拼命加载中" stripe border fit highlight-current-row style="width: 100%">
                <el-table-column label="字段名称" prop="columnName" align="center"></el-table-column>
                <el-table-column label="数据类型" prop="dataType" align="center" width="120px"></el-table-column>
                <el-table-column label="长度" prop="characterMaximumLength" align="center" width="260px"></el-table-column>
                <el-table-column label="是否主键" prop="columnKey" align="center" width="120px"></el-table-column>
                <el-table-column label="说明" prop="columnComment" align="center"></el-table-column>
                <!--<el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showGeneratorDialog(scope.row)" type="primary"><i class="el-icon-edit"></i> 生成代码</el-button>
                        <el-button size="small" @click="showDialog('update', scope.row)" type="primary"><i class="el-icon-edit"></i> 查看表</el-button>
                        <el-button size="small" @click="deleteRecord(scope.row.id)" type="danger"><i class="el-icon-delete"></i> 删除表</el-button>
                    </template>
                </el-table-column>-->
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false">取 消</el-button>
                <el-button type="primary" :loading="formSubmiting" @click="commitForm">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="formTitle" :visible.sync="formGeneratorVisible" width="50%">
            <el-form :model="generatorForm" label-position="left" label-width="120px" style="width: 80%; margin-left:0px;">
                <el-form-item label="包名称(package)">
                    <el-input v-model="generatorForm.packageName" placeholder="请填写包名称"></el-input>
                </el-form-item>
                <el-form-item label="是否删除表前缀">
                    <el-switch v-model="generatorForm.deletePrefix" active-color="#ff4949" inactive-color="#13ce66" active-text="删除" inactive-text="不删除">
</el-switch>
                </el-form-item>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedActions" border @change="handleCheckedActionsChange">
                    <el-checkbox v-for="action in actions" style="line-height: 35px;width:43%;margin-left:3%;" :label="action" :key="action.value">{{action.label}}</el-checkbox>
                </el-checkbox-group>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="formGeneratorVisible = false">取 消</el-button>
                <el-button type="primary" :loading="formSubmiting" @click="generatorCommitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import jsonEditor from 'components/jsonEditor';
    import { confirmBox } from 'utils/message';
    import { isJson } from 'utils';

    const actionOptions = [
        {
            value: 'vue',
            label: '显示层(view-vue)'
        },
        {
            value: 'controller',
            label: '控制器(controller)'
        },
        {
            value: 'service',
            label: '服务层(service)'
        },
        {
            value: 'mapper',
            label: '数据层(mapper)'
        },
        {
            value: 'mapperXml',
            label: '数据连接(xml)'
        },
        {
            value: 'model',
            label: '数据模型(model)'
        },
        {
            value: 'modelRequest',
            label: '数据请求模型(modelRequest)'
        },
        {
            value: 'modelResponse',
            label: '数据返回模型(modelResponse)'
        }
    ];
    export default {
        components: { jsonEditor },
        data() {
            return {
                tableQuery: {
                    databaseName: 'temp',
                },
                total: 0,
                tableData: [],
                columnData: [],
                databaseData: [],
                tableLoading: true,
                formTitle: null,
                formGeneratorVisible: false,
                formVisible: false,
                formSubmiting: false,
                checkAll: false,
                isIndeterminate: true,
                checkedActions: [],
                createdItem: {
                    id: null,
                    code: null,
                    name: null,
                    stages: null,
                    description: null
                },
                generatorForm: {
                    actions: [],
                    tableName: null,
                    packageName: null,
                    deletePrefix: false,
                },
                deletedForm: {
                    id: null
                },
                jsonEditor: false,
                actions: actionOptions,
            };
        },
        mounted() {
            this.getList();
            this.getDatabaseList();
        },
        methods: {
            getList() {
                this.tableLoading = true;
                this.$api.module.gii.index({
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
            getDatabaseList() {
                this.$api.module.gii.list({
                }).then(response => {
                    let data = response.data.data;
                    this.databaseData = Object.keys(data).map(key => ({ value: data[key].database, label: data[key].database }));
                }).catch(error => {
                    console.log(error);
                });
            },
            getTableList(tableName) {
                this.$api.module.gii.tableList({
                    data: {"tableName": tableName}
                }).then(response => {
                    this.columnData = response.data.data.list;
                }).catch(error => {
                    console.log(error);
                });
            },
            handleFilter() {
                this.getList();
            },
            handleReset() {
                this.tableQuery.limit = 10;
                this.tableQuery.currentPage = 1;
                this.tableQuery.name = null;

                this.getList();
            },
            handleSizeChange(val) {
                this.tableQuery.limit = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.tableQuery.currentPage = val;
                this.getList();
            },
            handleCheckAllChange(val) {
                this.checkedActions = val ? actionOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedActionsChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.actions.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.actions.length;
            },
            clearDialog() {
                this.createdItem.id = null;
                this.createdItem.name = null;
                this.createdItem.stages = null;
                this.createdItem.description = null;
            },
            clearGeneratorDialog() {
                this.checkedActions = [];
                this.generatorForm.actions = null;
                this.generatorForm.tableName = null;
                this.generatorForm.packageName = null;
                this.generatorForm.deletePrefix = false;
            },
            showDialog(row) {
                this.formVisible = true;
                this.clearDialog();
                this.getTableList(row.tableName);
                Object.assign(this.createdItem, row);
                if (isJson(this.createdItem.value)) {
                    this.jsonEditor = true;
                    this.createdItem.value = JSON.parse(this.createdItem.value);
                }
            },
            showGeneratorDialog(row = null) {
                this.formGeneratorVisible = true;
                this.clearGeneratorDialog();
                this.formTitle = "选择需要生成的代码";
                this.generatorForm.tableName = row.tableName;

                console.log(this.generatorForm);
                console.log(row);
            },
            commitForm() {
                this.formSubmiting = true;
                this.$api.module.house.save({
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
            generatorCommitForm() {
                let actions = [];
                this.checkedActions.forEach(function (item) {
                    actions.push(item.value);
                });
                this.generatorForm.actions = actions;

                this.$api.module.gii.generator({
                    data: this.generatorForm
                }).then(response => {
                    this.formGeneratorVisible = false;
                    this.$notify({
                        title: '成功',
                        message: '保存成功',
                        type: 'success',
                        duration: 1500,
                    });
                    this.handleFilter();
                    console.log(response);
                }).catch(error => {
                    this.formGeneratorVisible = false;
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
                confirmBox('数据表').then(() => {
                    this.deletedForm.id = id;
                    this.$api.module.house.delete({
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
