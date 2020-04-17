<template>
  <div class="app-container">

    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="nickName" label="举报用户" width="100" />
      <el-table-column prop="nickName" label="被举报用户" width="100" />
      <el-table-column prop="nickName" label="举报类型" width="100" />

      <el-table-column prop="nickName" label="举报内容" />
      <el-table-column label="图片/视频" width="100">
        <template slot-scope="scope">
          <span class="color-green" @click="edit(scope.row)">查看</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="举报原因" />
      <el-table-column label="是否处理" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="备注" width="100">
        <template slot-scope="scope">
          <div class="leading-out">
            <el-button type="primary" @click="add(scope.row)">添加</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog title="添加备注" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="content">
        <div class="title">备注</div>
        <el-input
          v-model="textarea"
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
      value: true,
      centerDialogVisible: false,
      textarea: '',
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
    changeStatus(event) {
      // console.log(event);
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
    // 关闭
    closeDialog() {
      this.centerDialogVisible = false
      this.textarea = ''
    },
    // 保存备注
    saveDialog() {
      this.centerDialogVisible = false
      this.textarea = ''
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
.content .el-textarea__inner {
  height: 200px !important;
  margin-top: 20px;
  resize: none !important;
  outline: none !important;
  background-color: #eee;
}
</style>
