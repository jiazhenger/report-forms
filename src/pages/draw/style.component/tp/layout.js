import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
// ===================================================================== template
import List from '../../public.component/list'
import Padding from './padding'
// import Fieldset from '../../public.component/fieldset'
const { $fn } = window
// ===================================================================== page component
export default ({ _node }) => {
	const backgroundColor = React.useRef()
	const opacity = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node, false).then(( { _temp } ) => {
			const style = _temp.getStyle(true)
			backgroundColor.current.setValue(style.backgroundColor)
			opacity.current.setValue($fn.toNum(style.opacity))
		})
	},[ _node ])
	
	const onChange = React.useCallback( (name, def) => {
		Dom.getNodeInfo(_node).then(( { _temp } ) => {
			const { key, value } = _.getKeyValue(name)
			if(value){
				_temp.style([key], value)
			}else{
				_temp.removeStyle(key)
			}
		})
	}, [ _node ])
	return (
		<>
			<div className='fx'>
				<List.Input ref={backgroundColor} label='背景色' name='backgroundColor' onChange={onChange} isHalf />
				<List.Input ref={opacity} label='透明度' name='opacity' onChange={onChange} isHalf />
			</div>
			<Padding _node={_node} />
		</>
	)
}