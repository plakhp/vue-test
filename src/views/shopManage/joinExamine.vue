<template>
  <div class="app-container">
    <!-- 导出按钮 -->
    <div class="leading-out">
      <el-button>导出</el-button>
    </div>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="nickName" label="手机号" />
      <el-table-column prop="nickName" label="店铺名称" />
      <el-table-column prop="nickName" label="店铺分类" width="100" />
      <el-table-column prop="nickName" label="营业执照编号" />

      <el-table-column label="营业执照照片" width="100">
        <template slot-scope="scope">
          <div class="control">
            <span class="color-green" @click="lookShop(scope.row)">查看</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="门头照片" width="100">
        <template slot-scope="scope">
          <div class="control">
            <span class="color-green" @click="lookDoor(scope.row)">查看</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="nickName" label="人均价格" width="100" />
      <el-table-column prop="nickName" label="地址信息" />
      <el-table-column prop="nickName" label="营业时间" />

      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0" class="color-gray">未入驻</span>
          <span v-if="scope.row.status === 2" class="color-black">审核中</span>

          <span v-if="scope.row.status === -1" class="color-red">审核失败</span>
          <span v-if="scope.row.status === 1" class="color-green">审核成功</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <div class="control">
            <span v-if="scope.row.status === 0" class="color-gray">审核</span>
            <span v-if="scope.row.status === 2" class="color-green" @click="examine">审核</span>

            <span v-if="scope.row.status === -1" class="color-green" @click="examine">查看</span>
            <span v-if="scope.row.status === 1" class="color-green" @click="examineSystem">设置</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 营业执照图片弹出框 -->
    <el-dialog title="点击查看更多" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="demo-image__preview">
        <el-image style="width: 200px; height: 200px" :src="url" :preview-src-list="srcList" />
      </div>
    </el-dialog>
    <!-- 门头图片弹出框 -->
    <el-dialog title="点击查看更多" :visible.sync="DialogVisible" width="30%" center>
      <div class="demo-image__preview">
        <el-image style="width: 200px; height: 200px" :src="doorUrl" :preview-src-list="doorList" />
      </div>
    </el-dialog>
    <!-- 审核弹出框 -->
    <el-dialog title="审核" :visible.sync="examineDialogVisible" width="30%" center>
      <div class="content">
        <div class="radioRow">
          <span>审核结果</span>
          <el-radio v-model="radio" label="1">通过</el-radio>
          <el-radio v-model="radio" label="2">拒绝</el-radio>
        </div>
        <div class="title">拒绝原因</div>
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
    <!-- 审核设置弹出框 -->
    <el-dialog title="设置" :visible.sync="systemDialogVisible" width="30%" center>
      <div class="content">
        <div class="radioRow">
          <span>是否设置为首页</span>
          <el-radio v-model="radio1" label="1">是</el-radio>
          <el-radio v-model="radio1" label="2">否</el-radio>
        </div>
        <div class="radioRow">
          <span>结算方式</span>
          <el-radio v-model="radio2" label="0" change="settleAccounts">月结</el-radio>
          <el-radio v-model="radio2" label="1" change="settleAccounts">季结</el-radio>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveSystemDialog">确 定</el-button>
      </span>
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
      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',

      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ],
      doorUrl:
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      doorList: [
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
      ],
      // 营业执照弹框
      centerDialogVisible: false,
      // 门头照片弹框
      DialogVisible: false,
      // 审核 examineDialogVisible
      examineDialogVisible: false,
      // 设置
      systemDialogVisible: false,
      textarea: '',
      radio: '1',
      // 审核设置
      radio1: '1',

      radio2: '1',

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
      loading: false
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

    lookShop() {
      this.centerDialogVisible = true
    },
    lookDoor() {
      this.DialogVisible = true
    },
    // 审核 examine
    examine() {
      this.examineDialogVisible = true
    },
    // 关闭
    closeDialog() {
      this.examineDialogVisible = false
      this.textarea = ''
      this.systemDialogVisible = false
    },
    // 保存备注
    saveDialog() {
      this.examineDialogVisible = false
      this.textarea = ''
    },

    // 审核设置
    examineSystem() {
      this.systemDialogVisible = true
    },
    saveSystemDialog() {
      console.log(this.radio2, '111223122')
      // this.systemDialogVisible = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.leading-out {
  margin-bottom: 20px;
  .el-button {
    background-color: #44c9ab;
    color: #fff;
    border: none;
  }
}
.control {
  cursor: pointer;
}
// 图片
.demo-image__preview {
  text-align: center;
}
.radioRow {
  margin-bottom: 20px;
}
.radioRow > span {
  display: inline-block;
  margin-right: 30px;
  width: 120px;

}
</style>
<style lang="scss">
.content .el-textarea__inner {
  height: 200px !important;
  margin-top: 10px;
  resize: none !important;
  outline: none !important;
  background-color: #eee;
}
</style>
