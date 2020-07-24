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
			lockRef.current.setValue( _drag.hasClass('lock') )
			posRef.current.setValue( Boolean(_drag.style('position') === 'absolute') )
		})
	},[ _node ])
	
	const onChange = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(( { _drag } ) => {
			
			if(v){
				_drag.addClass('lock')
			}else{
				_drag.removeClass('lock')
			}
		})
	}, [ _node ])
	
	const onPosition = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(( { _drag } ) => {
			if(v){
				const dragInfo = _drag.getInfo()
				const { offsetTop } = _('#dragContent').getInfo()
				_drag.removeClass('darg-rel').style('position','absolute').top(dragInfo.offsetTop-offsetTop)
			}else{
				_drag.addClass('darg-rel').style('position','relative').removeStyle('left,top')
			}
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