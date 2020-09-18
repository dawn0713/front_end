<template>
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
                <el-button
                    style="float: right"
                    @click="searchUserList()"
                    type="primary"
                    size="small">
                    查询结果
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="用户名称/关键字"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
            <el-button
                class="btn-add"
                @click="addUser()"
                size="mini">
                添加
            </el-button>
        </el-card>
        <div class="table-container">
            <el-table ref="brandTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
                <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="用户名" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.username}}</template>
                </el-table-column>
                <el-table-column label="头像" width="150" align="center">
                    <template slot-scope="scope"><img style="height: 80px" :src="scope.row.icon"></template>
                </el-table-column>
                <el-table-column label="邮箱"  align="center">
                    <template slot-scope="scope">{{scope.row.email}}</template>
                </el-table-column>
                <el-table-column label="身份" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.nickName}}</template>
                </el-table-column>
                <el-table-column label="是否启用" width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleShowStatusChange(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="scope.row.status">
                        </el-switch>
                    </template>
                </el-table-column>
                 <el-table-column label="创建时间" width="250" align="center">
                    <template slot-scope="scope">{{scope.row.createTime}}</template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleUpdate(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column> 
            </el-table>
        </div>
        <div class="pagination-container">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :page-size="listQuery.pageSize"
                :page-sizes="[5,10,15]"
                :current-page.sync="listQuery.pageNum"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {fetchList, updateShowStatus, deleteUser} from '@/api/user'
export default {
    name: 'userList',
    data(){
        return {
            listQuery: {
                keyword: null,
                pageNum: 1,
                pageSize: 10
            },
            list: null,
            total: null,
            listLoading: true,
            userStatus:{
                id: '',
                status: ''
            }
        }
    },
    created(){
        this.getList();
    },
    methods: {
        getList() {
            this.listLoading = true;
            fetchList(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data.list;
                // console.log(response.data);
                console.log(this.list);
                this.total = response.data.total;
                this.totalPage = response.data.totalPage;
                this.pageSize = response.data.pageSize;
            })
        },
        handleUpdate(index, row) {
            this.$router.push({path: '/ums/updateUser', query: {id: row.id}})
        },
        handleDelete(index, row) {
            this.$confirm('是否要删除该用户', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteUser(row.id).then(response => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        duration: 1000
                    });
                    this.getList();
                });
            });
        },
        searchUserList() {
            this.listQuery.pageNum = 1;
            this.getList();
        },
        addUser() {
            this.$router.push({path: '/ums/addUser'})
        },
        handleShowStatusChange(index, row) {
            let data = new URLSearchParams();
            data.append("id", row.id);
            data.append("showStatus", row.status);
            console.log(typeof row.id);
            console.log(typeof row.status);
        
            updateShowStatus(data).then(response => {
            this.$message({
                message: '修改成功',
                type: 'success',
                duration: 1000
            });
            }).catch(error => {
                if (row.status === 0) {
                    row.status = 1;
                } else {
                    row.status = 0;
                }
            });
        },
        handleSizeChange(val) {
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val;
            this.getList();
        },
        

    }
    
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
