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
			<switch-action @getSlidingDirection="getDirection">
				<image :src="currentImgInfo.thumb" mode="widthFix"></image>
			</switch-action>
		</view>
		<!-- 滑动图片区end -->
		<!-- 点赞和收藏按钮区域开始 -->
		<view class="like-collect-btn">
			<view class="like-btn">
				<text class="iconfont icondianzan"></text>
				<text>{{currentImgInfo.rank}}</text>
			</view>
			<view class="collect-btn">
				<text class="iconfont iconshoucang"></text>
				<text>收藏</text>
			</view>
		</view>
		<!-- 点赞和收藏按钮区域end -->
		<!-- 专辑区域开始  由于后端数据缺失，所以没法制作了-->
		<view class="collection-list" v-if="false">
			<view class="collection-item">
				<view class="collection-item-title">
					相关
				</view>
				<view class="collection-item-content">
					<view class="item-content-img">
						<image src="" mode=""></image>
					</view>
					<view class="item-content-info">
						<view class="content-info-type">
							<text>专辑</text>
						</view>
						<view class="content-info-name">
							<text>{{}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 专辑区域end -->
		<!-- 评论区 热门 开始 -->
		<view class="comment" v-if="!hotList.length==0">
			<view class="comment-title">
				<text class="iconfont iconhot1"></text>
				<text>最热评论</text>
			</view>
			<view class="comment-item" v-for="item in hotList" :key="item.id">
				<view class="item-reviewer">
					<view class="reviewer-info">
						<view class="info-img">
							<image :src="item.reply_user.avatar" mode="widthFix"></image>
						</view>
						<view class="info-name">
							<text class="name">{{item.reply_user.name}}</text>
							<text class="time">{{item.atime}}</text>
						</view>
					</view>
					<view class="reviewer-content">
						<text class="content">{{item.content}}</text>
						<text class="iconfont icondianzan">{{item.size}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论区 热门 end -->
		<!-- 评论区 最新 开始 -->
		<view class="comment" v-if="!commentList.length==0">
			<view class="comment-title">
				<text class="iconfont iconpinglun"></text>
				<text>最新评论</text>
			</view>
			<view class="comment-item" v-for="item in commentList" :key="item.id">
				<view class="item-reviewer">
					<view class="reviewer-info">
						<view class="info-img">
							<image :src="item.reply_user.avatar" mode="widthFix"></image>
						</view>
						<view class="info-name">
							<text class="name">{{item.reply_user.name}}</text>
							<text class="time">{{item.atime}}</text>
						</view>
					</view>
					<view class="reviewer-content">
						<text class="content">{{item.content}}</text>
						<text class="iconfont icondianzan">{{item.size}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论区 最新 end -->
	</view>
</template>

<script>
	import switchAction from '../../components/swiperAction.vue'
	import moment from 'moment'
	moment.locale('zh-cn');
	export default {
		components: {
			switchAction
		},
		data() {
			return {
				currentImgInfo: {},
				// 作者发表距现在时间
				time: '',
				commentList: [],
				hotList: [],
				// 当前的索引
				currentIndex:getApp().globalData.currentIndex
			}
		},
		onLoad() {
			this.getCurrentInfo()
		},
		methods: {
			getImgDetailList(id) {
				this.request({
					url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
				}).then((res => {
					this.commentList = res.comment
					this.commentList.map(item => {
						return item.atime = moment(item.atime * 1000).fromNow()
					})
					this.hotList = res.hot
				}))
			},
			// 图片滑动放向
			getDirection(e) {
				if(this.currentIndex < 0) {
					uni.showToast({
						title:'已经是第一张了',
						icon:'error'
					})
					return;
				}
				if(this.currentIndex > getApp().globalData.currentList.length) {
					uni.showToast({
						title:'已经是最后一张了',
						icon:'error'
					})
					return;
				}
				switch(e){
					case 'right':
					this.currentIndex = this.currentIndex-1;
					this.getCurrentInfo()
					break;
					case 'left':
					this.currentIndex = this.currentIndex+1;
					this.getCurrentInfo()
					break;
				}
			},
			// 获取当前信息
			getCurrentInfo(){
				console.log(this.currentIndex);
				this.currentImgInfo = getApp().globalData.currentList[this.currentIndex]
				// 由于是秒需要乘以1000 
				this.time = moment(this.currentImgInfo.atime * 1000).fromNow()
				this.getImgDetailList(this.currentImgInfo.id)
				// this.getImgDetailList('5a13d879e7bce743777223e4')
			}
		}
	}
</script>

<style lang="scss">
	.img-detail {
		.author-info {
			display: flex;
			padding: 15rpx;

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

		.like-collect-btn {
			display: flex;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #EFEFEE;

			.like-btn {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 20rpx !important;

				.iconfont {
					margin-right: 10rpx !important;
				}
			}

			.collect-btn {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 20rpx !important;
			}
		}

		.comment {
			padding: 10rpx 0;
			border-bottom: 20rpx solid #eee;

			.comment-title {
				padding: 10rpx;
				margin-bottom: 20rpx;
				font-weight: 600;

				.iconpinglun {
					color: #84B4DB;
					margin-right: 10rpx;
					font-size: 38rpx;
					font-weight: 400 !important;
				}

				.iconhot1 {
					color: red;
					margin-right: 10rpx;
				}
			}

			.comment-item {
				border-bottom: 10rpx solid #eee;

				&:last-child {
					border-bottom: none;
				}

				.item-reviewer {
					.reviewer-info {
						display: flex;

						.info-img {
							width: 15%;
							padding: 0 10rpx;
							display: flex;
							justify-content: center;
							align-items: center;

							image {
								width: 70rpx;
								height: 70rpx;
							}
						}

						.info-name {
							display: flex;
							flex-direction: column;
							color: #ADACAD;
						}

					}

					.reviewer-content {
						margin: 20rpx 0;
						margin-left: 15%;
						padding-right: 6%;
						position: relative;

						.content {
							color: #000;
							font-weight: 600;
							font-size: 24rpx;
						}

						.icondianzan {
							position: absolute;
							right: 5rpx;
							top: 0;
							color: #999;
						}
					}
				}
			}
		}
	}
</style>
