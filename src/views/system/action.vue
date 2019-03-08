<template>
    <div class="components-container">
        <el-tabs v-model="tabActiveName">
            <el-tab-pane v-for="(element, index) in tableData" :key="index" :label="element.title" :name="String(index)">
            </el-tab-pane>
        </el-tabs>

        <el-row>
            <el-col :sm="12" :md="8" v-for="(sonItem, index) in sonList" :key="index">
                <el-card class="box-card">
                    <div slot="header">
                        <span>{{ sonItem.title }}</span>
                        <el-button size="small" class="pull-right" @click="showDialog('create', sonItem)" type="primary">新增配置</el-button>
                    </div>
                    <div class="list-item" v-for="(resource, index) in sonItem.children" :key="index">
                        <el-tag type="gray">
                            {{ resource.url }}
                        </el-tag>
                        <span class="item-content">{{ resource.description }}</span>
                        <el-button size="mini" class="pull-right" style="margin-left: 10px;" @click="deleteRecord(resource)" type="primary" icon="delete"><i class="el-icon-delete"></i></el-button>
                        <el-button size="mini" class="pull-right" @click="showDialog('update', resource)" type="primary" icon="edit"><i class="el-icon-edit"></i></el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog :title="formTitle" :visible.sync="formVisible">
            <el-form label-position="left" label-width="70px" style="width: 80%; margin-left:0px;">
                <el-form-item label="父菜单">
                    <el-select v-model="createdItem.parentId" clearable :disabled="true" placeholder="请选择父菜单">
                        <el-option v-for="item in menuIdOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资源URI">
                    <el-input v-model="createdItem.url" placeholder="请填写URI"></el-input>
                </el-form-item>
                <el-form-item label="资源说明">
                    <el-input v-model="createdItem.description" placeholder="请填写资源说明"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false">取 消</el-button>
                <el-button type="primary" :loading="formSubmiting" @click="commitForm">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="batchFormTitle" :visible.sync="batchFormVisible" :before-close="handleClose">
            <el-form label-position="left" label-width="70px" style="width: 80%; margin-left:0px;">
                <el-form-item label="父菜单">
                    <el-select v-model="createdItem.parentId" clearable :disabled="true" placeholder="请选择父菜单">
                        <el-option v-for="item in menuIdOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="控制器">
                    <el-select v-model="controller" placeholder="选择控制器" @change="getResources(controller)">
                        <el-option v-for="(item, index) in classLists" :key="index" :label="index" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-tree :data="resList" ref="tree" show-checkbox node-key="url" :default-expanded-keys="expandedKeys" :default-checked-keys="checkedKeys" :props="defaultProps">
                </el-tree>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" :loading="batchFormSubmiting" @click="batchCommitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { confirmBox } from 'utils/message';
