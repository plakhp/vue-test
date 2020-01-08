<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">
        <i class="icon icon-logo" />
      </h3>
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="User name"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;font-weight: bold;"
        @click.native.prevent="handleLogin"
      >
        LOG IN
      </el-button>
    </el-form>
    <el-row class="email">
      <div>Need support?</div>
      <div>Contact <a href="mailto:jade.zhang@minglabs.com">jade.zhang@minglabs.com</a></div>
    </el-row>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $bg: #e52236;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .title-container {
      position: relative;
      margin-top: 160px;

      .title {
        font-size: 26px;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .login-form {
      position: relative;
      width: 300px;
      max-width: 100%;
      padding: 15px 30px;
      margin: 0 auto;
      overflow: hidden;
      background-color: #ffffff;
      border-radius: 3.6px;
    }

    .email {
      margin-top: 17px;
      line-height: 20px;
      text-align: center;
      color: #ffffff;
      a {
        text-decoration: underline;
      }
    }
  }
</style>
