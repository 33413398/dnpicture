<template>
	<view class="album" v-if="isDate">
		<view class="album-bg">
			<image :src="album.cover" mode="aspectFill"></image>
			<view class="album-info">
				<view class="album-name">
					{{album.name||'数据暂无'}}
				</view>
				<view class="album-btn">
					关注专辑
				</view>
			</view>
		</view>
		<view class="album-author">
			<view class="author-top">
				<view class="author-img">
					<image :src="album.user.avatar" mode="aspectFill" alt="图片暂无"></image>
				</view>
				<view class="author-name">
					{{album.user.name||'数据暂无'}}
				</view>
			</view>
			<view class="author-bottom">
				<text>{{album.desc}}</text>
			</view>
		</view>
		<view class="album-list">
			<view class="album-item" v-for="(item,index) in wallpaper" :key="item.id">
				<go-detail :list="wallpaper" :index="index">
					<image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="aspectFill"></image>
				</go-detail>
			</view>
		</view>
	</view>
</template>

<script>
	import goDetail from '../../components/goDetail.vue'
	export default {
		components: {
			goDetail
		},
		data() {
			return {
				id: -1,
				prams: {
					limit: 30,
					order: 'new',
					skip: 0,
					// “1” 表示第一次请求 “0”表示不是第一次请求
					first: "1",
				},
				// 列表数据
				album: {},
				wallpaper: [],
				// 数据回来再展示防止闪动
				isDate: false,
				// 是否第一次请求
				isFirstRequest: true,
				// 是否有更多数据
				hasMore: true
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getAlbumList()
		},
		mounted() {},
		updated() {

		},
		onReachBottom() {
			if (this.hasMore) {
				this.prams.skip += this.prams.limit
				this.getAlbumList()
			} else {
				uni.showToast({
					title: '没有更多数据了！！',
					icon: 'none'
				})
				return;
			}
		},
		methods: {
			getAlbumList() {
				this.request({
					// url: `http://service.picasso.adesk.com/v1/wallpaper/album/${this.id}/wallpaper`,
					url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
					data: this.prams
				}).then(res => {
					if (this.isFirstRequest) {
						this.album = res.album;
						this.prams.first = 0
						this.isDate = true
						this.isFirstRequest = false
					}
					if (res.wallpaper.length === 0) {
						this.hasMore = false
					}
					this.wallpaper = [...this.wallpaper, ...res.wallpaper]
				})
			},

		}
	}
</script>

<style lang="scss">
	.album {
		.album-bg {
			position: relative;

			image {
			
			}

			.album-info {
				position: absolute;
				left: 0;
				bottom: 0;
				display: flex;
				padding: 10rpx;
				justify-content: space-between;
				align-items: center;
				height: 80rpx;
				width: 100%;
				color: #fff;

				.album-name {
					font-size: 40rpx;
				}

				.album-btn {
					background-color: $color;
					width: 152rpx;
					height: 50rpx;
					display: flex;
					font-size: 24rpx;
					justify-content: center;
					align-items: center;
					border-radius: 10rpx;
				}
			}
		}

		.album-author {
			.author-top {
				padding: 10rpx;
				display: flex;

				.author-img {
					padding: 10rpx 0;
					width: 50rpx;
					image {
						height: 50rpx;
					}
				}

				.author-name {
					padding: 10rpx 0;
					color: #000;
					margin-left: 15rpx;
				}
			}

			.author-bottom {
				color: #7F7F7D;
				font-size: 24rpx;
				padding: 0 10rpx;
			}
		}

		.album-list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 10rpx;

			.album-item {
				width: ceil(750rpx / 3);
				border: 3rpx solid #fff;
			}
		}
	}
</style>
