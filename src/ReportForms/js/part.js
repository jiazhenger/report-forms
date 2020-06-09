import Drag from './drag'
import Dom from './dom'
import { axeSspace  } from './config'

export default {
	// 默认执行
	init(_this){
		const { $drag } = _this
		let startX = 0
		let startY = 0
		// 打开拖动
		const DragStart = e => {
			const { target } = e
			const { x, y } = Drag.getMouse(e)
			const { offsetLeft, offsetTop } = Drag.getInfo($drag)
			let t = Dom.parents(target,'drag')
			if(t){
				t.style.cursor = 'move'
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
				
				Drag.mark(_this,'.axesY', left)
				Drag.mark(_this,'.axesX', top)
			}
		}
		$drag.addEventListener('mousedown',DragStart)
		$drag.addEventListener('mouseup',e=>{
			const { target } = e
			let t = Dom.parents(target,'drag')
			if(t){
				let left = parseInt(this.node.style.left)
				let top = parseInt(this.node.style.top)
				this.node.style.left = left - (left % axeSspace) + 1  + 'px'
				this.node.style.top = top  - (top % (axeSspace/2)) + 1 + 'px'
				
				if(!t.getAttribute('contenteditable')){
					t = t.children[0]
					// t.setAttribute('contenteditable', true)
					t.focus()
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
			$drag.removeEventListener('mousemove',DragMove)
			Array.prototype.slice.call($drag.querySelectorAll('.drag'),0).forEach(v => {
				// v.setAttribute('contenteditable', false)
				v.style.cursor = 'default'
			})
			// 清除标线
			const $axes = _this.$axes.querySelectorAll('i')
			Array.prototype.slice.call($axes).forEach((v,i)=>{
				v.style.background = '#eee'
			})
		})
	}
}
