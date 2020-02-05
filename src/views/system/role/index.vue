<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <el-input
          v-model="filter.name"
          placeholder="角色名称"
          @keyup.enter.native="search"
        />
        <el-select v-model="filter.status" placeholder="角色状态" :clearable="true">
          <el-option
            v-for="(item, index) in roleStatus"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" plain @click="search">
          查询
        </el-button>
        <el-button type="primary" plain icon="el-icon-plus" @click="add">
          新增角色
        </el-button>
      </div>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
      />
      <el-table-column
        prop="roleName"
        label="角色名称"
      />
      <el-table-column
        prop="remark"
        label="角色描述"
      />
      <el-table-column
        label="状态"
        width="100"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1" class="color-red">禁用</span>
          <span v-if="scope.row.status === 0" class="color-green">正常</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="320"
      >
        <template slot-scope="scope">
          <el-button
            plain
            type="primary"
            @click="edit(scope.row)"
          >
            <span>编辑</span>
          </el-button>
          <el-button
            plain
            type="warning"
            @click="editStatus(scope.row)"
          >
            <span v-if="scope.row.status === 0">禁用</span>
            <span v-if="scope.row.status === 1">启用</span>
          </el-button>
          <el-button
            plain
            type="danger"
            @click="del(scope.row)"
          >
            <span>删除</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :hidden="list.length === 0" :total="pages.total" :page="pages.page" :limit="pages.limit" @pagination="changeSize" />
    <role-dialog v-if="dialogData.visible" :visible="dialogData.visible" :status="dialogData.status" :form-data="dialogData.formData" @cb="dialogCallback" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import RoleDialog from './components/RoleDialog'

export default {
  name: 'Role',
  components: {
    Pagination,
    RoleDialog
  },
  data() {
    return {
      filter: {
        name: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      pages: {
        total: 0,
        page: 1,
        limit: 10
      },
      roleStatus: [{
        id: 0,
        name: '正常'
      }, {
        id: 1,
        name: '禁用'
      }],
      list: [],
      loading: false,
      dialogData: {
        visible: false,
        status: 0,
        formData: {}
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
    search() {
      this.filter.pageNum = 1
      this.fetchData()
    },
    changeSize(pagination) {
      this.filter.pageNum = pagination.page
      this.filter.pageSize = pagination.limit
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      this.$store.dispatch('role/list', this.filter)
        .then(data => {
          this.loading = false
          this.list = data.records
          this.pages.total = data.total
          this.pages.page = data.current
          this.pages.limit = data.size
        })
        .catch(() => {
          this.loading = false
        })
    },
    add() {
      this.dialogData.visible = true
      this.dialogData.status = 0
      this.dialogData.formData = {}
    },
    edit(item) {
      this.dialogData.visible = true
      this.dialogData.status = 1
      this.dialogData.formData = item
    },
    del(item) {
      this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('role/del', item.id)
          .then(_ => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.fetchData()
          })
      })
    },
    editStatus(item) {
      let message = '启用'
      let status = 0
      if (item.status === 0) {
        message = '禁用'
        status = 1
      }
      this.$confirm(`此操作将${message}该账号, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('role/edit', { id: item.id, status })
          .then(_ => {
            this.$message({
              message: `角色${message}成功`,
              type: 'success'
            })
            this.fetchData()
          })
      })
    },
    dialogCallback(type) {
      if (type === 'refresh') {
        this.fetchData()
      }
      this.dialogData.visible = false
    }
  }
}
</script>
