import React from 'react'
// ===================================================================== template
import List from './list'
// ===================================================================== page component
export default ({ parent }) => {
	const onChange = React.useCallback( (name,value,none) => {
		console.log(name)
		const drag = parent.node
		if(drag){
			const obj = {}
			for(var i in name){
				obj.label = i
				obj.value = name[i]
			}
			drag.querySelector('.template').style[obj.label] = obj.value === '' ? 0 : obj.value + 'px'
		}else{
			window.$fn.toast('未选中目标')
		}
	}, [ parent ])
	return (
		<>
			<div className='fx'>
				<List.Input label='补白左' name='paddingLeft' onChange={onChange}  isHalf />
				<List.Input label='补白右' name='paddingRight' onChange={onChange}  isHalf />
			</div>
			<div className='fx'>
				<List.Input label='补白上' name='paddingTop' onChange={onChange}  isHalf />
				<List.Input label='补白下' name='paddingBottom' onChange={onChange}  isHalf />
			</div>
			<div>
				<List.Input label='背景' isHalf />
			</div>
		</>
	)
}