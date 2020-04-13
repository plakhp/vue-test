<template>
  <div>
    <image-upload :files="files" @getFiles="getFiles" />
    <normal-upload :files="files" @getFiles="getFiles" />
  </div>
</template>

<script>
import ImageUpload from '@/components/Upload/Image'
import NormalUpload from '@/components/Upload/Normal'

export default {
  name: 'Upload',
  components: {
    ImageUpload,
    NormalUpload
  },
  data() {
    return {
      files: []
    }
  },
  methods: {
    getFiles(files) {
      this.files = files
    }
  }
}
</script>

<style scoped>

</style>
