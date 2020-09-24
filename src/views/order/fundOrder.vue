<template>
	<div class="app-container">
		<!-- 导出按钮 -->
		<div class="leading-out">
			<el-button @click="leadingOut">导出</el-button>
		</div>
		<!-- 表格 -->
		<el-table
			v-loading="loading"
			:data="list"
			stripe
			border
			style="width: 100%"
		>
			<el-table-column type="index" width="50" label="序号" />
			<el-table-column prop="shopName" label="商户名称" />
			<el-table-column prop="applyTime" label="提交时间" />
			<el-table-column prop="applyAmount" label="提现金额" width="100" />

			<el-table-column label="提现账户类型" width="100">
				<template slot-scope="scope">
					<span v-if="scope.row.accountType === 1">微信</span>
					<span v-if="scope.row.accountType === 2">支付宝</span>
				</template>
			</el-table-column>
			<el-table-column prop="account" label="提现账户" />
			<el-table-column label="进度" width="120">
				<template slot-scope="scope">
					<span v-if="scope.row.auditState === 0" class="color-black"
						>未处理</span
					>
					<span v-if="scope.row.auditState === 1" class="color-green"
						>通过</span
					>

					<span v-if="scope.row.auditState === 2" class="color-red">拒绝</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<div v-if="scope.row.auditState === 0" class="btns">
						<el-button plain type="success" @click="apply(scope.row)">
							<span>同意</span>
						</el-button>
						<el-button plain type="danger" @click="refuse(scope.row)">
							<span>拒绝</span>
						</el-button>
					</div>
					<div v-if="scope.row.auditState === 1" class="btns">
						<el-button plain type="success" disabled>
							<span>同意</span>
						</el-button>
						<el-button plain type="danger" disabled>
							<span>拒绝</span>
						</el-button>
					</div>
					<div v-if="scope.row.auditState === 2" class="btns">
						<el-button plain type="success" disabled>
							<span>同意</span>
						</el-button>
						<el-button plain type="danger" disabled>
							<span>拒绝</span>
						</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<!-- 弹出框 -->
		<el-dialog
			title="查看大图"
			:visible.sync="centerDialogVisible"
			width="30%"
			center
		/>
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
		Pagination,
	},
	data() {
		return {
			value1: '',
			roleStatus: [],

			centerDialogVisible: false,

			filter: {
				pageNum: 1,
				pageSize: 10,
				orderBy: 'modify_time',
				orderType: 2,
			},
			pages: {
				total: 0,
				page: 1,
				limit: 10,
			},
			list: [],
			loading: false,
			dialogData: {
				visible: false,
				status: 0,
				formData: {},
			},
		}
	},
	computed: {
		...mapGetters([]),
	},
	created() {
		this.fetchData()
	},
	methods: {
		search() {
			this.filter.pageNum = 1
			this.fetchData()
		},
		changeSize(pagination) {
			this.filter.pageNum = pagination.page
			this.filter.pageSize = pagination.limit
			this.fetchData()
		},
		async fetchData() {
			this.loading = true
			const { data: res } = await this.$http.get('profit-apply/list', {
				params: this.filter,
			})
			this.loading = false

			this.list = res.data.records
			this.pages.total = res.data.total
			this.pages.page = res.data.current
			this.pages.limit = res.data.size
			// this.$store
			//   .dispatch('account/list', this.filter)
			//   .then(data => {
			//     // console.log(data)

			//     this.loading = false
			//     this.list = data.records
			//     this.pages.total = data.total
			//     this.pages.page = data.current
			//     this.pages.limit = data.size
			//   })
			//   .catch(() => {
			//     this.loading = false
			//   })
		},
		// 同意
		async apply(item) {
			var readyData = this.$qs.stringify({ auditState: true })
			const { data: res } = await this.$http.patch(
				`profit-apply/${item.id}/approve`,
				readyData
			)
			console.log(res, '通过结果')
			if (res.code !== 0) {
				this.$message.error(res.msg)
				return
			}
			this.fetchData()
		},
		// 拒绝
		async refuse(item) {
			var readyData = this.$qs.stringify({ auditState: false })

			const { data: res } = await this.$http.patch(
				`profit-apply/${item.id}/approve`,
				readyData
			)
			if (res.code !== 0) {
				this.$message.error(res.msg)
				return
			}
			this.fetchData()
		},
		add() {
			this.centerDialogVisible = true
		},
		edit() {
			this.centerDialogVisible = true
		},

		// 关闭
		closeDialog() {
			this.centerDialogVisible = false
			this.value = ''
		},
		// 保存备注
		saveDialog() {
			this.centerDialogVisible = false
			this.value = ''
		},
		// 导出列表
		leadingOut() {
			this.$http({
				method: 'get',
				url: 'profit-apply/export',
				responseType: 'blob',
			})
				.then((res) => {
					console.log(res, 1111111)
					const link = document.createElement('a')
					const blob = new Blob([res.data], {
						type: 'application/vnd.ms-excel',
					})
					link.style.display = 'none'
					link.href = URL.createObjectURL(blob)
					const num = Math.ceil(Math.random() * 1000)

					link.setAttribute('download', '用户_' + num + '.xlsx')
					document.body.appendChild(link)
					link.click()
					document.body.removeChild(link)
				})
				// eslint-disable-next-line handle-callback-err
				.catch((error) => {
					this.$Notice.error({
						title: '错误',
						desc: '网络连接错误',
					})
				})
		},
	},
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
</style>
<style lang="scss">
</style>
