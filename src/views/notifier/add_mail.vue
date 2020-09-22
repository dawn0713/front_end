<template>
  <el-card class="form-container" shadow="never">
  <el-scrollbar
        wrapClass="scrollbar-wrap"
        :style="{height: scrollHeight}"
        ref="scrollbarContainer">
    <el-form :model="user" :rules="rules" ref="userForm" label-width="150px">
      <el-form-item label="名称" prop="notifiername">
        <el-input v-model="user.notifiername"></el-input>
      </el-form-item>
      <el-form-item label="默认发件箱" prop="sender">
        <el-input v-model="user.sender"></el-input>
      </el-form-item>
      <el-form-item label="smtp服务器地址" prop="smtpserver">
        <el-input v-model="user.smtpserver"></el-input>
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model="user.port"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="默认收件人地址" prop="receiver">
        <el-input v-model="user.receiver"></el-input>
      </el-form-item>
      <el-form-item label="通知类型" placeholder="请选择通知类型" prop="type">
        <el-select v-model="user.proto">
          <el-option label="邮箱通知" value="email"></el-option>
          <el-option label="短信通知" value="sms"></el-option>
          <el-option label="微信通知" value="wechat"></el-option>
          <el-option label="语音通知" value="voice"></el-option>
          <el-option label="第三方通知" value="webhook"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          placeholder="请输入内容"
          type="textarea"
          v-model="user.note"
          :autosize="true"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('userForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </el-scrollbar>
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
        rules: {
          notifiername: [
            {required: true, message: '请输入通知名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在2-140个字符', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择通知类型', trigger: 'blur'},
          ],
          sender: [
            {required: true, message: '请输入默认发件箱', trigger: 'blur'},
          ],
          smtpserver: [
            {required: true, message: '请输入smtp服务器地址', trigger: 'blur'}
          ],
          port: [
            {required: true, message: '请输入smtp服务器端口', trigger: 'blur'}
          ],
          receiver: [
            {required: true, message: '请输入收件人地址', trigger: 'blur'}
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
    },
    mounted(){
        this.scrollHeight = window.innerHeight*0.7 + 'px';
    }
  }
</script>

<style>
.el-scrollbar{
      height: 90%;
      .scrollbar-wrap {
        overflow-x: hidden;
      }
      .el-scrollbar__bar{
        
      }
}
</style>