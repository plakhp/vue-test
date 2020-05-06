<template>
  <div class="dashboard-container">
    <div class="flex" style="height: calc(100vh - 50px);justify-content: center;font-size: 40px;">欢迎进入宠物社区后台管理系统</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {

  }
}
</script>
