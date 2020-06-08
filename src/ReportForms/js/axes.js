const axesColor = '#eee' 	// 坐标颜色
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

module.exports = space => {
	const el = document.querySelector('#axes')
	const resize = () => {
		const width = el.clientWidth
		const height = el.clientHeight
		// 创建坐标系
		createAxes(el,width,height,space)
		createAxes(el,width,height,space,true)
	}
	resize()
	window.addEventListener('resize',e=>{
		el.querySelector('.axesX').remove()
		el.querySelector('.axesY').remove()
		resize()
	})
}