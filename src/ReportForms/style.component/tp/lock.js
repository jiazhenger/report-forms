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
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node).then(( { _drag } ) => {
			lockRef.current.setValue( Boolean(+_drag.attr('lock')) )
		}, false)
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
	
	return (
		<>
			<div>
				<List.Switch label='锁定' ref={lockRef}  onChange={onChange}/>
			</div>
		</>
	)
}