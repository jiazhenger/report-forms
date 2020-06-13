import React from 'react'
// ===================================================================== template
import List from './list'
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
// ===================================================================== page component
export default ({ node,  tempStyle }) => {
	// select
	const fontFamily = React.useRef()
	const fontSize = React.useRef()
	const lineHeight = React.useRef()
	const letterSpacing = React.useRef()
	// switch
	const fontWeight = React.useRef()
	const fontStyle = React.useRef()
	const textDecoration = React.useRef()
	const textIndent = React.useRef()
	
	React.useEffect(()=>{
		const style = tempStyle || {}
		// select
		fontFamily.current.setValue(style.fontFamily)
		fontSize.current.setValue(style.fontSize)
		lineHeight.current.setValue(style.lineHeight)
		letterSpacing.current.setValue(style.letterSpacing)
		// switch
		fontWeight.current.setValue(style.fontWeight === 'bold')
		fontStyle.current.setValue(style.fontStyle === 'italic')
		textDecoration.current.setValue(style.textDecoration === 'underline')
		textIndent.current.setValue(style.textIndent === '2em')
	},[ tempStyle ])
	const onChange = React.useCallback( (name,value,none) => {
		if(node){
			const obj = {}
			for(var i in name){
				obj.label = i
				obj.value = name[i]
			}
			if({}.toString.call(obj.value) === '[object Boolean]'){
				node.querySelector('.template').style[obj.label] = obj.value ? value : (none ? none : 'normal')
			}else{
				node.querySelector('.template').style[obj.label] = obj.value === undefined ? value : obj.value
			}
		}else{
			window.$fn.toast('未选中目标')
		}
	}, [ node ])
	
	return (
		<>
			<div className='fx'>
				<List.Select label='字体'  ref={fontFamily} data={FontFamily} p='选择字体' isHalf name='fontFamily' onChange={onChange} />
				<List.Select label='尺寸'  ref={fontSize} data={FontSize}  p='选择尺寸' isHalf  name='fontSize' onChange={v=>onChange(v,'100%')}/>
			</div>
			<div className='fx'>
				<List.Select label='行高'  ref={lineHeight} data={LineHeight} p='选择字体' isHalf name='lineHeight' onChange={v=>onChange(v,'none')} />
				<List.Select label='间距'  ref={letterSpacing} data={LetterSpacing} p='选择间距' isHalf name='letterSpacing' onChange={v=>onChange(v,'0')} />
			</div>
			<div className='fxj'>
				<List.Switch label='加粗' ref={fontWeight} name='fontWeight' onChange={v=>onChange(v,'bold')}/>
				<List.Switch label='倾斜' ref={fontStyle}  name='fontStyle' onChange={v=>onChange(v,'italic')}/>
				<List.Switch label='下划线' ref={textDecoration}  name='textDecoration' onChange={v=>onChange(v,'underline','none')}/>
			</div>
			<div className='fxj'>
				<List.Switch label='缩进' ref={textIndent}  name='textIndent' onChange={v=>onChange(v,'2em','0')}/>
			</div>
		</>
	)
}