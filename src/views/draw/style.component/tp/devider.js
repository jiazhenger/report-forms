import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
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
export default ({ node, _node }) => {
	const borderWidthRef = React.useRef()
	const borderStyleRef = React.useRef()
	const borderColorRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node, false).then(({ _temp } ) => {
			const style = _temp.children(0).style()
			borderWidthRef.current.setValue($fn.toNum(style.borderTopWidth))
			borderStyleRef.current.setValue(style.borderTopStyle)
			borderColorRef.current.setValue(style.borderTopColor)
		},false)
	}, [_node])
	// 选择粗细
	const onChange = React.useCallback(v => {
		Dom.getNodeInfo(_node).then(({ _temp } ) => {
			const { key, value } = _.getKeyValue(v)
			const unit = key === 'borderTopWidth' ? 'px' : ''
			_temp.children(0).style([key], value + unit)
		})
	}, [ _node ])
	
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