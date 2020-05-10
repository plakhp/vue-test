<template>
  <div class="app-container">

    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="reportUser" label="举报用户" width="100" />
      <el-table-column prop="reportedUser" label="被举报用户" width="100" />
      <el-table-column label="举报类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.tipType==1">用户</span>
          <span v-if="scope.row.tipType==2">动态</span>
          <span v-if="scope.row.tipType==3">商户</span>
          <span v-if="scope.row.tipType==4">评论</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="举报内容" />
      <el-table-column label="图片/视频" width="100">
        <template slot-scope="scope">
          <span class="color-green" @click="look(scope.row)" style="cursor: pointer;">查看</span>
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="举报原因" />
      <el-table-column label="是否处理" width="100">
        <template slot-scope="scope">
          <el-switch
    
            :value="scope.row.isHandle==1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus(scope.row)"
          />
          <!-- <el-switch
            v-if="scope.row.isHandle==0"
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus(scope.row)"
          /> -->
        </template>
      </el-table-column>
      <el-table-column label="备注" width="100">
        <template slot-scope="scope">
          <div class="leading-out">
            <el-button v-if="scope.row.isHandle==1" type="primary" @click="add(scope.row)">查看</el-button>
            <el-button v-if="scope.row.isHandle==0" type="primary" @click="add(scope.row)">添加</el-button>

          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 图片弹出款 -->
    <el-dialog title="查看" :visible.sync="imgDialogVisible" width="30%" center>
      <div class="demo-image__preview">
        <el-image v-if="url" style="width: 200px; height: 200px" :src="url" :preview-src-list="srcList" />
        <video v-if="videoLink" id="video1" :src="videoLink" style="width:300px;height:200px" controls />
      </div>
    </el-dialog>
    <!-- 查看弹出框 -->
    <el-dialog :title="title" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="content">
        <div class="title">备注</div>
        <el-input
          v-model="remark"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          :autosize="{ minRows: 1, maxRows: 8}"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页功能 -->
    <pagination :hidden="list.length === 0" :total="pages.total" :page="pages.page" :limit="pages.limit" @pagination="changeSize" />
  </div>
  <!-- <div v-else>
    <div class="noneList">
      暂无数据
    </div>
  </div> -->
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
      value2: '',
      imgDialogVisible: false,
      centerDialogVisible: false,
      remark: '',
      filter: {
        type: '',
        phoneNum: null,
        pageNum: 1,
        pageSize: 5,
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
      },
      // 添加备注的id
      id: '',
      // 预览图片
      url: '',
      srcList: [],
      // 视频
      videoLink: '',
    
      title:'添加备注'
    }
  },
  computed: {
    ...mapGetters([])
  },
  created() {
    this.fetchData()
  },
  methods: {
    //  是否处理开关
    async changeStatus(event) {
      // console.log(event)
      // tip-off/{id}/switch
      const { data: res } = await this.$http.put(`tip-off/${event.id}/switch`)
      this.fetchData()
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

      const { data: res } = await this.$http.get('tip-off/list', { params: this.filter })
      this.loading = false
      // console.log(res, 888888888888)
      // res.data.records.forEach((item)=>{
      //   if(item.isHandle==0){
      //     this.value2 = false
      //   }
      //   if(item.isHandle==1){
      //     this.value1 = true
      //   }
      // })
      this.list = res.data.records
      this.pages.total = res.data.total
      this.pages.page = res.data.current
      this.pages.limit = res.data.size
    },
    add(e) {
      this.id = e.id
      this.centerDialogVisible = true
      this.remark = e.remark
      // this.isHandle = e.isHandle
       if(e.isHandle==0) {
        this.title = '添加备注'
      }
      if(e.isHandle==1) {
        this.title = '查看备注'
      }
    },
    // 查看图片
    look(e) {
      console.log(e,99999999999)
     
      if (!e.fileList&& !e.videoLink) {
        return this.$message.warning('图片/视频不存在')
      }
        if (e.fileList.length<1&& !e.videoLink) {
        return this.$message.warning('图片/视频不存在')
      }
      this.imgDialogVisible = true
      const that = this
      this.videoLink = e.videoLink
      if (e.fileList.length > 0) {
        this.url = e.fileList[0].url
        e.fileList.forEach(item1 => {
          that.srcList.push(item1.url)
        })
      }
    },
    // 播放视频
    playVideo() {
      var myVideo = document.getElementById('video1')

      myVideo.play()

    //   function pauseVid() {
    //     myVideo.pause();
    //   }
    },
    // 关闭
    closeDialog() {
      this.centerDialogVisible = false
      this.remark = ''
    },
    // 保存备注
    async saveDialog() {
      if (!this.remark) {
        return this.$message.warning('备注不能为空')
      }
      // eslint-disable-next-line no-unused-vars
      const res = await this.$http.put(`tip-off/${this.id}/remark`, {
        remark: this.remark
      })
      this.centerDialogVisible = false
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>

.leading-out .el-button {
  background-color: #44c9ab;
  color: #fff;
  border: none;
}
</style>
<style lang="scss">
.noneList {
  margin-top: 300px;
  text-align: center;
  font-size: 30px;
}
.content .el-textarea__inner {
  height: 200px !important;
  margin-top: 20px;
  resize: none !important;
  outline: none !important;
  background-color: #eee;

}
.demo-image__preview {
  text-align: center;
}
</style>
