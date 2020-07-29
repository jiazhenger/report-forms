import Dom from '../public/dom'
import Html from '../public/html'
import _ from '../public/jzer'
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
	const { x, y } = _.mouse.getCoord(e)
	const scrollInfo = _( $scroll ).getInfo()
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
	const dragInfo = _( $drag ).getInfo()
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
		const __drag = _(_this.$drag)
		/* 设置拖动 html 元素的位置 */
		this.setHtmlPosition = e => {
			const { x, y } = _.mouse.getCoord(e)
			if(_this._node){
				_this._node.style({
					left: (x - differ) + 'px',
					top: (y - differ) + 'px'
				})
			}
			dragRange(e,_this,{
				onDrag:({$drag,dragInfo,$scroll,scrollInfo}) => {
					let left = x - (dragInfo.offsetLeft - scrollInfo.scrollLeft) - differ
					let top = y - (dragInfo.offsetTop - scrollInfo.scrollTop ) - differ
					Dom.setMark(_this,'.axesY', left)
					Dom.setMark(_this,'.axesX', top)
					// 显示要添加元素的目标框
					if(_this.prevNode){
						const prevInfo = _this.prevNode.getInfo()
						const isX = x - differ >= prevInfo.offsetLeft && x <= prevInfo.offsetRight
						const isY = y - differ >= prevInfo.offsetTop && y <= prevInfo.offsetBottom
						if( isX && isY ){
							_this.prevNode.addClass('drag-add')
						}else{
							_this.prevNode.removeClass('drag-add')
						}
					}
				},
				onFail:()=>{
					
				}
			})
		}
		/*  鼠标松开时重新定位 html 元素位置 */
		this.setNewPosition = e => {
			const _node = _this._node
			if(!_node) return;
			const { x, y } = _.mouse.getCoord(e)
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
					_node.left(left).top(top)
					_node.find('.point-mark').addClass('mark-show')
					
					// 放置元素到不同的框
					const type = _node.attr('type')
					_this.isLayout = false
					const dropInFixed = (_node, _prev, type) => {
						if(_prev && _prev.hasClass('x-layout')){
							const currentTop = _node.top()
							const currentLeft = _node.left()
							const prevInfo = _prev.getInfo()
							const minusTop = prevInfo.offsetTop - dragInfo.offsetTop      // 放置框距离顶部距离
							const minusLeft = prevInfo.offsetLeft - dragInfo.offsetLeft	 // 放置框距离左侧距离
							const height = _prev.outerHeight()
							const width = _prev.outerWidth()
							const isHeight = currentTop >= minusTop && currentTop < (minusTop + height) // 当前拖动 top > 放置框 top
							const isWidth = currentLeft >= minusLeft && currentLeft < (minusLeft + width)
							
							if(isHeight && isWidth){
								if(['header','footer','main'].includes(type)){
									_node.remove()
									return window.$fn.toast('无法放置')
								}else{
									// _node.appendTo(_prev.find('.drop').el)
									_node.appendTo(_prev.el)
									let newTop = y - (dragInfo.offsetTop - scrollInfo.scrollTop ) - differ - minusTop
									let newLeft = x - (dragInfo.offsetLeft - scrollInfo.scrollLeft ) - differ - minusLeft
									newTop = newTop - (newTop % axesSpace)
									newLeft = newLeft - (newLeft % axesSpace)
									_node.top( newTop ).left( newLeft )
								}
							}else{
								_node.appendTo($drag)
							}
							_this.isLayout = true
						}
					}
					dropInFixed(_node,_this.prevNode,type)
					
					if( type === 'table' ){
						_node.style({ left:0, width: '100%'})
					}else if( type === 'ul' ){
						_node.style({ left:0, width: '100%'})
					}else if( type === 'devider' ){
						_node.style({ left:0, width: '100%', height:'10px'})
						_node.find('.template').html('<div></div>').children(0).cssText('width:100%;height:0; border-top:1px solid #ddd;')
					}else if( type === 'checkbox' ){
						_node.removeStyle('width')
					}else if( type === 'barcode' ){
						_node.style({ width: '200px', height:'auto'})
					}else if( type === 'qrcode' ){
						_node.style({ width: '80px', height:'80px'})
					}else if( type === 'flexbox'){
						_node.height(100)
					}else if( ['header','footer','main'].includes(type) ){
						if(type === 'header'){ 
							_node.style('top',0)
						}else if( type === 'main'){
							_node.style('height','200px')
						}
						if($drag.querySelector('.' + type)){
							let txt = null
							if(type === 'header'){ txt ='页眉' }
							else if(type === 'main') { txt = '主体' }
							else if(type === 'footer') { txt = '页脚' }
							_node.remove()
							return window.$fn.toast( txt + '已存在')
						}
					}
					
					if(['header','footer','main','flexbox'].includes(type)){
						_node.style({left: 0,width: '100%'}).addClass(type).addClass('x-layout')
						.find('.point-mark').removeStyle('background')
							// .html(`<div class='drop' style='width:100%;height:100%;overflow:hidden;position:absolute'></div>`)
					}else{
						_node.addClass('drag-elem')
					}
					
					_node.parent().children('.point-mark').removeClass('mark-show') // 移除父级的 mark
					
					if(!_this.isLayout){
						_node.appendTo($drag)
					}
					
					Dom.setParentBorder(__drag, _node)
					
					_this.setState({hasNode:true, node:_node.el, _node }, ()=>{
						_this.runNode()
					})
				},
				onFail:()=>{
					removeHtml()
					_this._node = null
					_this.node = null
					_this.setState({hasNode:null, node:null, _node:null})
				}
			})
		}
	},
	DragStart(e, _this,type){
		const { x, y } = _.mouse.getCoord(e)
		if(!type) return;
		if(document.querySelector('.move')){
			
		}else{
			_this.prevNode = _this._node
			const node = document.createElement('div')
			const _node = _( node ).attr({ type }).addClass('move').left(x-10).top(y-10).width(50).style({
				position:'absolute',
				zIndex:1
			})
			
			if( Html[type] ){
				_node.html(Html[type]).children(0).addClass('template')
				
				const $temp = node.querySelector('.template')
				const _temp = _( $temp )
				_temp.cssText('width:100%;height:100%;background:#fff;overflow:hidden')
				if(type === 'text'){
					_node.width(100).height(20).lineHeight(20)
				}else if(type === 'img'){
					_node.height(50)
				}else if(type === 'table'){
					_node.attr('group',1)
				}else if(type === 'ul'){
					_node.attr('group',1)
				}else if(type === 'devider'){
					_node.width(50).height(10)
					_( $temp ).removeStyle('background')
				}else if(type === 'checkbox'){
					_node.width(20).height(20).find('img').attr('temp',1)
				}else if(type === 'pages'){
					_node.width(50).height(20).lineHeight(20).style({
						'textAlign':'center',
						'whiteSpace' : 'nowrap'
					})
				}
			}else{
				_node.width(100).height(100)
			}
			
			Dom.createPointMark(_node) // 创建拖动标点
			
			_this._node = _node
			_this.node = node
			
			
			document.body.appendChild(node)
			document.body.addEventListener('mousemove',this.setHtmlPosition)
			document.body.addEventListener('mouseup',this.setNewPosition)
		}
	}
}
