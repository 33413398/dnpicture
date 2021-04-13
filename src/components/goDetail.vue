<template>
	<view @click="goImgDetailHandle">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			},
			index: {
				type: Number,
				default: -1
			}
		},
		mounted() {

		},
		methods: {
			goImgDetailHandle() {
				getApp().globalData.currentList=this.list
				getApp().globalData.currentIndex=this.index
				uni.navigateTo({
					url: "/pages/imgDetail/index"
				})
			}
		}
	}
</script>

<style>
</style>
