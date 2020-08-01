import React from 'react'
import JsBarcode from 'jsbarcode'
// ===================================================================== js
import Dom from '../../js/public/dom'
import { barcode } from '../../js/public/config'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== upload
const { $fn } = window
// ===================================================================== page component
export default ({ _node }) => {
	const [ model, setModel ] = React.useState({ })
	const textRef = React.useRef()
	const lineColorRef = React.useRef()
	const widthRef = React.useRef()
	const heightRef = React.useRef()
	const displayValueRef = React.useRef()
	const fontSizeRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node,false).then( ({ _drag }) => {
			const _img = _node.find('img')
			const code = _img.attr('code')
			if(code){
				const lineColor = _img.attr('lineColor') || barcode.lineColor
				const width = _img.attr('codeWidth') || barcode.codeWidth
				const height = _img.attr('codeHeight') || barcode.codeHeight
				const fontSize = _img.attr('fontSize') || barcode.fontSize
				let displayValue = Boolean(_img.attr('displayValue'))
					displayValue = displayValue ? barcode.displayValue : false
				
				textRef.current.setValue(code)
				lineColorRef.current.setValue(lineColor)
				widthRef.current.setValue(width)
				heightRef.current.setValue(height)
				displayValueRef.current.setValue(displayValue)
				fontSizeRef.current.setValue(fontSize)
				
				setModel({ code, lineColor, width, height, displayValue })
			}
		})
	},[ _node ])
	
	
	const onChange = React.useCallback( v => {
		setModel({...model,...v})
	}, [ model ])
	
	const onCreateBarcode  = React.useCallback( (name,value,none) => {
		Dom.getNodeInfo(_node).then( ({ _drag }) => {
			if(!$fn.isValid(model.code)){
				return $fn.toast('条形码内容不能为空')
			}
			const _img = _drag.find('img').width('100%').height('100%').attr('temp',1)
			_drag.height('auto')
			
			const code = _img.attr('code')
			
			if(code){
				model.lineColor ? _img.attr('lineColor',model.lineColor) : _img.removeAttr('lineColor')
				model.width ? _img.attr('codeWidth',model.width) : _img.removeAttr('codeWidth')
				model.height ? _img.attr('codeHeight',model.height) : _img.removeAttr('codeHeight')
				model.displayValue ? _img.attr('displayValue',model.displayValue) : _img.removeAttr('displayValue')
				model.fontSize ? _img.attr('fontSize',model.fontSize) : _img.removeAttr('fontSize')
			}else{
				_img.attr({
					lineColor: barcode.lineColor,
					codeWidth: barcode.width,
					codeHeight: barcode.height,
					displayValue: barcode.displayValue,
					fontSize: barcode.fontSize,
				})
				
				lineColorRef.current.setValue(barcode.lineColor)
				widthRef.current.setValue(barcode.width)
				heightRef.current.setValue(barcode.height)
				displayValueRef.current.setValue(barcode.displayValue)
				fontSizeRef.current.setValue(barcode.fontSize)
				setModel({...barcode, code:model.code})
			}
			const rs = code ? model : barcode
			const option = {
				// fomrat:'pharmacode'
				// format:'',
				...rs,
				font: 'OCR-B'
			}
			for(let i in option){
				if(!$fn.isValid(option[i])){
					delete option[i]
				}
			}
			model.code ? _img.attr('code',model.code) : _img.removeAttr('code')
			try{
				JsBarcode(_img.el,model.code,option)
			}catch(e){
				$fn.toast('条形码内容不合法')
			}
			// .EAN13('1234567890128', {fontSize: 15, textMargin: 0})
			// .blank(20)
			// .render()
		})
	}, [ model, _node ]) 
	return (
		<>
			<div>
				<List.Input label='内容' ref={textRef} name='code' onChange={onChange} />
			</div>
			<div className='fx'>
				<List.Input label='宽度' ref={widthRef} name='width' onChange={onChange} isHalf />
				<List.Input label='高度' ref={heightRef} name='height' onChange={onChange} isHalf />
			</div>
			<div className='fx'>
				<List.Input label='字体' ref={fontSizeRef} name='fontSize' onChange={onChange} isHalf />
				<List.Input label='颜色' ref={lineColorRef} name='lineColor' onChange={onChange} isHalf />
			</div>
			<div className='fx'>
				<List.Switch label='内容' ref={displayValueRef} name='displayValue' onChange={onChange} isHalf />
			</div>
			<div>
				<List.Button label='' text='生成条形码' onClick={onCreateBarcode} />
			</div>
		</>
	)
}