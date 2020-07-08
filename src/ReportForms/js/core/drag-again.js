import Drag from '../public/drag'
import Dom from '../public/dom'
import { axesSpace, axesColor, moveBorderColor, stopBorderColor } from '../public/config'
const { $fn } = window

// 清除 mark
const clearMark = node => {
	for(let $mark of node.querySelectorAll('.point-mark')){
		if($mark){ $mark.style.display = 'none' }
	}
}

const dropInFixed = ($drag,node) =>{
	let minusTop = { fixedTop:0, fixedHeight:0, fixedLeft: 0 }
	const $header = Dom.parent(node,'header')
	const $main = Dom.parent(node,'main')
	const $footer = Dom.parent(node,'footer')
	
	const Fixed = $f => {
		if($f){
			const _top = Drag.getPos($f).top
			const f = Drag.getInfo($f)
			const s = f.top + f.clientHeight
			if(_top >= f.top && _top < s){
				minusTop = {
					fixedTop: f.top,
					fixedHeight:f.clientHeight,
					fixedLeft: f.left
				}
			}
		}
	}
	Fixed($header)
	Fixed($main)
	Fixed($footer)
	return minusTop
}

export default {
	// 默认执行
	init(_this){
		const { $drag, $scroll, $control } = _this
		let startX = 0
		let startY = 0
		const findSize = name => Dom.hasClass(this.sizeNode,name)
		// 拖动改变尺寸
		const DragSizeMove = e => {
			const { x, y } = Drag.getMouse(e)
			const { offsetLeft, offsetTop } = Drag.getInfo($drag)
			const { scrollTop, scrollLeft }  = Drag.getInfo($scroll)
			if(_this.dargNode){
				const size = Drag.getInfo(_this.dargNode)
				const sizeOffsetLeft = size.offsetLeft
				const sizeOffsetTop = size.offsetTop
				const sizeWidth = size.width
				const sizeHeight = size.height
				const { left, top } = size
				// 右侧拖宽
				if( findSize('rc-w') || findSize('rt-wh') || findSize('rb-wh')){
					_this.dargNode.style.width = x - sizeOffsetLeft + scrollLeft  + 'px'
				}
				// 左侧拖宽
				if( findSize('lc-w') || findSize('lt-wh') || findSize('lb-wh')){
					const { fixedLeft } = dropInFixed($drag,_this.dargNode)
					const _x = x + scrollLeft
					if(left >= 0){
						_this.dargNode.style.width = sizeOffsetLeft  - _x + sizeWidth  + 'px'
						_this.dargNode.style.left = _x - fixedLeft - offsetLeft + 'px'
					}
				}
				// 底部拖高
				if( findSize('rb-wh') || findSize('lb-wh') || findSize('bc-h')){
					_this.dargNode.style.height = y - sizeOffsetTop + scrollTop + 'px' 
				}
				// 顶部拖高
				if( findSize('tc-h') || findSize('rt-wh') || findSize('lt-wh')){
					const { fixedTop } = dropInFixed($drag,_this.dargNode)
					const _y = y + scrollTop
					if(top >= 0){
						_this.dargNode.style.height = sizeOffsetTop - _y  + sizeHeight  + 'px'
						_this.dargNode.style.top = _y - fixedTop - offsetTop + 'px'
					}
				}
			}
		} 
		// 拖动中
		const DragMove = e => {
			const { x, y } = Drag.getMouse(e)
			const { offsetLeft, offsetTop, width, height } = Drag.getInfo($drag)
			const targetInfo = Drag.getInfo(_this.node)
			const targetWidth = targetInfo.width
			const targetHeight = targetInfo.height
			if(_this.node){
				const left = x - offsetLeft - startX
				const top = y - offsetTop  - startY
				const { fixedTop, fixedHeight } = dropInFixed($drag,_this.node)
				const top2 = top - fixedTop
				
				if(left >= 0 && left <= width - targetWidth ){
					_this.node.style.left = left + 'px'
				}
				
				if(top2 >= 0  && top2 <= (fixedHeight ? fixedHeight : height) - targetHeight){
					_this.node.style.top = top2 + 'px'
				}
				
				const $mark = _this.node.querySelector('.point-mark')
				if($mark){ $mark.style.display = 'none' }
				_this.node.style.border = 0
				_this.node.style.border = '1px solid ' + moveBorderColor
				
				Drag.mark(_this,'.axesY', left)
				Drag.mark(_this,'.axesX', top)
			}
		}
		// 开始拖动
		$drag.addEventListener('mousedown',e => {
			if(_this.stop) return
			const { target } = e
			const { x, y } = Drag.getMouse(e)
			const t = Dom.parents(target,'drag')
			// 获取拖动尺寸的元素
			const name = target.className
			if( name.indexOf('dir') >= 0 ){
				_this.dargNode = t
				this.sizeNode = target
				return $drag.addEventListener('mousemove',DragSizeMove)
			}
			
			if(t){
				// t.style.cursor = 'default'
				_this.node = t
				_this.setState({hasNode:true,node:t})
				const targetInfo = Drag.getInfo(t)
				const targetOffsetLeft = targetInfo.offsetLeft
				const targetOffsetTop = targetInfo.offsetTop
				startX = x - targetOffsetLeft
				startY = y - targetOffsetTop
				$drag.addEventListener('mousemove',DragMove)
			}
		})
		// 结束拖动
		$drag.addEventListener('mouseup',e=>{
			const { target } = e
			const t = Dom.parents(target,'drag')
			// 获取拖动尺寸的元素
			if( _this.dargNode ){
				const { left, top, width, height } = Drag.getInfo(_this.dargNode)
				const fixed = _this.dargNode.getAttribute('fixed')
				const ax = fixed ? 0 : axesSpace
				// const ax = axesSpace
				// 右侧拖宽
				if( findSize('rc-w') || findSize('rt-wh') || findSize('rb-wh')){
					_this.dargNode.style.width = width - (width%axesSpace) + (width%axesSpace>0 ? axesSpace : 0) + 'px'
				}
				// 左侧拖宽
				if( findSize('lc-w') || findSize('lt-wh') || findSize('lb-wh')){
					_this.dargNode.style.width = width - (width%axesSpace) + (width%axesSpace>0 ? axesSpace : 0) + 'px'
					_this.dargNode.style.left = left -  left % axesSpace + 'px'
				}
				// 底部拖高
				if( findSize('rb-wh') || findSize('lb-wh') || findSize('bc-h')){
					_this.dargNode.style.height = height - (height%ax) + (height%ax>0 ? ax : 0) + 'px'
				}
				// 顶部拖高
				if( findSize('tc-h') || findSize('rt-wh') || findSize('lt-wh')){
					_this.dargNode.style.height = height - (height % ax) + (height%ax >0 ? ax : 0) + 'px'
					_this.dargNode.style.top = top -  top % ax + 'px'
				}
				return false
			}
			if(t && _this.node){
				const { left, top } = Drag.getPos(_this.node)
				const type = _this.node.getAttribute('type')
				if(type === 'devider'){
					_this.node.style.left = left + 'px'
					_this.node.style.top = top + 'px'
				}else{
					_this.node.style.left = left - (left % axesSpace) + 'px'
					_this.node.style.top = top  - (top % axesSpace) + 'px'
				}
				
				// _this.node.style.borderColor = '#fff'
				
				const $mark = _this.node.querySelector('.point-mark')
				if($mark){ $mark.style.display = 'block' }
			}
		})
		// 单击
		$drag.addEventListener('click',e=>{
			const { target } = e
			const t = Dom.parents(target,'drag')
			const t2 = Dom.parents(target,'loopNode')
			e.stopPropagation()
			if(t){
				Dom.createPointMark(t) // 拖动标点
				Array.prototype.slice.call($drag.querySelectorAll('.drag'),0).forEach(v => {
					clearMark(v) // 清除 mark
					// 给固定布局加不同颜色
					if(v.getAttribute('fixed')){
						v.style.border = '1px dashed blue'
					}else{
						v.style.border = '1px dashed ' + stopBorderColor
					}
				})
				
				if(Dom.hasMark(t)){
					// const $mark = t.querySelector('.point-mark')
					const $mark = Dom.children(t,'point-mark')
					if($mark){ 
						$mark.style.display = 'block'
						if(t.getAttribute('fixed')){
							$mark.style.zIndex = '0'
							$mark.style.removeProperty('background')
						}
					}
				}
				
				// t.style.borderColor = '#fff'
				if(Dom.hasClass(t,'hide')){
					const nodes = document.querySelectorAll('.loopNode')
					if(nodes.length > 0){
						if(t2){
							Dom.removeClass(nodes,'activeLoop') // 移除背景
							t2.className += ' activeLoop'  // 添加背景
							_this.setState({ node:t2, key: _this.state.key+1 }, ()=>{
								_this.runNode()
							})
						}else{
							Dom.removeClass(nodes,'activeLoop') // 移除背景
						}
					}
				}else{
					_this.setState({ node:t, key: _this.state.key+1 },()=>{
						_this.runNode()
					})
				}
			}else{
				const nodes = document.querySelectorAll('.loopNode')
				if(nodes.length > 0){
					Dom.removeClass(nodes,'activeLoop') // 移除背景
				}
			}
		})
		// 双击
		$drag.addEventListener('dblclick',e=>{
			const { target } = e
			const t = Dom.parents(target,'drag')
			
			if(t){
				_this.stop = true
				Dom.addClass(t,'hide')
				let $editor = t.querySelector('.template')
				let type = t.getAttribute('type')
				
				if(type !== 'text'){
					$editor = target
					type =  $editor.getAttribute('type')
				}
				
				if(type === 'text'){
					$editor.contentEditable = true
					$editor.focus()
					$editor.onblur = function(){
						this.contentEditable = false
					}
					$editor.onfocus = function(){
						
					}
				}else if(type === 'table'){
					Dom.addClass(t,'hide')
				}
			}
		})
		document.body.addEventListener('click',e=>{
			Array.prototype.slice.call($drag.querySelectorAll('.drag'),0).forEach(v => {
				// v.setAttribute('contenteditable', false)
			})
		})
		// 停止拖动处理
		document.body.addEventListener('mouseup',e=>{
			const { target } = e
			let t = Dom.parents(target,'drag')
			let m = Dom.parents(target,'move')
			if( _this.dargNode ){
				// const $pointMark = _this.dargNode.querySelector('.point-mark')
				// if($pointMark){ $pointMark.style.display = 'block' }
			}else{
				if(t){
					Array.prototype.slice.call($drag.querySelectorAll('.drag'),0).forEach(v => {
						
					})
				}else{
					_this.stop = false
					Array.prototype.slice.call($drag.querySelectorAll('.drag')).forEach(v => {
						Dom.removeClass(v,'hide')
						clearMark(v) // 清除 mark
					})
				}
			}
			
			// 获取样式
			if(t || m){
				const d = t || m
				const t2 = Dom.parents(target,'loopNode')
				const $temp = t2 ? t2 : d.querySelector('.template')
				const $img = $temp ? $temp.querySelector('img') : null
				
				$fn.leak(()=>{
					_this.setState({
						// index: _this.state.index + 1,
						dragStyle: d.style,
						tempStyle: $temp ? $temp.style : {},
						tempAttr:{
							src: $img ? $img.src : ''
						}
					})
				})()
			}else{
				// 清除选中 node
				let drag = $drag.querySelectorAll('.drag')
				let hasDrag = false
				if(drag){
					hasDrag = [].slice.call(drag).some(v => v.style.display === 'block')
				}
				
				if(!hasDrag){
					$fn.leak(()=>{
						_this.setState({
							dragStyle:{},
							tempStyle:{},
							tempAttr:{},
							node:null,
							key: _this.state.key - 1
						})
						_this.cancelNode()
					})()
				}
			}
			
			// 清除标线
			const $axes = _this.$axes.querySelectorAll('i')
			Array.prototype.slice.call($axes).forEach((v,i)=>{
				v.style.background = axesColor
			})
			
			$drag.removeEventListener('mousemove',DragMove)
			$drag.removeEventListener('mousemove',DragSizeMove)
			this.sizeNode = null
			_this.dargNode = null
		})
		// 阻止控制面板冒泡
		$control.addEventListener('mouseup',e => e.stopPropagation() )
		$control.addEventListener('keyup',e => e.stopPropagation() )
	}
}
