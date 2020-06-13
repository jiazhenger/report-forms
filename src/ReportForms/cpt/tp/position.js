import React from 'react'
// ===================================================================== template
import List from './list'
// ===================================================================== data
const { $fn } = window
// ===================================================================== page component
export default ({ node, dragStyle }) => {
	const leftRef = React.useRef()
	const topRef = React.useRef()
	const widthRef = React.useRef()
	const heightRef = React.useRef()
	const indexRef = React.useRef()
	
	
	React.useEffect(()=>{
		const style = dragStyle || {}
		leftRef.current.setValue($fn.toNum(style.left))
		topRef.current.setValue($fn.toNum(style.top))
		widthRef.current.setValue($fn.toNum(style.width))
		heightRef.current.setValue($fn.toNum(style.height))
		indexRef.current.setValue($fn.toNum(style.zIndex))
	},[ dragStyle ])
	
	const onChange = React.useCallback( (name,unit) => {
		if(node){
			const obj = {}
			for(var i in name){
				obj.label = i
				obj.value = name[i]
			}
			
			node.style[obj.label] = obj.value === '' ? 0 : (isNaN(parseInt(obj.value)) ? obj.value : obj.value + unit)
		}else{
			window.$fn.toast('未选中目标')
		}
	}, [ node ])
	return (
		<>
			<div className='fx'>
				<List.Input label='宽' ref={widthRef} name='width' onChange={v=>onChange(v,'px')}  isHalf />
				<List.Input label='高' ref={heightRef} name='height' onChange={v=>onChange(v,'px')}  isHalf />
			</div>
			<div className='fx'>
				<List.Input label='左' ref={leftRef} name='left' onChange={v=>onChange(v,'px')}  isHalf />
				<List.Input label='上' ref={topRef} name='top' onChange={v=>onChange(v,'px')}  isHalf />
			</div>
			<div className='fx'>
				<List.Input label='层级' ref={indexRef} name='zIndex' onChange={v=>onChange(v,'')}  isHalf />
			</div>
		</>
	)
}