import Dom from '../public/dom'
import _ from '../public/jzer'
import { axesSpace, axesColor } from '../public/config'
const { $fn } = window

export default {
	// 默认执行
	init(_this){
		const {  __scroll, __control, __drag, __axes } = _this
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
				// 清除 mark
				Dom.clearMark(_node)
				// 添加移动样式
				_node.addClass('drag-move')
			}
		}
		// 开始拖动
		__drag.bind('mousedown', e => {
			const { target } = e
			const { x, y } = _.mouse.getCoord(e)
			const _drag = _( target ).parents('.drag')
			const _temp = _drag.find('.template')
			e.stopPropagation()
			// 如果编辑，不允许移动
			if(_temp.el && _temp.attr('contentEditable')) return;
			// 为最外层元素，不允许拖动
			if(_drag.attr('id')) return;
			// 如果被锁定，不允许拖动
			if(_drag.hasClass('lock')){ return }
			// 如果 mark 存在，不允许拖动
			if( _drag.children('.point-mark').style('display') === 'none'){ return }
			// 获取拖动尺寸的元素
			const name = target.className
			if( name.indexOf('dir') >= 0 ){
				_this.dragNode = _drag.el
				this.sizeNode = target
				return __drag.bind('mousemove',DragSizeMove)
			}
			
			if(_drag.el){
				_this.node = _drag.el
				_this._node = _drag
				// _this.zIndex = _t.getStyle(true).zIndex
				
				const dragInfo =  _drag.getInfo()
				startX = x -  dragInfo.offsetLeft
				startY = y - dragInfo.offsetTop
				startOffsetX = dragInfo.offsetLeft
				startOffsetY = dragInfo.offsetTop
				
				// $drag.addEventListener('mousemove',DragMove)
				__drag.bind('mousemove', DragMove)
			}
		}).bind('mouseup',e=>{ // 结束拖动
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
				const { left, top, offsetTop } = _node.getInfo()
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
					if(_node.hasClass('drag-move')){
						const list =  _node.parent().children()
						const len = list.length()
						list.each((v,i)=>{
							if(!_node.isSame(v) && v.style('position') === 'relative'){
								const  info = v.getInfo()
								const small = offsetTop > info.offsetTop
								const big = offsetTop < info.offsetBottom
								const condition =  i === len - 1 ? small : (small && big)
								if(condition){
									if(top < 0){
										v.before(_node)
									}else if( top > 0){
										_node.before(v)
									}
								}
							}
						})
					}
				}else{
					if(_node.attr('type') === 'devider'){
						_node.left(left).top(top)
					}else{
						_node.left( left - (left % axesSpace) ).top( top - (top % axesSpace) )
					}
				}
			}
		}).click(true, e=>{
			const { target } = e
			const _target = _(target)
			const _drag = _target.parents('.drag')
			Dom.showMark(__drag, _drag)
			if(_drag.el && !_drag.attr('id')){
				// 表格处理
				const _loopNode = _target.parents('.loopNode')
				if(_drag.hasClass('hide')){
					const isMergeTable = _drag.attr('mergeTable')
					const nodes = document.querySelectorAll('.loopNode')
					const _nodes = _( nodes )
					if(nodes.length > 0){
						if(_loopNode.el){
							_nodes.removeClass('activeLoop')
							if(isMergeTable){
								if(_loopNode.hasClass('tableSpan')){
									_loopNode.removeClass('tableSpan')
								}else{
									_loopNode.addClass('tableSpan')
								}
							}else{
								_loopNode.addClass('activeLoop')
							}
						}else{
							_nodes.removeClass('activeLoop')
						}
					}
					_this._node = _loopNode
				}else{
					_this._node = _drag
				}
				
				_this.setState({ node:_this._node.el, _node: _this._node, hasNode:true },()=>{
					_this.runNode()
				})
			}
		}).dblclick(e=>{
			const { target } = e
			const _target = _( target )
			const _drag = _target.parents('.drag')
			if(_drag && _drag.el){
				let type = _drag.attr('type')
				const isGroup = _drag.attr('group')
				const hasUrl = _drag.attr('rooturl')
				
				if(!isGroup && hasUrl){ return}
				
				let _temp = _drag.find('.template')
				
				if(type === 'table' || type === 'ul' || type === 'text' || type === 'pages'){
					_drag.addClass('hide')
				}
				
				if( _target.parent('.drag').attr('group') ){
					_temp = _target.parents('.loopNode')
					type =  _temp.attr('type')
					if(isGroup && _temp.hasClass('x-bind-table')){
						return
					}
				}
				
				if(type === 'text' || type === 'pages'){
					if(_drag.attr('mergeTable')){ return }
					_temp.contentEditable(true).focus().once('blur', function(e){
						_(this).removeAttr('contentEditable')
					})
				}
			}
		})
		// 停止拖动处理
		_(document.body).once('mouseup',e=>{
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
						_this.setState({ node:null, _node:null, target:null, hasNode:null }, ()=>{
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
			// 清除目标框
			__drag.find('.drag-add').removeClass('drag-add')
			__drag.find('.drag-move').removeClass('drag-move')
			// Dom.resetBorder(__drag)
			// 清除标线
			__axes.finds('i').each(v=>{
				v.background(axesColor)
			})
			__drag.unbind('mousemove',DragMove).unbind('mousemove',DragSizeMove)
			this.sizeNode = null
			_this.dragNode = null
		})
		// 阻止控制面板冒泡
		__control.bind('mouseup',true).bind('keyup',true)
	}
}
