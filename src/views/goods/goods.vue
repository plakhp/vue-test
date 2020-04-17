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
      <el-table-column prop="nickName" label="商户名称" width="200" />
      <el-table-column prop="nickName" label="服务数量" />

      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <div class="button_control">
            <el-button type="primary" @click="lookGoodsdetail">
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

      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://apd-421275995afef25fd1576864c706b121.v.smtcdns.com/mv.music.tc.qq.com/AAva_HEsP8jgQ-Kpye9BjReqmiZT6foInR32EbsAZbSI/07B883435DD047613333D87F37051B6413951F7BA411548C9F730E58BF995D87C7410A11B8B35F190098A58BA7391D71ZZqqmusic_default/1049_M01103000046vwzC2MYicl1001719213.f9844.mp4?fname=1049_M01103000046vwzC2MYicl1001719213.f9844.mp4'
      ],
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
    lookGoodsdetail() {
      // console.log(1);

      this.$router.push('/goods/goods_detail')
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
