<template>
  <div>
    <el-upload
      :action="action"
      :headers="headers"
      :on-preview="handlePictureCardPreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :accept="fileAccept"
      :file-list="fileList"
      class="image-uploader"
      :class="{'upload-hide': fileList.length === limit && limitHide}"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <div v-if="messageShow" class="message" :class="{'message-error': isError}">{{ message }}</div>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'ImageUpload',
  props: {
    value: {
      type: String,
      default: ''
    },
    data: {
      default() {
        return []
      },
      type: Array
    },
    limit: {
      type: Number,
      default: 1
    },
    limitHide: {
      type: Boolean,
      default: true
    },
    files: {
      default() {
        return []
      },
      type: Array
    },
    maxSize: {
      type: Number,
      default: 0
    },
    accept: {
      type: String,
      default: 'image/jpg,image/jpeg,image/png'
    },
    defaultMessage: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    uploadType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      action: `${process.env.VUE_APP_BASE_API}/${process.env.VUE_APP_SERVER_ADMIN}/storage/create`,
      headers: {
        'Authorization': getToken()
      },
      fileList: this.files,
      fileAccept: this.accept,
      isError: false,
      messageShow: this.defaultMessage !== '' || this.errorMessage !== '',
      message: this.defaultMessage,
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created() {
  },
  methods: {
    emitFiles() {
      this.$emit('getFiles', this.fileList)
    },
    handleSuccess(res, file) {
      file.url = res.data.url
      this.fileList.push(file)
      this.emitFiles()
    },
    beforeUpload(file) {
      const isMatchFile = this.accept.indexOf(file.type) > -1
      const isLt = this.maxSize === 0 || file.size < this.maxSize

      if (!isMatchFile || !isLt) {
        this.isError = true
        this.message = this.errorMessage
        // this.$message.error(this.message)
      } else {
        this.isError = false
        this.message = this.defaultMessage
      }
      return isMatchFile && isLt
    },
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      this.emitFiles()
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
