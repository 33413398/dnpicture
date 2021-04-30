<template>
	<view @touchstart="touchStart" @touchend="touchEnd">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				// 开始的横坐标
				startX:0,
				// 开始的纵坐标
				startY:0,
				// 开始的时间
				startTime:0,
				// 结束的横坐标
				endX:0,
				// 结束的纵坐标
				endY:0,
				// 结束的时间
				endTime:0,
				// 滑动方向
				direction: ""
			}
		},
		onLoad() {
		},
		methods:{
			// 手指开始触摸
			touchStart(e) {
				this.startX = e.changedTouches[0].clientX
				this.startY = e.changedTouches[0].clientY
				this.startTime = Date.now()
			},
			// 手指触摸结束
			touchEnd(e){
				this.endX = e.changedTouches[0].clientX
				this.endY = e.changedTouches[0].clientY
				this.endTime = Date.now()
				// 判断方向
				if(this.endTime - this.startTime > 2000){
					// 触摸时间太短，可能误触
					return;
				}
				if(Math.abs(this.endX-this.startX)>10 && Math.abs(this.endY-this.startY)<20){
					this.direction = this.endX-this.startX > 0 ?'right':'left'
				}else {
					return;
				}
				this.$emit('getSlidingDirection',this.direction)
			}
		}
	}
</script>

<style>
</style>
