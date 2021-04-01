<template>
  <view class="home">
	<view class="home-header">
		<view class="tabs-box">
			<u-tabs :list="list" :current="tabsCurrent" @change="tabsChange" :is-scroll="false" bar-width="100" active-color="#D13570"></u-tabs>
		</view>
		<view class="iconfont iconsearch"/>	
	</view>
	<view class="home-content">
		<home-recommend v-if="tabsCurrent===0"></home-recommend>
		<home-category v-if="tabsCurrent===1"></home-category>
		<home-new v-if="tabsCurrent===2"></home-new>
		<home-album v-if="tabsCurrent===3"></home-album>
	</view>
  </view>
</template>

<script>
import homeRecommend from './home-recommend/index.vue'
import homeCategory from './home-category/index.vue'
import homeNew from './home-new/home-new.vue'
import homeAlbum from './home-album/index.vue'
export default {
	components:{
		homeRecommend,
		homeCategory,
		homeNew,
		homeAlbum
	},
	data(){
		return {
			list: [
				{
				name: '推荐'
				}, 
				{
				name: '分类'
				}, 
				{
				name: '最新',
				},
				{
				name: '专辑',
				},
				],
				tabsCurrent: 0
		}
	},
	methods: {
			tabsChange(index) {
				this.tabsCurrent = index;
			}
			},
	onLoad() {
		// this.request({
		// 	url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
		// 	data:{
		// 		limit:10,
		// 		order:'hot',
		// 		skip:0
		// 	}
		// }).then((res)=>{
		// 	console.log(res)
		// })
	}
}
</script>

<style lang="scss">
	.home {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.home-header {
			width: 750rpx;
			.tabs-box {
				width: 60%;
				margin: 0 auto;
			}
			.iconsearch {
				position: absolute;
				right: 35rpx;
				top: 22rpx;
				font-size: 33rpx;
			}
		}
		.home-content {
			flex:1;
		}
	}
</style>
