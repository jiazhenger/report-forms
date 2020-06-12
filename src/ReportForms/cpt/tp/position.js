import React from 'react'
// ===================================================================== template
import List from './list'
// ===================================================================== data
const { $fn } = window
// ===================================================================== page component
export default ({ parent, dragStyle }) => {
	const style = dragStyle || {}
	const onChange = React.useCallback( (name,value,none) => {
		const drag = parent.node
		if(drag){
			const obj = {}
			for(var i in name){
				obj.label = i
				obj.value = name[i]
			}
			
			drag.style[obj.label] = obj.value === '' ? 0 : (isNaN(parseInt(obj.value)) ? obj.value : obj.value + 'px')
		}else{
			window.$fn.toast('未选中目标')
		}
	}, [ parent ])
	return (
		<>
			<div className='fx'>
				<List.Input label='左' value={$fn.toNum(style.left)} name='left' onChange={onChange}  isHalf />
				<List.Input label='上' value={$fn.toNum(style.top)} name='top' onChange={onChange}  isHalf />
			</div>
			<div className='fx'>
				<List.Input label='宽' value={$fn.toNum(style.width)} name='width' onChange={onChange}  isHalf />
				<List.Input label='高' value={$fn.toNum(style.height)} name='height' onChange={onChange}  isHalf />
			</div>
		</>
	)
}