export default {
    data() {
        return {
            tableData: [],
            menuIdOptions: [],
            tabActiveName: '0',
            tabActiveIndex: 0,

            formTitle: null,
            formVisible: false,
            formSubmiting: false,
            createdItem: {
                id: null,
                parentId: null,
                url: null,
                description: null,
            },
            deletedForm: {
                id: null,
            },

            batchFormTitle: null,
            batchFormVisible: false,
            batchFormSubmiting: false,
            classLists: [],
            controller: '',
            resList: [],
            expandedKeys: [],
            checkedKeys: [],
            methodsList: {},
            defaultProps: {
                label: 'title'
            },
        }
    },
    computed: {
        sonList() {
            if (Array.isArray(this.tableData) && this.tableData.length == 0) {
                return [];
            }
            return this.tableData[this.tabActiveIndex].children;
        }
    },
    watch: {
        tabActiveName() {
            this.tabActiveIndex = Number(this.tabActiveName);
        }
    },
    mounted() {
        this.dataInit();
        this.classList();
    },
    methods: {
        classList() {
            this.$api.system.action.getClasses({})
                .then(resp => {
                    this.classLists = resp.data.data;
                });
        },
        async dataInit() {
            let menuData = await this.getMenuList().catch(error => {
                console.log(error);
            });
            let resourceData = await this.getResourceList().catch(error => {
                console.log(error);
            });

            // 子菜单与URI资源关联
            resourceData.forEach(item => {
                let index = menuData.map(ele => ele.id).indexOf(item.parentId);

                if (index < 0) return;
                if (menuData[index].children === undefined) {
                    menuData[index].children = [];
                }
                menuData[index].children.push(item);
            });

            // 父子菜单关联
            let parentData = menuData.filter(item => item.parentId == 0);
            menuData.forEach(item => {
                let index = parentData.map(ele => ele.id).indexOf(item.parentId);

                if (index < 0) return;
                if (parentData[index].children === undefined) {
                    parentData[index].children = [];
                }
                parentData[index].children.push(item);
            });
            this.tableData = parentData;

            console.log(this.tableData);
        },
        getMenuList() {
            return new Promise((resolve, reject) => {
                this.$api.system.menu.list({
                    data: {
                        limit: 100,
                        current_page: 1,
                        parentId: null
                    }
                }).then(response => {
                    let data = response.data.data;
                    this.menuIdOptions = Object.keys(data).map(key => ({
                        label: data[key].title,
                        value: data[key].id
                    }));
                    resolve(response.data.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        getResourceList() {
            return new Promise((resolve, reject) => {
                this.$api.system.action.all({

                }).then(response => {
                    resolve(response.data.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        clearDialog() {
            console.log(this.resList);
            this.createdItem.id = null;
            this.createdItem.parentId = null;
            this.createdItem.url = null;
            this.createdItem.description = null;
            this.controller = '';
            this.resList = [];
            this.checkedKeys = [];
        },
        showDialog(type, element) {
            if (type === 'create') {
                this.batchFormVisible = true;
                this.clearDialog();
                this.batchFormTitle = "新建URI资源";
                this.createdItem.parentId = element.id;
                this.getAlreadyChecked(element);
            } else {
                this.formVisible = true;
                this.clearDialog();
                this.formTitle = "修改URI资源";
                Object.assign(this.createdItem, element);
            }
        },
        commitForm() {
            this.formSubmiting = true;
            this.$api.system.action.save({
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
                console.log(response);
                this.dataInit();
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
        batchCommitForm() {
            let check = this.$refs.tree.getCheckedKeys();
            console.log(check);
            this.batchFormSubmiting = true;
            this.$api.system.action.batchSave({
                data: {
                    'parentId': this.createdItem.parentId,
                    'resources': check,
                    'class_name': this.controller
                }
            }).then(response => {
                this.batchFormSubmiting = false;
                this.batchFormVisible = false;
                this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success',
                    duration: 1500,
                });
                this.dataInit();
                this.$refs.tree.setCheckedKeys([]);
                console.log(response);
            }).catch(error => {
                this.batchFormSubmiting = false;
                this.$notify({
                    title: '错误',
                    message: '保存失败',
                    type: 'error',
                    duration: 3000,
                });
                this.$refs.tree.setCheckedKeys([]);
                console.log(error);
            });
        },
        deleteRecord(resource) {
            confirmBox(' uri资源 ' + resource.url).then(() => {
                this.deletedForm.id = resource.id;
                this.$api.system.action.delete({
                    data: this.deletedForm
                }).then(response => {
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success',
                        duration: 1500,
                    });
                    this.dataInit();
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
        getResources(className) {
            if (!className) {
                return false;
            }
            this.$api.system.action.getResources({
                data: {
                    str: className
                }
            }).then(response => {
                this.methodsList = response.data.data;
                let tmp = [];
                for (let i in this.methodsList) {
                    if (this.methodsList.hasOwnProperty(i)) {
                        tmp.push({
                            title: this.methodsList[i].url + ' 【' + this.methodsList[i].desc + '】',
                            url: this.methodsList[i].url
                        });
                    }
                }
                this.resList = tmp;
            })
        },
        getAlreadyChecked(elem) {
            let tmp = [];
            if (elem.hasOwnProperty('children') && elem.children.constructor === Array) {
                for (let i = 0; i < elem.children.length; i++) {
                    tmp.push(elem.children[i].url);
                }
            }
            this.checkedKeys = tmp;
        },
        cancel() {
            this.batchFormVisible = false;
            console.log(this.$refs.tree.getCheckedKeys());
            this.$refs.tree.setCheckedKeys([]);
        },
        handleClose() {
            this.cancel();
        }
    }
}

</script>

<style scoped>
.el-menu {
    background-color: #fff;
}

.is-active {
    font-weight: 600;
}

.box-card {
    margin: 10px;
    max-height: 200px;
    overflow: auto;
}

.pull-right {
    float: right;
}

.list-item {
    margin: 5px 0px;
}

.item-content {
    line-height: 22px;
    font-size: 12px;
}

</style>
