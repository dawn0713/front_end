<template>
  <el-card class="form-container" shadow="never">
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
      <el-form-item label="数据来源" prop="origin" >
        <el-table :data="user.dynamicItem"
                  style="width: 100%" border>
          <el-table-column
            label="字段"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.count"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="匹配条件"
            align="center"
            width="120">
            <template slot-scope="scope">
                <el-select label="匹配条件" v-model="user.proto">
                  <el-option label="大于" value="bt"></el-option>
                  <el-option label="小于" value="lt"></el-option>
                  <el-option label="等于" value="eq"></el-option>
                  <el-option label="大于等于" value="bte"></el-option>
                  <el-option label="小于等于" value="lte"></el-option>
                </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="值"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-input label="test" v-model="scope.row.discount"></el-input>
            </template>
          </el-table-column>          
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleRemoveProductLadder(scope.$index, scope.row)">删除</el-button>
              <el-button type="text" @click="handleAddProductLadder(scope.$index, scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item> 
      <el-form-item label="数据流向" placeholder="请选择数据流向" prop="type">
        <el-button type="text" @click="dialogRtEventVisible = true, user.rt_event = 'email'" v-model="user.notifier_type">告警通知</el-button>
          <el-dialog title="告警信息" :visible.sync="dialogRtEventVisible">
          <el-form :model="user.rt_event.sms">
            <el-form-item label="告警类型" :label-width="formLabelWidth">
                <el-select label="匹配条件" v-model="user.proto">
                  <el-option label="短信通知" value="bt"></el-option>
                  <el-option label="微信通知" value="lt"></el-option>
                  <el-option label="第三方通知" value="eq"></el-option>
                  <el-option label="APP通知" value="bte"></el-option>
                  <el-option label="语音通知" value="lte"></el-option>
                  <el-option label="邮箱通知" value="lte"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="告警数据ID" :label-width="formLabelWidth">
              <el-input v-model="user.rt_event.notify_id" ></el-input>
            </el-form-item>            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userForm')">重置</el-button>
            <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
          </div>
          </el-dialog>
        <el-button type="text" @click="dialogRtNsqVisible = true, user.rt_event = 'email'" v-model="user.notifier_type">数据转发</el-button>
          <el-dialog title="消息队列信息" :visible.sync="dialogRtNsqVisible">
          <el-form :model="user.rt_nsq.topic">
            <el-form-item label="topic" :label-width="formLabelWidth">
              <el-input v-model="user.rt_nsq.topic" ></el-input>
            </el-form-item>
            <el-form-item label="channel" :label-width="formLabelWidth">
              <el-input v-model="user.rt_nsq.channel" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userForm')">重置</el-button>
            <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
          </div>
          </el-dialog> 
        <el-button type="text" @click="dialogRtDbVisible = true, user.rt_event = 'email'" v-model="user.notifier_type">数据存储</el-button>
          <el-dialog title="数据库信息" :visible.sync="dialogRtDbVisible">
          <el-form :model="user.rt_db.db_name">
            <el-form-item label="数据表名称" :label-width="formLabelWidth">
              <el-input v-model="user.rt_db.value" ></el-input>
            </el-form-item>
            <el-form-item label="操作" :label-width="formLabelWidth">
              <el-input v-model="user.rt_db.operator" ></el-input>
            </el-form-item>
            <el-form-item label="数据映射" :label-width="formLabelWidth">
              <el-input v-model="user.rt_db.mapping" ></el-input>
            </el-form-item>            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userForm')">重置</el-button>
            <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
          </div>
          </el-dialog> 
        <el-button type="text" @click="dialogRtDeviceVisible = true, user.rt_event = 'email'" v-model="user.notifier_type">设备联动</el-button>
          <el-dialog title="设备联动信息" :visible.sync="dialogRtDeviceVisible">
          <el-form :model="user.rt_device.sms">
            <el-form-item label="设备信息" :label-width="formLabelWidth">
              <el-input v-model="user.rt_device.device_id" ></el-input>
            </el-form-item>
            <el-form-item label="指令数据" :label-width="formLabelWidth">
              <el-input v-model="user.rt_device.cmd" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userForm')">重置</el-button>
            <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
          </div>
          </el-dialog>          
      </el-form-item>
      <!-- <el-form-item label="数据目的地" prop="output">
          <el-input
          placeholder="请输入详细内容"
          type="textarea"
          v-model="user.output"
          :autosize="true"
          >
          </el-input>
      </el-form-item>   -->
      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit('userForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('userForm')">重置</el-button>
        <el-button @click="onSubmit('userForm')">调试规则</el-button>
      </el-form-item> -->
    </el-form>
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
    rt_event: {

    },
    rt_nsq: {

    },
    rt_db: {

    },
    rt_device: {

    },
    format: '',
    timerange: '',
    is_used: true,
    dynamicItem: [{
            count: '',
            discount: '',
            price: ''
          }]
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
            {required: true, message: '匹配条件', trigger: 'blur'},
          ],
          format: [
            {required: true, message: '请选择规则格式', trigger: 'blur'},
          ]
        },
        checked: true,
        value1: [new Date(2020, 10, 10, 10, 10), new Date(2021, 5, 1, 10, 10)],
        formLabelWidth: '120px',
        dialogRtEventVisible: false,
        dialogRtNsqVisible: false,
        dialogRtDbVisible: false,
        dialogRtDeviceVisible: false,
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
    handleRemoveProductLadder(index, row) {
        let dynamicItem = this.user.dynamicItem;
        if (dynamicItem.length === 1) {
          dynamicItem.pop();
          dynamicItem.push({
            count: 0,
            discount: 0,
            price: 0
          })
        } else {
          dynamicItem.splice(index, 1);
        }
      },
      handleAddProductLadder(index, row) {
        let dynamicItem = this.user.dynamicItem;
        console.log(dynamicItem);
        if (dynamicItem.length < 3) {
          console.log('yes');
          dynamicItem.push({
            count: 0,
            discount: 0,
            price: 0
          });
          console.log(dynamicItem);
        } else {
          this.$message({
            message: '最多只能添加三条',
            type: 'warning'
          });
        }
      },

    },
    // mounted(){
    //     this.scrollHeight = window.innerHeight*0.7 + 'px';
    // }


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

<style scoped>
  .littleMargin {
    margin-top: 10px;
  }
  .el-form-item .el-form-item{
    margin-bottom: 20px;
  }
</style>
