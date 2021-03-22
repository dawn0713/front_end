<template>
  <el-card class="form-container" shadow="never">
       <!-- <el-scrollbar
        wrapClass="scrollbar-wrap"
        :style="{height: scrollHeight}"
        ref="scrollbarContainer"> -->
    <el-form :model="user" :rules="rules" ref="userForm" label-width="150px" :show-overflow-tooltip=true>
      <el-form-item label="规则名称" prop="appname">
        <el-input v-model="user.appname"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input placeholder="简要介绍规则内容" type="textarea" v-model="user.description" :autosize="true"></el-input>
      </el-form-item>
      <el-form-item label="数据来源" prop="data_from">
        <el-input
          placeholder="数据筛选"
          type="textarea"
          v-model="user.content"
          :autosize="true"
          >
          </el-input>        
      </el-form-item>
      <el-form-item label="数据类型" placeholder="请选择规则类型" prop="type">
        <el-select v-model="user.type">
          <el-option label="设备解析类" value="parse_device"></el-option>
          <el-option label="告警通知类" value="rt_event"></el-option>
          <el-option label="数据入库类" value="rt_db"></el-option>
          <el-option label="设备下发类" value="rt_device"></el-option>
          <el-option label="转入第三方服务类" value="rt_nsq"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据目的地" prop="data_output">
          <el-input
          placeholder="请输入详细内容"
          type="textarea"
          v-model="user.content"
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
          v-model="value1"
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
          v-model="user.content"
          :autosize="true"
          >
          </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">是否启用</el-checkbox>
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
  import { createUser, getUser, updateUser } from "@/api/user";
  const defaultUser={
    appname: '',
    ip: '',
    port: '',
    url: '',
    note: '',
    proto: '',
    status: 0
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
        scrollHeight:'0px',
        rules: {
          appname: [
            {required: true, message: '请输入规则名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在2-140个字符', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择规则类型', trigger: 'blur'},
          ],
          format: [
            {required: true, message: '请选择规则格式', trigger: 'blur'},
          ]
        },
        checked: true,
        value1: [new Date(2020, 10, 10, 10, 10), new Date(2020, 10, 11, 10, 10)],
      }
    },
    created() {
      if(this.isEdit) {
        getUser(this.$route.query.id).then(response => {
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
                updateUser(this.$route.query.id, this.user).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createUser(this.user).then(response => {
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
      }
    },
    mounted(){
        this.scrollHeight = window.innerHeight*0.7 + 'px';
    }
  }
</script>

<style >

.el-tooltip__popper{
  max-width:30%
}
.el-scrollbar{
      height: 90%;
      .scrollbar-wrap {
        overflow-x: hidden;
      }
      .el-scrollbar__bar{
        
      }
}
</style>