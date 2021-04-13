<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="user" :rules="rules" ref="userForm" label-width="150px">
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱账号">
        <el-input v-model="user.account"></el-input>
      </el-form-item>
      <el-form-item label="初始密码">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码">
        <el-input v-model="user.password1"></el-input>
      </el-form-item>
      <el-form-item label="账号类型" placeholder="请选择使用的网络协议" prop="proto">
        <el-select v-model="user.role">
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="普通用户" value="normal"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          placeholder="请输入内容"
          type="textarea"
          v-model="user.desc"
          :autosize="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('userForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import SingleUpload from '@/components/Upload/singleUpload';
  import { createApplication, getApplication, updateApplication } from "@/api/application";
  const defaultUser={
    name: '',
    account: '',
    password: '',
    password1: '',
    role: '',
    desc: ''
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
        rules: {
          name: [
            {required: true, message: '请输入应用名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在2-140个字符', trigger: 'blur'}
          ],
          proto: [
            {required: true, message: '请选择使用的网络协议', trigger: 'blur'},
          ]
        }
      }
    },
    created() {
      if(this.isEdit) {
        getApplication(this.$route.query.id).then(response => {
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
                updateApplication(this.$route.query.id, this.user).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createApplication(this.user).then(response => {
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
      uploadFile(){
        return 
      },
      uploadFile(){
        return 

      },
      uploadFile(){
        return 
      }
    }
  }
</script>

<style>

</style>