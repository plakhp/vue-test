<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <div>
          <span>商品名称:</span>
          <el-input v-model="filter.goodsName" placeholder="请输入商品名称" @keyup.enter.native="search" />
        </div>
        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>

    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img :src="scope.row.picture" class="goods_img">
        </template>

      </el-table-column>
      <el-table-column prop="goodsName" label="商品标题" />
      <el-table-column label="商品类型" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.goodsType === 1">商品</span>
          <span v-if="scope.row.goodsType === 2">套餐</span>
          <span v-if="scope.row.goodsType === 3">拼团</span>
     
        </template>
      </el-table-column>
      <el-table-column label="商品价格" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.goodsType === 1">￥{{ scope.row.originPrice }}</span>
          <span v-if="scope.row.goodsType === 2">￥{{ scope.row.originPrice }}</span>

          <span v-if="scope.row.goodsType === 3" class="color-green" @click="lookPintuan(scope.row)">查看</span>
         
        </template>
      </el-table-column>
      <el-table-column label="商品原价" width="120" >
         <template slot-scope="scope">
          <span >￥{{ scope.row.price }}</span>
        

         
        </template>
      </el-table-column>  
      <el-table-column label="商品详情" width="120">
        <template slot-scope="scope">
          <span class="color-green" @click="lookGoodsdetail(scope.row)">查看</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.state === 0" class="color-red">已下架</span>
          <span v-if="scope.row.state === 1" class="color-green">已上架</span>
          <!-- <span v-if="scope.row.status === 0" class="color-gray">停用</span> -->
        </template>
      </el-table-column>

      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.state === 0" class="button_control">
            <el-button type="primary" @click="updateGoods(scope.row)">
              <span>上架</span>
            </el-button>
          </div>
          <div v-if="scope.row.state === 1">
            <el-button type="danger" @click="removeGoods(scope.row)">
              <span>下架</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 下架弹出框 -->
    <el-dialog title="下架" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="content">
        <el-input v-model="offReason" placeholder="请输入下架原因" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 拼团弹出框 -->
    <el-dialog title="查看拼团价格" :visible.sync="DialogVisible" width="30%" center>
      <div class="content">
        <div class="pintuan_list" v-for="(item,index) in groupPriceVOList" :key="index">{{item.groupNum}}人拼团{{item.groupPrice}}元</div>
     
      </div>
    </el-dialog>
    <!-- 商品详情弹出框 -->
    <el-dialog title="商品详情" :visible.sync="goodsDialogVisible" width="30%" center>
      <div  class="goods_content" v-if="goods.content" v-html="goods.content">
      </div>
       <div class="content" v-else>
         暂无内容
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
      id: '',
      // 拼团
      DialogVisible: false,
      // 拼团价格
      groupPriceVOList:[],
      // 商品详情
      goodsDialogVisible: false,
      // 下架
      offReason: '',
      centerDialogVisible: false,
      filter: {
        goodsName: '',
        pageNum: 1,
        pageSize: 10,
        orderBy: 'modify_time',
        orderType: 2
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
      // 下架商品id
      goodsId: '',
      goods:{}
    }
  },
  computed: {
    ...mapGetters([])
  },
  created() {
    const id = this.$route.query.id
    this.id = id
    this.fetchData(id)
  },
  methods: {
    // changeStatus(event) {
    //   console.log(event);
    // },
    search() {
      this.filter.pageNum = 1
      this.fetchData(this.id)
    },
    changeSize(pagination) {
      this.filter.pageNum = pagination.page
      this.filter.pageSize = pagination.limit
      this.fetchData(this.id)
    },
    async fetchData(shopId) {
      this.loading = true

      const { data: res } = await this.$http.get(`goods/${shopId}/list`, { params: this.filter })
      this.loading = false
      this.list = res.data.records
      this.pages.total = res.data.total
      this.pages.page = res.data.current
      this.pages.limit = res.data.size
    },
    // 上架商品
    async updateGoods(item) {
      const { data: res } = await this.$http.put(`goods/${item.id}/up-down`, { offReason: this.offReason })
      this.fetchData(this.id)
    },
    // 下架商品
    removeGoods(item) {
      this.centerDialogVisible = true
      this.goodsId = item.id
    },
    // 关闭
    closeDialog() {
      this.centerDialogVisible = false
      this.offReason = ''
    },
    // 保存下架商品
    async saveDialog() {
      const { data: res } = await this.$http.put(`goods/${this.goodsId}/up-down`, { offReason: this.offReason })

      this.centerDialogVisible = false
      this.offReason = ''
      this.fetchData(this.id)
    },
    // 拼团
    lookPintuan(item) {
      console.log(item.groupPriceVOList,111111111);
      this.groupPriceVOList = item.groupPriceVOList
      this.DialogVisible = true
    },
    // 查看商品详情
    lookGoodsdetail(item) {
      this.goods = item
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
// 商品图
.goods_img {
  width: 80px;
  height: 80px;
}
.content {
  text-align: center;
}

</style>
<style lang="scss">
.goods_content {
  img {
    width: 100%;
  }
}
</style>
