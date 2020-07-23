import Dom from '../public/dom'
import _ from '../public/jzer'
import { axesSpace, axesColor } from '../public/config'
const { $fn } = window

export default {
	// 默认执行
	init(_this){
		const { $drag, $scroll, $control } = _this
		const __drag = _($drag)
		const __scroll = _($scroll)
		let startX = 0
		let startY = 0
		let startOffsetX = 0
		let startOffsetY = 0
		const findSize = name => _(this.sizeNode).hasClass(name)
		// 拖动改变尺寸
		const DragSizeMove = e => {
			const { x, y } = _.mouse.getCoord(e)
			const { scrollTop, scrollLeft }  = __scroll.getInfo()
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
		// 开始拖动
		$drag.addEventListener('mousedown',e => {
			e.stopPropagation()
			if(_this.stop) return
			const { target } = e
			const { x, y } = _.mouse.getCoord(e)
			const _t = _( target ).parents('.drag')
			const t = _t.el
			// 为最外层元素，不允许拖动
			if(_t.attr('id')) return;
			// 如果被锁定，不允许拖动
			if(_t.hasClass('lock')){ return }
			// 如果 mark 存在，不允许拖动
			if( !_t.find('.point-mark').hasClass('mark-show')){ return }
			
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
				// _this.zIndex = _t.getStyle(true).zIndex
				
				const targetInfo = _t.getInfo()
				startX = x -  targetInfo.offsetLeft
				startY = y - targetInfo.offsetTop
				startOffsetX = targetInfo.offsetLeft
				startOffsetY = targetInfo.offsetTop
				
				$drag.addEventListener('mousemove',DragMove)
				_this.setState({hasNode:true,node:t, _node: _t, target})
			}
		})
		// 拖动中
		const DragMove = e => {
			const { x, y } = _.mouse.getCoord(e)
			const _node = _this._node
			const dragInfo = __drag.getInfo()
			const { offsetLeft, offsetTop, width, height } = _node.parent('.drag').getInfo()
			
			const targetInfo = _node.getInfo()
			const targetWidth = targetInfo.width
			const targetHeight = targetInfo.height
			
			if(_node.el){
				let left = x - startX - offsetLeft
				let top = y - startY - offsetTop
				if(_node.style('position') === 'relative'){
					const parentInfo = _node.parent('.drag').getInfo()
					left = x - startX - startOffsetX
					top = y - startY - startOffsetY
					if(( left < 0 && Math.abs(left) <= startOffsetX - offsetLeft) || ( left > 0 && left <= width - (startOffsetX - offsetLeft) - targetWidth) ){ 
						_node.left(left)
					}
					if(( top < 0 && Math.abs(top) <= startOffsetY - offsetTop) || ( top > 0 && top <= height - (startOffsetY - offsetTop) - targetHeight) ){
						_node.top(top)
					}
					// 标线
					Dom.setMark(_this,'.axesY', left + (offsetLeft - dragInfo.offsetLeft)  + (startOffsetX - parentInfo.offsetLeft) )
					Dom.setMark(_this,'.axesX', top + (offsetTop - dragInfo.offsetTop) + (startOffsetY - parentInfo.offsetTop) )
				}else{
					if(left >= 0 && left <= width - targetWidth){ _node.left(left) }
					if(top >= 0  && top <= height - targetHeight){ _node.top(top) }
					// 标线
					Dom.setMark(_this,'.axesY', left + (offsetLeft - dragInfo.offsetLeft) )
					Dom.setMark(_this,'.axesX', top + (offsetTop - dragInfo.offsetTop))
				}
				
				Dom.setMoveBorder(_node)
				
				
			}
		}
		// 结束拖动
		$drag.addEventListener('mouseup',e=>{
			// 获取拖动尺寸的元素
			if( _this.dragNode ){
				const _drag = _( _this.dragNode )
				const { left, top, width, height } = _drag.getInfo()
				// const ax = _drag.attr('fixed') ? 0 : axesSpace
				const ax = axesSpace
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
			if(_this._node){
				const _node = _this._node
				_node.style('zIndex', 1)
				const { left, top } = _node.getPos()
				// const { left, top, width, height } = _drag.getInfo()
				// 相对定位处理
				if(_node.style('position') === 'relative'){
					// _this.isRel = false
					_node.removeStyle('left,top')
					// 计算居中
					if(Boolean(_node.attr('center'))){
						const parentWidth = _node.parent('.drag').outerWidth()
						const childWidth = _node.outerWidth()
						const lastLeft = (parentWidth - childWidth)/2
						const ax = lastLeft % axesSpace
						_node.left(lastLeft - ax).width(childWidth - (ax ? 10 : 0))
					}
				}else{
					if(_node.attr('type') === 'devider'){
						_node.left(left).top(top)
					}else{
						_node.left( left - (left % axesSpace) ).top( top - (top % axesSpace) )
					}
				}
			}
		})
		// 停止拖动处理
		document.body.addEventListener('mouseup',e=>{
			const { target } = e
			const _t = _( target ).parents('.drag')
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
						Dom.clearMark(_v) // 清除 mark
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
				
				// 重置布局元素的边框
				Dom.resetBorder(__drag)
			}
			
			// 清除标线
			_(_this.$axes).finds('i').each(v=>{
				v.background(axesColor)
			})
			__drag.unbind('mousemove',DragMove)
			__drag.unbind('mousemove',DragSizeMove)
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
			e.stopPropagation()
			
			if(_t.el){
				Dom.showMark(__drag, _t)
			}
			
			if(_t.el && !_t.attr('id')){
				// 表格处理
				if(_t.hasClass('hide')){
					const _t2 = _( target ).parents('.loopNode')
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
							
							// _this.setState({ node:_t2.el, _node: _t2, target }, ()=>{
							// 	_this.runNode()
							// })
						}else{
							_nodes.removeClass('activeLoop')
						}
					}
				}else{
					_this._node = _t
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
				
				let _editor = _t.find('.template')
				
				if(type !== 'text'){
					_editor = _( target ).parents('.loopNode')
					type =  _editor.attr('type')
					if(isGroup && _editor.hasClass('x-bind-table')){
						return
					}
				}
				
				if(type === 'text'){
					_this.stop = true
					_t.addClass('hide')
					if(_t.attr('mergeTable')){ return }
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
