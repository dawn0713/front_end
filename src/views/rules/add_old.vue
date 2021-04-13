<template>
  <el-card class="form-container" shadow="never">
       <!-- <el-scrollbar
        wrapClass="scrollbar-wrap"
        :style="{height: scrollHeight}"
        ref="scrollbarContainer"> -->

    <el-form :model="user" :rules="rules" ref="userForm" label-width="150px" :show-overflow-tooltip=true>
      <el-form-item label="规则名称" prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input placeholder="简要介绍规则内容" type="textarea" v-model="user.desc" :autosize="true"></el-input>
      </el-form-item>
      <!-- <div v-for="(item, index) in user.dynamicItem" :key="index">
        <el-form-item label="数据来源" prop="origin">
          <el-input placeholder="筛选字段" type="textarea" v-model="user.origin" :autosize="true"></el-input>
          <el-select label="匹配条件" v-model="user.proto">
            <el-option label="大于" value="bt"></el-option>
            <el-option label="小于" value="lt"></el-option>
            <el-option label="等于" value="eq"></el-option>
            <el-option label="大于等于" value="bte"></el-option>
            <el-option label="小于等于" value="lte"></el-option>
          </el-select>
          <el-input placeholder="数据值" type="textarea" v-model="user.origin" :autosize="true"></el-input>        
        </el-form-item> -->
      <!-- </div> -->
      <el-form-item label="数据来源" prop="origin">
        <el-table :data="user.dynamicItem"
                  style="width: 80%" border>
          <el-table-column
            label="数量"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.user.origin"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="折扣"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.user.origin"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteItem(scope.$index, scope.row)">删除</el-button>
              <el-button type="text" @click="addItem(scope.$index, scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item> 
      <el-form-item label="数据流向" placeholder="请选择数据流向" prop="type">
        <el-select v-model="user.type">
          <el-option label="告警通知" value="rt_event"></el-option> 
          <el-option label="数据存储" value="rt_db"></el-option>
          <el-option label="设备联动" value="rt_device"></el-option>
          <el-option label="数据转发" value="rt_nsq"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据目的地" prop="output">
          <el-input
          placeholder="请输入详细内容"
          type="textarea"
          v-model="user.output"
          :autosize="true"
          >
          </el-input>
      </el-form-item>  
      <el-form-item label="规则格式" placeholder="请选择规则定义格式" prop="format">
        <el-select v-model="user.format">
          <el-option label="python" value="python"></el-option>
          <el-option label="json" value="json"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规则有效期">
        <el-date-picker
          v-model="user.timerange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="生效时间"
          end-placeholder="失效时间">
        </el-date-picker>
      </el-form-item>
            <el-form-item label="调试数据" :show-overflow-tooltip=true>
        <el-input
          placeholder="请输入内容"
          type="textarea"
          v-model="user.debug"
          :autosize="true"
          >
          </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="user.is_used">是否启用</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('userForm')">重置</el-button>
        <el-button @click="onSubmit('userForm')">调试规则</el-button>
      </el-form-item>
    </el-form>
    <!-- </el-scrollbar> -->
  </el-card> 
</template>

<script>
  import SingleUpload from '@/components/Upload/singleUpload';
  import { createRules, getRules, updateRules } from "@/api/rules";
  const defaultUser={
    name: '',
    origin: '',
    desc: '',
    type: '',
    output: '',
    format: '',
    timerange: '',
    is_used: true,
    dynamicItem: []
  };
  export default {
    name: 'UserDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        user: Object.assign({}, defaultUser),
        form: {
        name: '',
        phone: '',
        dynamicItem: []
},
        scrollHeight:'0px',
        rules: {
          appname: [
            {required: true, message: '请输入规则名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在2-140个字符', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '匹配条件', trigger: 'blur'},
          ],
          format: [
            {required: true, message: '请选择规则格式', trigger: 'blur'},
          ]
        },
        checked: true,
        value1: [new Date(2020, 10, 10, 10, 10), new Date(2021, 5, 1, 10, 10)],
      }
    },
    created() {
      if(this.isEdit) {
        getRules(this.$route.query.id).then(response => {
          this.user = response.data;
        });
      }else{
        this.user = Object.assign({}, defaultUser);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateRules(this.$route.query.id, this.user).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                console.log(this.user)
                createRules(this.user).then(response => {
                  this.$refs[formName].resetFields();
                  this.user = Object.assign({},defaultUser);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.user = Object.assign({}, defaultUser);
      },
      addItem () {
      this.form.dynamicItem.push({
        name: '',
        phone: ''
      })
    },
      deleteItem (item, index) {
      this.form.dynamicItem.splice(index, 1)
      }
    },
    // mounted(){
    //     this.scrollHeight = window.innerHeight*0.7 + 'px';
    // }
    handleRemoveProductLadder(index, row) {
        let productLadderList = this.value.productLadderList;
        if (productLadderList.length === 1) {
          productLadderList.pop();
          productLadderList.push({
            count: 0,
            discount: 0,
            price: 0
          })
        } else {
          productLadderList.splice(index, 1);
        }
      },
      handleAddProductLadder(index, row) {
        let productLadderList = this.value.productLadderList;
        if (productLadderList.length < 3) {
          productLadderList.push({
            count: 0,
            discount: 0,
            price: 0
          })
        } else {
          this.$message({
            message: '最多只能添加三条',
            type: 'warning'
          });
        }
      },

  }
</script>

<style >

.el-tooltip__popper{
  max-width:30%
}
.el-scrollbar{
      height: 90%;
      /* .scrollbar-wrap {
        overflow-x: hidden;
      }
      .el-scrollbar__bar{
        
      } */
}
</style>