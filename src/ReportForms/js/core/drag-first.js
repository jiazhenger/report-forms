import Drag from '../public/drag'
import Dom from '../public/dom'
import Html from '../public/html'
import _ from '../public/jzer'
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
				_(_this.node).style({
					left: (x - differ) + 'px',
					top: (y - differ) + 'px'
				})
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
			const _node = _(_this.node)
			const { x, y } = Drag.getMouse(e)
			dragRange(e,_this,{
				onDrag:({$drag,dragInfo,$scroll,scrollInfo}) => {
					document.body.removeEventListener('mousemove',this.setHtmlPosition)
					document.body.removeEventListener('mouseup',this.setNewPosition)
					
					_node.addClass('drag',true)
					
					let left = x - (dragInfo.offsetLeft - scrollInfo.scrollLeft) - differ
					let top = y - (dragInfo.offsetTop - scrollInfo.scrollTop ) - differ
					
					// left = left - (left % axesSpace) + 1
					// top = top - (top % (axesSpace/2)) + 1
					left = left - (left % axesSpace)
					top = top - (top % axesSpace)
					_node.left(left).top(top).style('border','1px dashed ' + stopBorderColor)
					// 显示标框
					_( _this.node.querySelector('.point-mark') ).show()
					// 放置元素到不同的框
					const type = _node.attr('type')
					
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
									_node.appendTo($f)
									isFixed = true
									minusTop = f.top
									const top2 = y - (dragInfo.offsetTop - scrollInfo.scrollTop ) - differ - minusTop
									_node.style('top',top2 + 'px')
								}
							}
						}
					}
					dropInFixed($header)
					dropInFixed($main)
					dropInFixed($footer)
					if( type === 'table' ){
						_node.style({ left:0, width: $drag.clientWidth + 'px'})
					}else if( type === 'ul' ){
						_node.style({ left:0, width: $drag.clientWidth + 'px'})
						// _this.node.style.width = '200px'
					}else if( type === 'devider' ){
						_node.style({ left:0, width: $drag.clientWidth + 'px', height:'10px'})
						const devider = _(_this.node).find('.template')
						devider.html('<div></div>')
						_(devider.el.children[0]).cssText('width:100%;height:1px; border-top:1px solid #ddd')
					}else if( type === 'checkbox' ){
						_node.style({ width: '18px', height:'18px'})
					}else if( type === 'barcode' ){
						_node.style({ width: '200px', height:'auto'})
					}else if( type === 'qrcode' ){
						_node.style({ width: '80px', height:'80px'})
					}else if( type === 'header' || type === 'main' || type === 'footer'){
						if(type === 'header'){ 
							_node.style('top',0)
						}else if( type === 'main'){
							_node.style('height','200px')
						}
						_node.style({
							left: 0,
							width: $drag.clientWidth + 'px',
							border: '1px dashed blue'
						}).addClass(type).addClass('x-layout')
						
						if($drag.querySelector('.' + type)){
							let txt = null
							if(type === 'header'){ txt ='页眉' }
							else if(type === 'main') { txt = '主体' }
							else if(type === 'footer') { txt = '页脚' }
							_node.remove()
							return window.$fn.toast( txt + '已存在')
						}
					}
					
					if(!isFixed) {
						_node.appendTo($drag)
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
			const _node = _( node )
			node.setAttribute('type',type)
			_node.attr('type', type).addClass('move').style({
				position:'absolute',
				left: (x-10) + 'px',
				top: (y-10) + 'px',
				width: '50px',
				zIndex:1
			})
			
			if( Html[type] ){
				_node.html(Html[type])
				_(node.children[0]).addClass('template')
				const $temp = node.querySelector('.template')
				const _temp = _( $temp )
				_temp.cssText('width:100%;height:100%;background:#fff;')
				if(type === 'text'){
					_node.style({ width:'100px', height:'20px'})
				}else if(type === 'img'){
					_node.style('height','50px')
				}else if(type === 'table' || type === 'ul'){
					_node.attr('group',1)
				}else if(type === 'devider'){
					_node.style({ width:'50px', height:'10px'})
					_( $temp ).removeStyle('background')
				}else if(type === 'checkbox'){
					_node.style('width','20px')
				}else if(type === 'pages'){
					_node.style({ width:'50px', height:'20px', lineHeight:'20px', textAlign:'center' })
				}
				// 添加通用样式
				if(  ['text','img','qrcode','barcode','ul'].includes(type) ){ _temp.addClass('x-com-style') }
				// 直接绑定数据
				if(  ['text'].includes(type) ){ _temp.addClass('x-bind-text')}
				// 图片绑定数组
				if( ['img','barcode','qrcode'].includes(type) ){ _temp.addClass('x-bind-src')}
				// 循环绑定
				if( ['table','ul','checkbox'].includes(type) ){ _temp.addClass('x-bind-loop')}
			}else{
				_node.style({ width:'99px', height:'99px'}).attr('fixed', 1)
			}
			
			Dom.createPointMark(_node) // 创建拖动标点
			
			_this.node = node
			
			_this.setState({hasNode:true, node, _node })
			
			document.body.appendChild(node)
			document.body.addEventListener('mousemove',this.setHtmlPosition)
			document.body.addEventListener('mouseup',this.setNewPosition)
		}
	}
}
