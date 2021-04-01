<template>
	<view class="home">
		<text>
			home
		</text>
	</view>
</template>

<script>
export default {
	onLoad() {
		this.request({
			url:"http://157.122.54.189:9088/image/v3/homepage/vertical"
		}).then((res)=>{
			console.log(res)
		})
	}
}
</script>

<style>
</style>
