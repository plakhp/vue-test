<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <div>
          <span>用户昵称:</span>
          <el-input
            v-model="filter.username"
            placeholder="请输入用户昵称"
            @keyup.enter.native="search"
          />
        </div>

        <el-input
          v-model="filter.phone"
          placeholder="手机号"
          @keyup.enter.native="search"
        />
        <el-button type="primary" plain @click="search">
          查询
        </el-button>
      </div>
    </div>
    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="userName" label="反馈用户" />
      <el-table-column prop="phone" label="反馈手机" />

      <el-table-column prop="createTime" label="反馈时间" />
      <el-table-column prop="descriptionn" label="反馈内容" />

      <el-table-column label="是否处理" width="320">
        <template slot-scope="scope">

          <el-radio-group v-model="scope.row.isHandle" @change="changeStatus($event,scope.row)">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>

          </el-radio-group>
        </template>
      </el-table-column>
    </el-table>
    <pagination :hidden="list.length === 0" :total="pages.total" :page="pages.page" :limit="pages.limit" @pagination="changeSize" />
    <!-- <add-banner v-if="dialogData.visible" :visible="dialogData.visible" :status="dialogData.status" :form-data="dialogData.formData" @cb="dialogCallback" /> -->
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
      radio: 0,
      filter: {
        username: '',
        phone: '',
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

      const { data: res } = await this.$http.get('feedback/list', { params: this.filter })
      this.loading = false
      this.list = res.data.records
      this.pages.total = res.data.total
      this.pages.page = res.data.current
      this.pages.limit = res.data.size
      // console.log(res)
    },

    async changeStatus(e, item) {
      // console.log(e)
      // console.log(item, '11111111111111')
      const res = await this.$http.put(`feedback/${item.id}/handle`, { isHandle: e })
      this.fetchData()
    }

  }
}
</script>

<style lang="scss" scoped>
   .filter-left {

      width: 100%;

      .el-input {
        width: 200px;
        margin-left: 10px;
      }
  }
.title {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.control {
  cursor: pointer;
  display: flex;
  justify-content: space-around;

}
.banner_img {
    height: 80px;
}
</style>
