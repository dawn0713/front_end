<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="user" :rules="rules" ref="userForm" label-width="150px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <single-upload v-model="user.icon"></single-upload>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          placeholder="请输入内容"
          type="textarea"
          v-model="user.note"
          :autosize="true"></el-input>
      </el-form-item>
      <el-form-item label="身份" placeholder="请选择用户身份">
        <el-select v-model="user.nickName">
          <el-option label="系统管理员" value="系统管理员"></el-option>
          <el-option label="测试账号" value="测试账号"></el-option>
          <el-option label="普通账号" value="普通账号"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用该账号">
        <el-radio-group v-model="user.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
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
  import { createUser, getUser, updateUser } from "@/api/user";
  const defaultUser={
    username: '',
    password: '',
    icon: '',
    email: '',
    note: '',
    nickName: '',
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
        rules: {
          username: [
            {required: true, message: '请输入用户名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在2-140个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        }
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
    }
  }
</script>

<style>

</style>