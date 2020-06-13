import React from 'react'
// ===================================================================== template
import List from './list'
const { $fn } = window
// ===================================================================== page component
export default ({ node, tempStyle }) => {
	const padding = React.useRef()
	const borderRadius = React.useRef()
	const backgroundColor = React.useRef()
	const opacity = React.useRef()
	
	React.useEffect(()=>{
		const style = tempStyle || {}
		padding.current.setValue($fn.toNum(style.padding))
		borderRadius.current.setValue($fn.toNum(style.borderRadius))
		backgroundColor.current.setValue(style.backgroundColor)
		opacity.current.setValue($fn.toNum(style.opacity))
	},[ tempStyle ])
	
	const onChange = React.useCallback( (name, def) => {
		if(node){
			const obj = {}
			for(var i in name){
				obj.label = i
				obj.value = name[i]
			}
			console.log(obj)
			node.querySelector('.template').style[obj.label] = obj.value === '' ? (def ? def : 0) : (isNaN(parseInt(obj.value)) ? obj.value : obj.value + 'px')
		}else{
			window.$fn.toast('未选中目标')
		}
	}, [ node ])
	return (
		<>
			<div className='fx'>
				<List.Input ref={padding} label='补白' name='padding' onChange={onChange}  isHalf />
				<List.Input ref={opacity} label='透明度' name='opacity' onChange={onChange} isHalf />
			</div>
			<div className='fx'>
				<List.Input ref={borderRadius} label='圆角' name='borderRadius' onChange={onChange}  isHalf />
				<List.Input ref={backgroundColor} label='背景' name='backgroundColor' onChange={v=>onChange(v,'transparent')} isHalf />
			</div>
		</>
	)
}