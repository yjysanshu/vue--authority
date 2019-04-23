<template>
    <el-table :data="tableData" v-loading.body="tableLoading" element-loading-text="拼命加载中" border fit highlight-current-row row-key="id">
        <el-table-column label="菜单名称" align="left">
            <template slot-scope="scope">
                <!-- elementui 2.7 以上版本需要注释掉下面两段 el-table 的 row-key 我已经加上了 -->
                <span class="tree-indent" v-for="index in scope.row.level" :key="index"></span>
                <template v-if="scope.row.isParent">
                    <span v-if="scope.row.isExpand" class="expand-icon" @click="foldTable(scope.row.id)">
                        <i class="el-icon el-icon-arrow-down"></i>
                    </span>
                    <span v-else class="expand-icon" @click="expandTable(scope.row.id)">
                        <i class="el-icon el-icon-arrow-right"></i>
                    </span>
                </template>
                {{scope.row.title}}
            </template>
        </el-table-column>
        <el-table-column label="ID" prop="id" align="center"></el-table-column>
        <el-table-column label="url" prop="url" align="center"></el-table-column>
        <el-table-column label="path" prop="path" align="center"></el-table-column>
        <el-table-column label="组件类型" prop="type" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="320px">
            <template slot-scope="scope">
                <template v-if="scope.row.isParent">
                    <el-button size="small" @click="emitMenuCreate(scope.row.id)" type="success"><i class="el-icon-plus"></i> 新增子菜单</el-button>
                </template>
                <el-button size="small" @click="emitMenuUpdate(scope.row)" type="primary"><i class="el-icon-edit"></i></el-button>
                <el-button size="small" @click="emitMenuDelete(scope.row.id)" type="danger"><i class="el-icon-delete"></i></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'ExpandTable',
    props: {
        tableData: {
            type: Array,
            default: () => null,
        },
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
        emitMenuUpdate(row) {
            this.$emit('update', row);
        },
        emitMenuDelete(id) {
            this.$emit('delete', id);
        },
        emitMenuCreate(id) {
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
</style>
