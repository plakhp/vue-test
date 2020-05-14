<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <div>
          <span>分类:</span>
          <el-input v-model="filter.name" placeholder="分类" @keyup.enter.native="search" />
        </div>

        <el-button type="primary" plain @click="search">查询</el-button>
        <el-button type="primary" plain icon="el-icon-circle-plus-outline" @click="add">新增</el-button>
      </div>
    </div>
    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="categoryName" label="分类名称" />

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
      title="添加分类"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      @close="closeDialog"
    >
      <div class="content">
        <span>分类名称：</span>
        <el-input v-model="categoryName" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页区域 -->
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
      // 分类名称
      categoryName: '',
      centerDialogVisible: false,

      filter: {
        name: '',
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
      // 分类id
      id: ''
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
    // 请求数据
    async fetchData() {
      this.loading = true

      const { data: res } = await this.$http.get('shop-category/list', { params: this.filter })

      this.loading = false
      this.list = res.data.records
      this.pages.total = res.data.total
      this.pages.page = res.data.current
      this.pages.limit = res.data.size
    },
    async add() {
     
      this.centerDialogVisible = true
    },
    // 查看分类详情
    async edit(item) {
      this.centerDialogVisible = true
      const { data: res } = await this.$http.get(`shop-category/${item.id}`)

      this.categoryName = res.data.categoryName
      this.id = res.data.id
    },
    // 删除分类
    del(item) {
      this.$confirm('此操作将执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { data: res } = await this.$http.delete(`shop-category/${item.id}`)

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
      this.categoryName = ''
    },
    // 保存备注
    async saveDialog() {
          if(!this.categoryName){
          this.$message.warning('分类不能为空！')
          return 
        }
      // 分类id不存在，添加
      if (!this.id) {
    
        // 分类id不存在，添加
        const { data: res } = await this.$http.post('shop-category', { categoryName: this.categoryName })

        if (res.code !== 0) {
          this.$message.warning('添加失败！')
          return
        }
        this.centerDialogVisible = false
        this.categoryName = ''
        this.$message.success('添加成功！')

        this.fetchData()
      } else {
        // 编辑
        const { data: res } = await this.$http.put(`shop-category/${this.id}`, { categoryName: this.categoryName })
    
        this.$message.success('编辑成功！')
        this.centerDialogVisible = false
        this.categoryName = ''
         this.id = ''
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
