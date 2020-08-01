import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
// ===================================================================== template
import List from '../../public.component/list'
import Fieldset from '../../public.component/fieldset'
// ===================================================================== data
const { $fn } = window
// ===================================================================== page component
export default ({ _node }) => {
	const paddingTopRef = React.useRef()
	const paddingBottomRef = React.useRef()
	const paddingLeftRef = React.useRef()
	const paddingRightRef = React.useRef()
	const paddingHRef = React.useRef()
	const paddingVRef = React.useRef()
	const paddingRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node,false).then(({ _drag })=>{
			const style = _drag.getStyle(true)
			paddingTopRef.current.setValue($fn.toNum(style.paddingTop))
			paddingBottomRef.current.setValue($fn.toNum(style.paddingBottom))
			paddingLeftRef.current.setValue($fn.toNum(style.paddingLeft))
			paddingRightRef.current.setValue($fn.toNum(style.paddingRight))
			
			const padding = _drag.style('padding')
			if(_.isString(padding)){
				const arr = padding.split(' ')
				if(arr.length === 2){
					if(+arr[0] === 0){
						paddingHRef.current.setValue($fn.toNum(arr[0]))
					}
					if(+arr[1] === 0){
						paddingVRef.current.setValue($fn.toNum(arr[1]))
					}
				}else{
					paddingRef.current.setValue($fn.toNum(padding))
				}
			}
		})
	},[ _node ])
	
	const onChange = React.useCallback( (v,way) => {
		Dom.getNodeInfo(_node).then(({ _drag })=>{
			const { key, value} = _.getKeyValue(v)
			let val = parseInt(value) + 'px'
			_drag.removeStyle('padding,paddingTop,paddingLeft,paddingRight,paddingBottom')
			if(way){
				if(way === 'h'){
					val = '0 ' + val
					if(_drag.style('width') === '100%'){
						_drag.removeStyle('width')
					}
				}else if( way === 'v'){
					val = val + ' 0' 
				}
			}
			_drag.style([key], val)
		})
	}, [ _node ])
	return (
		<Fieldset title='补白'>
			<div className='fx'>
				<List.Input label='上' ref={paddingTopRef} name='paddingTop' onChange={v=>onChange(v)} isHalf />
				<List.Input label='下' ref={paddingBottomRef} name='paddingBottom' onChange={v=>onChange(v)} isHalf />
			</div>
			<div className='fx'>
				<List.Input label='左' ref={paddingLeftRef} name='paddingLeft' onChange={v=>onChange(v)} isHalf />
				<List.Input label='右' ref={paddingRightRef} name='paddingRight' onChange={v=>onChange(v)} isHalf />
			</div>
			<div className='fx'>
				<List.Input label='水平' ref={paddingHRef} p='水平' name='padding' onChange={v=>onChange(v,'h')} isHalf />
				<List.Input label='垂直' ref={paddingVRef} p='垂直' name='padding' onChange={v=>onChange(v,'v')} isHalf />
			</div>
			<div className='fx'>
				<List.Input label='四边' ref={paddingRef} p='四边' name='padding' onChange={v=>onChange(v,'all')} isHalf />
			</div>
		</Fieldset>
	)
}