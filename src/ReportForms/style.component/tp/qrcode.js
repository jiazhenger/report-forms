import React from 'react'
import QRCode from 'qrcode'
// ===================================================================== js
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
import { qrcode } from '../../js/public/config'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== upload
const { $fn } = window
// ===================================================================== page component
export default ({ _node }) => {
	const [ model, setModel ] = React.useState({ })
	const textRef = React.useRef()
	const colorDarkRef = React.useRef()
	const marginRef = React.useRef()
	const colorLightRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node,false).then( ({ _drag }) => {
			const _img = _drag.find('img')
			const text = _img.attr('text')
			if(text){
				const colorDark = _img.attr('colorDark') || qrcode.colorDark
				const colorLight = _img.attr('colorLight') || qrcode.colorLight
				const margin = _img.attr('margin') || qrcode.margin
				
				textRef.current.setValue(text)
				colorDarkRef.current.setValue(colorDark)
				colorLightRef.current.setValue(colorLight)
				marginRef.current.setValue(margin)
				
				setModel({ text, colorDark, colorLight, margin })
			}
		})
	},[ _node ])
	
	
	const onChange = React.useCallback( v => {
		setModel({...model,...v})
	}, [ model ])
	
	const onCreateQrcode  = React.useCallback( (name,value,none) => {
		Dom.getNodeInfo(_node).then(({ _drag })=>{
			if(!$fn.isValid(model.text)){
				return $fn.toast('二维码内容不能为空')
			}
			
			const _img = _drag.find('img').attr('temp',1)
			
			const text = _img.attr('text')
			if(text){
				model.colorDark ? _img.attr('colorDark',model.colorDark) : _img.removeAttr('colorDark')
				model.colorLight ? _img.attr('colorLight',model.colorLight) : _img.removeAttr('colorLight')
				model.margin ? _img.attr('margin',model.margin) : _img.removeAttr('margin')
			}else{
				_img.attr({
					colorDark:qrcode.colorDark,
					colorLight:qrcode.colorLight,
					margin:qrcode.margin,
				})
				
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
			model.text ? _img.attr('text',model.text) : _img.removeAttr('text')
			if(_.isString(model.text)){
				QRCode.toDataURL(model.text, option).then(url=>{
					_img.src(url)
				})
			}else{
				$fn.toast('二维码内容不合法')
			}
		})
	}, [ _node, model ]) 
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