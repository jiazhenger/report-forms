import Dom from '../public/dom'
import _ from '../public/jzer'
import { axesSpace, axesColor, moveBorderColor, stopBorderColor } from '../public/config'
const { $fn } = window

// 清除 mark
const clearMark = _node => {
	_node.finds('.point-mark').each(v=>{
		v.hide()
	})
}

export default {
	// 默认执行
	init(_this){
		const { $drag, $scroll, $control } = _this
		const __drag = _($drag)
		let startX = 0
		let startY = 0
		const findSize = name => _(this.sizeNode).hasClass(name)
		// 拖动改变尺寸
		const DragSizeMove = e => {
			const { x, y } = _.mouse.getCoord(e)
			const { scrollTop, scrollLeft }  = _( $scroll ).getInfo()
			if(_this.dragNode){
				const _drag = _(_this.dragNode)
				const { offsetLeft, offsetTop } = _drag.parent('.drag').getInfo()
				const size = _drag.getInfo()
				const sizeOffsetLeft = size.offsetLeft
				const sizeOffsetTop = size.offsetTop
				const sizeWidth = size.width
				const sizeHeight = size.height
				const { left, top } = size
				// 右侧拖宽
				if( findSize('rc-w') || findSize('rt-wh') || findSize('rb-wh')){
					_drag.width(x - sizeOffsetLeft + scrollLeft)
				}
				// 左侧拖宽
				if( findSize('lc-w') || findSize('lt-wh') || findSize('lb-wh')){
					const _x = x + scrollLeft
					if(left >= 0){
						_drag.width(sizeOffsetLeft  - _x + sizeWidth).left(_x - offsetLeft )
					}
				}
				// 底部拖高
				if( findSize('rb-wh') || findSize('lb-wh') || findSize('bc-h')){
					_drag.height(y - sizeOffsetTop + scrollTop)
				}
				// 顶部拖高
				if( findSize('tc-h') || findSize('rt-wh') || findSize('lt-wh')){
					const _y = y + scrollTop
					if(top >= 0){
						_drag.height(sizeOffsetTop - _y  + sizeHeight).top(_y - offsetTop )
					}
				}
			}
		}
		// 拖动中
		const DragMove = e => {
			const { x, y } = _.mouse.getCoord(e)
			const _node = _this._node
			const { offsetLeft, offsetTop, width, offsetWidth, offsetHeight, height } = _node.parent('.drag').getInfo()
			const targetInfo = _node.getInfo()
			const targetWidth = targetInfo.offsetWidth
			const targetHeight = targetInfo.offsetHeight
			// const parentInfo = _node.parent('.drag').getInfo()  // 获取父级偏移
			if(_node.el){
				// const left = x - offsetLeft - startX
				// const top = y - offsetTop  - startY
				const left = x - startX - offsetLeft
				const top = y - startY - offsetTop
				const fixedHeight = _node.outerHeight()
				
				if(left >= 0 && left <= offsetWidth - targetWidth){ _node.left(left) }
				
				if(top >= 0  && top <= offsetHeight - targetHeight){ _node.top(top) }
				
				_node.find('.point-mark').hide()
				_node.style('border', 0)
				_node.style('border', '1px solid ' + moveBorderColor)
				
				Dom.setMark(_this,'.axesY', left)
				Dom.setMark(_this,'.axesX', top)
			}
		}
		// 开始拖动
		$drag.addEventListener('mousedown',e => {
			e.stopPropagation()
			if(_this.stop) return
			const { target } = e
			const { x, y } = _.mouse.getCoord(e)
			const _t = _( target ).parents('.drag')
			const t = _t.el
			if(t && _t.attr('id')) return;
			if(t){
				const lock = Boolean(+_t.attr('lock'))
				if(lock) return
			}
			// 获取拖动尺寸的元素
			const name = target.className
			if( name.indexOf('dir') >= 0 ){
				_this.dragNode = t
				this.sizeNode = target
				return $drag.addEventListener('mousemove',DragSizeMove)
			}
			
			if(t){
				_this.node = t
				_this._node = _t
				_this.setState({hasNode:true,node:t, _node: _t, target})
				if(_t.style('position') !== 'absolute'){
					_t.style('position','absolute')
					_this.isRel = true
				}
				_this.zIndex = _t.getStyle(true).zIndex
				_this._node.style('zIndex',10)
				const targetInfo = _t.getInfo()
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
			const _t = _( target ).parents('.drag')
			const t = _t.el
			// 获取拖动尺寸的元素
			if( _this.dragNode ){
				const _drag = _( _this.dragNode )
				const { left, top, width, height } = _drag.getInfo()
				const fixed = _drag.attr('fixed')
				const ax = fixed ? 0 : axesSpace
				// const ax = axesSpace
				// 右侧拖宽
				if( findSize('rc-w') || findSize('rt-wh') || findSize('rb-wh')){
					_drag.width( width - (width%axesSpace) + (width%axesSpace>0 ? axesSpace : 0) )
				}
				// 左侧拖宽
				if( findSize('lc-w') || findSize('lt-wh') || findSize('lb-wh')){
					_drag.width( width - (width%axesSpace) + (width%axesSpace>0 ? axesSpace : 0) ).left( left -  left % axesSpace )
				}
				// 底部拖高
				if( findSize('rb-wh') || findSize('lb-wh') || findSize('bc-h')){
					_drag.height( height - (height%ax) + (height%ax>0 ? ax : 0) )
				}
				// 顶部拖高
				if( findSize('tc-h') || findSize('rt-wh') || findSize('lt-wh')){
					_drag.height( height - (height % ax) + (height%ax >0 ? ax : 0) ).top( top -  top % ax )
				}
				return false
			}
			if(t && _this._node){
				const _node = _this._node
				const { left, top } = _node.getPos()
				if(_this.isRel){
					_this.isRel = false
					_node.style('position','relative').removeStyle('left,top')
				}else{
					if(_node.attr('type') === 'devider'){
						_node.left(left).top(top)
					}else{
						_node.left( left - (left % axesSpace) ).top( top - (top % axesSpace) )
					}
				}
				
				_node.style('zIndex', _this.zIndex || 0)
				
				_node.find('.point-mark').removeStyle('border').show()
			}
		})
		// 停止拖动处理
		document.body.addEventListener('mouseup',e=>{
			const { target } = e
			const _t = _( target ).parents('.drag')
			const t = _t.el
			const _m = _( target ).parents('.move')
			const m = _m.el
			
			const isRun = _t.el && !_t.attr('id')
			
			if( _this.dragNode ){
				
			}else{
				if(isRun){
					
				}else{
					_this.stop = false
					__drag.finds('.drag').each(_v => {
						_v.removeClass('hide')
						clearMark(_v) // 清除 mark
					})
				}
			}
			
			// 获取样式
			if((isRun || m)){
				
			}else{
				// 清除选中 node
				const _drag = __drag.finds('.drag')
				let hasDrag = false
				if(_drag.length() > 0){
					hasDrag = [].slice.call(_drag.el).some(v => v.style.display === 'block')
				}
				
				if(!hasDrag){
					$fn.leak(()=>{
						_this.setState({ node:null, _node:null, target:null }, ()=>{
							_this.cancelNode()
						})
					})()
				}
				
				// 清除循环绑定背景 table ul checkbox
				const _loopNode = __drag.finds('.loopNode')
				if(_loopNode.length() > 0){
					_loopNode.removeClass('activeLoop').removeClass('tableSpan') // 移除背景
					_drag.removeClass('hide').removeAttr('mergeTable')
				}
			}
			
			// 清除标线
			_(_this.$axes).finds('i').each(v=>{
				v.background(axesColor)
			})
			
			$drag.removeEventListener('mousemove',DragMove)
			$drag.removeEventListener('mousemove',DragSizeMove)
			this.sizeNode = null
			_this.dragNode = null
		})
		// 阻止控制面板冒泡
		$control.addEventListener('mouseup',e => e.stopPropagation() )
		$control.addEventListener('keyup',e => e.stopPropagation() )
		// 单击
		$drag.addEventListener('click',e=>{
			const { target } = e
			const _t = _( target ).parents('.drag')
			const _t2 = _( target ).parents('.loopNode')
			e.stopPropagation()
			if(_t.el && !_t.attr('id')){
				Dom.createPointMark(_t) // 拖动标点
				__drag.finds('.drag').each(_v=>{
					clearMark(_v) // 清除 mark
					// 给固定布局加不同颜色
					if(_v.attr('fixed')){
						_v.style('border', '1px dashed blue')
					}else{
						_v.style('border', '1px dashed ' + stopBorderColor)
					}
				})
				if(Dom.hasMark(_t.el)){
					const _mark = _t.children('.point-mark').show()
					if(_t.attr('fixed')){
						_mark.style('zIndex',0).removeStyle('background')
					}
					Boolean(+_t.attr('lock')) ? _mark.addClass('lock') : _mark.removeClass('lock')
				}
				
				// t.style.borderColor = '#fff'
				if(_t.hasClass('hide')){
					const isMergeTable = _t.attr('mergeTable')
					const nodes = document.querySelectorAll('.loopNode')
					const _nodes = _( nodes )
					
					if(nodes.length > 0){
						if(_t2.el){
							_nodes.removeClass('activeLoop')
							if(isMergeTable){
								if(_t2.hasClass('tableSpan')){
									_t2.removeClass('tableSpan')
								}else{
									_t2.addClass('tableSpan')
								}
								
							}else{
								_t2.addClass('activeLoop')
							}
							
							_this.setState({ node:_t2.el, _node: _t2, target }, ()=>{
								_this.runNode()
							})
						}else{
							_nodes.removeClass('activeLoop')
						}
					}
				}else{
					_this.setState({ node:_t.el, _node: _t, target:target },()=>{
						_this.runNode()
					})
				}
			}else{
				
			}
		})
		// 双击
		$drag.addEventListener('dblclick',e=>{
			const { target } = e
			const _t = _( target ).parents('.drag')
			const t = _t.el
			
			if(t){
				let type = _t.attr('type')
				const isGroup = _t.attr('group')
				const hasUrl = _t.attr('rooturl')
				
				if(!isGroup && hasUrl){ return}
				
				_this.stop = true
				_t.addClass('hide')
				
				let _editor = _t.find('.template')
				
				if(type !== 'text'){
					_editor = _( target ).parents('.loopNode')
					type =  _editor.attr('type')
					if(isGroup && _editor.hasClass('x-bind-table')){
						return
					}
				}
				
				if(type === 'text'){
					if(_t.attr('mergeTable')){
						return;
					}
					_editor.contentEditable(true).focus().once('blur', function(e){
						_(this).removeAttr('contentEditable')
					})
				}else if(type === 'table'){
					_t.addClass('hide')
				}
			}
		})
	}
	
}
