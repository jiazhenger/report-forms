/* ====================================== 全局变量及方法  ====================================== */
import Storage from './store/localStorage'
//import moment from 'moment'
export default {
	c0:'#ee7158',
	c1:'#FF5218',
	searchWidth:'250px',
	// ========================================================================  判断数据类型
	// 判断数据是否是对象 {}
	isObject(obj){ return {}.toString.call(obj) === '[object Object]' },
	// 判断数据是否是对象{}，且对象长度 >0
	hasObject(obj){ return this.isObject(obj) && Object.keys(obj).length > 0 },
	// 判断数据是否是函数 function
	isFunction(obj){ return {}.toString.call(obj) === '[object Function]' },
	// 判断数据是否是数组 []
	isArray(obj){ return {}.toString.call(obj) === '[object Array]' },
	// 判断数据是否是数级 []，且长度>0
	hasArray(obj){ return this.isArray(obj) && obj.length > 0 },
//	// 判断数据是否是字符串
	isString(obj){ return {}.toString.call(obj) === '[object String]' },
	// 判断数据是否是数字
	isNumber(obj){ return {}.toString.call(obj) === '[object Number]' },
//	// 判断数据是否有效
	isEmpty(obj){ return obj === null || obj === undefined || obj === '' },
	isValid(obj){ return !this.isEmpty(obj) || obj === 0 || obj === false },
    // ======================================================================== 阻止默认
    // 阻止冒泡不阻止默认行为
	stop(event){ event.stopPropagation() },
//	// 阻止冒泡并阻止默认行为
//	prevent(event){ event.preventDefault() },
	// ======================================================================== 返回测试数据
//	isTel(v){ return /^1[0-9]{10}$/.test(v) },
//	isPwd(v){ return /\w{6,18}$/.test(v) },
//	pwdReg: /\w{6,18}$/,
//	isId(v){ return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(v) },
//	isCard(v){ return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(v) },
//	isCard(v){ return true},
//	isEmail(v){ return /^([0-9A-Za-z\-_]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(v) },
//	isInt(v){ return /^[1-9]\d*$/.test(v) }, // 整数
	// ======================================================================== redux
	loading(bool,msg){
		let loading = document.querySelector('#ubLoading');
		if(bool){
			loading.querySelector('.ub-loading-msg').innerHTML = msg || '数据加载中'
			loading.style.display = 'block'
		}else{
			loading.style.display = 'none'
		}
	},
	toast(msg,callback){
		let toast = document.querySelector('#ubToast')
		toast.style.display = 'block'
		toast.querySelector('.ub-toast').innerHTML = msg;
		setTimeout(()=>{ toast.style.display = 'none' },1500);
		callback&&callback()
	},
	// ======================================================================== 刷新跳转
	go(path){
		let route = path || '/login';
		let port = window.location.port === 80 ? '' : ':' + window.location.port;
		let url = window.location.protocol + '//' + window.location.hostname + port + window.location.pathname + '#' + route;
//		let url = window.location.protocol + '//' + window.location.hostname + port + route;
		window.location.replace(url);
	},
	// ======================================================================== 本地存储配置
	local(name,data){
		let sname =  name || 'user';
		if(this.isValid(data)){
			Storage.set(sname,data);
		}else {
			let gname = Storage.get(sname);
			return gname;
		}
	},
	remove(name){
		let sname =  name || 'user';
		Storage.remove(sname);
	},
	// ======================================================================== 获取 url 参数
	getQuery(id){
		let hash = window.location.search || window.location.hash
		let stack = {}
		if(hash.indexOf('?') !== -1){
			let search = hash.split('?')
			search = search[1].split('&')
			search.forEach(function(v,i){
				let s = v.split('=')
				if(s[1]!=='undefined' && s[1]!=='null' && s[1]!==''){
					stack[s[0]] = s[1]
				}
			})
		}
		if(id){ return stack[id] }
		return stack
	},
	// 获取地址栏与本地缓存的 token
	getToken(obj){
		let token = this.getQuery('token');
		let user = this.getUser();
		let rs = null
		
		if(token){
			rs = token
		}else if(user.token){
			rs = user.token
		}
		return rs
	},
	// 获取用户信息
	getUser(){
		const user = Storage.get('user');
		if(this.hasObject(user)){
			return user;
		}else{
			return {}
		}
	},
	// 设置浏览器 title
	setTitle(text){ window.document.title = text },
	// ======================================================================== 登录后跳转
	loginTo(flag){
		if(flag){
			let page = this.local('loginToPage');
			if(page){
				return decodeURIComponent(page).replace('#','')
			}else{
				return false
			}
		}else{
			this.local('loginToPage',encodeURIComponent(window.location.hash))
		}
	},
	toNum(v){
		return v ? parseInt(v) : 0
	},
	toBool(p,v){
		return p === v
	}
}