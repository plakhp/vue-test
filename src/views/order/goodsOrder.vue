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
          <!-- <el-input v-model="filter.shopId" placeholder="请输入商品名称" @keyup.enter.native="search" /> -->
            <el-select v-model="filter.shopId" placeholder="请输入商户名称" :clearable="true">
          <el-option
            v-for="(item, index) in list"
            :key="index"
            :label="item.shopName"
            :value="item.shopId"
          />
        </el-select>
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
        <!-- <el-input v-model="filter.goodsType" placeholder="请输入商品类型" @keyup.enter.native="search" /> -->
          <el-select v-model="filter.goodsType" placeholder="请输入商品类型" :clearable="true">
          <el-option
            v-for="(item, index) in goodsTypeStatus"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
       <div >
      <el-button>导出</el-button>
    </div>
    </div>
    <!-- 导出按钮 -->
    <!-- <div class="leading-out">
      <el-button>导出</el-button>
    </div> -->
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="shopName" label="商户名称" />
      <el-table-column prop="orderNo" label="订单编号" />
      <el-table-column prop="orderTime" label="下单时间" />
      <el-table-column label="商品类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.orderType === 1">商品</span>
          <span v-if="scope.row.orderType === 2">套餐</span>
          <span v-if="scope.row.orderType === 3">拼团</span>
        </template>
      </el-table-column>
      <el-table-column prop="goodsName" label="购买商品" />
      <el-table-column prop="goodsQuantity" label="购买数量" width="100" />
      <el-table-column prop="userName" label="买家昵称" width="100" />
      <el-table-column prop="payAmount" label="实付款" width="100" />

      <el-table-column label="支付方式" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.payType === 1">微信支付</span>
          <span v-if="scope.row.payType === 2">支付宝支付</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.state === 10" class="color-red">待付款</span>
          <span v-if="scope.row.state === 11" class="color-black">待使用</span>
          <span v-if="scope.row.state === 12" class="color-black">待评价</span>
          <span v-if="scope.row.state === 13" class="color-green">已完成</span>
          <span v-if="scope.row.state === 14" class="color-gray">已取消</span>
          <span v-if="scope.row.state === 15" class="color-gray">已退款</span>
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
import {getDate} from '../getDate.js'


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
      },
      // 商品类型
      goodsTypeStatus:[
        {
        name: '商品',
        id: 1
      },
      {
        name: '套餐',
        id: 2
      },
      {
        name: '拼团',
        id: 3
      }
      ]
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
      // console.log(event)
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
    // 页面请求数据
    async fetchData() {
      this.loading = true
      var data = this.filter
      if(!data.orderNo){
        delete data.orderNo
      }
      if(!data.shopId){
        delete data.shopId
      }
          if(!data.orderTimeStart){
        delete data.orderTimeStart
      }
          if(!data.orderTimeEnd){
        delete data.orderTimeEnd
      }
          if(!data.state){
        delete data.state
      }
          if(!data.goodsType){
        delete data.goodsType
      }
      
      const { data: res } = await this.$http.get(`order/${1}/list`, {params:data} )
          this.list = res.data.records
          this.pages.total =  res.data.total
          this.pages.page =   res.data.current
          this.pages.limit =  res.data.size
          this.loading = false
   
    },
    // 选择日期时间
    changeDate(e) {

      
      this.filter.orderTimeStart = getDate(e[0])
      this.filter.orderTimeEnd =getDate(e[1])

    // console.log(this.filter.orderTimeStart,1);
    // console.log(this.filter.orderTimeEnd,2);

    
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
  overflow: hidden;
  margin-bottom: 20px;
  div {
    float: left;
    display: flex;
    align-items: center;
    margin-right: 145px;
  }
    div:last-child{
      float: right;
      margin: 0;
    }
  .el-input {
    width: 200px;
  }
   .el-button {
 
    background-color: #44c9ab;
    color: #fff;
    border: none;
  }
}
.leading-out {
  margin-bottom: 20px;
 
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
