<template>
	<scroll-view scroll-y @scrolltolower="handleToLower" class="home-recommend" v-if="dateFlag">
		<!-- 推荐区域 -->
		<view class="recommend">
			<navigator :url="`/pages/album/index?id=${item.id}`" class="item" v-for="item in recommendList" :key="item.id">
				<image :src="item.thumb" mode="widthFix"></image>
			</navigator>
		</view>
		<!-- 月份区域 -->
		<view class="month">
			<view class="month-top">
				<view class="month-top-title">
					<text class="dd">{{monthD}}</text>
					<text class="mm"> / {{monthM}}月</text>
					<text class="title">{{monthTitle}}</text>
				</view>
				<view class="month-top-more">
					<text>更多 ></text>
				</view>
			</view>
			<view class="month-content">
				<view class="month-content-item" v-for="item in monthList" :key="item.id">
					<image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!-- 热门区域 -->
		<view class="hot">
			<view class="hot-top">
				<text class="hot-top-line"></text>
				<text class="hot-top-title">热门</text>
			</view>
			<view class="hot-content">
				<view class="hot-content-item" v-for="item in hotList" :key="item.id">
					<image :src="item.thumb" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				// 推荐列表数据
				recommendList: [],
				// 月份列表数据
				monthList: [],
				// 热门列表数据
				hotList: [],
				// 月份标题
				monthTitle: '',
				// 月份月份
				monthM: '',
				// 月份日
				monthD: ',',
				// 请求参数
				prams: {
					limit: 30,
					order: 'hot',
					skip: 0
				},
				// 请求回来才渲染防止空白
				dateFlag: false,
				// 判断还有没有更多分页数据
				hasMore:true
			}
		},
		mounted() {
			uni.setNavigationBarTitle({title:'推荐'})
			this.getList()
		},
		methods: {
			getList() {
				this.request({
					// url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
					url: "http://service.picasso.adesk.com/v3/homepage/vertical",
					data: this.prams
				}).then((res) => {
					if(res.vertical.length===0) {
						// 如果长度为0 表示没有分页数据了
						this.hasMore=false
						return;
					}
					if (this.recommendList.length === 0 || this.monthList.length === 0) {
						this.recommendList = res.homepage[1].items
						this.monthList = res.homepage[2].items
						this.monthTitle = res.homepage[2].title
						this.monthM = moment(res.homepage[2].stime).format('MM')
						this.monthD = moment(res.homepage[2].stime).format('DD')
					}
					this.hotList = [...this.hotList, ...res.vertical]
					this.dateFlag = true
				})
			},
			handleToLower() {
				if(this.hasMore) {
					this.prams.skip = this.prams.limit + this.prams.skip
					this.getList()
				}else {
					// 消息提醒
					uni.showToast({
						title:"宝，没有数据了哦，请不要再下拉了",
						icon:"none" // 有图标加图标，没有得写none否则报错
					})
					// 终止，防止执行下方代码
					return;
				}
			}
		}
	}
</script>

<style lang="scss">
	.home-recommend {
		// 注意空格，否则函数不生效
		height: calc(100vh - 36px);

		.recommend {
			margin-top: 5rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.item {
				width: 50%;
				border: 5rpx solid #fff;

				image {
					width: 100%;
				}
			}
		}

		.month {
			.month-top {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;

				.month-top-title {
					font-weight: 600;

					.dd {
						color: #DD417C;
						font-size: 40rpx;
					}

					.mm {
						color: #DD417C;
					}

					.title {
						color: #858584;
						font-size: 32rpx;
						margin-left: 20rpx;
					}
				}

				.month-top-more {
					color: #767775;
					font-size: 25rpx;
					font-weight: 600;
					line-height: 65rpx;
				}
			}

			.month-content {
				display: flex;
				flex-wrap: wrap;

				.month-content-item {
					width: 33.33%;
					border: 5rpx solid #fff;

					image {
						width: 100%;
					}
				}
			}
		}

		.hot {
			.hot-top {
				padding: 10rpx 0;

				.hot-top-line {
					margin-left: 10rpx;
					border-left: 15rpx solid #B63766;
				}

				.hot-top-title {
					color: #60605F;
					margin-left: 10rpx;
					font-weight: 600;
				}
			}

			.hot-content {
				display: flex;
				flex-wrap: wrap;

				.hot-content-item {
					width: 33.33%;
					border: 5rpx solid #fff;

					image {
						width: 100%;
					}
				}
			}
		}
	}
</style>
