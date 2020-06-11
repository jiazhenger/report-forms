import React from 'react'
// ===================================================================== template
import List from './list'
// ===================================================================== page component
export default ({ parent }) => {
	const onChange = React.useCallback( (name,value,none) => {
		const drag = parent.node
		if(drag){
			const $img = drag.querySelector('.template').querySelector('img')
			
			const obj = {}
			for(var i in name){
				obj.label = i
				obj.value = name[i]
			}
			if(obj.value === '') {
				if($img){ $img.parentNode.removeChild($img)}
				return
			}
			if($img){
				$img.setAttribute(obj.label,obj.value)
			}else{
				let imgNode = document.createElement('img')
				imgNode.setAttribute(obj.label,obj.value)
				imgNode.style.cssText = 'width:100%;height:100%'
				imgNode.draggable = false
				drag.querySelector('.template').appendChild(imgNode)
			}
			
			
		}else{
			window.$fn.toast('未选中目标')
		}
	}, [ parent ])
	return (
		<>
			<div>
				<List.Input label='外链' name='src' onChange={onChange} />
				<List.Button label='上传' name='src' text='图片上传' onChange={onChange} />
			</div>
		</>
	)
}