<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <div>
          <span>关键字:</span>
          <el-input v-model="filter.key" placeholder="关键字" @keyup.enter.native="search" />
        </div>

        <el-button type="primary" plain @click="search">查询</el-button>
        <el-button type="primary" plain icon="el-icon-circle-plus-outline" @click="add">新增</el-button>
      </div>
    </div>
    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="keyWord" label="关键词" />

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
    <el-dialog
      title="添加热门关键词"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      @close="closeDialog"
    >
      <div class="content">
        <span>关键词：</span>
        <el-input v-model="keyWord" />
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
      keyWord: '',
      centerDialogVisible: false,

      filter: {
        key: '',
        employee: '',
        phoneNum: null,
        pageNum: 1,
        pageSize: 10,
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
    changeStatus(event) {
      // console.log(event);
    },
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
 
      const { data: res } = await this.$http.get('hot-key/list', { params: this.filter })
      // console.log(res)

      this.list = res.data.records
      this.pages.total = res.data.total
      this.pages.page = res.data.current
      this.pages.limit = res.data.size
      this.loading = false
    },
    add() {
      this.centerDialogVisible = true
    },
    async edit(item) {
      // 查看详情
      this.centerDialogVisible = true
      const { data: res } = await this.$http.get(`hot-key/${item.id}`)
      console.log(res)

      this.keyWord = res.data.keyWord
      this.id = item.id
    },
    del(item) {
      this.$confirm('此操作将执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { data: res } = await this.$http.delete(`hot-key/${item.id}`)
        console.log(res)

        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.fetchData()
      })
    },
    // 关闭
    closeDialog() {
      this.centerDialogVisible = false
      this.keyWord = ''
    },
    // 保存备注
    async saveDialog() {
          if(!this.keyWord){
          this.$message.warning('不能为空！')
          return 
        }
      // 分类id不存在，添加
      if (!this.id) {
        // id不存在，添加
        const { data: res } = await this.$http.post('hot-key', { keyWord: this.keyWord })

        if (res.code !== 0) {
          this.$message.warning('添加失败！')
          return
        }
        this.$message.success('添加成功！')
        this.centerDialogVisible = false
        this.keyWord = ''
        this.fetchData()
      } else {
        // 编辑
        const { data: res } = await this.$http.put(`hot-key/${this.id}`, { keyWord: this.keyWord })
        // console.log(res)
        this.centerDialogVisible = false
        this.$message.success('编辑成功！')
        this.id = ''
        this.keyWord = ''
        this.fetchData()
      }
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
