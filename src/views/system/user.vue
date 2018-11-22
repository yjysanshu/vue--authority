<template>
    <div class="components-container">
        <div class="filter-container">
            <el-input v-model="tableQuery.name" @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="用户名"></el-input>
            <el-input v-model="tableQuery.phone" @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="手机号"></el-input>
            <el-input v-model="tableQuery.email" @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="邮箱"></el-input>
            <el-button style="margin-left: 10px;" @click="handleFilter" type="primary"><i class="el-icon-search"></i></el-button>
            <el-button @click="handleReset" type="primary"><i class="el-icon-refresh"></i></el-button>
            <el-button @click="showDialog('create')" type="primary"><i class="el-icon-plus"></i> 新增用户</el-button>
        </div>

        <el-table :data="tableData" v-loading.body="tableLoading" element-loading-text="拼命加载中" stripe border fit highlight-current-row style="width: 100%">
            <el-table-column label="ID" prop="id" align="center" width="100px"></el-table-column>
            <el-table-column label="用户名" prop="name" align="center" width="160px"></el-table-column>
            <el-table-column label="手机号" prop="phone" align="center" width="160px"></el-table-column>
            <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
            <el-table-column label="角色" align="center">
                <template slot-scope="scope">
                    <span v-for="(role, index) in scope.row.roles" :key="index">
                        <el-tag type="gray"> {{ role }} </el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="用户状态" align="center" width="100px">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">{{scope.row.status | statusMap}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="250px">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleResetPwd(scope.row.id)" type="success"><i class="el-icon-refresh"></i>重置密码</el-button>
                    <el-button size="small" @click="showDialog('update', scope.row)" type="primary"><i class="el-icon-edit"></i> </el-button>
                    <el-button size="small" @click="deleteRecord(scope.row.id)" type="danger"><i class="el-icon-delete"></i> </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="tableQuery.currentPage"
                :page-sizes="[10, 20, 50]" :page-size="tableQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog :title="formTitle" :visible.sync="formVisible">
            <el-form class="small-space" :model="createdItem" :rules="createdRules" label-position="left" label-width="70px" style='width: 60%; margin-left:0px;'>
                <el-form-item label="用户名">
                    <el-input v-model="createdItem.name" placeholder="请填写用户名" value="2ewqdwq">qwdwed{{}}</el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input name="phone" v-model="createdItem.phone" autoComplete="on" placeholder="请填写手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input name="email" v-model="createdItem.email" autoComplete="on" placeholder="请填写邮箱"></el-input>
                </el-form-item>
                <el-form-item label="用户角色">
                    <el-select v-model="createdItem.roles" multiple placeholder="请选择用户角色" style="width: 100%">
                        <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户状态">
                    <el-select v-model="createdItem.status" clearable placeholder="请选择用户状态">
                        <el-option v-for="item in statusArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
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
import { confirmBox } from 'utils/message';
import { isEmail, isPhone } from 'utils/validate';

export default {
    data() {
        const validateEmail = (rule, value, callback) => {
            if (!isEmail(value)) {
                callback(new Error('请输入正确的合法邮箱'));
            } else {
                callback();
            }
        };
        const validatePhone = (rule, value, callback) => {
            if (!isPhone(value)) {
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        };

        return {
            tableQuery: {
                limit: 10,
                currentPage: 1,
                name: null,
                phone: null,
                email: null
            },
            createdRules: {
                email: [
                    { required: false, trigger: 'blur', validator: validateEmail }
                ],
                phone: [
                    { required: false, trigger: 'blur', validator: validatePhone }
                ]
            },
            total: null,
            tableData: [],
            statusArr: [
                {
                    label: '正常',
                    value: 0
                },
                {
                    label: '停用',
                    value: 1
                }
            ],
            tableLoading: true,
            formTitle: null,
            formVisible: false,
            formSubmiting: false,
            createdItem: {
                id: null,
                name: null,
                phone: null,
                email: null,
                roles: [],
                status: null,
            },
            deletedForm: {
                id: null
            },
            roleList: [],
        };
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                '0': 'primary',
                '1': 'danger',
            };
            return statusMap[status]
        },
        statusMap(status) {
            const statusMap = {
                '0': '正常',
                '1': '停用',
            };
            return statusMap[status]
        },
        roleNameMap(roleId) {
            const roleNameMap = {};
            this.roleList.forEach(function (role) {
                roleNameMap.push()
            })
        }
    },
    mounted() {
        this.getRoleList();
        this.getUserList();
    },
    methods: {
        getUserList() {
            this.tableLoading = true;
            this.$api.system.user.list({
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
        getRoleList() {
            this.$api.system.role.all({
                data:{}
            }).then(response => {
                let data = response.data.data;
                this.roleList = Object.keys(data).map(key => ({ value: data[key].id, label: data[key].name }));
                // console.log(data);
                console.log(this.roleList);
            }).catch(error => {
                console.log(error);
            });
        },
        handleFilter() {
            this.getUserList();
        },
        handleReset() {
            this.tableQuery.limit = 10;
            this.tableQuery.currentPage = 1;
            this.tableQuery.name = null;
            this.tableQuery.phone = null;
            this.tableQuery.email = null;
            this.tableQuery.status = null;
            this.formSubmiting = false;
            this.formVisible = false;
            this.getUserList();
        },
        handleSizeChange(val) {
            this.tableQuery.limit = val;
            this.getUserList();
        },
        handleCurrentChange(val) {
            this.tableQuery.currentPage = val;
            this.getUserList();
        },
        clearDialog() {
            this.createdItem.id = null;
            this.createdItem.name = null;
            this.createdItem.phone = null;
            this.createdItem.email = null;
            this.createdItem.status = null;
            this.createdItem.roles = [];
        },
        showDialog(type, row = null) {
            this.formVisible = true;
            this.clearDialog();
            if (type == 'create') {
                this.formTitle = "新建用户";
            } else {
                this.formTitle = "修改用户";
                this.createdItem.id = row.id;
                this.createdItem.name = row.name;
                this.createdItem.phone = row.phone;
                this.createdItem.status = row.status;
                this.createdItem.email = row.email;
                this.createdItem.roles = Object.keys(row.roles).map(key => parseInt(key));
            }
        },
        commitForm() {
            this.formSubmiting = true;
            this.$api.system.user.save({
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
                    message: error,
                    type: 'error',
                    duration: 3000,
                });
                console.log(error);
            });
        },
        deleteRecord(id) {
            confirmBox('用户').then(() => {
                this.deletedForm.id = id;
                this.$api.system.user.delete({
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
                        message: error,
                        type: 'error',
                        duration: 3000,
                    });
                    console.log(error);
                });
            });
        },
        handleResetPwd(id) {
            confirmBox('用户密码', '重置').then(() => {
                this.$api.system.user.resetPwd({
                    data: {
                        id: id
                    }
                }).then(response => {
                    this.$notify({
                        title: '成功',
                        message: '重置用户密码成功',
                        type: 'success',
                        duration: 1500,
                    });
                    console.log(response);
                }).catch(error => {
                    this.formSubmiting = false;
                    this.$notify({
                        title: '错误',
                        message: '重置用户密码失败',
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
