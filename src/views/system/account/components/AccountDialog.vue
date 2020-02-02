<template>
  <el-dialog :title="title" :visible="dialogVisible" :close-on-click-modal="false" :destroy-on-close="true" @open="open" @close="close">
    <el-form :model="form" label-width="120px" class="dialog-form-container" :rules="rules">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.region" placeholder="请选择角色">
          <el-option label="管理员" value="1" />
          <el-option label="普通用户" value="2" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button plain @click="close">取 消</el-button>
      <el-button type="primary" plain @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
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
    visible: {
      default() {
        return false
      },
      type: Boolean
    }
  },

  data() {
    return {
      title: '新增账号',
      form: {},
      rules: {
        userName: [
          { required: true, message: '用户名必填', trigger: ['blur', 'change'] }
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
    }
  },
  methods: {
    open() {
      console.log('open')
    },
    save() {
      this.$emit('cb', 'refresh')
    },
    close() {
      this.$emit('cb', 'close')
    }
  }
}
</script>

<style scoped>

</style>
