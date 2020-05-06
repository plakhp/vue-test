<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <div>
          <span>订单编号:</span>
          <el-input v-model="filter.orderNo" placeholder="请输入订单编号" @keyup.enter.native="search" />
        </div>
        <div>
          <span>商户名称:</span>
          <el-input v-model="filter.shopId" placeholder="请输入商户名称" @keyup.enter.native="search" />
        </div>
        <div>
          <span>下单时间:</span>
          <!-- <el-date-picker v-model="value1" type="date" placeholder="请选择时间" /> -->
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
          />
        </div>

        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div>
        <span>订单状态:</span>
        <el-select v-model="filter.state" placeholder="订单状态" :clearable="true">
          <el-option
            v-for="(item, index) in roleStatus"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div>
        <span>商品类型:</span>
        <el-input v-model="filter.goodsType" placeholder="请输入商品类型" @keyup.enter.native="search" />
      </div>
    </div>
    <!-- 导出按钮 -->
    <!-- <div class="leading-out">
      <el-button>导出</el-button>
    </div> -->
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="nickName" label="商户名称" />
      <el-table-column prop="nickName" label="订单编号" />
      <el-table-column prop="nickName" label="下单时间" />
      <el-table-column prop="nickName" label="商品类型" width="100" />
      <el-table-column prop="nickName" label="购买商品" />
      <el-table-column prop="nickName" label="购买数量" width="100" />
      <el-table-column prop="nickName" label="买家昵称" width="100" />
      <el-table-column prop="nickName" label="实付款" width="100" />
      <el-table-column prop="nickName" label="支付方式" width="100" />
      <el-table-column label="订单状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.state === 10" class="color-red">待付款</span>
          <span v-if="scope.row.state === 11" class="color-black">待使用</span>
          <span v-if="scope.row.state === 12" class="color-black">待评价</span>
          <span v-if="scope.row.state === 13" class="color-green">已完成</span>
          <span v-if="scope.row.state === 14" class="color-gray">已取消</span>
          <span v-if="scope.row.state === 15" class="color-gray">已退款</span>
          <!-- <span v-if="scope.row.status === 0" class="color-gray">停用</span> -->
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
      roleStatus: [{
        name: '待付款',
        id: 10
      },
      {
        name: '待使用',
        id: 11
      },
      {
        name: '待评价',
        id: 12
      },
      {
        name: '已完成',
        id: 13
      },
      {
        name: '已取消',
        id: 14
      }, {
        name: '已退款',
        id: 15
      }],

      centerDialogVisible: false,

      filter: {
        orderNo: '',
        shopId: '',
        orderTimeStart: '',
        orderTimeEnd: '',
        state: '',
        goodsType: '',
        pageNum: 1,
        pageSize: 10,
        orderBy: 'o.modify_time',
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
      console.log(event)
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
      const { data: res } = await this.$http.get('order/1/list', { params: this.filter })
      //     this.list = data.records
      //     this.pages.total = data.total
      //     this.pages.page = data.current
      //     this.pages.limit = data.size
      this.loading = false
      console.log(res, 1111)
    },
    // 选择日期时间
    changeDate(e) {
      this.filter.orderTimeStart = e[0]
      this.filter.orderTimeEnd = e[1]
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
.filter-left {
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  .el-input {
    width: 200px;
  }
}
.content {
  display: flex;
  margin-bottom: 20px;
  div {
    margin-right: 96px;
  }
  .el-input {
    width: 200px;
  }
}
  .leading-out {
    margin-bottom: 20px;;
    .el-button {
           background-color: #44C9AB;
              color: #fff;
              border: none;
    }
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
