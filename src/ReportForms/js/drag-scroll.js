import Dom from './dom'
import Drag from './drag'
import { scrollSpace } from './config'
export default {
	// 默认执行
	init({ $scroll }){
		
		let prevX = 0
		let prevY = 0
		let curX = 0
		let curY = 0
		
		const getDir = function (e, opt) {
			const { x, y } = Drag.getMouse(e)
			prevX = curX
			prevY = curY
			curX = x
			curY = y
			if(curY > prevY){ 
				opt.down && opt.down(y)
			}else if(curY < prevY){
				opt.up && opt.up(y)
			}
			if(curX > prevX){
				opt.right && opt.right(x)
			}else if(curX < prevX){
				opt.left && opt.left(x)
			}
		}
		
		const mousemove = function(e){
			const { scrollTop, scrollLeft } = Drag.getInfo($scroll)
			getDir(e,{
				left: ()=>{
					this.scrollLeft = scrollLeft + scrollSpace
				},
				right:()=>{
					this.scrollLeft = scrollLeft - scrollSpace
				},
				up:()=>{
					this.scrollTop = scrollTop + scrollSpace
				},
				down:()=>{
					this.scrollTop = scrollTop - scrollSpace
				}
			})
		}
		
		$scroll.addEventListener('mousedown',function(e){
			const { target } = e
			const t = Dom.parents(target,'drag')
			if(!t){
				this.style.cursor = 'move'
				$scroll.addEventListener('mousemove',mousemove)
			}
		})
		
		document.body.addEventListener('mouseup',function(e){
			$scroll.style.cursor = ''
			$scroll.removeEventListener('mousemove',mousemove)
		})
		document.body.addEventListener('mouseleave',function(e){
			$scroll.style.cursor = ''
			$scroll.removeEventListener('mousemove',mousemove)
		})
	}
}