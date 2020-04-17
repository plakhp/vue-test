<template>
  <el-dialog :title="dialogTitle" :visible="dialogVisible" :close-on-click-modal="false" :destroy-on-close="true" @close="close">
    <el-form ref="form" :model="form" label-width="120px" class="dialog-form-container" :rules="rules">
      <el-form-item label="广告名称" prop="name">
        <el-input v-model="form.userName" autocomplete="off" />
        <div class="banner_title">广告名称只是作为辨别多个广告条目之用，并不显示在广告中</div>
      </el-form-item>

      <el-form-item label="广告图片" prop="img">
        <!-- <el-input v-model="form.phone" autocomplete="off" /> -->
          <el-upload :action="uploadUrl" list-type="text" :headers="headersObj" :on-success="successHandle" :before-upload="beforeAvatarUpload">
            <div class="uploadImg">选择上传文件</div>
          </el-upload>

        <div class="banner_title">只能上传jpg/png格式文件，文件不能超过50kb</div>
      </el-form-item>
      <el-form-item label="广告链接" prop="shop" class="banner_link">
        <el-input v-model="form.phone" autocomplete="off" placeholder="请输入商户名称" />
        <el-input v-model="form.phone" autocomplete="off" placeholder="请输入商品名称" />

      </el-form-item>
      <el-form-item label="排序" prop="seqencing">
        <el-input v-model="form.phone" autocomplete="off" />
      </el-form-item>
      <!-- <el-form-item label="角色" prop="roleId">
        <el-select v-model="form.roleId">
          <el-option
            v-for="(item, index) in roles"
            :key="index"
            :label="item.roleName"
            :value="item.id"
          />
        </el-select> -->
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
      loading: false,
      form: {},
      roles: [],
      // 上传图片URL
      uploadUrl: '',
      headersObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      rules: {
        name: [
          { required: true, message: '请输入广告名称', trigger: ['blur', 'change'] }
        ],
        img: [
          { required: true, message: '请上传图片', trigger: ['click', 'change'] }
        ],
        shop: [
          { required: true, message: '请输入链接', trigger: ['blur', 'change'] }
        ],
        seqencing: [
          { required: true, message: '请输入排序', trigger: ['blur', 'change'] }
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
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.form = deepClone(this.formData)
      this.$store.dispatch('role/dropdown')
        .then(data => {
          this.roles = data
        })
    },
    // 上传文件
    successHandle(res) {
      // console.log(res);
      // if (res.error_code != 0) return this.$message.warning(res.msg)
      // this.$message.success(res.msg)

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
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.form.roleName = this.roles.filter(role => role.id === this.form.roleId)[0].roleName
          const url = this.status === 0 ? 'account/add' : 'account/edit'
          this.$store.dispatch(url, this.form)
            .then(() => {
              this.$message({
                message: this.status === 0 ? '账号新增成功' : '账号编辑成功',
                type: 'success'
              })
              this.$emit('cb', 'refresh')
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
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
