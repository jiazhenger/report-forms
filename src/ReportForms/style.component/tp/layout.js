import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
// ===================================================================== template
import List from '../../public.component/list'
const { $fn } = window
// ===================================================================== page component
export default ({ _node }) => {
	const padding = React.useRef()
	const backgroundColor = React.useRef()
	const opacity = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node, false).then(( { _temp } ) => {
			const style = _temp.getStyle(true)
			padding.current.setValue($fn.toNum(style.padding))
			backgroundColor.current.setValue(style.backgroundColor)
			opacity.current.setValue($fn.toNum(style.opacity))
		})
	},[ _node ])
	
	const onChange = React.useCallback( (name, def) => {
		Dom.getNodeInfo(_node).then(( { _temp } ) => {
			const { key, value } = _.getKeyValue(name)
			_temp.style({
				[key]: value === '' ?  (def ? def : 0) : (isNaN(parseInt(value)) ? value : value + 'px')
			})
		})
	}, [ _node ])
	return (
		<>
			<div className='fx'>
				<List.Input ref={padding} label='补白' name='padding' onChange={onChange}  isHalf />
				<List.Input ref={opacity} label='透明度' name='opacity' onChange={onChange} isHalf />
			</div>
			<div className='fx'>
				<List.Input ref={backgroundColor} label='背景' name='backgroundColor' onChange={v=>onChange(v,'transparent')} isHalf />
			</div>
		</>
	)
}