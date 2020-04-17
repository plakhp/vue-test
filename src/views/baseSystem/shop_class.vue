<template>
  <div class="app-container">
    <div class="title">
      <!-- <span>数据列表</span> -->
      <el-button @click="add">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="nickName" label="分类名称" />

      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button plain type="primary" @click="edit(scope.row)">
            <span>编辑</span>
          </el-button>

          <el-button plain type="danger" @click="del(scope.row)">
            <span>删除</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog title="添加分类" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="content">
        <span>分类名称：</span>
        <el-input v-model="value" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
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
      value: '1',
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
    del(item) {
      this.$confirm('此操作将执行删除操作, 是否继续?', '提示', {
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
.title {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
  .el-button {
    width: 100px;
  }
}
.content {
  display: flex;
  align-items: center;
  .el-input {
    width: 300px;
  }
}
</style>
<style lang="scss">
</style>
