<template>
  <el-dialog :title="dialogTitle" :visible="dialogVisible" :close-on-click-modal="false" :destroy-on-close="true" @close="close">
    <el-form ref="form" :model="form" label-width="120px" class="dialog-form-container" :rules="rules">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" autocomplete="off" :disabled="status===1" />
      </el-form-item>
      <el-form-item v-if="status === 0" label="密码" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="form.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="form.roleId">
          <el-option
            v-for="(item, index) in roles"
            :key="index"
            :label="item.roleName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button plain @click="close">取 消</el-button>
      <el-button v-loading="loading" type="primary" plain @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { validPhone } from '@/utils/validate'
export default {
  name: 'Dialog',
  props: {
    id: {
      default() {
        return ''
      },
      type: String
    },
    status: {
      default() {
        return 0
      },
      type: Number
    },
    formData: {
      default() {
        return {}
      },
      type: Object
    },
    visible: {
      default() {
        return false
      },
      type: Boolean
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {},
      roles: [],
      rules: {
        userName: [
          { required: true, message: '用户名必填', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '密码必填', trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, trigger: ['blur', 'change'], validator: validatePhone }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: ['blur', 'change'] }
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
      let title = '新增账号'
      if (this.status === 1) {
        title = '编辑账号'
      }
      return title
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.form = this.formData
      this.$store.dispatch('role/dropdown')
        .then(data => {
          this.roles = data
        })
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.form.roleName = this.roles.filter(role => role.id === this.form.roleId)[0].roleName
          const url = this.status === 0 ? 'account/add' : 'account/edit'
          this.$store.dispatch(url, this.form)
            .then(() => {
              this.$message({
                message: this.status === 0 ? '账号新增成功' : '账号编辑成功',
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
