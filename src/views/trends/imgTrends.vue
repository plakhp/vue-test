<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <div>
          <span>用户昵称:</span>
          <el-input v-model="filter.nickName" placeholder="请输入用户昵称" @keyup.enter.native="search" />
        </div>
        <div>
          <span>动态文字:</span>
          <el-input v-model="filter.content" placeholder="请输入动态文字" @keyup.enter.native="search" />
        </div>
        <div>
          <span>状态:</span>
          <el-select v-model="filter.status" placeholder="全部" :clearable="true" @change="changeStatus">
            <el-option
              v-for="(item, index) in roleStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>

    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="nickName" label="用户昵称" width="200" />
      <el-table-column prop="createTime" label="发布时间" width="200" />
      <el-table-column prop="content" label="文字" />
      <el-table-column label="图片" width="200">
        <template slot-scope="scope">
          <div class="control">
            <span class="color-green" @click="edit(scope.row)">查看</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0" class="color-red">封禁</span>
          <span v-if="scope.row.status === 1" class="color-green">正常</span>

        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
       <div class="button_control">
            <el-button v-if="scope.row.status === 0" type="primary" @click="closeStatus(scope.row)">
              <span>解封</span>
            </el-button>
            <el-button v-if="scope.row.status === 1" type="danger" @click="closeStatus(scope.row)">
              <span>封禁</span>
            </el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog title="查看大图" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="demo-image__preview">
        <el-image style="width: 200px; height: 200px" :src="url" :preview-src-list="srcList" />
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
      roleStatus: [{
        value: '0',
        label: '封禁'
      }, {
        value: '1',
        label: '正常'
      }],

      centerDialogVisible: false,
      // 预览图片
      url: '',
      srcList: [],
      filter: {
        nickName: '',
        content: '',
        status: '',
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
    // 查看状态
    changeStatus(event) {
      // console.log(event)
      this.filter.status = event
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

      const { data: res } = await this.$http.get(`dynamic/1/list`, { params: this.filter })
      // console.log(res, 11111111122222222222)
      this.list = res.data.records
      this.pages.total = res.data.total
      this.pages.page = res.data.current
      this.pages.limit = res.data.size

      this.loading = false
    },

    edit(item) {
      const that = this
      this.url = item.picVOList[0].url

      item.picVOList.forEach(item1 => {
        that.srcList.push(item1.url)
        // console.log(item1, 1111111111111111)
      })
      this.centerDialogVisible = true
    },
    async closeStatus(item) {
      const { data: res } = await this.$http.put(`dynamic/${item.id}/up-down`)
      // console.log(res, '999999999999')
      this.fetchData()
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

// .button_control {
//     .el-button {
//   background-color: #44c9ab;
//   color: #fff;
//   border: none;
// }
// }
</style>
<style lang="scss">
</style>
