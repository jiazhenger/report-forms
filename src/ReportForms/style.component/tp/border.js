import React from 'react'
// ===================================================================== js
// import Dom from '../../js/public/dom'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data
const { $fn } = window
const BorderStyle = [
	{ label:'无', 			value:'none' },
	{ label:'实', 			value:'solid' },
	{ label:'虚线', 			value:'dashed' },
	{ label:'点线', 			value:'dotted' },
]
// ===================================================================== page component
export default ({ node }) => {
	const borderTopWidth = React.useRef()
	const borderTopStyle = React.useRef()
	const borderTopColor = React.useRef()
	
	React.useEffect(()=>{
		if(node){
			const style = node.querySelector('.template').children[0].style
			borderTopWidth.current.setValue($fn.toNum(style.borderTopWidth))
			borderTopStyle.current.setValue(style.borderTopStyle)
			borderTopColor.current.setValue(style.borderTopColor)
		}
	}, [node])
	// 选择粗细
	const onSelecttWidth = React.useCallback(v=>{
		if(node){
			const $d = node.querySelector('.template').children[0]
			$d.style.borderTopWidth = v + 'px'
		}
	}, [node])
	// 选择边框样式
	const onSelectStyle = React.useCallback(v => {
		if(node){
			const $d = node.querySelector('.template').children[0]
			$d.style.borderTopStyle = v
		}
	}, [node])
	// 选择边框颜色
	const onSelectColor = React.useCallback(v => {
		if(node){
			const $d = node.querySelector('.template').children[0]
			$d.style.borderTopColor = v
		}
	}, [node])
	
	return (
		<>
			<div className='fx'>
				<List.Input label='宽度' ref={borderTopWidth} onChange={onSelecttWidth}  isHalf />
				<List.Select label='样式' ref={borderTopStyle} data={BorderStyle} p='选择样式' isHalf onChange={onSelectStyle} />
			</div>
			<div>
				<List.Input label='颜色' ref={borderTopColor} onChange={onSelectColor} />
			</div>
		</>
	)
}