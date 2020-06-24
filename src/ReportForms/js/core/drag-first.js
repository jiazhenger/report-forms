import Drag from '../public/drag'
import Html from '../public/html'
import { differ, axesSpace  } from '../public/config'
// 移除缓存元素
const removeHtml = () => {
	const $move = document.querySelector('.move')
	if($move){
		document.body.removeChild($move)
	}
}
// 查找鼠标经过的放置HTML元素的范围
const dragRange = (e,_this, opt) => {
	const { $drag, $scroll, $paper} = _this
	const { x, y } = Drag.getMouse(e)
	const scrollInfo = Drag.getInfo($scroll)
	const scrollTop = scrollInfo.scrollTop
	const scrollLeft = scrollInfo.scrollLeft
	const scrollWidth = scrollInfo.scrollWidth
	const scrollHeight = scrollInfo.scrollHeight
	const scrollOffestTop = scrollInfo.offsetTop
	const scrollOffestLeft = scrollInfo.offsetLeft
	const scrollClientWidth = scrollInfo.clientWidth
	const scrollClientHeight = scrollInfo.clientHeight
	const scrollPadding = parseInt($scroll.style.padding)
	const dragPadding = parseInt($paper.style.padding)
	const padding = scrollPadding + dragPadding
	// 确定目标元素放置范围
	const dragInfo = Drag.getInfo($drag)
	const { offsetLeft, offsetTop, clientWidth, height } = dragInfo
	
	const spaceX = scrollWidth - scrollLeft - scrollClientWidth
	const spaceY = scrollHeight - scrollTop - scrollClientHeight
	
	const rangeXstart =  ( scrollLeft <= padding && x > offsetLeft - scrollLeft ) || ( scrollLeft > padding && x > scrollOffestLeft)
	const rangeXend = 	( scrollClientWidth === scrollWidth && x < offsetLeft + clientWidth  ) || 
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
			opt.onDrag && opt.onDrag({$drag,dragInfo,$scroll,scrollInfo})
		}else{
			opt.onFail && opt.onFail({$drag,dragInfo,$scroll,scrollInfo})
		}
	})
}
// 拖动 html 元素
export default {
	// 默认执行
	init(_this){
		/* 设置拖动 html 元素的位置 */
		this.setHtmlPosition = e => {
			const { x, y } = Drag.getMouse(e)
			if(_this.node){
				_this.node.style.left = (x - differ) + 'px'
				_this.node.style.top = (y - differ) + 'px'
			}
			dragRange(e,_this,{
				onDrag:({$drag,dragInfo,$scroll,scrollInfo}) => {
					let left = x - (dragInfo.offsetLeft - scrollInfo.scrollLeft) - differ
					let top = y - (dragInfo.offsetTop - scrollInfo.scrollTop ) - differ
					Drag.mark(_this,'.axesY', left)
					Drag.mark(_this,'.axesX', top)
				},
				onFail:()=>{
					
				}
			})
		}
		/*  鼠标松开时重新定位 html 元素位置 */
		this.setNewPosition = e => {
			if(!_this.node) return;
			const { x, y } = Drag.getMouse(e)
			dragRange(e,_this,{
				onDrag:({$drag,dragInfo,$scroll,scrollInfo}) => {
					document.body.removeEventListener('mousemove',this.setHtmlPosition)
					document.body.removeEventListener('mouseup',this.setNewPosition)
					_this.node.className = 'drag'
					
					let left = x - (dragInfo.offsetLeft - scrollInfo.scrollLeft) - differ
					let top = y - (dragInfo.offsetTop - scrollInfo.scrollTop ) - differ
					
					left = left - (left % axesSpace) + 1
					top = top - (top % (axesSpace/2)) + 1
					
					_this.node.style.left = left + 'px'
					_this.node.style.top = top + 'px'
					
					$drag.appendChild(_this.node)
					
					const type = _this.node.getAttribute('type')
					
					if(type === 'table'){
						_this.node.style.left = 0
						_this.node.style.width = '100%'
					}
							
					_this.node.querySelector('.point-mark').style.display = 'block'
				},
				onFail:()=>{
					removeHtml()
					_this.node = null
					_this.setState({hasNode:null, node:null})
				}
			})
		}
	},
	DragStart(e, _this,type){
		const { x, y } = Drag.getMouse(e)
		if(!type) return;
		if(document.querySelector('.move')){
			
		}else{
			const node = document.createElement('div')
			node.className = 'move'
			node.style.cssText = `position:absolute;left:${x-10}px;top:${y-10}px;z-index:0;`
			node.innerHTML = Html[type]
			node.children[0].className = 'template'
			node.setAttribute('type',type)
			
			if(type === 'text'){
				node.style.width = '99px'
				node.style.height = '24px'
			}else if(type === 'img'){
				node.style.width = '99px'
				node.style.height = '99px'
			}else if(type === 'table'){
				node.style.width = '99px'
				node.setAttribute('loop', 1)
			}
			
			// 拖动标点
			const point = document.createElement('span')
			point.className = 'point-mark'
			point.innerHTML = `
				<p class='dir lt-wh'><s></s></p>
				<p class='dir rt-wh'><s></s></p>
				<p class='dir rb-wh'><s></s></p>
				<p class='dir lb-wh'><s></s></p>
				<p class='dir tc-h'><s></s></p>
				<p class='dir rc-w'><s></s></p>
				<p class='dir bc-h'><s></s></p>
				<p class='dir lc-w'><s></s></p>
			`
			node.appendChild(point)
			_this.node = node
			
			_this.setState({hasNode:true, node, type})
			document.body.appendChild(node)
			document.body.addEventListener('mousemove',this.setHtmlPosition)
			document.body.addEventListener('mouseup',this.setNewPosition)
		}
	}
}
