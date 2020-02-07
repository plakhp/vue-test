<template>
  <el-dialog :title="dialogTitle" :visible="dialogVisible" :close-on-click-modal="false" :destroy-on-close="true" @close="close">
    <el-form ref="form" :model="form" label-width="120px" class="dialog-form-container" :rules="rules">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色描述" prop="remark">
        <el-input v-model="form.remark" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色权限" prop="menuIds">
        <el-tree
          ref="tree"
          :data="roles"
          show-checkbox
          node-key="id"
          :default-expanded-keys="defaultExpandedKeys"
          :default-checked-keys="form.menuIds"
          :props="defaultProps"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button plain @click="close">取 消</el-button>
      <el-button v-loading="loading" type="primary" plain @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { deepClone } from '@/utils'
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
    const validateRoles = (rule, value, callback) => {
      const ids = this.$refs.tree.getCheckedKeys()
      if (ids.length <= 0) {
        callback(new Error('角色权限必选'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {},
      rules: {
        roleName: [
          { required: true, message: '角色名称必填', trigger: ['blur', 'change'] }
        ],
        remark: [
          { required: true, message: '角色描述必填', trigger: ['blur', 'change'] }
        ],
        menuIds: [
          { required: true, trigger: ['blur', 'change'], validator: validateRoles }
        ]
      },
      roles: [],
      defaultExpandedKeys: [],
      defaultProps: {
        children: 'subMenu',
        label: 'title'
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
      let title = '新增角色'
      if (this.status === 1) {
        title = '编辑角色'
      }
      return title
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.form = deepClone(this.formData)
      this.$store.dispatch('role/getAllMenus')
        .then(data => {
          this.roles = data
          if (data.length === 1) {
            this.defaultExpandedKeys = [data[0].id]
          }
        })
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const form = deepClone(this.form)
          form.menuIds = this.$refs.tree.getCheckedKeys().join(',')
          const url = this.status === 0 ? 'role/add' : 'role/edit'
          this.$store.dispatch(url, form)
            .then(() => {
              this.$message({
                message: this.status === 0 ? '角色新增成功' : '角色编辑成功',
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
