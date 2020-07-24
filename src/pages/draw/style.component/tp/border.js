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
const BorderSide = [
	{ label:'无', 			value:'none' },
	{ label:'上边', 			value:'borderTop' },
	{ label:'左边', 			value:'borderLeft' },
	{ label:'右边', 			value:'borderRight' },
	{ label:'下边', 			value:'borderBottom' },
	{ label:'四边', 			value:'border' },
]
// ===================================================================== page component
export default ({ _node }) => {
	const borderWidthRef = React.useRef()
	const borderStyleRef = React.useRef()
	const borderColorRef = React.useRef()
	const borderSideRef = React.useRef()
	const borderRadius = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node, false).then(({ _temp })=>{
			const style = _temp.getStyle(true)
			if(!_.isString(style.borderWidth)) return;
			const borderWidth = style.borderWidth.replace(/0px/g,'').trim()
			const borderStyle = style.borderStyle.replace(/none/g,'').trim()
			const borderColor = style.borderColor.replace(/rgb\(34, 34, 34\)/g,'').trim()
			
			borderWidthRef.current.setValue($fn.toNum(borderWidth))
			borderStyleRef.current.setValue($fn.isValid(borderStyle) ? borderStyle : 'none')
			borderColorRef.current.setValue(borderColor)
			borderRadius.current.setValue(style.borderRadius)
			// 判断是哪一边
			let borderSide = 'none'
			const arr = BorderSide.map(v=>v.value)
			let index = 0
			arr.forEach(v=>{
				if(v !== 'none' && v !== 'border'){
					if(parseInt(style[v+'Width']) > 0){
						index ++
						borderSide = v
					}
				}
			})
			if(index === 4){
				borderSide = 'border'
			}
			
			borderSideRef.current.setValue(borderSide)
		})
	}, [_node])
	// 选择粗细
	const onChange = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(({ _temp }) => {
			const width = borderWidthRef.current.getValue()
			const style = borderStyleRef.current.getValue()
			const color = borderColorRef.current.getValue() || '#000'
			const border = borderSideRef.current.getValue()
			
			if(border === 'border'){
				_temp.style('border', width + 'px ' +   style + ' ' + color)
			}else if(border === 'none'){
				_temp.removeStyle('border')
			}else{
				_temp.removeStyle('border')
				_temp.style({
					[border+'Width']: width + 'px',
					[border+'Style']: style,
					[border+'Color']: color
				})
			}
		})
	}, [ _node ])
	
	const onRaiuus = React.useCallback(v => {
		Dom.getNodeInfo(_node).then(({ _temp }) => {
			_temp.style('borderRadius', isNaN(v) ? v : (v+'px'))
		})
	}, [ _node ])
	
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
			<div>
				<List.Input ref={borderRadius} label='圆角' onChange={onRaiuus}/>
			</div>
			
		</>
	)
}