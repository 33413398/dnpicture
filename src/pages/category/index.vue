<template>
	<view class="categor">
		<view class="categor-header">
			<view class="tabs-box">
				<u-tabs :list="list" :current="tabsCurrent" @change="tabsChange" :is-scroll="false" bar-width="100"
					active-color="#D13570"></u-tabs>
			</view>
		</view>
		<scroll-view @scrolltolower="scrollDownHandle" enable-flex scroll-y class="categor-list">
			<view class="categor-item" v-for="item in categorList" :key="item.id">
				<image :src="item.img" mode="widthFix"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					limit: 30,
					skip: 0, // 跳过几条
					order: 'new' // “new” 最新 “hot” 热门
				},
				id: '',
				categorList: [],
				// tabs名称
				list: [{
						name: '最新'
					},
					{
						name: '热门'
					}
				],
				// tabs当前选中
				tabsCurrent: 0,
				// 是否还有数据
				isMore: true,
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getList()
		},
		methods: {
			getList() {
				this.request({
					url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
					data: this.params
				}).then(res => {
					if (res.vertical.length == 0) {
						this.isMore = false
						uni.showToast({
							title: '没有更多数据了！',
							none: 'none'
						})
						return;
					}
					this.categorList = [...this.categorList, ...res.vertical]
				})
			},
			tabsChange(index) {
				if (this.tabsCurrent == index) return; // 多次点击只触发一次
				this.tabsCurrent = index;
				this.params.skip = 0
				this.isMore = true
				this.categorList = []
				if (index == 0) {
					this.params.order = 'new'
				} else {
					this.params.order = 'hot'
				}
				this.getList()
			},
			scrollDownHandle() {
				if (!this.isMore) {
					uni.showToast({
						title: '没有更多数据了！',
						none: 'none'
					})
					return;
				}
				this.params.skip += this.params.limit
				this.getList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.categor {
		width: 750rpx;

		.categor-header {
			width: 750rpx;

			.tabs-box {
				width: 40%;
				margin: 0 auto;
			}
		}

		.categor-list {
			height: calc(100vh - 84rpx);
			width: 750rpx;
			display: flex;
			flex-wrap: wrap;

			.categor-item {
				width: calc(750rpx / 3);
				border: 5rpx solid #fff;

				image {
					width: 100%;
				}
			}
		}
	}
</style>
