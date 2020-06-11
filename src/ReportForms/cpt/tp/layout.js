import React from 'react'
// ===================================================================== template
import List from './list'
// ===================================================================== page component
export default ({ parent }) => {
	const onChange = React.useCallback( (name,value,none) => {
		const drag = parent.node
		if(drag){
			const obj = {}
			for(var i in name){
				obj.label = i
				obj.value = name[i]
			}
			
			drag.querySelector('.template').style[obj.label] = obj.value === '' ? 0 : (isNaN(parseInt(obj.value)) ? obj.value : obj.value + 'px')
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
			<div className='fx'>
				<List.Input label='圆角' name='borderRadius' onChange={onChange}  isHalf />
				<List.Input label='背景' name='backgroundColor' onChange={onChange} isHalf />
			</div>
			<div className='fx'>
				<List.Input label='透明度' name='opacity' onChange={onChange} isHalf />
			</div>
		</>
	)
}