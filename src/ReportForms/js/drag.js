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
	getInfo : function(el){	
		let offsetTop = el.offsetTop
		let offsetLeft = el.offsetLeft
		let offsetEle = el.offsetParent
		while(offsetEle){
			offsetTop += offsetEle.offsetTop
			offsetLeft += offsetEle.offsetLeft
			offsetEle = offsetEle.offsetParent
		}	
		return {
			offsetTop,								// 元素到窗口顶部边缘距离，滚动条不影响
			offsetLeft,								// 元素到窗口左侧边缘距离，滚动条不影响
			width 			: el.clientWidth, 		// 元素宽度
			height 			: el.clientHeight,		// 元素高度
			scrollWidth 	: el.scrollWidth,		// 横向滚动宽度
			scrollHeight	: el.scrollHeight,		// 纵向滚动高度
			scrollLeft 		: el.scrollLeft,		// 横向滚动距离
			scrollTop 		: el.scrollTop,			// 纵向滚动距离
			positionTop 	: offsetTop,			// 向上相对偏移距离
			positionLeft 	: offsetLeft,			// 向左相对偏移距离
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
