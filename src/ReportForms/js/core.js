import Drag from './drag'
import Axes from './axes'
import Html from './html'
const { $fn } = window
// config
const differXY = 10 		// 鼠标在拖动元素的位置
const space = 20			// 坐标间隔
// 移除缓存元素
const removeHtml = () => {
	const $move = document.querySelector('.move')
	if($move){
		document.body.removeChild($move)
	}
}
// 查找鼠标经过的放置HTML元素的范围
const dragRange = (e,_this) => {
	const $drag = document.querySelector('#dragContent') 		// HTML元素放置区域
	const $scroll = document.querySelector('#scrollbox') 		// 滚动区域
	const $paper = document.querySelector('#paper')	// 纸张区域
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
	const dragPadding = parseInt($paper.style.padding)
	const padding = scrollPadding + dragPadding
	
	// 确定目标元素放置范围
	const dragInfo = Drag.getInfo($drag)
	const { offsetLeft, offsetTop, width, height } = dragInfo
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
	return new Promise( resolve =>{
		if(rangeXstart && rangeXend && rangeYstart && rangeYend){
			resolve({$drag,dragInfo,$scroll,scrollInfo})
		}else{
			removeHtml()
			_this.node = null
		}
	})
}
// 拖动 html 元素
export default {
	// 默认执行
	GlobalListener(_this){
		/* 初始化坐标 */
		Axes(space)
		/* 设置拖动 html 元素的位置 */
		this.setHtmlPosition = e => {
			const { x, y } = Drag.getMouse(e)
			if(_this.node){
				_this.node.style.left = (x - differXY ) + 'px'
				_this.node.style.top = (y - differXY ) + 'px'
			}
		}
		/*  鼠标松开时重新定位 html 元素位置 */
		this.setNewPosition = e => {
			if(!_this.node) return;
			const { x, y } = Drag.getMouse(e)
			dragRange(e,_this).then( ({$drag,dragInfo,$scroll,scrollInfo}) =>{
				document.body.removeEventListener('mousemove',this.setHtmlPosition)
				document.body.removeEventListener('mouseup',this.setNewPosition)
				_this.node.className = 'drag'
				
				let left = x - (dragInfo.offsetLeft - scrollInfo.scrollLeft) - differXY
				let top = y - (dragInfo.offsetTop - scrollInfo.scrollTop ) - differXY
				
				left = left - (left % space) + 1
				top = top - (top % space) + 1
				
				_this.node.style.left = left + 'px'
				_this.node.style.top = top + 'px'
				$drag.appendChild(_this.node)
			})
		}
	},
	// 开始拖动
	DragStart(e,_this){
		const { x, y } = Drag.getMouse(e)
		if(document.querySelector('.move')){
			
		}else{
			const node = document.createElement('div')
			node.className = 'move'
			node.style.cssText = `position:absolute;left:${x-10}px;top:${y-10}px;z-index:100;border:1px solid ${$fn.c0};background:#fff`
			node.innerHTML = Html.text
			_this.node = node
			document.body.appendChild(node)
			document.body.addEventListener('mousemove',this.setHtmlPosition)
			document.body.addEventListener('mouseup',this.setNewPosition)
		}
	}
}
