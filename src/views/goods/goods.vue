<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <div>
          <span>店铺名称:</span>
          <el-input v-model="filter.shopName" placeholder="请输入店铺名称" @keyup.enter.native="search" />
        </div>

        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>

    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="shopName" label="商户名称" width="200" />
      <el-table-column prop="goodsNum" label="服务数量" />

      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <div class="button_control">
            <el-button type="primary" @click="lookGoodsdetail(scope.row)">
              <span>查看</span>

            </el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>

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
      roleStatus: [],

      url: '',
      srcList: [],
      filter: {
        shopName: '',
        pageNum: 1,
        pageSize: 10,
        orderBy: 'sa.modify_time',
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

      const { data: res } = await this.$http.get('goods/shop', { params: this.filter })

      this.loading = false
      this.list = res.data.records
      this.pages.total = res.data.total
      this.pages.page = res.data.current
      this.pages.limit = res.data.size
    },
    lookGoodsdetail(item) {
      // console.log(1);

      this.$router.push({ path: '/goods/goods_detail', query: { id: item.id }})
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-left {
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  .el-input {
    width: 200px;
  }
}
.title {
  // margin: 30px 0;
  height: 40px;
  line-height: 40px;
  background-color: #ccc;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
}
.control {
  cursor: pointer;
}
.demo-image__preview {
  text-align: center;
}
// 解封按钮

.button_control {
    .el-button {
  background-color: #44c9ab;
  color: #fff;
  border: none;
}
}
</style>
<style lang="scss">
</style>
