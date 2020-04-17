<template>
  <div class="app-container">
    <!-- 导出按钮 -->
    <div class="leading-out">
      <el-button>导出</el-button>
    </div>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="nickName" label="商户名称" />
      <el-table-column prop="nickName" label="提交时间" />
      <el-table-column prop="nickName" label="提现金额" width="100" />
      <el-table-column prop="nickName" label="提现账户类型" width="100" />
      <el-table-column prop="nickName" label="提现账户" />
      <el-table-column label="进度" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status === -1" class="color-black">未处理</span>
          <span v-if="scope.row.status === 0" class="color-red">拒绝</span>
          <span v-if="scope.row.status === 1" class="color-green">同意</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">

          <div v-if="scope.row.status === -1" class="btns">
            <el-button plain type="success">
              <span>同意</span>
            </el-button>
            <el-button plain type="danger">
              <span>拒绝</span>
            </el-button>
          </div>
          <div v-if="scope.row.status === 1" class="btns">
            <el-button plain type="success" disabled>
              <span>同意</span>
            </el-button>
            <el-button plain type="danger" disabled>
              <span>拒绝</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog title="查看大图" :visible.sync="centerDialogVisible" width="30%" center />
    <pagination
      :hidden="list.length === 0"
      :total="pages.total"
      :page="pages.page"
      :limit="pages.limit"
      @pagination="changeSize"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'

export default {
  name: 'Account',
  components: {
    Pagination
  },
  data() {
    return {
      value1: '',
      roleStatus: [],

      centerDialogVisible: false,

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
      this.$store
        .dispatch('account/list', this.filter)
        .then(data => {
          // console.log(data)

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
      this.centerDialogVisible = true
    },
    edit() {
      this.centerDialogVisible = true
    },

    // 关闭
    closeDialog() {
      this.centerDialogVisible = false
      this.value = ''
    },
    // 保存备注
    saveDialog() {
      this.centerDialogVisible = false
      this.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.leading-out {
  margin-bottom: 20px;
  .el-button {
    background-color: #44c9ab;
    color: #fff;
    border: none;
  }
}
</style>
<style lang="scss">
</style>
