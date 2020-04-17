<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <div>
          <span>商户名称:</span>
          <el-input v-model="filter.userName" placeholder="请输入商户名称" @keyup.enter.native="search" />
        </div>
        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>

    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="nickName" label="商品图片" />
      <el-table-column prop="nickName" label="商品标题" />
      <el-table-column label="商品类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status === -1">服务</span>
          <span v-if="scope.row.status === 1">拼团</span>
          <!-- <span v-if="scope.row.status === 0" class="color-gray">停用</span> -->
        </template>
      </el-table-column>
      <el-table-column label="商品价格" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status === -1">￥10</span>
          <span v-if="scope.row.status === 1" class="color-green" @click="lookPintuan">查看</span>
          <!-- <span v-if="scope.row.status === 0" class="color-gray">停用</span> -->
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="商品原价" width="120" />
      <el-table-column label="商品详情" width="120">
        <template slot-scope="scope">
          <span class="color-green" @click="lookGoodsdetail">查看</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status === -1" class="color-red">已下架</span>
          <span v-if="scope.row.status === 1" class="color-green">已上架</span>
          <!-- <span v-if="scope.row.status === 0" class="color-gray">停用</span> -->
        </template>
      </el-table-column>

      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.status === -1" class="button_control">
            <el-button type="primary" @click="updateGoods">
              <span>上架</span>
            </el-button>
          </div>
          <div v-if="scope.row.status === 1">
            <el-button type="danger" @click="removeGoods">
              <span>下架</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 下架弹出框 -->
    <el-dialog title="下架" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="content">
        <el-input v-model="value" placeholder="请输入下架原因" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 拼团弹出框 -->
    <el-dialog title="查看拼团价格" :visible.sync="DialogVisible" width="30%" center>
      <div class="content">
        <div class="pintuan_list">4人拼团20元</div>
        <div class="pintuan_list">8人10元</div>
      </div>
    </el-dialog>
    <!-- 商品详情弹出框 -->
    <el-dialog title="商品详情" :visible.sync="goodsDialogVisible" width="30%" center>
      <div class="content">
        商品详情
      </div>
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
      // 拼团
      DialogVisible: false,
      // 商品详情
      goodsDialogVisible: false,
      // 下架
      value: '',
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
    // changeStatus(event) {
    //   console.log(event);
    // },
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
    // 上架商品
    updateGoods() {},
    // 下架商品
    removeGoods() {
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
    },
    // 拼团
    lookPintuan() {
      this.DialogVisible = true
    },
    // 查看商品详情
    lookGoodsdetail() {
      this.goodsDialogVisible = true
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
span {
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
// 拼团
.pintuan_list {
    margin-bottom: 10px;
}
</style>
<style lang="scss">
</style>
