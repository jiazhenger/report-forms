import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data
const { $fn } = window
// ===================================================================== page component
export default ({ _node }) => {
	const leftRef = React.useRef()
	const topRef = React.useRef()
	const widthRef = React.useRef()
	const heightRef = React.useRef()
	const indexRef = React.useRef()
	const fullRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node,false).then(({ _drag })=>{
			const style = _drag.getStyle()
			leftRef.current.setValue($fn.toNum(style.left))
			topRef.current.setValue($fn.toNum(style.top))
			widthRef.current.setValue($fn.toNum(style.width))
			heightRef.current.setValue($fn.toNum(style.height))
			indexRef.current.setValue($fn.toNum(style.zIndex))
			console.log(_drag.width())
			fullRef.current.setValue( _drag.width() ===  '100%')
		})
	},[ _node ])
	
	const onChange = React.useCallback( (v,unit) => {
		Dom.getNodeInfo(_node).then(({ _drag })=>{
			const { key, value} = _.getKeyValue(v); // 转换成{key:,value: }
			_drag.style({
				[key] : value === '' ? '' : (isNaN(parseInt(value)) ? value : value + unit)
			})
		})
	}, [ _node ])
	
	const onFull = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(({ _drag })=>{
			if(v){
				// _drag.left(0).width(_('#dragContent').clientWidth())
				_drag.left(0).width('100%')
			}
		})
	}, [ _node ])
	return (
		<>
			<div className='fx'>
				<List.Input label='宽' ref={widthRef} name='width' onChange={v=>onChange(v,'px')}  isHalf />
				<List.Input label='高' ref={heightRef} name='height' onChange={v=>onChange(v,'px')}  isHalf />
			</div>
			<div>
				<div className='fx'>
					<List.Input label='左' ref={leftRef} name='left' onChange={v=>onChange(v,'px')}  isHalf />
					<List.Input label='上' ref={topRef} name='top' onChange={v=>onChange(v,'px')}  isHalf />
				</div>
				<div className='fx'>
					<List.Input label='层级' ref={indexRef} name='zIndex' onChange={v=>onChange(v,'')}  isHalf />
					<List.Switch label='全屏' ref={fullRef} onChange={onFull}  isHalf />
				</div>
			</div>
		</>
	)
}