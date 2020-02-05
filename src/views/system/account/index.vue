<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <el-input
          v-model="filter.userName"
          placeholder="用户名"
          @keyup.enter.native="search"
        />
        <el-input
          v-model="filter.employee"
          placeholder="昵称"
          @keyup.enter.native="search"
        />
        <el-input
          v-model="filter.phoneNum"
          placeholder="手机号"
          @keyup.enter.native="search"
        />
        <el-button type="primary" plain @click="search">
          查询
        </el-button>
        <el-button type="primary" plain icon="el-icon-plus" @click="addAccount">
          新增账号
        </el-button>
      </div>
      <!--<div class="filter-right">-->
      <!--<el-input-->
      <!--ref="search"-->
      <!--v-model="filter.searchKey"-->
      <!--placeholder="关键字搜索"-->
      <!--@keyup.enter.native="search"-->
      <!--&gt;-->
      <!--<i slot="suffix" class="el-icon-search" style="cursor: pointer;margin: 10px" @click="search" />-->
      <!--</el-input>-->
      <!--</div>-->
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
        prop="userName"
        label="用户名"
      />
      <el-table-column
        prop="nickName"
        label="昵称"
      />
      <el-table-column
        prop="phone"
        label="手机号"
        width="120px"
      />
      <el-table-column
        prop="roleName"
        label="角色"
        width="100px"
      />
      <el-table-column
        label="状态"
        width="100"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status === -1" class="color-red">冻结</span>
          <span v-if="scope.row.status === 1" class="color-green">正常</span>
          <span v-if="scope.row.status === 0" class="color-gray">待激活</span>
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
            @click="editAccount(scope.row)"
          >
            <span>编辑</span>
          </el-button>
          <el-button
            plain
            type="warning"
            @click="editStatus(scope.row)"
          >
            <span v-if="scope.row.status === 1">冻结</span>
            <span v-if="scope.row.status === -1">解冻</span>
            <span v-if="scope.row.status === 0">激活</span>
          </el-button>
          <el-button
            plain
            type="danger"
            @click="delAccount(scope.row)"
          >
            <span>删除</span>
          </el-button>
          <el-button
            plain
            type="danger"
            @click="resetPassword(scope.row)"
          >
            <span>重置密码</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :hidden="list.length === 0" :total="pages.total" :page="pages.page" :limit="pages.limit" @pagination="changeSize" />
    <account-dialog v-if="accountDialog.visible" :visible="accountDialog.visible" :status="accountDialog.status" :form-data="accountDialog.formData" @cb="accountDialogCallback" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import AccountDialog from './components/AccountDialog'

export default {
  name: 'Account',
  components: {
    Pagination,
    AccountDialog
  },
  data() {
    return {
      filter: {
        userName: '',
        employee: '',
        phoneNum: null,
        pageNum: 1,
        pageSize: 10
      },
      pages: {
        total: 0,
        page: 1,
        limit: 10
      },
      list: [],
      loading: false,
      accountDialog: {
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
      this.$store.dispatch('account/list', this.filter)
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
    addAccount() {
      this.accountDialog.visible = true
      this.accountDialog.status = 0
      this.accountDialog.formData = {}
    },
    editAccount(item) {
      this.accountDialog.visible = true
      this.accountDialog.status = 1
      this.accountDialog.formData = item
    },
    delAccount(item) {
      this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('account/del', item.id)
          .then(_ => {
            this.$notify({
              title: '删除成功',
              type: 'success'
            })
            this.fetchData()
          })
      })
    },
    resetPassword(item) {
      this.$confirm('此操作将删除该重置该账号密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('account/resetPassword', item.id)
          .then(_ => {
            this.$notify({
              title: '重置密码成功',
              type: 'success'
            })
          })
      })
    },
    editStatus(item) {
      let message = '冻结'
      if (item.status === -1) {
        message = '解冻'
      } else if (item.status === 0) {
        message = '激活'
      }
      this.$confirm(`此操作将${message}该账号, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('account/editStatus', item.id)
          .then(_ => {
            this.$notify({
              title: `账号${message}成功`,
              type: 'success'
            })
            this.fetchData()
          })
      })
    },
    accountDialogCallback(type) {
      if (type === 'refresh') {
        this.fetchData()
      }
      this.accountDialog.visible = false
    }
  }
}
</script>
