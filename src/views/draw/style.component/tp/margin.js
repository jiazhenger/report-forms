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
	const marginTopRef = React.useRef()
	const marginBottomRef = React.useRef()
	const marginLeftRef = React.useRef()
	const marginRightRef = React.useRef()
	const marginHRef = React.useRef()
	const marginVRef = React.useRef()
	const marginRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node,false).then(({ _drag })=>{
			const style = _drag.getStyle(true)
			marginTopRef.current.setValue($fn.toNum(style.marginTop))
			marginBottomRef.current.setValue($fn.toNum(style.marginBottom))
			marginLeftRef.current.setValue($fn.toNum(style.marginLeft))
			marginRightRef.current.setValue($fn.toNum(style.marginRight))
			
			const margin = _drag.style('margin')
			if(_.isString(margin)){
				const arr = margin.split(' ')
				if(arr.length === 2){
					if(+arr[0] === 0){
						marginHRef.current.setValue($fn.toNum(arr[0]))
					}
					if(+arr[1] === 0){
						marginVRef.current.setValue($fn.toNum(arr[1]))
					}
				}else{
					marginRef.current.setValue($fn.toNum(margin))
				}
			}
		})
	},[ _node ])
	
	const onChange = React.useCallback( (v,way) => {
		Dom.getNodeInfo(_node).then(({ _drag })=>{
			const { key, value} = _.getKeyValue(v)
			let val = parseInt(value) + 'px'
			_drag.removeStyle('margin,marginTop,marginLeft,marginRight,marginBottom')
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
		<Fieldset title='边距'>
			<div className='fx'>
				<List.Input label='上' ref={marginTopRef} name='marginTop' onChange={v=>onChange(v)} isHalf />
				<List.Input label='下' ref={marginBottomRef} name='marginBottom' onChange={v=>onChange(v)} isHalf />
			</div>
			<div className='fx'>
				<List.Input label='左' ref={marginLeftRef} name='marginLeft' onChange={v=>onChange(v)} isHalf />
				<List.Input label='右' ref={marginRightRef} name='marginRight' onChange={v=>onChange(v)} isHalf />
			</div>
			<div className='fx'>
				<List.Input label='水平' ref={marginHRef} p='水平' name='margin' onChange={v=>onChange(v,'h')} isHalf />
				<List.Input label='垂直' ref={marginVRef} p='垂直' name='margin' onChange={v=>onChange(v,'v')} isHalf />
			</div>
			<div className='fx'>
				<List.Input label='四边' ref={marginRef} p='四边' name='margin' onChange={v=>onChange(v,'all')} isHalf />
			</div>
		</Fieldset>
	)
}