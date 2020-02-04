<template>
  <el-dialog :title="dialogTitle" :visible="dialogVisible" :close-on-click-modal="false" :destroy-on-close="true" @close="close">
    <el-form ref="form" :model="form" label-width="120px" class="dialog-form-container" :rules="rules">
      <el-form-item label="原密码" prop="oldPass">
        <el-input v-model="form.oldPass" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input v-model="form.newPass" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item label="重复密码" prop="renewPass">
        <el-input v-model="form.renewPass" autocomplete="off" type="password" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button plain @click="close">取 消</el-button>
      <el-button type="primary" plain :loading="loading" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    visible: {
      default() {
        return false
      },
      type: Boolean
    }
  },

  data() {
    const validatePassword = (rule, value, callback) => {
      if (!value || value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const validateRePassword = (rule, value, callback) => {
      if (!value || value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else if (value !== this.form.newPass) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {},
      rules: {
        oldPass: [
          { required: true, trigger: ['blur'], validator: validatePassword }
        ],
        newPass: [
          { required: true, trigger: ['blur'], validator: validatePassword }
        ],
        renewPass: [
          { required: true, trigger: ['blur'], validator: validateRePassword }
        ]
      }
    }
  },
  computed: {
    dialogVisible() {
      let dialogVisible = false
      if (this.visible) {
        dialogVisible = true
      }
      return dialogVisible
    },
    dialogTitle() {
      return '修改密码'
    }
  },
  methods: {
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/editPassword', this.form)
            .then(() => {
              this.$notify({
                title: '密码修改成功',
                type: 'success'
              })
              this.$emit('cb', 'refresh')
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    close() {
      this.$emit('cb', 'close')
    }
  }
}
</script>

<style scoped>

</style>
