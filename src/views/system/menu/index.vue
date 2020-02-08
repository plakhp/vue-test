<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <el-button type="primary" plain icon="el-icon-circle-plus-outline" @click="add">
          新增菜单
        </el-button>
      </div>
    </div>
    <div class="menu-container">
      <el-tree
        ref="tree"
        :data="roles"
        node-key="id"
        :expand-on-click-node="false"
        :default-expanded-keys="defaultExpandedKeys"
        :props="defaultProps"
        :render-content="renderContent"
      />
      <el-form ref="form" :model="form" label-width="120px" class="dialog-form-container" :rules="rules">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="form.menuName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单" clearable :disabled="type== 1">
            <el-option v-for="(item, index) in parentList" :key="index" :label="item.parentName" :value="item.parentId" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单编码" prop="menuCode">
          <el-input v-model="form.menuCode" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-select v-model="form.menuType" placeholder="请选择菜单类型">
            <el-option label="菜单" value="menu" />
            <el-option label="按钮" value="button" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单排序" prop="orders">
          <el-input v-model="form.orders" type="number" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button v-loading="loading" type="primary" plain @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { deepClone } from '@/utils'

export default {
  name: 'Menu',
  components: {
  },
  data() {
    return {
      loading: false,
      roles: [],
      parentList: [],
      defaultExpandedKeys: [],
      defaultProps: {
        children: 'subMenu',
        label: 'title'
      },
      type: 0, // 0: new, 1: edit
      form: {
        menuName: '',
        menuCode: '',
        parentName: '',
        parentId: null,
        orders: 0
      },
      rules: {
        menuName: [
          { required: true, message: '菜单名称必填', trigger: ['blur'] }
        ],
        menuCode: [
          { required: true, message: '菜单编码必填', trigger: ['blur'] }
        ],
        menuType: [
          { required: true, message: '菜单类型必选', trigger: ['blur'] }
        ],
        orders: [
          { required: true, message: '菜单排序必填', trigger: ['blur'] }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$store.dispatch('menu/list')
        .then(data => {
          this.roles = data
          this.defaultExpandedKeys = data.map(item => item.id)
          this.genParentMenusList()
        })
    },
    genParentMenusList() {
      this.parentList = []
      const f = data => {
        data.map(item => {
          if (item.menuType === 'menu') {
            this.parentList.push({ parentId: item.id, parentName: item.title })
          }
          if (item.subMenu && item.subMenu.length > 0) {
            f(item.subMenu)
          }
        })
      }
      f(this.roles)
    },
    add() {
      this.type = 0
      this.form = {
        menuName: '',
        menuCode: '',
        parentName: '',
        parentId: null,
        orders: 0
      }
    },
    edit(node, data) {
      this.type = 1
      this.form = deepClone(data)
      this.form.menuName = this.form.title
      if (node.data.id === node.parent.data.id) {
        this.form.parentId = null
      } else {
        this.form.parentId = node.parent.data.id
      }
    },
    del(node, data) {
      this.$confirm('此操作将删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('menu/del', data.id)
          .then(_ => {
            this.$message({
              message: '菜单删除成功',
              type: 'success'
            })
            this.fetchData()
          })
      })
    },
    renderContent(h, { node, data, store }) {
      return (
        <span style='flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;'>
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button style='font-size: 12px;' type='text' on-click={ () => this.edit(node, data) }>
              <i class='el-icon-edit-outline'></i>
            </el-button>
            <el-button style='font-size: 12px;' type='text' on-click={ () => this.del(node, data) }>
              <i class='el-icon-delete'></i>
            </el-button>
          </span>
        </span>
      )
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const url = this.type === 0 ? 'menu/add' : 'menu/edit'
          this.$store.dispatch(url, this.form)
            .then(() => {
              this.$message({
                message: this.type === 0 ? '菜单新增成功' : '菜单编辑成功',
                type: 'success'
              })
              this.fetchData()
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

<style lang="scss" scoped>
  .menu-container {
    display: flex;
    .el-tree {
      width: 300px;
      min-height: 75vh;
      padding: 10px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
  }
</style>
