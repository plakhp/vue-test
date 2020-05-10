<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <div>
          <span>用户昵称:</span>
          <el-input v-model="filter.nickName" placeholder="请输入用户昵称" @keyup.enter.native="search" />
          <el-input v-model="filter.phone" placeholder="请输入手机号码" @keyup.enter.native="search" />
          <el-input v-model="filter.fullName" placeholder="请输入姓名" @keyup.enter.native="search" />

        </div>
        <el-button type="primary" plain @click="search">查询</el-button>

        <!-- <el-button type="primary" @click="search">
          查询
        </el-button>-->
      </div>
    </div>
    <div class="leading-out">
      <el-button @click="leadingOut">导出</el-button>
    </div>
    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="nickName" label="用户昵称" />
      <el-table-column prop="fullName" label="用户姓名" width="120px" />
      <el-table-column prop="registerDt" label="注册时间" />
      <el-table-column prop="phone" label="手机号" width="120px" />

      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.state === -1" class="color-red">禁用</span>
          <span v-if="scope.row.state === 1" class="color-green">正常</span>
          <span v-if="scope.row.state === 0" class="color-gray">待初始化</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button plain type="warning" @click="editStatus(scope.row)">
            <span v-if="scope.row.state === -1">解冻</span>
            <span v-if="scope.row.state === 1">冻结</span>

            <span v-if="scope.row.state === 0">激活</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
      filter: {
        nickName: '',
        phone: '',
        fullName: '',
        pageNum: 1,
        pageSize: 5,
        orderBy: 'create_time',
        orderType: '2'
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
    async fetchData() {
      this.loading = true

      const { data: res } = await this.$http.get('account/list', { params: this.filter })
      // console.log(res)
      this.list = res.data.records
      this.pages.total = res.data.total
      this.pages.page = res.data.current
      this.pages.limit = res.data.size

      this.loading = false
    },
    // 冻结解冻客户端账号
    editStatus(item) {
      let message = ''
      if (item.state === -1) {
        message = '解冻'
      } else if (item.state === 1) {
        message = '冻结'
      }
      this.$confirm(`此操作将${message}该账号, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { data: res } = await this.$http.put(`account/${item.id}/frozen`)
        this.$message({
          message: `账号${message}成功`,
          type: 'success'
        })
        this.fetchData()
      })
    },
    // 导出列表
    leadingOut() {
      this.$http({
        method: 'get',
        url: 'account/export',
        responseType: 'blob'
      })
        .then(res => {
        
          const link = document.createElement('a')
          const blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel'
          })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          const num = Math.ceil(Math.random() * 1000)

          link.setAttribute('download', '用户_' + num + '.xlsx')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          this.$Notice.error({
            title: '错误',
            desc: '网络连接错误'
          })
        })
    }

  }
}
</script>

<style lang="scss" scoped>
.filter-left {
  width: 100%;
  .el-input {
    width: 200px;
    margin-right: 10px;
  }
}
.leading-out {
  margin-bottom: 10px;
  .el-button {
    background-color: #44c9ab;
    color: #fff;
    border: none;
  }
}
</style>
