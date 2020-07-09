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
export default ({ node }) => {
	const [ model, setModel ] = React.useState({ })
	const textRef = React.useRef()
	const lineColorRef = React.useRef()
	const widthRef = React.useRef()
	const heightRef = React.useRef()
	const displayValueRef = React.useRef()
	const fontSizeRef = React.useRef()
	
	React.useEffect(()=>{
		if(node){
			const $img = node.querySelector('img')
			const code = $img.getAttribute('code')
			if(code){
				const lineColor = $img.getAttribute('lineColor') || barcode.lineColor
				const width = $img.getAttribute('codeWidth') || barcode.codeWidth
				const height = $img.getAttribute('codeHeight') || barcode.codeHeight
				const fontSize = $img.getAttribute('fontSize') || barcode.fontSize
				let displayValue = Boolean($img.getAttribute('displayValue'))
					displayValue = displayValue ? barcode.displayValue : false
				
				textRef.current.setValue(code)
				lineColorRef.current.setValue(lineColor)
				widthRef.current.setValue(width)
				heightRef.current.setValue(height)
				displayValueRef.current.setValue(displayValue)
				fontSizeRef.current.setValue(fontSize)
				
				setModel({ code, lineColor, width, height, displayValue })
			}
		}
	},[ node ])
	
	
	const onChange = React.useCallback( v => {
		setModel({...model,...v})
	}, [ model ])
	
	const onCreateBarcode  = React.useCallback( (name,value,none) => {
		Dom.getNode(node).then(({ node, $drag } ) => {
			console.log(model.code)
			if(!$fn.isValid(model.code)){
				return $fn.toast('条形码内容不能为空')
			}
			
			const $img = node.querySelector('img')
			$img.style.width = '100%'
			$img.style.height = '100%'
			$drag.style.height = 'auto'
			
			$img.setAttribute('temp',1)
			
			const code = $img.getAttribute('code')
			if(code){
				model.lineColor ? $img.setAttribute('lineColor',model.lineColor) : $img.removeAttribute('lineColor')
				model.width ? $img.setAttribute('codeWidth',model.width) : $img.removeAttribute('codeWidth')
				model.height ? $img.setAttribute('codeHeight',model.height) : $img.removeAttribute('codeHeight')
				model.displayValue ? $img.setAttribute('displayValue',model.displayValue) : $img.removeAttribute('displayValue')
				model.fontSize ? $img.setAttribute('fontSize',model.fontSize) : $img.removeAttribute('fontSize')
			}else{
				$img.setAttribute('lineColor',barcode.lineColor)
				$img.setAttribute('codeWidth',barcode.width)
				$img.setAttribute('codeHeight',barcode.height)
				$img.setAttribute('displayValue',barcode.displayValue)
				$img.setAttribute('fontSize',barcode.fontSize)
				
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
			model.code ? $img.setAttribute('code',model.code) : $img.removeAttribute('code')
			console.log(option)
			try{
				JsBarcode($img,model.code,option)
			}catch(e){
				$fn.toast('条形码内容不合法')
			}
			// .EAN13('1234567890128', {fontSize: 15, textMargin: 0})
			// .blank(20)
			// .render()
		})
	}, [ node, model ]) 
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