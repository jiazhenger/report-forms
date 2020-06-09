import Drag from './drag'
import Dom from './dom'
import { axeSspace, axesColor, moveBorderColor, stopBorderColor } from './config'

export default {
	// 默认执行
	init(_this){
		const { $drag } = _this
		let startX = 0
		let startY = 0
		const DragSizeMove = e => {
			const { x, y } = Drag.getMouse(e)
			const { offsetLeft, offsetTop, width, height } = Drag.getInfo($drag)
		}
		// 打开拖动
		const DragStart = e => {
			if(_this.stop) return
			const { target } = e
			const { x, y } = Drag.getMouse(e)
			let t = Dom.parents(target,'drag')
			const name = target.className
			
			if( name === 'dir'){
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
			let t = Dom.parents(target,'drag')
			if(t){
				let left = parseInt(this.node.style.left)
				let top = parseInt(this.node.style.top)
				this.node.style.left = left - (left % axeSspace) + 1  + 'px'
				this.node.style.top = top  - (top % (axeSspace/2)) + 1 + 'px'
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
			
			Array.prototype.slice.call($drag.querySelectorAll('.drag'),0).forEach(v => {
				
			})
			
			// 清除标线
			const $axes = _this.$axes.querySelectorAll('i')
			Array.prototype.slice.call($axes).forEach((v,i)=>{
				v.style.background = axesColor
			})
			
			$drag.removeEventListener('mousemove',DragMove)
		})
	}
}
