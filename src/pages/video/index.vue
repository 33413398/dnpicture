<template>
	<view class="video">
		<view class="video-header">
			<view class="tabs-box">
				<u-tabs :list="list" :current="tabsCurrent" @change="tabsChange" :is-scroll="false" bar-width="100"
					active-color="#D13570"></u-tabs>
			</view>
		</view>
		<!-- 列表区域 -->
		<view class="bottom">
			<video-tab v-if="tabsCurrent<4" :currentTab="currentTab"></video-tab>
			<video-category v-if="tabsCurrent==4" :currentTab="currentTab"/>
			</video-category>
		</view>
	</view>
</template>

<script>
	import videoTab from '../videoTab/index.vue'
	import videoCategory from '../videoCategory/index.vue'
	export default {
		components: {
			videoTab,
			videoCategory,
		},
		data() {
			return {
				// tabs名称
				list: [{
						name: '推荐'
					},
					{
						name: '娱乐'
					},
					{
						name: '最新'
					},
					{
						name: '热门'
					},
					// {
					// 	name: '分类'
					// }
				],
				// tabs当前选中
				tabsCurrent: 0,
				// 选中的传递参数
				currentTab: {}
			}
		},
		onLoad() {
			this.currentTab = {
				url: 'http://157.122.54.189:9088/videoimg/v1/videowp/featured',
				order: 'hot'
			}
		},
		methods: {
			tabsChange(index) {
				console.log(index);
				if (this.tabsCurrent == index) return; // 多次点击只触发一次
				this.tabsCurrent = index;
				switch (index) {
					case 0:
						this.currentTab = {
							url: 'http://157.122.54.189:9088/videoimg/v1/videowp/featured',
							order: 'hot'
						}
						break;
					case 1:
						this.currentTab = {
							url: 'http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a',
							order: 'new'
						}
						break;
					case 2:
						this.currentTab = {
							url: 'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',
							order: 'new'
						}
						break;
					case 3:
						this.currentTab = {
							url: 'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',
							order: 'hot'
						}
						break;
					case 4:
						this.currentTab = {
							url: 'http://157.122.54.189:9088/videoimg/v1/videowp/category',
						}
						break;
					default:
						console.log('暂无该菜单');
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video {
		width: 750rpx;
		display: flex;
		flex-direction: column;

		.video-header {
			width: 750rpx;

			.tabs-box {
				width: 60%;
				margin: 0 auto;
			}
		}

		.bottom {
			flex: 1;
		}
	}
</style>
