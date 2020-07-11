import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
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
const BorderSide = [
	{ label:'上边', 			value:'borderTop' },
	{ label:'左边', 			value:'borderLeft' },
	{ label:'右边', 			value:'borderRight' },
	{ label:'下边', 			value:'borderBottom' },
]
// ===================================================================== page component
export default ({ node }) => {
	const borderWidthRef = React.useRef()
	const borderStyleRef = React.useRef()
	const borderColorRef = React.useRef()
	const borderSideRef = React.useRef()
	
	React.useEffect(()=>{
		if(node){
			Dom.getStyleTypeNode(node,{
				onAll(el,style){
					borderWidthRef.current.setValue($fn.toNum(style.borderWidth))
					borderStyleRef.current.setValue(style.borderStyle)
					borderColorRef.current.setValue(style.borderColor)
				}
			})
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
				<List.Input label='宽度' ref={borderWidthRef} onChange={onSelecttWidth}  isHalf />
				<List.Select label='样式' ref={borderStyleRef} data={BorderStyle} p='选择样式' isHalf onChange={onSelectStyle} />
			</div>
			<div className='fx'>
				<List.Select label='边' ref={borderSideRef} data={BorderSide} p='选择样式' isHalf onChange={onSelectStyle} />
				<List.Input label='颜色' ref={borderColorRef} onChange={onSelectColor} />
			</div>
		</>
	)
}