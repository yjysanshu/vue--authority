<template>
    <el-table :data="tableData" v-loading.body="tableLoading" element-loading-text="拼命加载中" border fit highlight-current-row row-key="id">
        <el-table-column label="角色名称" align="left">
            <template slot-scope="scope">
                <span class="tree-indent" v-for="index in scope.row.level" :key="index"></span>
                <template v-if="scope.row.isParent">
                    <span v-if="scope.row.isExpand" class="expand-icon" @click="foldTable(scope.row.id)">
                        <i class="el-icon el-icon-arrow-down"></i>
                    </span>
                    <span v-else class="expand-icon" @click="expandTable(scope.row.id)">
                        <i class="el-icon el-icon-arrow-right"></i>
                    </span>
                </template>
                {{scope.row.name}}
            </template>
        </el-table-column>
        <el-table-column label="ID" prop="id" align="center"></el-table-column>
        <el-table-column label="角色说明" prop="desc" align="center"></el-table-column>
            <el-table-column label="角色状态" align="center" width="100px">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">{{scope.row.status | statusMap}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="角色类型" align="center" width="100px">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.type | typeFilter">{{scope.row.type | typeMap}}</el-tag>
                </template>
            </el-table-column>
        <el-table-column label="操作" align="center" width="500px">
            <template slot-scope="scope">
                <el-button v-if="scope.row.level" size="small" @click="emitRoleManage(scope.row.id, 'menu')" type="warning" icon="setting">菜单</el-button>
                <el-button v-if="scope.row.level" size="small" @click="emitRoleManage(scope.row.id, 'resource')" type="success" icon="setting">资源</el-button>
                <el-button size="small" @click="emitRoleManage(scope.row.id, 'user')" type="info" icon="setting">用户</el-button>
                <el-button v-if="scope.row.level" size="small" @click="emitRoleUpdate(scope.row)" type="primary" icon="edit">修改</el-button>
                <el-button v-if="scope.row.level" size="small" @click="emitRoleDelete(scope.row.id)" type="danger" icon="delete">删除</el-button>
                <el-button v-if="scope.row.type" size="small" @click="emitRoleCreate(scope.row.id)" type="success" icon="plus">角色</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'TreeTable',
    props: {
        tableData: {
            type: Array,
            default: () => null,
        },
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                '0': 'success',
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
        typeFilter(type) {
            const typeMap = {
                '0': 'gray',
                '1': 'primary',
            };
            return typeMap[type]
        },
        typeMap(type) {
            const typeMap = {
                '0': '成员',
                '1': '群组',
            };
            return typeMap[type]
        }
    },
    computed: {
        tableLoading() {
            if (this.tableData == null) {
                return true;
            }
            return false;
        }
    },
    methods: {
        expandTable(id) {
            let indexList = this.tableData.map(item => item.id);
            let index = indexList.indexOf(id);

            this.tableData[index].isExpand = true;
            if (index + 1 == indexList.length) {
                this.tableData[index].nextId = -1;
            } else {
                this.tableData[index].nextId = this.tableData[index + 1].id;
            }

            this.tableData.splice(index + 1, 0, ...this.tableData[index].children);
        },
        foldTable(id) {
            let indexList = this.tableData.map(item => item.id);
            let index = indexList.indexOf(id);

            this.tableData[index].isExpand = false;
            if (this.tableData[index].nextId == -1) {
                this.tableData.splice(index + 1);
            } else {
                let nextIndex = indexList.indexOf(this.tableData[index].nextId);
                this.tableData.splice(index + 1, nextIndex - index - 1);
            }
        },
        emitRoleManage(id, type) {
            this.$emit('manage', id, type);
        },
        emitRoleUpdate(row) {
            this.$emit('update', row);
        },
        emitRoleDelete(id) {
            this.$emit('delete', id);
        },
        emitRoleCreate(id) {
            this.$emit('create', id);
        }
    }
}
</script>

<style>
.tree-indent {
    display: inline-block;
    width: 16px;
    height: 25px;
    vertical-align: top;
    overflow: hidden;
}

.expand-icon {
    position: relative;
    cursor: pointer;
    color: #666;
    transition: transform .2s ease-in-out;
    width: 16px;
    height: 25px;
}

.el-table__expanded-cell {
    padding: 0px 0px 0px 49px !important;
}
</style>
