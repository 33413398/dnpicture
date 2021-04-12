<template>
	<scroll-view scroll-y @scrolltolower="handleToLower" class="home-album" v-if="isDateList">
		<swiper indicator-dots autoplay :interval="3000" :duration="1000">
			<swiper-item v-for="item in bannerList" :key="item.id">
				<image :src="item.thumb" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="album">
			<navigator :url="`/pages/album/index?id=${item.id}`" class="album-item" v-for="item in albumList"
				:key="item.id">
				<view class="album-item-img">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
				<view class="album-item-info">
					<view class="info-title">
						<text>{{item.name}}</text>
					</view>
					<view class="info-des">
						<text>{{item.desc}}</text>
					</view>
					<view class="info-btn-box">
						<text class="info-btn">+ 关注</text>
					</view>
				</view>
			</navigator>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				prams: {
					limit: 30,
					order: 'new',
					skip: 0
				},
				bannerList: [],
				albumList: [],
				hasMore: true,
				// 页面是否已有数据
				isDateList: false,
				hasMore: true
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: '专辑'
			})
			this.getAlbumList()
		},
		methods: {
			getAlbumList() {
				this.request({
					// url: 'http://service.picasso.adesk.com/v1/wallpaper/album',
					url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
					data: this.prams
				}).then((res) => {
					if (this.bannerList.length === 0) {
						this.bannerList = res.banner
						this.isDateList = true
					}
					if (res.album.length === 0) {
						this.hasMore = false
					}
					this.albumList = [...this.albumList, ...res.album]

				})
			},
			handleToLower() {
				if (this.hasMore) {
					this.prams.skip += this.prams.limit
					this.getAlbumList()
				} else {
					// 消息提醒
					uni.showToast({
						title: "宝，没有数据了哦，请不要再下拉了",
						icon: "none" // 有图标加图标，没有得写none否则报错
					})
					// 终止，防止执行下方代码
					return;
				}
			}
		}
	}
</script>

<style lang="scss">
	.home-album {
		height: calc(100vh - 36px);

		swiper {
			height: calc(750rpx / 2.3);

			image {
				height: 100%;
			}
		}

		.album {
			padding: 10rpx;

			.album-item {
				display: flex;
				padding: 10rpx 0;
				border-bottom: 2rpx solid #F5F5F4;

				.album-item-img {
					flex: 1;
					padding: 10rpx;

					image {
						height: 200rpx;
						width: 200rpx;
					}
				}

				.album-item-info {
					flex: 2;
					padding: 0 10rpx;
					overflow: hidden;

					.info-title {
						padding: 10rpx 0;
						font-size: 30rpx;
						color: #000;
					}

					.info-des {
						padding: 10rpx 0;
						font-size: 24rpx;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}

					.info-btn-box {
						padding: 10px;
						display: flex;
						justify-content: flex-end;

						.info-btn {
							display: flex;
							justify-content: center;
							align-items: center;
							color: $color;
							border: 1rpx solid $color;
							padding: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
