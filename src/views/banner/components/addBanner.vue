<template>
  <el-dialog :title="dialogTitle" :visible="dialogVisible" :close-on-click-modal="false" :destroy-on-close="true" @close="close">
    <el-form ref="form" :model="form" label-width="120px" class="dialog-form-container" :rules="rules">
      <el-form-item label="广告名称" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
        <div class="banner_title">广告名称只是作为辨别多个广告条目之用，并不显示在广告中</div>
      </el-form-item>

      <el-form-item label="广告图片" prop="img">
        <!-- <el-input v-model="form.phone" autocomplete="off" /> -->

          <el-upload :action="uploadUrl" list-type="picture" :headers="headersObj" :on-success="successHandle" :before-upload="beforeAvatarUpload" :file-list="fileList">
            <div class="uploadImg">选择上传文件</div>
          </el-upload>

        <div class="banner_title">只能上传jpg/png格式文件，文件不能超过50kb</div>
      </el-form-item>
      <el-form-item label="广告链接" prop="shop" class="banner_link">
        <el-input v-model="form.shopId" autocomplete="off" placeholder="请输入商户名称" />
        <el-input v-model="form.goodsId" autocomplete="off" placeholder="请输入商品名称" />

      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" autocomplete="off" />
      </el-form-item>
      <el-form-item label="类型" prop="type" class="banner_link">
        <el-radio-group v-model="form.type" @change="changeType">
          <el-radio label="0">首页</el-radio>
          <el-radio label="1">课程</el-radio>
        </el-radio-group>

      </el-form-item>
      <el-form-item label="状态" prop="state" class="banner_link">
        <el-radio-group v-model="form.state" @change="changeState">
          <el-radio label="0">下架</el-radio>
          <el-radio label="1">上架</el-radio>
        </el-radio-group>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog_footer">

      <el-button v-loading="loading" type="primary" @click="save">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { deepClone } from '@/utils'
import { validPhone } from '@/utils/validate'

export default {
  name: 'Dialog',
  props: {
    id: {
      default() {
        return ''
      },
      type: String
    },
    status: {
      default() {
        return 0
      },
      type: Number
    },
    formData: {
      default() {
        return {}
      },
      type: Object
    },
    visible: {
      default() {
        return false
      },
      type: Boolean
    }
  },
  data() {
    return {
      token: '',
      loading: false,
      form: {},
      roles: [],
      // 上传图片URL
      uploadUrl: `https://dev-gateway.ipzoe.com/pet-admin/storage/upload`,
      headersObj: {
        Authorization: JSON.parse(window.localStorage.getItem('getUserData')).token
      },
      // 保存图片数组
      fileList: [],
      rules: {
        name: [
          { required: true, message: '请输入广告名称', trigger: ['blur', 'change'] }
        ],
        // img: [
        //   { required: true, message: '请上传图片', trigger: ['click', 'change'] }
        // ],
        // shop: [
        //   { required: true, message: '请输入商户', trigger: ['blur', 'change'] }
        // ],
        sort: [
          { required: true, message: '请输入排序', trigger: ['blur', 'change'] }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: ['blur', 'change'] }
        ],
        state: [
          { required: true, message: '请选择是否上架', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {
    dialogVisible() {
      let dialogVisible = false
      if (this.visible) {
        dialogVisible = true
      }
      return dialogVisible
    },
    dialogTitle() {
      let title = '新增'
      if (this.status === 1) {
        title = '编辑'
      }
      return title
    }
  },
  created() {
    if (this.status === 1) {
      this.fetchData()
    }
    // const data = JSON.parse(window.localStorage.getItem('getUserData'))
  },
  methods: {

    // 选择类型
    changeType(e) {
      this.form.type = e
    },
    // 选择状态
    changeState(e) {
      this.form.state = e
    },
    async fetchData() {
      // this.form = deepClone(this.formData)

      const id = this.formData.id
      const { data: res } = await this.$http.get(`banner/${id}`)

      res.data.type = res.data.type + ''
      res.data.state = res.data.state + ''
      this.form = res.data
      // this.$store.dispatch('role/dropdown')
      //   .then(data => {
      //     this.roles = data
      //   })
    },
    // 上传文件
    successHandle(res) {
      // console.log(res.data.url)
      if (res.code !== 0) return this.$message.warning(res.msg)
      this.form.picture = res.data.url
      this.fileList.push(res.data)
    },
    // 上传图片检验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 < 50
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过50kb!')
      }
      return isLt2M && isJPG
    },
    save() {
      const id = this.formData.id
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          if (this.status === 0) {
            const { data: res } = await this.$http.post('banner', this.form)
            // console.log(res, 11111111111)
            this.loading = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            // 传给父组件刷新页面
            this.$emit('cb', 'refresh')
          } else if (this.status === 1) {
            const { data: res } = await this.$http.put(`banner/${id}`, this.form)
            console.log(res, 11111111111)
            this.loading = false
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            // 传给父组件刷新页面
            this.$emit('cb', 'refresh')
          }
        }
      })
    },
    close() {
      this.$emit('cb', 'close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .banner_title {
    font-size: 12px;
    color: #999;
  }
  .uploadImg {
    width: 150px;
    height: 36px;
    border: 1px solid #eee;
    text-align: center;
    line-height: 34px;
    font-size: 12px;
       color: #999;
  }
  .banner_link {
    .el-input {
      width: 180px;
      margin-right: 20px;
    }
  }
  .dialog_footer{
    text-align: center;
     .el-button {
           background-color: #44C9AB;
              color: #fff;
              border: none;
              width: 80px;
              height: 36px;
    }
  }

</style>
