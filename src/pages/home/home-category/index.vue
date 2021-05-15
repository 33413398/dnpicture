<template>
	<view class="home-category">
		<view class="category-list">
			<view class="category-item" v-for="item in categoryList" :key="item.id">
				<navigator :url="`/pages/category/index?id=${item.id}`">
					<image :src="item.cover" mode="aspectFill"></image>
					<text>{{item.name}}</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: []
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: '分类'
			})
			this.getList()
		},
		methods: {
			getList() {
				this.request({
					url: 'http://157.122.54.189:9088/image/v1/vertical/category'
				}).then(res => {
					this.categoryList = res.category
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-category {
		.category-list {
			display: flex;
			flex-wrap: wrap;
			width: 750rpx;

			.category-item {
				position: relative;
				width: calc(750rpx / 3);
				border: 5rpx solid #fff;

				image {
					width: 100%;
					height: 240rpx;
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
	}
</style>
