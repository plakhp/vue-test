<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-left">
        <div>
          <span>店铺名称:</span>
          <el-input v-model="filter.shopName" placeholder @keyup.enter.native="search" />
        </div>

        <el-button type="primary" plain @click="search">查询</el-button>
      </div>
    </div>
    <!-- 导出按钮 -->
    <div class="leading-out">
      <el-button @click="exportShop">导出</el-button>
    </div>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" stripe border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="shopName" label="店铺名称" />
      <el-table-column prop="shopCategoryName" label="店铺分类" width="100" />
      <el-table-column prop="bussinessLicenseNo" label="营业执照编号" />

      <el-table-column label="营业执照照片" width="100">
        <template slot-scope="scope">
          <div class="control">
            <span v-if="scope.row.status!=0" class="color-green" @click="lookShop(scope.row)">查看</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="门头照片" width="100">
        <template slot-scope="scope">
          <div class="control">
            <span v-if="scope.row.status!=0" class="color-green" @click="lookDoor(scope.row)">查看</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="perCapitaPrice" label="人均价格" width="200" />

      <el-table-column label="地址信息">
        <template slot-scope="scope">
          <span>{{ scope.row.province }}{{ scope.row.city }}{{ scope.row.region }}{{ scope.row.adress }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="entryTime" label="入驻时间" />

      <el-table-column label="营业时间">
        <template slot-scope="scope">
          <span>{{ scope.row.openTime }}-{{ scope.row.closeTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status === -1" class="color-red">冻结</span>
          <span v-if="scope.row.status === 0" class="color-gray">未入驻</span>
          <span v-if="scope.row.status === 1" class="color-black">审核中</span>
          <span v-if="scope.row.status === 2" class="color-green">审核成功</span>
          <span v-if="scope.row.status === 3" class="color-red">审核失败</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <div class="control">
            <span v-if="scope.row.status === 0" class="color-gray">审核</span>
            <span v-if="scope.row.status === 1" class="color-green" @click="examine(scope.row)">审核</span>
            <span
              v-if="scope.row.status === 2"
              class="color-green"
              @click="examineSystem(scope.row)"
            >设置</span>
            <span v-if="scope.row.status === 3" class="color-green" @click="examine(scope.row)">查看</span>
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
    <!-- 审核结果弹出框 -->
    <el-dialog title="审核" :visible.sync="examineDialogVisible" width="30%" center>
      <div class="content">
        <div class="radioRow">
          <span>审核结果</span>
          <div v-if="item.result">
            <span v-if="item.result==0">拒绝</span>
            <span v-if="item.result==1">通过</span>
          </div>
          <div v-if="!item.result">
            <el-radio v-model="radio" :label="1">通过</el-radio>
            <el-radio v-model="radio" :label="0">拒绝</el-radio>
          </div>
        </div>
        <div class="title">拒绝原因</div>
        <el-input
          v-model="rejectReason"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          :autosize="{ minRows: 1, maxRows: 8}"
        />
      </div>
      <span slot="footer" class="dialog-footer" v-if="!item.result">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 审核设置弹出框 -->
    <el-dialog
      title="设置"
      :visible.sync="systemDialogVisible"
      width="30%"
      center
      @close="closeDialog"
    >
      <div class="content">
        <div class="radioRow">
          <span>是否设置为首页</span>
          <el-radio v-model="radio1" label="1">是</el-radio>
          <el-radio v-model="radio1" label="0">否</el-radio>
        </div>
        <div class="radioRow">
          <span>结算方式</span>
          <el-radio v-model="radio2" label="0" change="settleAccounts">月结</el-radio>
          <el-radio v-model="radio2" label="1" change="settleAccounts">季结</el-radio>
        </div>
        <div class="radioRow">
          <span>店铺状态</span>
          <!-- <el-radio v-model="accountStatus" label="-1">冻结</el-radio>
          <el-radio v-model="accountStatus" label="1">解冻</el-radio>-->
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveShopDialog">确 定</el-button>
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
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination";

export default {
  name: "Account",
  components: {
    Pagination
  },
  data() {
    return {
      url: "",
      srcList: [],
      doorUrl: "",
      doorList: [],
      // 营业执照弹框
      centerDialogVisible: false,
      // 门头照片弹框
      DialogVisible: false,
      // 审核 examineDialogVisible
      examineDialogVisible: false,
      // 设置
      systemDialogVisible: false,
      rejectReason: "",
      radio: 1,
      // 审核设置
      radio1: "",
      radio2: "",
      // 店鋪狀態
      value: false,
      accountStatus: "",
      filter: {
        shopName: "",
        pageNum: 1,
        pageSize: 10,
        orderBy: "account.create_time",
        orderType: 2
      },
      pages: {
        total: 0,
        page: 1,
        limit: 10
      },
      list: [],
      loading: false,
      // 审核id
      infoId: "",
      id: "",
      // 审核数据
      item: {}
    };
  },
  computed: {
    ...mapGetters([])
  },
  created() {
    this.fetchData();
  },
  methods: {
    changeStatus(event) {
      // console.log(event)
    },
    search() {
      this.filter.pageNum = 1;
      this.fetchData();
    },
    changeSize(pagination) {
      this.filter.pageNum = pagination.page;
      this.filter.pageSize = pagination.limit;
      this.fetchData();
    },
    async fetchData() {
      this.loading = true;

      const { data: res } = await this.$http.get("shop/list", {
        params: this.filter
      });
      // console.log(res, 1111)

      this.loading = false;

      this.list = res.data.records;
      this.pages.total = res.data.total;
      this.pages.page = res.data.current;
      this.pages.limit = res.data.size;
    },
    // 查看营业执照
    lookShop(item) {
      const that = this;
      if (item.licenseList < 1) {
        this.centerDialogVisible = true;
        return;
      }
      this.url = item.licenseList[0].url;
      item.licenseList.forEach(item1 => {
        that.srcList.push(item1.url);
      });

      this.centerDialogVisible = true;
    },
    // 查看门头照片
    lookDoor(item) {
      const that = this;
      // console.log(item.shopDoorList, 111111)
      if (item.shopDoorList < 1) {
        this.DialogVisible = true;
        return;
      }
      this.doorUrl = item.shopDoorList[0].url;

      item.shopDoorList.forEach(item1 => {
        that.doorList.push(item1.url);
      });

      this.DialogVisible = true;
    },
    // 入驻审核 examine
    examine(item) {
      console.log(item, 1111);

      // 审核结果
      this.item = item;
      // 拒绝原因
      this.rejectReason = item.rejectReason;
      this.examineDialogVisible = true;
      this.radio = item.result;
    },
    // 关闭
    closeDialog() {
      this.examineDialogVisible = false;
      this.systemDialogVisible = false;
      this.radio1 = "";
      this.radio2 = "";
      this.accountStatus = "";
    },
    // 保存审核结果备注 shop/{approveId}/approve
    async saveDialog() {
      const { data: res } = await this.$http.put(
        `shop/${this.item.shopApproveId}/approve`,
        {
          id: this.item.id,
          result: this.radio,
          rejectReason: this.rejectReason
        }
      );
      this.fetchData();
      this.examineDialogVisible = false;
      this.rejectReason = "";
    },

    // 设置
    examineSystem(item) {
      this.radio1 = item.isFirst + "";
      this.radio2 = item.settlementMethod + "";
      this.accountStatus = item.accountStatus + "";
      // 店铺状态
      if (this.accountStatus == 1) {
        this.value = true;
      } else if (this.accountStatus == -1) {
        this.value = false;
      }
      // value
      this.infoId = item.shopInfoId;
      this.systemDialogVisible = true;
      // console.log(item.settlementMethod, 2222222222)
    },
    // 保存店铺设置
    async saveShopDialog() {
      // console.log(this.value, "aaaaaaaaaaaaa");
      // 为true 店铺状态正常
      if (this.value) {
        this.accountStatus = 1;
      } else {
        this.accountStatus = -1;
      }
      const { data: res } = await this.$http.put(`shop/${this.infoId}/set`, {
        isFirst: Number(this.radio1),
        settlementMethod: Number(this.radio2),
        accountStatus: Number(this.accountStatus)
      });

      this.fetchData();
      this.systemDialogVisible = false;
    },
    // 导出
    exportShop() {
      this.$http({
        method: "get",
        url: "shop/export",
        responseType: "blob"
      })
        .then(res => {
          const link = document.createElement("a");
          const blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          });
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);
          const num = Math.ceil(Math.random() * 1000);

          link.setAttribute("download", "用户_" + num + ".xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          this.$Notice.error({
            title: "错误",
            desc: "网络连接错误"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-left {
  width: 100%;
  .el-input {
    width: 200px;
    margin-right: 10px;
  }
}
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
  margin-bottom: 30px;
}
.radioRow div {
  display: inline-block;
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
