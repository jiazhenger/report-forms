import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data

// ===================================================================== page component
export default ({ _node }) => {
	const lockRef = React.useRef()
	const posRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node, false).then(( { _drag } ) => {
			lockRef.current.setValue( Boolean(+_drag.attr('lock')) )
			posRef.current.setValue( _drag.style('position') === 'absolute' )
		})
	},[ _node ])
	
	const onChange = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(( { _drag } ) => {
			_drag.attr('lock', v ? 1 : 0)
			const _mark = _(_drag.el).children('.point-mark')
			if(v){
				_mark.addClass('lock')
			}else{
				_mark.removeClass('lock')
			}
		})
	}, [ _node ])
	
	const onPosition = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(( { _drag } ) => {
			if(v){
				_drag.style('position','absolute')
				const _parent = _drag.parent()
				if(_parent.el){
					if(_parent.hasClass('wraper')){
						_parent.replace(_drag.clone().el)
					}
				}
			}else{
				if(!_drag.parent('.wraper').el){
					_drag.style('position','relative').removeStyle('left,top')
					const clone = _drag.clone().el
					const height = _drag.outerHeight()
					_drag.addClass('wraper',true).removeAttr('style,type').height(height).html('').append(clone)
				}
			}
			_(document.querySelector('#dragContent')).finds('.point-mark').hide()
		})
	}, [ _node ])
	
	return (
		<>
			<div>
				<List.Switch label='锁定' ref={lockRef}  onChange={onChange}/>
				<List.Switch label='定位' ref={posRef}  onChange={onPosition}/>
			</div>
		</>
	)
}