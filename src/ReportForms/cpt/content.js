import React from 'react'
// ===================================================================== public component

// ===================================================================== antd

// ===================================================================== image
// ===================================================================== declare
// ===================================================================== template
// 创建坐标系
const axes = (dom,width,height,space,isY) => {
	let html = ''
	const bgColor = '#eee'
	const len = isY ? width/space : height/space
	for(var i=0; i < len ; i++){
		let str = isY ? 	`<i class='abs' value='${i*space}' style='width:1px;height:${height}px;background:${bgColor};top:0;left:${(i+1)*space}px'></i>` : 
						`<i class='abs w' value='${i*space}' style='height:1px;background:${bgColor};left:0;top:${(i+1)*space}px'></i>`
		html = html + (i<len-1 ? str : '')
	}
	let node = document.createElement('div')
	node.className= (isY ? 'axesY' : 'axesX') + ' rel'
	node.style.zIndex = '-1'
	node.innerHTML = html
	dom.appendChild(node)
}
// ===================================================================== component
export default ({ onDrop, onDragOver }) => {
	const paper = React.useRef()
	const box = React.useRef()
	React.useEffect(()=>{
		const dom = box.current
		const paperDom = paper.current
		const resize = () => {
			const width = dom.clientWidth
			const height = dom.clientHeight
			const space = 15
			// 创建坐标系
			axes(dom,width,height,space)
			axes(dom,width,height,space,true)
		}
		resize()
		window.addEventListener('resize',e=>{
			dom.querySelector('.axesX').remove()
			dom.querySelector('.axesY').remove()
			resize()
		})
	},[ ])
	return (
		<div className='bcf' ref={paper} onDrop={onDrop} onDragOver={onDragOver} style={{padding:'20px',width:'800px',height:'1000px',margin:'0 auto',boxShadow:'0 0 8px #ccc'}}>
			<div className='rel bor1 wh' ref={box}>
				
			</div>
		</div>
	)
}