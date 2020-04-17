<template>
  <div class="app-container">

    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="nickName" label="反馈用户" />
      <el-table-column prop="nickName" label="反馈时间" />
      <el-table-column prop="nickName" label="反馈内容" />

      <el-table-column label="是否处理" width="320">
        <template slot-scope="scope">
          <!-- <div class="control">
            <span @click="edit(scope.row)" class="color-green">编辑</span>
            <span class="color-green">置顶</span>
            <span @click="del(scope.row)" class="color-red">删除</span>
            <span class="color-green">启动</span>
          </div> -->
          <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="2">否</el-radio>
        </template>
      </el-table-column>
    </el-table>
    <pagination :hidden="list.length === 0" :total="pages.total" :page="pages.page" :limit="pages.limit" @pagination="changeSize" />
    <!-- <add-banner v-if="dialogData.visible" :visible="dialogData.visible" :status="dialogData.status" :form-data="dialogData.formData" @cb="dialogCallback" /> -->
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
      radio: '1',
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
      this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('account/del', item.id).then(_ => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.fetchData()
        })
      })
    },
    resetPassword(item) {
      this.$confirm('此操作将重置该账号密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store
          .dispatch('account/resetPassword', { userId: item.id })
          .then(_ => {
            this.$message({
              message: '重置密码成功',
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
        this.$store.dispatch('account/editStatus', item.id).then(_ => {
          this.$message({
            message: `账号${message}成功`,
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

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.control {
  cursor: pointer;
  display: flex;
  justify-content: space-around;

}
.banner_img {
    height: 80px;
}
</style>
