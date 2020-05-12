<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <el-button type="primary" plain icon="el-icon-circle-plus-outline" @click="add">新增</el-button>
        <!-- <el-button type="primary" @click="search">
          查询
        </el-button>-->
      </div>
    </div>
    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="name" label="广告名称" />
      <el-table-column prop="sort" label="排序" width="120px" />
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.state === 0" class="color-red">下架</span>
          <span v-if="scope.row.state === 1" class="color-green">上架</span>
          <!-- <span v-if="scope.row.status === 0" class="color-gray">停用</span> -->
        </template>
      </el-table-column>
      <el-table-column label="广告图片">
        <template slot-scope="scope">
          <div class="banner_img">
            <el-image   style="width: 200px; height: 200px"  v-if="scope.row.picture" :src="scope.row.picture" :fit="fit"/>
            <!-- <div v-else>暂无</div> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="320">
        <template slot-scope="scope">
          <!-- <div class="control">
            <span @click="edit(scope.row)" class="color-green">编辑</span>
            <span class="color-green">置顶</span>
            <span @click="del(scope.row)" class="color-red">删除</span>
            <span class="color-green">启动</span>
          </div>-->
          <el-button plain type="primary" @click="edit(scope.row)">
            <span>编辑</span>
          </el-button>
          <el-button plain type="warning" @click="editStatusTop(scope.row)">
            <span>置顶</span>
          </el-button>
          <el-button plain type="danger" @click="del(scope.row)">
            <span>删除</span>
          </el-button>
          <el-button plain type="success" @click="changeStatus(scope.row)">
            <span v-if="scope.row.state === 0">上架</span>
            <span v-if="scope.row.state === 1">下架</span>
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
    <add-banner
      v-if="dialogData.visible"
      :visible="dialogData.visible"
      :status="dialogData.status"
      :form-data="dialogData.formData"
      @cb="dialogCallback"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import addBanner from './components/addBanner'

export default {
  name: 'Account',
  components: {
    Pagination,
    addBanner
  },
  data() {
    return {
      filter: {
        name: '',
        state: '',
        phoneNum: null,
        pageNum: 1,
        pageSize: 10,
        orderType: '1',
        orderBy: 'sort DESC,modify_time'
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
      },
      fit:'scale-down'
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
    async  fetchData() {
      this.loading = true
      // this.$store
      //   .dispatch('account/list', this.filter)
      //   .then(data => {
      //     // console.log(data)

      //     this.loading = false
      //     this.list = data.records
      //     this.pages.total = data.total
      //     this.pages.page = data.current
      //     this.pages.limit = data.size
      //   })
      //   .catch(() => {
      //     this.loading = false
      //   })
      const { data: res } = await this.$http.get('banner/1/list', { params: this.filter })
      // console.log(res, 11111111111)
      // console.log(res)
      this.list = res.data.records
      this.pages.total = res.data.total
      this.pages.page = res.data.current
      this.pages.limit = res.data.size
      this.loading = false
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
      this.$confirm('此操作将执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { data: res } = await this.$http.delete(`banner/${item.id}`)

        this.fetchData()
      })
    },
    // 置顶
    async editStatusTop(item) {
      const { data: res } = await this.$http.patch(`banner/${item.id}/top`)
      this.fetchData()
    },
    // 上架,下架
    async changeStatus(item) {
      const { data: res } = await this.$http.patch(`banner/${item.id}/up-down`)

      this.fetchData()
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
.filter-left {
  // justify-content: space-between;
  width: 100%;

  .el-input {
    width: 200px;
    margin-left: 10px;
  }
}

.control {
  cursor: pointer;
  display: flex;
  justify-content: space-around;
}
.banner_img {
  height: 80px;
  .el-image {

  }
}
</style>
