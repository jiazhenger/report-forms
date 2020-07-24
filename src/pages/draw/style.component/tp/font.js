import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data
const FontSize = [
	{ label:'12px', value:'12px'},
	{ label:'13px', value:'13px'},
	{ label:'14px', value:'14px'},
	{ label:'15px', value:'15px'},
	{ label:'16px', value:'16px'},
	{ label:'18px', value:'18px'},
	{ label:'20px', value:'20px'},
	{ label:'22px', value:'22px'},
	{ label:'24px', value:'24px'},
	{ label:'26px', value:'26px'},
	{ label:'28px', value:'28px'},
	{ label:'30px', value:'30px'},
]
const LineHeight = [
	{ label:'1', value:'1'},
	{ label:'1.1', value:'1.1'},
	{ label:'1.2', value:'1.2'},
	{ label:'1.3', value:'1.3'},
	{ label:'1.4', value:'1.4'},
	{ label:'1.5', value:'1.5'},
	{ label:'1.6', value:'1.6'},
	{ label:'1.8', value:'1.8'},
	{ label:'1.9', value:'1.9'},
	{ label:'2', value:'2'},
	{ label:'2.5', value:'2.5'},
	{ label:'3', value:'3'},
	{ label:'4', value:'4'},
	{ label:'5', value:'5'},
]
const LetterSpacing = [
	{ label:'1px', value:'1px'},
	{ label:'2px', value:'2px'},
	{ label:'3px', value:'3px'},
	{ label:'4px', value:'4px'},
	{ label:'5px', value:'5px'},
]
const FontFamily = [
	{ label:'微软雅黑', value:'微软雅黑'},
	{ label:'宋体', value:'宋体'},
	{ label:'黑体', value:'黑体'},
	{ label:'楷体', value:'楷体'},
	{ label:'Arial', value:'Arial'},
]
const TextAlign = [
	{ label:'居左对齐', value:'left'},
	{ label:'居中对齐', value:'center'},
	{ label:'居右对齐', value:'right'},
	{ label:'两端对齐', value:'justify'},
]
const verticalAlign = [
	{ label:'上对齐', value: 'top'},
	{ label:'中对齐', value: 'middle'},
	{ label:'下对齐', value: 'bottom'}
]
const style = {
	fontWeight:{ value:'bold' },
	fontStyle:{ value: 'italic'},
	textDecoration:{ value:'underline' },
	textIndent: { value: '2em' }
}
// ===================================================================== page component
export default ({ _node }) => {
	// select
	const fontFamily = React.useRef()
	const fontSize = React.useRef()
	const lineHeight = React.useRef()
	const letterSpacing = React.useRef()
	const textAlign = React.useRef()
	const verticalAlignRef = React.useRef()
	const color = React.useRef()
	const width = React.useRef()
	// switch
	const fontWeight = React.useRef()
	const fontStyle = React.useRef()
	const textDecoration = React.useRef()
	const textIndent = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node, false).then(( { _temp } ) => {
			const deepStyle = _temp.getStyle(true)
			const style = _temp.style()
			// select
			style.fontFamily && fontFamily.current.setValue(style.fontFamily)
			style.fontSize && fontSize.current.setValue(style.fontSize)
			style.lineHeight && lineHeight.current.setValue(style.lineHeight)
			style.letterSpacing && letterSpacing.current.setValue(deepStyle.letterSpacing)
			
			textAlign.current.setValue(deepStyle.textAlign === 'start' ? 'left' : deepStyle.textAlign)
			verticalAlignRef.current.setValue(deepStyle.verticalAlign)
			
			color.current.setValue(style.color)
			width.current.setValue(_temp.outerWidth())
			// switch
			fontWeight.current.setValue(style.fontWeight === 'bold')
			fontStyle.current.setValue(style.fontStyle === 'italic')
			textDecoration.current.setValue(style.textDecoration === 'underline')
			textIndent.current.setValue(style.textIndent === '2em')
		})
	},[ _node ])
	const onChange = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(( { _temp } ) => {
			const { key, value} = _.getKeyValue(v); // 转换成{key:,value: }
			// 布尔值
			if( _.isUndefined(value) || (_.isBoolean(value) && !value)){
				return _temp.removeStyle(_.toLine(key))
			}
			
			if(['width','letterSpacing','fontSize'].includes(key)){
				_temp[key]( value )
			}else if(['fontFamily','textAlign','lineHeight','color','verticalAlign'].includes(key)){
				_temp.style([key], value)
			}else if(['fontWeight','fontStyle','textDecoration','textIndent'].includes(key)){
				_temp.style([key], style[key].value)
			}
			
			if(!value) _temp.removeStyle(key)
			
		})
	}, [ _node ])
	
	return (
		<>
			<div className='fx'>
				<List.Select label='字体' ref={fontFamily} data={FontFamily} p='选择字体' isHalf name='fontFamily' onChange={onChange} />
				<List.Select label='尺寸' ref={fontSize} data={FontSize}  p='选择尺寸' isHalf  name='fontSize' onChange={onChange}/>
			</div>
			<div className='fx'>
				<List.Select label='行高' ref={lineHeight} data={LineHeight} p='选择字体' isHalf name='lineHeight' onChange={onChange} />
				<List.Select label='间距' ref={letterSpacing} data={LetterSpacing} p='选择间距' isHalf name='letterSpacing' onChange={onChange} />
			</div>
			<div className='fx'>
				<List.Select label='横对齐' ref={textAlign} data={TextAlign} p='水平对齐' isHalf name='textAlign' onChange={onChange} />
				<List.Select label='纵对齐' ref={verticalAlignRef} data={verticalAlign} p='垂直对齐' isHalf name='verticalAlign'  onChange={onChange}/>
			</div>
			<div className='fx'>
				<List.Input label='颜色' ref={color} p='颜色' isHalf name='color' onChange={onChange} />
				<List.Input label='宽度' ref={width} p='宽度' isHalf name='width' onChange={onChange} />
			</div>
			<div className='fxj'>
				<List.Switch label='加粗' ref={fontWeight} name='fontWeight' onChange={onChange}/>
				<List.Switch label='倾斜' ref={fontStyle}  name='fontStyle' onChange={onChange}/>
				<List.Switch label='下划线' ref={textDecoration}  name='textDecoration' onChange={onChange}/>
			</div>
			<div className='fxj'>
				<List.Switch label='缩进' ref={textIndent}  name='textIndent' onChange={onChange}/>
			</div>
		</>
	)
}