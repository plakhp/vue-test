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
              v-for="(item, index) in shopList"
              :key="index"
              :label="item.shopName"
              :value="item.id"
            />
          </el-select>
        </div>
        <div>
          <span>下单时间:</span>

          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
          />
        </div>

        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>
    <div class="filter-left">
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
      <div class="order_price">
        <span>订单金额:</span>
        <el-input v-model="filter.minPrice" placeholder="最小金额" @keyup.enter.native="search" />
        -
        <el-input v-model="filter.maxPrice" placeholder="最大金额" @keyup.enter.native="search" />
      </div>
      <div>
        <span>下单用户:</span>

        <el-input v-model="filter.nickName" placeholder="请输入用户名" @keyup.enter.native="search" />
      </div>
      <div class="btns">
        <el-button @click="exportShop">导出</el-button>
      </div>
    </div>
    <!-- 导出按钮 -->
    <!-- <div class="leading-out">
      <el-button>导出</el-button>
    </div>-->
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
        minPrice:'',
        maxPrice:'',
        nickName:'',
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
      ],
      // 商户
         shopFilter: {
        shopName: '',
        pageNum: 1,
        pageSize: 10,
        orderBy: 'sa.modify_time',
        orderType: '2'
      },
      shopList:[]
    }
  },
  computed: {
    ...mapGetters([])
 
  },
  created() {
    this.fetchData()
    // 所有商户
    this.getAllShop()
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
   async getAllShop() {
        
      const { data: res } = await this.$http.get('goods/shop', { params: this.shopFilter })
      // console.log(res,1111111)
         this.shopList = res.data.records
    },
    // 选择日期时间
    changeDate(e) {

      // console.log(e,1111111111)
      if(!e){
        this.filter.orderTimeStart = ''
        this.filter.orderTimeEnd = ''
      }else{
             this.filter.orderTimeStart = getDate(e[0])
      this.filter.orderTimeEnd =getDate(e[1])
      }
 

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
    },
       // 导出
  async  exportShop() {
         var data = this.filter
      if(!data.orderNo){
       this.filter.orderNo = ""
      }
      if(!data.shopId){
        this.filter.shopId = ""
      }
          if(!data.orderTimeStart){
        this.filter.orderTimeStart=""
      }
          if(!data.orderTimeEnd){
        this.filter.orderTimeEnd=""
      }
          if(!data.state){
        this.filter.state = ""
      }
          if(!data.goodsType){
        this.filter.goodsType=""
      }

      this.$http({
        method: 'get',
        url: `order/${1}/export`+`?orderNo=${this.filter.orderNo}&shopId=${this.filter.shopId}&orderTimeStart=${this.filter.orderTimeStart}&orderTimeEnd=${this.filter.orderTimeEnd}&state=${this.filter.state}&goodsType=${this.filter.goodsType}&pageNum=${this.filter.pageNum}&pageSize=${this.filter.pageSize}&orderBy=${this.filter.orderBy}&orderType=${this.filter.orderType}`,
        responseType: 'blob'
      })
        .then(res => {
      
          const link = document.createElement('a')
          const blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel'
          })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          const num = Math.ceil(Math.random() * 1000)

          link.setAttribute('download', '用户_' + num + '.xlsx')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          this.$Notice.error({
            title: '错误',
            desc: '网络连接错误'
          })
        })
    }
  
  }
}
</script>

<style lang="scss" scoped>
.filter-left {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  .el-input {
    width: 200px;
  }
}
.btns .el-button {
  background-color: #44c9ab;
  color: #fff;
  border: none;
}

.leading-out {
  margin-bottom: 20px;
}
// 订单金额
.order_price {
    .el-input {
    width: 100px;
  }
}


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
