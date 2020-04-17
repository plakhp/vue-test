<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <div>
          <span>用户昵称:</span>
          <el-input v-model="filter.userName" placeholder="请输入用户昵称" @keyup.enter.native="search" />
        </div>
        <div>
          <span>动态文字:</span>
          <el-input v-model="filter.userName" placeholder="请输入动态文字" @keyup.enter.native="search" />
        </div>
        <div>
          <span>状态:</span>
          <el-select v-model="filter.status" placeholder="全部" :clearable="true">
            <el-option
              v-for="(item, index) in roleStatus"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>

        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>
    <!-- <div class="title">
      <span>数据列表</span>
    </div> -->
    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="nickName" label="用户昵称" width="200" />
      <el-table-column prop="nickName" label="发布时间" width="200" />
      <el-table-column prop="nickName" label="文字" />
      <el-table-column label="视频" width="200">
        <template slot-scope="scope">
          <div class="control">
            <span class="color-green" @click="edit(scope.row)">查看</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status === -1" class="color-red">停用</span>
          <span v-if="scope.row.status === 1" class="color-green">启用</span>
          <!-- <span v-if="scope.row.status === 0" class="color-gray">停用</span> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <div class="button_control">
            <el-button type="primary">
              <span>封禁</span>
            <!-- <span>解封</span> -->
            </el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog title="查看视频" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="demo-image__preview">
        <video id="video1" :src="url" style="width:300px;height:200px" controls />
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
      roleStatus: [],

      centerDialogVisible: false,
      url:
        'https://apd-421275995afef25fd1576864c706b121.v.smtcdns.com/mv.music.tc.qq.com/AAva_HEsP8jgQ-Kpye9BjReqmiZT6foInR32EbsAZbSI/07B883435DD047613333D87F37051B6413951F7BA411548C9F730E58BF995D87C7410A11B8B35F190098A58BA7391D71ZZqqmusic_default/1049_M01103000046vwzC2MYicl1001719213.f9844.mp4?fname=1049_M01103000046vwzC2MYicl1001719213.f9844.mp4',

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
    playVideo() {
      var myVideo = document.getElementById('video1')

      myVideo.play()

    //   function pauseVid() {
    //     myVideo.pause();
    //   }
    },
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
    add() {
      this.centerDialogVisible = true
    },
    edit() {
      this.centerDialogVisible = true
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
