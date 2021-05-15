<template>
	<scroll-view @scrolltolower="scrollDownHandle" enable-flex scroll-y class="list">
		<view class="item" v-for="item in list" :key="item.id" @click="saveCurrentVideo(item)">
			<image :src="item.img" mode="widthFix"></image>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					limit: 30,
					skip: 0, // 跳过几条
					order: ''
				},
				list: [],
				// 是否还有数据
				isMore: true,
			}
		},
		watch:{
			currentTab(){
				this.params.skip = 0
				this.params.order = this.currentTab.order
				this.list = []
				this.getList()
			}
		},
		props:{
			currentTab:{
				type:Object
			}
		},
		onLoad() {
		},
		mounted() {
			this.params.order = this.currentTab.order 
		},
		methods:{
			getList() {
				this.request({
					url: this.currentTab.url,
					data: this.params
				}).then(res => {
					if (res.videowp.length == 0) {
						this.isMore = false
						uni.showToast({
							title: '没有更多数据了！',
							none: 'none'
						})
						return;
					}
					console.log(res);
					this.list = [...this.list, ...res.videowp]
				})
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
			},
			saveCurrentVideo(data) {
				getApp().globalData.currentVideo = data
				uni.navigateTo({
					url:'/pages/videoPlay/index'
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
			width: calc(750rpx / 3);
			border: 5rpx solid #fff;
			image {
				width: 100%;
			}
		}
	}
</style>
