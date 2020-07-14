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
	{ label:'无', 			value:'none' },
	{ label:'上边', 			value:'borderTop' },
	{ label:'左边', 			value:'borderLeft' },
	{ label:'右边', 			value:'borderRight' },
	{ label:'下边', 			value:'borderBottom' },
	{ label:'四边', 			value:'border' },
]
// ===================================================================== page component
export default ({ node }) => {
	const borderWidthRef = React.useRef()
	const borderStyleRef = React.useRef()
	const borderColorRef = React.useRef()
	const borderSideRef = React.useRef()
	const borderRadius = React.useRef()
	
	React.useEffect(()=>{
		Dom.getComStyleNode(node,{
			onAll(el,style){
				const borderWidth = style.borderWidth.replace(/0px/g,'').trim()
				const borderStyle = style.borderStyle.replace(/none/g,'').trim()
				const borderColor = style.borderColor.replace(/rgb\(34, 34, 34\)/g,'').trim()
				
				borderWidthRef.current.setValue($fn.toNum(borderWidth))
				borderStyleRef.current.setValue($fn.isValid(borderStyle) ? borderStyle : 'none')
				borderColorRef.current.setValue(borderColor)
				borderRadius.current.setValue($fn.toNum(style.borderRadius))
				
				let borderSide = 'none'
				if(parseInt(style.borderTopWidth) > 0){
					borderSide = 'borderTop'
				}else if(parseInt(style.borderLeft) > 0){
					borderSide = 'borderLeft'
				}else if(parseInt(style.borderRight) > 0){
					borderSide = 'borderRight'
				}else if(parseInt(style.borderBottom) > 0){
					borderSide = 'borderBottom'
				}else{
					borderSide = 'border'
				}
				
				borderSideRef.current.setValue(borderSide)
			}
		})
	}, [node])
	// 选择粗细
	const onChange = React.useCallback(v => {
		Dom.getComStyleNode(node,{
			onAll(el){
				const width = borderWidthRef.current.getValue()
				const style = borderStyleRef.current.getValue()
				const color = borderColorRef.current.getValue() || '#000'
				const border = borderSideRef.current.getValue()
				
				if(border === 'border'){
					el.style.border = width + 'px ' +   style + ' ' + color
				}else if(border === 'none'){
					el.style.removeProperty('border')
				}else{
					el.style.removeProperty('border')
					el.style[border+'Width'] = width + 'px'
					el.style[border+'Style'] = style
					el.style[border+'Color'] = color
				}
			}
		})
	}, [ node ])
	
	const onRaiuus = React.useCallback(v => {
		Dom.getComStyleNode(node,{
			onAll(el){
				el.style.borderRadius = v
			}
		})
	}, [ node ])
	
	return (
		<>
			<div className='fx'>
				<List.Input label='宽度' ref={borderWidthRef} name='borderWidth' onChange={onChange} p='边框宽度'  isHalf />
				<List.Select label='样式' ref={borderStyleRef} name='borderStyle' data={BorderStyle} p='选择样式' isHalf onChange={onChange} />
			</div>
			<div className='fx'>
				<List.Select label='边' ref={borderSideRef} name='borderSide' data={BorderSide} p='选择边' isHalf onChange={onChange} />
				<List.Input label='颜色' ref={borderColorRef} name='borderColor' onChange={onChange} p='边框颜色' isHalf />
			</div>
			<div className='fx'>
				<List.Input ref={borderRadius} label='圆角' onChange={onRaiuus}  isHalf />
			</div>
			
		</>
	)
}