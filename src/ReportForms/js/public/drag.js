import { axesColor, axesActiveColor, axesSpace } from './config'
export default {
	// 获取鼠标信息
	getMouse(e){
		return {
			x: e.pageX || e.x || e.screenX || e.clientX,
			y:  e.pageY || e.y || e.screenY || e.clientY
		}
	},
	//  获取元素各种信息
	getInfo : function(s){	
		const r = s.getBoundingClientRect( )
		const { offsetTop, offsetLeft } = this.getOffset(s)
		return {
			offsetTop		: offsetTop,
			offsetLeft		: offsetLeft,
			offsetRight		: r.right,
			offsetBottom	: r.bottom,
			width 			: r.width,
			height 			: r.height,
			clientWidth 	: s.clientWidth,
			clientHeight 	: s.clientHeight,
			offsetWidth 	: s.offsetWidth,
			offsetHeight 	: s.offsetHeight,
			scrollWidth 	: s.scrollWidth,
			scrollHeight	: s.scrollHeight,
			scrollLeft 		: s.scrollLeft,	
			scrollTop 		: s.scrollTop,	
			posTop 			: s.offsetTop,	
			posLeft 		: s.offsetLeft,
			left			: parseInt(s.style.left),
			top 			: parseInt(s.style.top)
		}
	},
	getPos(s){
		return {
			left : s ? parseInt(s.style.left) : 0,
			top  : s ? parseInt(s.style.top) : 0
		}
	},
	getOffset(e){
		let offsetTop = e.offsetTop
		let offsetLeft = e.offsetLeft 
		let parent = e.offsetParent
		while(parent){
			offsetTop += parent.offsetTop
			offsetLeft += parent.offsetLeft 
			parent = parent.offsetParent
		}
		return { offsetTop, offsetLeft}
	},
	mark(_this, $axes, left) {
		const n = parseInt(left / axesSpace)
		Array.prototype.slice.call(_this.$axes.querySelector($axes).children,0).forEach((v,i)=>{
			if(n === i){
				v.style.background = axesActiveColor
			}else{
				v.style.background = axesColor
			}
		})
	}
}
