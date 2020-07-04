import Drag from '../public/drag'
import Dom from '../public/dom'
import Html from '../public/html'
import { differ, axesSpace, stopBorderColor  } from '../public/config'
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
					_this.node.style.outline = '1px dashed ' + stopBorderColor
					_this.node.querySelector('.point-mark').style.display = 'block'
					// 放置元素到不同的框
					const type = _this.node.getAttribute('type')
					let minusTop = 0
					let isFixed = false
					const $header = $drag.querySelector('.header')
					const $main = $drag.querySelector('.main')
					const $footer = $drag.querySelector('.footer')
					
					const _top = Drag.getPos(_this.node).top
					const dropInFixed = $f => {
						if($f){
							const f = Drag.getInfo($f)
							const s = f.top + f.clientHeight
							if(_top >= f.top && _top < s){
								if(type === 'header' || type === 'main' || type === 'footer'){
									_this.node.remove()
									isFixed = true
									return window.$fn.toast('无法放置')
								}else{
									$f.appendChild(_this.node)
									isFixed = true
									minusTop = f.top
									const top2 = y - (dragInfo.offsetTop - scrollInfo.scrollTop ) - differ - minusTop
									_this.node.style.top = top2 + 'px'
								}
							}
						}
					}
					dropInFixed($header)
					dropInFixed($main)
					dropInFixed($footer)
					
					if( type === 'table' ){
						_this.node.style.left = 0
						_this.node.style.width = '100%'
					}else if( type === 'ul' ){
						_this.node.style.left = 0
						_this.node.style.width = '100%'
						// _this.node.style.width = '200px'
					}else if( type === 'devider' ){
						_this.node.style.left = 0
						_this.node.style.width = '100%'
						const devider = _this.node.querySelector('.template')
						devider.innerHTML = '<div></div>'
						devider.children[0].style.cssText = 'width:100%;height:1px; border-top:1px solid #ddd'
						_this.node.style.height = 'auto'
					}else if( type === 'checkbox' ){
						_this.node.style.height = '20px'
					}else if( type === 'header' || type === 'main' || type === 'footer'){
						_this.node.style.left = 0
						_this.node.style.width = '100%'
						_this.node.style.outline = '1px dashed blue'
						Dom.addClass(_this.node, type)
						
						if($drag.querySelector('.' + type)){
							let txt = null
							if(type === 'header'){ txt ='页眉' }
							else if(type === 'main') { txt = '主体' }
							else if(type === 'footer') { txt = '页脚' }
							_this.node.remove()
							return window.$fn.toast( txt + '已存在')
						}
					}
					
					if(!isFixed) {
						$drag.appendChild(_this.node)
					}
					
					_this.runNode()
					
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
			node.setAttribute('type',type)
			node.className = 'move'
			node.style.cssText = `position:absolute;left:${x-10}px;top:${y-10}px;z-index:1;`
			if( Html[type] ){
				node.innerHTML = Html[type]
				node.children[0].className += ' template'
				const $temp = node.querySelector('.template')
				$temp.style.cssText = 'width:100%;height:100%;background:#fff;overflow:hidden;'
				node.style.width = '99px'
				if(type === 'text'){
					node.style.height = '24px'
				}else if(type === 'img'){
					node.style.height = '99px'
				}else if(type === 'table'){
					node.setAttribute('group', 1)
				}else if(type === 'ul'){
					node.setAttribute('group', 1)
				}else if(type === 'devider'){
					node.style.height = '99px'
					$temp.style.removeProperty('background')
				}else if(type === 'checkbox'){
					node.style.width = '20px'
				}
			}else{
				node.style.width = '99px'
				node.style.height = '99px'
				node.setAttribute('fixed',1)
			}
			
			Dom.createPointMark(node) // 拖动标点
			
			_this.node = node
			
			_this.setState({hasNode:true, node, type})
			
			document.body.appendChild(node)
			document.body.addEventListener('mousemove',this.setHtmlPosition)
			document.body.addEventListener('mouseup',this.setNewPosition)
		}
	}
}
