import Drag from './drag'
import Html from './html'
const { $fn } = window
// 移除缓存元素
const remove = () => {
	const $move = document.querySelector('.move')
	if($move){
		document.body.removeChild($move)
	}
}
// 查找鼠标经过的放置HTML元素的范围
const dragRange = async (e,_this) => {
	const $drag = document.querySelector('#dragContent') 		// HTML元素放置区域
	const $scroll = document.querySelector('#scrollbox') 		// 滚动区域
	const $dragWraper = document.querySelector('#dragWraper')	// 纸张区域
	const { x, y } = Drag.getMouse(e)
	const scrollInfo = Drag.getInfo($scroll)
	const scrollTop = scrollInfo.scrollTop
	const scrollLeft = scrollInfo.scrollLeft
	const scrollWidth = scrollInfo.scrollWidth
	const scrollHeight = scrollInfo.scrollHeight
	const scrollOffestTop = scrollInfo.offsetTop
	const scrollOffestLeft = scrollInfo.offsetLeft
	const scrollClientWidth = scrollInfo.width
	const scrollClientHeight = scrollInfo.height
	const scrollPadding = parseInt($scroll.style.padding)
	const dragPadding = parseInt($dragWraper.style.padding)
	const padding = scrollPadding + dragPadding
	
	if(_this.node){
		_this.node.style.left = (x - 10 ) + 'px'
		_this.node.style.top = (y - 10 ) + 'px'
	}
	// 确定目标元素放置范围
	const { offsetLeft, offsetTop, width, height } = Drag.getInfo($drag)
	const spaceX = scrollWidth - scrollLeft - scrollClientWidth
	const spaceY = scrollHeight - scrollTop - scrollClientHeight
	const rangeXstart =  ( scrollLeft <= padding && x > offsetLeft - scrollLeft ) || ( scrollLeft > padding && x > scrollOffestLeft)
	const rangeXend = 	( scrollClientWidth === scrollWidth && x < offsetLeft + width  ) || 
						(scrollClientWidth < scrollWidth && (
							( spaceX >= dragPadding && x < scrollOffestLeft + scrollClientWidth) || 
							( spaceX < dragPadding && x < scrollOffestLeft + scrollClientWidth - (dragPadding - spaceX))
						))
	const rangeYstart = ( scrollTop <= padding && y > offsetTop - scrollTop  ) || (scrollTop > padding && y>scrollOffestTop)
	const rangeYend = 	( scrollClientHeight === scrollHeight && y < offsetTop + height  ) ||
						(scrollClientHeight < scrollHeight && (
							( spaceY >= padding && y < scrollOffestTop + scrollClientHeight) || 
							( spaceY < padding && y < scrollOffestTop + scrollClientHeight - (padding - spaceY))
						))
	
	if(rangeXstart && rangeXend && rangeYstart && rangeYend){
		await 0
	}
}

export default {
	GlobalListener(_this){
		document.body.addEventListener('mouseup',e=>{
			
		})
		
		document.body.addEventListener('mousemove',e=>{
			dragRange(e,_this).then(data=>{
				console.log(45)
			})
		})
	},
	DragStart(_this, e){
		const { x, y } = Drag.getMouse(e)
		if(document.querySelector('.move')){
			
		}else{
			const node = document.createElement('div')
			node.className = 'move'
			node.style.cssText = `position:absolute;left:${x-10}px;top:${y-10}px;z-index:100;border:1px solid ${$fn.c0};background:#fff`
			node.innerHTML = Html.text
			_this.node = node
			document.body.appendChild(node)
		}
	}
}
