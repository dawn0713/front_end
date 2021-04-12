<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="user" :rules="rules" ref="userForm" label-width="150px">
      <el-form-item label="名称" prop="name">
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
        <el-button type="text" @click="dialogEmailVisible = true, user.notifier_type = 'email'" v-model="user.notifier_type">邮箱通知</el-button>
          <el-dialog title="邮箱信息" :visible.sync="dialogEmailVisible">
          <el-form :model="user.email">
            <el-form-item label="发件地址" :label-width="formLabelWidth">
              <el-input v-model="user.email.send_adderss"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="user.email.password"></el-input>
            </el-form-item>
            <el-form-item label="授权码" :label-width="formLabelWidth">
              <el-input v-model="user.email.authcode"></el-input>
            </el-form-item>
            <el-form-item label="接收地址" :label-width="formLabelWidth">
              <el-input v-model="user.email.receiver"></el-input>
            </el-form-item>
            <el-form-item label="SMTP服务器" :label-width="formLabelWidth">
              <el-input v-model="user.email.smtp_server"></el-input>
            </el-form-item>                      
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userForm')">重置</el-button>
            <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
          </div>
          </el-dialog>
        <el-button type="text" @click="dialogSmsVisible = true, user.notifier_type = 'sms'" v-model="user.notifier_type">短信通知</el-button>
          <el-dialog title="短信信息" :visible.sync="dialogSmsVisible">
          <el-form :model="user.sms">
            <el-form-item label="手机号码" :label-width="formLabelWidth">
              <el-input v-model="user.sms.phone_num" ></el-input>
            </el-form-item>
            <el-form-item label="模板信息" :label-width="formLabelWidth">
              <el-input v-model="user.sms.temp_code" ></el-input>
            </el-form-item>
            <el-form-item label="告警类型" :label-width="formLabelWidth">
              <el-input v-model="user.sms.alarm_type" ></el-input>
            </el-form-item>            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userForm')">重置</el-button>
            <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
          </div>
          </el-dialog>
        <el-button type="text" @click="dialogVoiceVisible = true, user.notifier_type = 'voice'" v-model="user.notifier_type">语音通知</el-button>
          <el-dialog title="语音信息" :visible.sync="dialogVoiceVisible">
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
        <el-button type="text" @click="dialogWechatVisible = true, user.notifier_type = 'wechat'" v-model="user.notifier_type">微信通知</el-button>
          <el-dialog title="微信信息" :visible.sync="dialogWechatVisible">
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
        <el-button type="text" @click="dialogWebhookVisible = true, user.notifier_type = 'webhook'" v-model="user.notifier_type">第三方通知</el-button>
          <el-dialog title="第三方信息" :visible.sync="dialogWebhookVisible">
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
        <el-button type="text" @click="dialogAppVisible = true, user.notifier_type = 'app'" v-model="user.notifier_type">APP通知</el-button>
          <el-dialog title="APP信息" :visible.sync="dialogAppVisible">
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
      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('userForm')">重置</el-button>
      </el-form-item> -->
    </el-form>
  </el-card>
</template>

<script>
  import SingleUpload from '@/components/Upload/singleUpload';
  import { createNotifier, getNotifier, updateNotifier } from "@/api/notifier";
  const defaultUser={
    name: '',
    notifier_type: '',
    desc: '',
    email: {
      receiver: '',
      smtp_server: '',
      authcode:'',
      password: '',
      send_adderss: ''
    },
    sms: {
      phone_num: '',
      temp_code: '',
      alarm_type: '',
    }
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
            {required: true, message: '请输入通知名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在2-140个字符', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择通知类型', trigger: 'blur'},
          ]
        },
        formLabelWidth: '120px',
        dialogEmailVisible: false,
        dialogSmsVisible: false,
        dialogVoiceVisible: false,
        dialogWechatVisible: false,
        dialogWebhookVisible: false,
        dialogAppVisible: false,
      }
    },
    created() {
      if(this.isEdit) {
        getNotifier(this.$route.query.id).then(response => {
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
                updateNotifier(this.$route.query.id, this.user).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createNotifier(this.user).then(response => {
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