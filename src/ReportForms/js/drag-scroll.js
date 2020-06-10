import Dom from './dom'
import Drag from './drag'
export default {
	// 默认执行
	init({ $scroll }){
		let startX = 0
		let startY = 0
		const mousemove = function(e){
			const { x, y } = Drag.getMouse(e)
			const { scrollTop, scrollLeft } = Drag.getInfo($scroll)
			
			this.scrollTop = scrollTop + (startY - y)/15
			this.scrollLeft = scrollLeft + (startX - x)/15
			
			console.log(this.scrollTop)
		}
		
		$scroll.addEventListener('mousedown',function(e){
			const { target } = e
			const t = Dom.parents(target,'drag')
			const { x, y } = Drag.getMouse(e)
			if(!t){
				this.style.cursor = 'move'
				startX = x
				startY = y
				$scroll.addEventListener('mousemove',mousemove)
			}
		})
		
		document.body.addEventListener('mouseup',function(e){
			$scroll.style.cursor = 'default'
			$scroll.removeEventListener('mousemove',mousemove)
		})
	}
}