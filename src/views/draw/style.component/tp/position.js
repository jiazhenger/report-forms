import React from 'react'
// ===================================================================== js
import { axesSpace } from '../../js/public/config'
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
// ===================================================================== template
import List from '../../public.component/list'
import Margin from './margin'
import Fieldset from '../../public.component/fieldset'
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
	const centerRef = React.useRef()
	const autoHeightRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node,false).then(({ _drag })=>{
			const style = _drag.getStyle(true)
			leftRef.current.setValue(style.left)
			topRef.current.setValue(style.top)
			widthRef.current.setValue(_drag.outerWidth())
			heightRef.current.setValue(_drag.outerHeight())
			indexRef.current.setValue($fn.toNum(style.zIndex))
			fullRef.current.setValue( _drag.style('width') ===  '100%')
			autoHeightRef.current.setValue( !_drag.hasStyle('height') )
			
			const parentWidth = _drag.parent('.drag').outerWidth()
			const childWidth = _drag.outerWidth()
			const left = (parentWidth - childWidth)/2
			centerRef.current.setValue( _drag.left() === left )
		})
	},[ _node ])
	
	const onChange = React.useCallback( (v,unit) => {
		Dom.getNodeInfo(_node).then(({ _drag })=>{
			const { key, value} = _.getKeyValue(v); // 转换成{key:,value: }
			_drag.style([key], value)
		})
	}, [ _node ])
	// 全屏
	const onFull = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(({ _drag })=>{
			if(v){
				_drag.removeStyle('left').width('100%')
			}else{
				_drag.removeStyle('width')
			}
		})
	}, [ _node ])
	const onCenter = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(({ _drag })=>{
			if(v){
				const parentWidth = _drag.parent('.drag').outerWidth()
				const childWidth = _drag.outerWidth()
				const lastLeft = (parentWidth - childWidth)/2
				const ax = lastLeft % axesSpace
				_drag.left(lastLeft - ax).width(childWidth - (ax ? 10 : 0)).attr('center',1)
			}else{
				_drag.left(0).removeAttr('center')
			}
		})
	}, [ _node ])
	const onHeightAuto = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(({ _drag })=>{
			if(v){
				_drag.removeStyle('height')
			}else{
				_drag.style('height','100%')
			}
		})
	}, [ _node ])
	return (
		<>
			<Fieldset title='尺寸' first>
				<div className='fx'>
					<List.Input label='宽' ref={widthRef} name='width' onChange={v=>onChange(v,'px')}  isHalf />
					<List.Input label='高' ref={heightRef} name='height' onChange={v=>onChange(v,'px')}  isHalf />
				</div>
			</Fieldset>
			<Fieldset title='位置'>
				<div className='fx'>
					<List.Input label='左' ref={leftRef} name='left' onChange={v=>onChange(v,'px')}  isHalf />
					<List.Input label='上' ref={topRef} name='top' onChange={v=>onChange(v,'px')}  isHalf />
				</div>
				<div className='fx'>
					<List.Input label='层级' ref={indexRef} name='zIndex' onChange={v=>onChange(v,'')} isHalf />
				</div>
			</Fieldset>
			<Margin _node={_node} />
			<Fieldset title='控制'>
				<div className='fxj'>
					<List.Switch label='全屏' ref={fullRef} onChange={onFull}  />
					<List.Switch label='居中' ref={centerRef} onChange={onCenter}  />
					<List.Switch label='自动高' ref={autoHeightRef} onChange={onHeightAuto} />
				</div>
			</Fieldset>
		</>
	)
}