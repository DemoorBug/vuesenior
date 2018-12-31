<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a
          href="/"
          class="site-logo"/>
        <span class="login">
          <em class="bold">已有美团账户？</em>
          <nuxt-link to="/login">
            <el-button
              type="primary"
              size="small">登陆</el-button>
          </nuxt-link>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="昵称"
          prop="name">
          <el-input v-model="ruleForm.name"/>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email">
          <el-input
            v-model="ruleForm.email"
            placeholder="请输入邮箱"/>
          <el-button
            size="mini"
            round
            @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="code">
          <el-input
            v-model="ruleForm.code"
            maxlength="4"
            placeholder="请输入验证码"/>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password"
            placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="cpwd">
          <el-input
            v-model="ruleForm.cpwd"
            type="password"
            placeholder="确认密码"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="register">同意以上协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            href="/"
            class="f1"
            target="_bank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
  import CryptoJs from 'crypto-js'
export default {
  layout: 'blank',
  data () {
    return {
      ruleForm: {
        name: '',
        email: '',
        code: '',
        pwd: '',
        cpwd: ''
      },
      statusMsg: '',
      error: '',
      rules:{
        name: [{
          required: true,
          type: 'string',
          message: '请输入昵称',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          type: 'email',
          message: '请输入正确邮箱',
          trigger: 'blur'
        }],
        pwd: [{
          required: true,
          message: '创建密码',
          trigger: 'blur'
        }],
        cpwd: [{
          required: true,
          message: '确认密码',
          trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if(value==="") {
              callback(new　Error('请在此输入密码'))
            }else if (value!== this.ruleForm.pwd) {
              callback(new Error('两次输入密码不同'))
            }else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    sendMsg () {
      let namePass
      let emailPass
      if(this.timerid) {
        return false
      }
      this.$refs['ruleForm'].validateField('name', (valid) => {
        namePass = valid
      })
      this.statusMsg = ''
      if(namePass) {
        return false
      }
      this.$refs['ruleForm'].validateField('email', (valid) => {
        emailPass = valid
      })
      if (!namePass && !emailPass) {
        this.$axios.post('/users/verify', {
          username: encodeURIComponent(this.ruleForm.name),
          email: this.ruleForm.email
        }).then(({status, data}) => {
          if (status === 200 && data && data.code === 0) {
            let count = 60;
            this.statusMsg = `验证码已发送,剩余${count--}秒`
            this.timerid = setInterval(() => {
              this.statusMsg = `验证码已发送,剩余${count--}秒`
              if (count === 0) {
                this.statusMsg = ''
                clearInterval(this.timerid)
              }
            }, 1000)
          } else {
            this.statusMsg = data.msg
          }
        })
      }
    },
    register () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$axios.post('/users/signup', {
            username: window.encodeURIComponent(this.ruleForm.name),
            password: CryptoJs.MD5(this.ruleForm.pwd).toString(),
            email: this.ruleForm.email,
            code: this.ruleForm.code
          }).then(({status, data}) => {
            if (status ===200) {
              if (data && data.code ===0) {
                // this.error = data.msg
                // location.href = '/login'
                this.$router.push('login')
              } else {
              this.error = data.msg
              }
            } else {
              this.error = `服务器出错，错误码: ${status}`
            }
            setTimeout(() => {
              this.error = ''
            }, 1500)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/register/index.scss";
</style>
