<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="user" :rules="rules" ref="userForm" label-width="150px">
      <el-form-item label="应用名称" prop="appname">
        <el-input v-model="user.appname"></el-input>
      </el-form-item>
      <el-form-item label="IP">
        <el-input v-model="user.ip"></el-input>
      </el-form-item>
      <el-form-item label="PORT">
        <el-input v-model="user.port"></el-input>
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="user.url"></el-input>
      </el-form-item>
      <el-form-item label="网络协议" placeholder="请选择使用的网络协议" prop="proto">
        <el-select v-model="user.proto">
          <el-option label="UDP" value="UDP"></el-option>
          <el-option label="TCP" value="TCP"></el-option>
          <el-option label="HTTP" value="HTTP"></el-option>
          <el-option label="MQTT" value="MQTT"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          placeholder="请输入内容"
          type="textarea"
          v-model="user.note"
          :autosize="true"></el-input>
      </el-form-item>
      <el-form-item label = "应用解析函数">
     <el-upload
      class="upload-demo"
      action="uploadFile()"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
      accept=".py, .go">
      <el-button size="small" >点击上传应用解析函数</el-button>
      <div slot="tip" class="el-upload__tip">只能上传python/go文件，且不超过500kb</div>
     </el-upload> 
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
          appname: [
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
      },
      uploadFile(){
        return 
      }
    }
  }
</script>

<style>

</style>
