<template>
	<view class="list">
		<view class="item" v-for="item in list" :key="item.id">
			<image :src="item.img" mode="widthFix"></image>
			<text>{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				// 是否还有数据
				isMore: true,
			}
		},
		props: {
			currentTab: {
				type: Object
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList() {
				this.request({
					url: this.currentTab.url,
				}).then(res => {
					if (res.videowp.length == 0) {
						this.isMore = false
						uni.showToast({
							title: '没有更多数据了！',
							none: 'none'
						})
						return;
					}
					this.list = [...this.list, ...res.videowp]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		height: calc(100vh - 84rpx);
		width: 750rpx;
		display: flex;
		flex-wrap: wrap;

		.item {
			position: relative;
			width: calc(750rpx / 2);
			border: 5rpx solid #fff;

			image {
				width: 100%;
			}

			text {
				position: absolute;
				bottom: 0;
				left: 10rpx;
				color: #fff;
				font-size: 30rpx;
			}
		}
	}
</style>
