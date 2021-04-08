<template>
	<view class="album" v-if="isDate">
		<view class="album-bg">
			<image :src="album.cover" mode="aspectFill"></image>
			<view class="album-info">
				<view class="album-name">
					{{album.name}}
				</view>
				<view class="album-btn">
					关注专辑
				</view>
			</view>
		</view>
		<view class="album-author">
			<view class="author-top">
				<view class="author-img">
					<image :src="album.user.avatar" mode=""></image>
				</view>
				<view class="author-name">
					{{album.user.name}}
				</view>
			</view>
			<view class="author-bottom">
				<text>{{album.user.desc}}</text>
			</view>
		</view>
		<!-- <view class="album-list">
			<view class="album-item">
				<image src="" mode=""></image>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
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
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getAlbumList()
		},
		mounted() {},
		updated() {

		},
		methods: {
			/* 
			备用接口
			推荐: http://service.picasso.adesk.com/v3/homepage/vertical
			专辑 http://service.picasso.adesk.com/v1/wallpaper/album
			分类: http://service.picasso.adesk.com/v1/vertical/category
			分类-最新-热门 http://service.picasso.adesk.com/v1/vertical/category/${id}/vertical
			专辑 http://service.picasso.adesk.com/v1/wallpaper/album
			专辑-详情 http://service.picasso.adesk.com/v1/wallpaper/album/${id}/wallpaper
			图片评论 http://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment
			接口文档地址：https://www.showdoc.cc/414855720281749?page_id=3680857125411215
			 */
			getAlbumList() {
				this.request({
					url: `http://service.picasso.adesk.com/v1/wallpaper/album/${this.id}/wallpaper`,
					data: this.prams
				}).then(res => {
					this.album = res.album;
					this.isDate = true
					this.wallpaper = res.wallpaper
					console.log(this.album);
				})
			}
		}
	}
</script>

<style lang="scss">
	.album {
		.album-bg {
			image {}
		}

		.album-info {
			.album-name {}

			.album-btn {}
		}
	}
</style>
