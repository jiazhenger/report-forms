import { axesColor, axesSpace } from '../public/config'
// 创建坐标系
const createAxes = (dom,width,height,space,isY) => {
	let html = ''
	const len = isY ? width/space : height/space
	for(var i=0; i < len+1 ; i++){
		let str = isY ? 	`<i class='abs' value='${i*space}' style='width:1px;height:${height}px;background:${axesColor};top:0;left:${i*space}px'></i>` : 
						`<i class='abs w' value='${i*space}' style='height:1px;background:${axesColor};left:0;top:${i*space}px'></i>`
		html = html + str
	}
	let node = document.createElement('div')
	node.className= (isY ? 'axesY' : 'axesX') + ' rel'
	node.style.zIndex = '-1'
	node.innerHTML = html
	dom.appendChild(node)
}

export default {
	init(){
		const el = document.querySelector('#axes')
		const $x = el.querySelector('.axesX')
		const $y = el.querySelector('.axesY')
		if($x){ $x.remove() }
		if($y){ $y.remove() }
		
		const resize = () => {
			const width = el.clientWidth
			const height = el.clientHeight
			// 创建坐标系
			createAxes(el,width,height,axesSpace,true)
			createAxes(el,width,height,axesSpace)
		}
		resize()
		window.addEventListener('resize',e=>{
			el.querySelector('.axesX').remove()
			el.querySelector('.axesY').remove()
			resize()
		})
	}
}