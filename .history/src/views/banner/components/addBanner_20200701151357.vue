<template>
  <el-dialog
    :title="dialogTitle"
    :visible="dialogVisible"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="close"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      class="dialog-form-container"
      :rules="rules"
    >
      <el-form-item label="广告名称" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
        <div class="banner_title">广告名称只是作为辨别多个广告条目之用，并不显示在广告中</div>
      </el-form-item>

      <el-form-item label="广告图片" prop="picture" ref="image">
        <!-- <el-input v-model="form.phone" autocomplete="off" /> -->

        <el-upload
          :action="uploadUrl"
          list-type="picture"
          :headers="headersObj"
          :on-success="successHandle"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove"
          :file-list="fileList"
          v-model="form.picture"
          :limit="1"
        >
          <div class="uploadImg">选择上传文件</div>
        </el-upload>

        <div class="banner_title">只能上传jpg/png格式文件，文件不能超过50kb</div>
      </el-form-item>
      <el-form-item label="广告链接" class="banner_link" prop="shopId">
        <el-select v-model="form.shopId" placeholder="商户名称" :clearable="true" @change="changeShop" filterable>
          <el-option
            v-for="(item, index) in allShop"
            :key="index"
            :label="item.shopName"
            :value="item.id"
          />
        </el-select>

        <el-select v-model="form.goodsId" placeholder="商品名称" :clearable="true" filterable>
          <el-option
            v-for="(item, index) in allGoods"
            :key="index"
            :label="item.goodsName"
            :value="item.id"
          />
        </el-select>

        <!-- <el-input v-model="form.shopId" autocomplete="off" placeholder="请输入商户名称" /> -->

        <!-- <el-input v-model="form.goodsId" autocomplete="off" placeholder="请输入商品名称" /> -->
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" autocomplete="off" />
      </el-form-item>
      <!-- <el-form-item label="类型" prop="type" class="banner_link">
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

      </el-form-item>-->
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
      form: {
        shopId:''
      },
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
          picture: [{ required: true, message: "请上传图片",trigger: 'change'}],

           shopId: [
            { required: true, message: '请选择商户', trigger: 'change' }
          ],
           good: [
            { required: true, message: '请选择商品', trigger: 'change' }
          ],
      
        sort: [
          { required: true, message: '请输入排序', trigger: ['blur', 'change'] }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: ['blur', 'change'] }
        ],
        state: [
          { required: true, message: '请选择是否上架', trigger: ['blur', 'change'] }
        ]
      },
          roleStatus: [{
        name: '待付款',
        id: 10
      },
      {
        name: '待使用',
        id: 11
      }
     ],
     // 所有商铺
       filter: {
        shopName: '',
        pageNum: 1,
        pageSize: 500,
        orderBy: 'sa.modify_time',
        orderType: '2'
      },
     allShop:[],
     //所有商品 allGoods  
       goods: {
        goodsName: '',
        pageNum: 1,
        pageSize: 500,
        orderBy: 'modify_time',
        orderType: 2
      },
      allGoods:[]
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
    this.getAllShop()
    this.form = deepClone(this.formData)

    if(this.form.shopId){
      this.getAllGoods(this.form.shopId)
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
    // 所有商户
   async getAllShop() {
       const { data: res } = await this.$http.get('goods/shop', { params: this.filter })
           this.allShop = res.data.records
    },
    // 所有商品
    async getAllGoods(shopId){

          const { data: res } = await this.$http.get(`goods/${shopId}/list`, { params: this.goods })
                this.allGoods = res.data.records
    },
    // 选择商户
    changeShop() {
        console.log(this.form.shopId,1111)
        let shopId = this.form.shopId
        this.getAllGoods(shopId)
        
          // this.$refs.changeshopStatus.clearValidate(); // 关闭校验
    },
    async fetchData() {
      

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
    // 上传图片成功回调
    successHandle(res) {
   
      // console.log(res.data.url)
      if (res.code !== 0) return this.$message.warning(res.msg)
      this.form.picture = res.data.url
      // console.log(res.data,'11111');
      
      this.fileList.push(res.data)
            // 上传完成关闭校验
      this.$refs['image'].clearValidate()
    
    },
  
    // 上传图片检验
    beforeAvatarUpload(file) {
      console.log(file.type,'11111111')
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
    // 移除图片
       handleRemove(file, fileList) {
        // console.log(file, 1111);
        this.fileList.forEach(item => {
          if(item.id==file.id){
            this.fileList = []
          }
        });
      },
    // 保存
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

.dialog_footer {
  text-align: center;
  .el-button {
    background-color: #44c9ab;
    color: #fff;
    border: none;
    width: 80px;
    height: 36px;
  }
}
</style>
<style lang="scss" >
.banner_link {
  .el-input {
    width: 180px;
  }
  .el-select {
    .el-input {
      width: 180px;
    }
    width: 180px;
    margin-right: 20px;
  }
}
</style>
