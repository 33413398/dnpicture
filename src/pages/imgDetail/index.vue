<template>
	<view class="img-detail">
		<!-- 作者信息区域开始 -->
		<view class="author-info">
			<view class="author-fl">
				<image :src="currentImgInfo.user.avatar" mode="aspectFill"></image>
			</view>
			<view class="author-fr">
				<view class="fr-name">
					{{currentImgInfo.user.name}}
				</view>
				<view class="fr-time">
					{{time}}
				</view>
			</view>
		</view>
		<!-- 作者信息区域end -->
		<!-- 滑动图片区开始 -->
		<view class="swiper-image">
			<image :src="currentImgInfo.thumb" mode="widthFix"></image>
		</view>
		<!-- 滑动图片区end -->
	</view>
</template>

<script>
	import moment from 'moment'
	moment.locale('zh-cn');
	export default {
		data() {
			return {
				currentImgInfo: {},
				// 作者发表距现在时间
				time:''
			}
		},
		onLoad() {
			this.currentImgInfo = getApp().globalData.currentList[getApp().globalData.currentIndex]
			// 由于是秒需要乘以1000 
			this.time = moment(this.currentImgInfo.atime*1000).fromNow()
			console.log(this.currentImgInfo);
		}
	}
</script>

<style lang="scss">
	.img-detail {
		.author-info {
			display: flex;
			padding: 30rpx;
			.author-fl {
				padding: 10rpx;
				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
			}
			.author-fr {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 10rpx;
				.fr-name {
					font-size: 28rpx;
					color: #000;
				}
				.fr-time {
					font-size: 22rpx;
					color: #ccc;
				}
			}
		}
		.swiper-image {
			image {
				width: 750rpx;
			}
		}
	}
</style>
