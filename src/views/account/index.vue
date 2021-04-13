<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="用户名">
            <el-input v-model="listQuery.appName" class="input-width" placeholder="用户名称"></el-input>
          </el-form-item>
          <el-form-item label="账户名">
            <el-input v-model="listQuery.appName" class="input-width" placeholder="账户名称"></el-input>
          </el-form-item>          
          <el-form-item label="创建时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.createTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>账号列表</span>
    </el-card>
    <div class="table-container">
      <el-table 
                ref="orderTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column prop="id" label="序号"  align="center">
            <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column prop="name" label="用户名称"  align="center">
            <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column prop="name" label="账号名称"  align="center">
            <template slot-scope="scope">{{scope.row.account}}</template>
        </el-table-column>
        <el-table-column prop="ip" label="角色"  align="center">
            <template slot-scope="scope">{{scope.row.role}}</template>
        </el-table-column>
        <el-table-column prop="desc" label="备注" align="center">
            <template slot-scope="scope">{{scope.row.desc}}</template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间"  align="center">
            <template slot-scope="scope">{{scope.row.create_time | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间"  align="center">
            <template slot-scope="scope">{{scope.row.update_time | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewOrder(scope.$index, scope.row)"
            >查看详情</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              >删除</el-button>
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
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>


<script>
  import {fetchList, deleteApplication} from '@/api/account'
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    appName: null,
    ip: null,
    create_time: null,
    proto: null
  };
  export default {
    name: "ApplicationList",
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: true,
        list: null,
        total: null,
        statusOptions: [
          {
            label: 'TCP',
            value: 0
          },
          {
            label: 'UDP',
            value: 1
          },
          {
            label: 'HTTP',
            value: 2
          },
          {
            label: 'MQTT',
            value: 3
          }
        ]
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleViewOrder(index, row){
        this.$router.push({path:'/application/appDetail',query:{id:row.app_id}})
      },
      handleDeleteOrder(index, row){
        let ids=[];
        ids.push(row.app_id);
        this.deleteApplication(ids);
      },
      handleSizeChange(val){
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.getList();
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;

          this.total = response.data.total;
        });
      },
      deleteApplication(ids){
        this.$confirm('是否要进行该删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("app_id",ids);
          deleteApplication(params).then(response=>{
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        })
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>
