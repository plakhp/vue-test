<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <el-button type="primary" plain icon="el-icon-plus" @click="addAccount">
          新增账号
        </el-button>
      </div>
      <div class="filter-right">
        <el-input
          ref="search"
          v-model="filter.searchKey"
          placeholder="关键字搜索"
          suffix-icon="el-icon-search"
          @keyup.enter.native="search"
        />
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
      />
      <el-table-column
        prop="role"
        label="角色"
      />
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1">正常</span>
          <span v-if="scope.row.status === 0">冻结</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
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
            @click="updateStatus(scope.row)"
          >
            <span v-if="scope.row.status === 0">解冻</span>
            <span v-if="scope.row.status === 1">冻结</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :hidden="list.length === 0" :total="pages.total" :page="pages.page" :limit="pages.limit" @pagination="changeSize" />
    <account-dialog v-if="accountDialog.visible" :visible="accountDialog.visible" :status="accountDialog.status" :data="accountDialog.data" @cb="accountDialogCallback" />
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
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      filter: {
        searchKey: '',
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
        data: {}
      }
    }
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
    updateStatus(item) {
      if (item.status === 0) {
        this.$confirm('此操作将解冻该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        })
      } else {
        this.$confirm('此操作将冻结该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        })
      }
    },
    addAccount() {
      this.accountDialog.visible = true
      this.accountDialog.status = 0
      this.accountDialog.data = {}
    },
    editAccount(item) {
      this.accountDialog.visible = true
      this.accountDialog.status = 1
      this.accountDialog.data = item
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
