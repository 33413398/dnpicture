<template>
	<view class="video-play">
		<image :src="videoInfo.img" mode="aspectFill"></image>
		<view class="btn">
			<view :class="['iconfont',mutedFlag?'iconjingyin':'iconshengyin']" @click="mutedFlag=!mutedFlag"></view>
			<view class="iconfont iconzhuanfa">
				<button type="default" open-type='share'></button>
			</view>
		</view>
		<video :muted="mutedFlag" objectFit="fill" :src="videoInfo.video" controls></video>
		<view class="down-btn" @click="downVideo">
			下载高清
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoInfo: {},
				mutedFlag: false
			}
		},
		mounted() {
			this.videoInfo = getApp().globalData.currentVideo
		},
		methods: {
			async downVideo() {
				await uni.showLoading({
					title:'下载中'
				})
				let videoPath = await uni.downloadFile({
					url: this.videoInfo.video
				})
				console.log();
				await uni.saveVideoToPhotosAlbum({
					filePath: videoPath[1].tempFilePath
				})
				 uni.hideLoading()
				 await uni.showToast({
				 	title:'下载完成'
				 })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-play {
		position: relative;

		image {
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			filter: blur(20px)
		}

		.btn {
			display: flex;
			justify-content: flex-end;
			height: 80rpx;

			.iconfont {
				width: 80rpx;
				color: #fff;
				border-radius: 50%;
				font-size: 50rpx;
				background-color: rgba($color: #000000, $alpha: .4);
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 20rpx;
			}

			.iconzhuanfa {
				position: relative;

				button {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
			}
		}

		video {
			display: block;
			width: 400rpx;
			height: 600rpx;
			margin: 0 auto 20rpx;
		}

		.down-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			width: 400rpx;
			height: 80rpx;
			border-radius: 40rpx;
			border: 1rpx solid #fff;
			color: #fff;
			background-color: rgba($color: #000000, $alpha: .8);
		}
	}
</style>
