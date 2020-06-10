import { axesColor, axesActiveColor } from './config'
/**
 * 拖动元素
 * 
 */
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
		return {
			offsetTop		: r.top,
			offsetLeft		: r.left,
			offsetRight		: r.right,
			offsetBottom	: r.bottom,
			width 			: r.width,
			height 			: r.height,
			scrollWidth 	: s.scrollWidth,
			scrollHeight	: s.scrollHeight,
			scrollLeft 		: s.scrollLeft,	
			scrollTop 		: s.scrollTop,	
			posTop 			: s.offsetTop,	
			posLeft 		: s.offsetLeft,	
		}
	},
	mark(_this, $axes, left) {
		const n = parseInt(left / 20)
		Array.prototype.slice.call(_this.$axes.querySelector($axes).children,0).forEach((v,i)=>{
			if(n === i){
				v.style.background = axesActiveColor
			}else{
				v.style.background = axesColor
			}
		})
	}
}
