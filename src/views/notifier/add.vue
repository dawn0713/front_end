<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="user" :rules="rules" ref="userForm" label-width="150px">
      <el-form-item label="名称" prop="notifiername">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="通知类型" placeholder="请选择通知类型" prop="type">
        <el-select v-model="user.proto">
          <el-option label="邮箱通知" value="email"></el-option>
          <el-option label="短信通知" value="sms"></el-option>
          <el-option label="微信通知" value="wechat"></el-option>
          <el-option label="语音通知" value="voice"></el-option>
          <el-option label="第三方通知" value="webhook"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="描述">
        <el-input
          placeholder="请输入内容"
          type="textarea"
          v-model="user.desc"
          :autosize="true"></el-input>
      </el-form-item>
      <el-form-item label="通知类型">
        <el-button type="text" @click="dialogFormVisible = true" v-model="user.notifier_type">邮箱通知</el-button>
          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="user">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="user.appname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="user.ip" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userForm')">重置</el-button>
            <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
          </div>
          </el-dialog>
        <el-button type="text" @click="dialogFormVisible = true" v-model="user.notifier_type">短信通知</el-button>
          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="user">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="user.appname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="user.ip" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userForm')">重置</el-button>
            <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
          </div>
          </el-dialog>
        <el-button type="text" @click="dialogFormVisible = true" v-model="user.notifier_type">语音通知</el-button>
          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="user">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="user.appname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="user.ip" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userForm')">重置</el-button>
            <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
          </div>
          </el-dialog>
        <el-button type="text" @click="dialogFormVisible = true" v-model="user.notifier_type">微信通知</el-button>
          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="user">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="user.appname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="user.ip" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userForm')">重置</el-button>
            <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
          </div>
          </el-dialog>
        <el-button type="text" @click="dialogFormVisible = true" v-model="user.notifier_type">第三方通知</el-button>
          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="user">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="user.appname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="user.ip" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userForm')">重置</el-button>
            <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
          </div>
          </el-dialog>
        <el-button type="text" @click="dialogFormVisible = true" v-model="user.notifier_type">APP通知</el-button>
          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="user">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="user.appname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="user.ip" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userForm')">重置</el-button>
            <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
          </div>
          </el-dialog>
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
    name: '',
    notifier_type: '',
    port: '',
    url: '',
    desc: '',
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
          ]
        },
        formLabelWidth: '120px',
        dialogFormVisible: false,
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