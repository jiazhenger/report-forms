import React from 'react'
import QRCode from 'qrcode'
// ===================================================================== js
import Dom from '../../js/public/dom'
import { qrcode } from '../../js/public/config'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== upload
const { $fn } = window
// ===================================================================== page component
export default ({ node }) => {
	const [ model, setModel ] = React.useState({ })
	const textRef = React.useRef()
	const colorDarkRef = React.useRef()
	const marginRef = React.useRef()
	const colorLightRef = React.useRef()
	
	React.useEffect(()=>{
		if(node){
			const $img = node.querySelector('img')
			const text = $img.getAttribute('text')
			if(text){
				const colorDark = $img.getAttribute('colorDark') || qrcode.colorDark
				const colorLight = $img.getAttribute('colorLight') || qrcode.colorLight
				const margin = $img.getAttribute('margin') || qrcode.margin
				
				textRef.current.setValue(text)
				colorDarkRef.current.setValue(colorDark)
				colorLightRef.current.setValue(colorLight)
				marginRef.current.setValue(margin)
				
				setModel({ text, colorDark, colorLight, margin })
			}
		}
	},[ node ])
	
	
	const onChange = React.useCallback( v => {
		setModel({...model,...v})
	}, [ model ])
	
	const onCreateQrcode  = React.useCallback( (name,value,none) => {
		Dom.getNode(node).then(({ node, $drag, $temp } ) => {
			if(!$fn.isValid(model.text)){
				return $fn.toast('二维码内容不能为空')
			}
			
			const $img = node.querySelector('img')
			
			$img.setAttribute('temp',1)
			
			const text = $img.getAttribute('text')
			if(text){
				model.colorDark ? $img.setAttribute('colorDark',model.colorDark) : $img.removeAttribute('colorDark')
				model.colorLight ? $img.setAttribute('colorLight',model.colorLight) : $img.removeAttribute('colorLight')
				model.margin ? $img.setAttribute('margin',model.margin) : $img.removeAttribute('margin')
			}else{
				$img.setAttribute('colorDark',qrcode.colorDark)
				$img.setAttribute('colorLight',qrcode.colorLight)
				$img.setAttribute('margin',qrcode.margin)
				
				colorDarkRef.current.setValue(qrcode.colorDark)
				colorLightRef.current.setValue(qrcode.colorLight)
				marginRef.current.setValue(qrcode.margin)
				setModel({...qrcode, text:model.text})
			}
			const rs = text ? model : qrcode
			// const margin  = rs.margin ? +rs.margin : qrcode.margin
			const option = {
				...rs,
				color:{
					dark: rs.colorDark,
					light: rs.colorLight
				}
			}
			for(let i in option){
				if(!$fn.isValid(option[i]) || i === 'colorDark' || i === 'colorLight'){
					delete option[i]
				}
			}
			model.text ? $img.setAttribute('text',model.text) : $img.removeAttribute('text')
			console.log(option)
			try{
				QRCode.toDataURL(model.text, option).then(url=>{
					$img.src = url
				})
			}catch(e){
				$fn.toast('二维码内容不合法')
			}
		})
	}, [ node, model ]) 
	return (
		<>
			<div>
				<List.Input label='内容' ref={textRef} name='text' onChange={onChange} />
			</div>
			<div className='fx'>
				<List.Input label='前景色' ref={colorDarkRef} name='colorDark' onChange={onChange} isHalf />
				<List.Input label='背景色' ref={colorLightRef} name='colorLight' onChange={onChange} isHalf />
			</div>
			<div className='fx'>
				<List.Input label='补白' ref={marginRef} name='margin' onChange={onChange} isHalf />
			</div>
			<div>
				<List.Button label='' text='生成二维码' onClick={onCreateQrcode} />
			</div>
		</>
	)
}