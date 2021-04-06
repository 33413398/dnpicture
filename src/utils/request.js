// es6 封装微信请求

export default (params)=>{
	// 加载中
	uni.showLoading({
		title:"加载中"
	})
	return new Promise((resolve,reject)=>{
		wx.request({
			...params,
			success(res) {
				resolve(res.data.res)
			},
			fail(res) {
				reject(res)
			},
			complete(){ // 无论请求成功与否都会触发
				uni.hideLoading()
			}
		})
	})
}