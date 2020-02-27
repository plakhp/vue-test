<template>
  <div>
    <image-upload :files="files" @getFiles="getFiles" />
  </div>
</template>

<script>
import ImageUpload from '@/components/Upload/Image'
export default {
  name: 'Upload',
  components: {
    ImageUpload
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
