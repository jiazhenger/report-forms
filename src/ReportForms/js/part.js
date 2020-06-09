import Drag from './drag'
import Dom from './dom'
import { axesSpace, axesColor, moveBorderColor, stopBorderColor } from './config'

export default {
	// 默认执行
	init(_this){
		const { $drag, $scroll } = _this
		let startX = 0
		let startY = 0
		const findSize = name => Dom.hasClass(this.sizeNode,name)
		// 拖动改变尺寸
		const DragSizeMove = e => {
			const { x, y } = Drag.getMouse(e)
			const { offsetLeft, offsetTop } = Drag.getInfo($drag)
			const { scrollTop, scrollLeft }  = Drag.getInfo($scroll)
			if(this.dargNode){
				const size = Drag.getInfo(this.dargNode)
				const sizeOffsetLeft = size.offsetLeft
				const sizeOffsetTop = size.offsetTop
				const sizeWidth = size.width
				const sizeHeight = size.height
				// 左侧拖宽
				if( findSize('rc-w') || findSize('rt-wh') || findSize('rb-wh')){
					this.dargNode.style.width = x - sizeOffsetLeft + scrollLeft  + 'px'
				}
				// 右侧拖宽
				if( findSize('lc-w') || findSize('lt-wh') || findSize('lb-wh')){
					const left = parseInt(this.dargNode.style.left)
					if(left >= 0){
						this.dargNode.style.width = sizeOffsetLeft  - (x + scrollLeft) + sizeWidth  + 'px'
						this.dargNode.style.left = (x + scrollTop) - offsetLeft + 'px'
					}
				}
				// 底部拖高
				if( findSize('rb-wh') || findSize('lb-wh') || findSize('bc-h')){
					this.dargNode.style.height = y - sizeOffsetTop + scrollTop + 'px' 
				}
				// 顶部拖高
				if( findSize('tc-h') || findSize('rt-wh') || findSize('lt-wh')){
					const top = parseInt(this.dargNode.style.top)
					if(top >= 0){
						this.dargNode.style.height = sizeOffsetTop  - (y + scrollTop) + sizeHeight  + 'px'
						this.dargNode.style.top = (y + scrollTop) - offsetTop + 'px'
					}
				}
			}
		} 
		// 开始拖动
		const DragStart = e => {
			if(_this.stop) return
			const { target } = e
			const { x, y } = Drag.getMouse(e)
			let t = Dom.parents(target,'drag')
			// 获取拖动尺寸的元素
			const name = target.className
			if( name.indexOf('dir') >= 0 ){
				this.dargNode = t
				this.sizeNode = target
				return $drag.addEventListener('mousemove',DragSizeMove)
			}
			
			if(t){
				// t.style.cursor = 'default'
				this.node = t
				const targetInfo = Drag.getInfo(t)
				const targetOffsetLeft = targetInfo.offsetLeft
				const targetOffsetTop = targetInfo.offsetTop
				startX = x - targetOffsetLeft
				startY = y - targetOffsetTop
				$drag.addEventListener('mousemove',DragMove)
			}
		}
		// 拖动中
		const DragMove = e => {
			const { x, y } = Drag.getMouse(e)
			const { offsetLeft, offsetTop, width, height } = Drag.getInfo($drag)
			const targetInfo = Drag.getInfo(this.node)
			const targetWidth = targetInfo.width
			const targetHeight = targetInfo.height
			if(this.node){
				let left = x - offsetLeft - startX
				let top = y - offsetTop  - startY
				
				if(left > 0 && left < width - targetWidth - 1 ){
					this.node.style.left = left + 'px'
				}
				if(top > 0  && top < height - targetHeight - 1){
					this.node.style.top = top + 'px'
				}
				
				this.node.querySelector('.point-mark').style.display = 'none'
				this.node.style.border = '1px solid ' + moveBorderColor
				
				Drag.mark(_this,'.axesY', left)
				Drag.mark(_this,'.axesX', top)
			}
		}
		// 开始拖动
		$drag.addEventListener('mousedown',DragStart)
		// 结束拖动
		$drag.addEventListener('mouseup',e=>{
			const { target } = e
			const t = Dom.parents(target,'drag')
			// 获取拖动尺寸的元素
			if( this.dargNode ){
				const left = parseInt(this.dargNode.style.left)
				const top = parseInt(this.dargNode.style.top)
				const width = parseInt(this.dargNode.style.width)
				const height = parseInt(this.dargNode.style.height)
				
				// 左侧拖宽
				if( findSize('rc-w') || findSize('rt-wh') || findSize('rb-wh')){
					
				}
				// 右侧拖宽
				if( findSize('lc-w') || findSize('lt-wh') || findSize('lb-wh')){
					this.dargNode.style.width = width - (width%axesSpace) + (width%axesSpace>0 ? axesSpace : 0) - 1 + 'px'
				}
				// 底部拖高
				if( findSize('rb-wh') || findSize('lb-wh') || findSize('bc-h')){
					const ax = axesSpace/2
					this.dargNode.style.height = height - (height%ax) + (height%ax>0 ? ax : 0) - 1 + 'px'
				}
				// 顶部拖高
				if( findSize('tc-h') || findSize('rt-wh') || findSize('lt-wh')){
					
					
				}
				
				
				return false
			}
			if(t){
				const left = parseInt(this.node.style.left)
				const top = parseInt(this.node.style.top)
				this.node.style.left = left - (left % axesSpace) + 1  + 'px'
				this.node.style.top = top  - (top % (axesSpace/2)) + 1 + 'px'
				this.node.querySelector('.point-mark').style.display = 'block'
				this.node.style.border = 0
			}
		})
		// 单击
		$drag.addEventListener('click',e=>{
			const { target } = e
			let t = Dom.parents(target,'drag')
			if(t){
				Array.prototype.slice.call($drag.querySelectorAll('.drag'),0).forEach(v => {
					v.querySelector('.point-mark').style.display = 'none'
					v.style.border = '1px dashed ' + stopBorderColor
				})
				t.querySelector('.point-mark').style.display = 'block'
				t.style.border = 0
			}
		})
		// 双击
		$drag.addEventListener('dblclick',e=>{
			const { target } = e
			let t = Dom.parents(target,'drag')
			_this.stop = true
			if(t){
				t.className = 'drag hide'
				if(!t.getAttribute('contenteditable')){
					t = t.children[0]
					t.setAttribute('contenteditable', true)
					t.focus()
					t.addEventListener('focus',function(e){
						// t.style.cursor = 'default'
					})
					t.addEventListener('blur',function(e){
						this.setAttribute('contenteditable', false)
					})
				}
			}
		})
		document.body.addEventListener('click',e=>{
			Array.prototype.slice.call($drag.querySelectorAll('.drag'),0).forEach(v => {
				// v.setAttribute('contenteditable', false)
			})
		})
		document.body.addEventListener('mouseup',e=>{
			const { target } = e
			let t = Dom.parents(target,'drag')
			const name = target.className
			if( name.indexOf('dir') >= 0 ){
				
			}else{
				if(t){
					Array.prototype.slice.call($drag.querySelectorAll('.drag'),0).forEach(v => {
						
					})
				}else{
					_this.stop = false
					Array.prototype.slice.call($drag.querySelectorAll('.drag'),0).forEach(v => {
						v.className='drag'
						v.style.border = '1px dashed ' + stopBorderColor
						v.querySelector('.point-mark').style.display = 'none'
					})
				}
			}
			
			
			
			Array.prototype.slice.call($drag.querySelectorAll('.drag'),0).forEach(v => {
				
			})
			
			// 清除标线
			const $axes = _this.$axes.querySelectorAll('i')
			Array.prototype.slice.call($axes).forEach((v,i)=>{
				v.style.background = axesColor
			})
			
			$drag.removeEventListener('mousemove',DragMove)
			$drag.removeEventListener('mousemove',DragSizeMove)
			this.sizeNode = null
		})
	}
}
