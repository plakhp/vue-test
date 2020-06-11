<template>
  <div class="login-container">
    <div class="title-container">
      <h2 class="title">
        <!-- <svg-icon icon-class="logo" style="width: 165px;" /> -->
        <div class="mt-30">宠物社区后台管理系统</div>
      </h2>
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
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入登录密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;font-weight:700;height:40px;margin-top:20px"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
    <!-- <el-row class="email">
      <div>Need support?</div>
      <div>Contact <a href="mailto:charles@ipzoe.com">charles@ipzoe.com</a></div>
    </el-row> -->
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: ['blur', 'change'], message: '请输入用户名' }],
        password: [{ required: true, trigger: ['blur', 'change'], validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.userName.focus()
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
        }
      })
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #889aa4;
  $cursor: #889aa4;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  // $bg: #2531ec;
  $bg:  #2b4b6b;

  $dark_gray: #889aa4;
  $light_gray:#889aa4;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .title-container {
      position: relative;
      margin-top: 160px;

      .title {
        font-size: 30px;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
        color: #ffffff;
      }
    }

    .login-form {
      position: relative;
      width: 450px;
      max-width: 100%;
      padding: 40px;
      margin: 0 auto;
      overflow: hidden;
      background-color: #ffffff;
      border-radius: 3.6px;

      .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }
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
