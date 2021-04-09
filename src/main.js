import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import request from './utils/request.js'
Vue.prototype.request = request
Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView);
const app = new Vue({
	...App
})
app.$mount()
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
