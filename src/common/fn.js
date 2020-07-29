/* ====================================== 全局变量及方法  ====================================== */
import Utils from './public/utils'
export default {
	c0:'#ee7158',
	c1:'#FF5218',
	toNum(v){ return !isNaN(parseInt(v)) ? parseInt(v) : 0 },
	toBool(p,v){ return p === v },
	leak(callback){
		let clear
		return time => {
			clearTimeout(clear)
			clear = setTimeout(()=>{
				callback()
			},time || 200)
		}
	},
	...Utils
}