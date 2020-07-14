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
// ===================================================================== page component
export default ({ node }) => {
	const borderWidthRef = React.useRef()
	const borderStyleRef = React.useRef()
	const borderColorRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNode(node).then(({ $temp } ) => {
			const style = Dom.getStyle($temp.children[0])
			borderWidthRef.current.setValue($fn.toNum(style.borderTopWidth))
			borderStyleRef.current.setValue(style.borderTopStyle)
			borderColorRef.current.setValue(style.borderTopColor)
		},false)
	}, [node])
	// 选择粗细
	const onChange = React.useCallback(v => {
		Dom.getNode(node).then(({ $temp } ) => {
			const $ = $temp.children[0]
			const key = Object.keys(v)[0]
			const unit = key === 'borderTopWidth' ? 'px' : ''
			$.style[key] = v[key] + unit
		})
	}, [ node ])
	
	return (
		<>
			<div className='fx'>
				<List.Input label='宽度' ref={borderWidthRef} name='borderTopWidth' onChange={onChange} p='边框宽度'  isHalf />
				<List.Select label='样式' ref={borderStyleRef} name='borderTopStyle' data={BorderStyle} p='选择样式' isHalf onChange={onChange} />
			</div>
			<div>
				<List.Input label='颜色' ref={borderColorRef} name='borderTopColor' onChange={onChange} p='边框颜色' />
			</div>
		</>
	)
}