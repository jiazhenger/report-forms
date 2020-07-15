import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data

// ===================================================================== page component
export default ({ node }) => {
	const lockRef = React.useRef() 
	
	React.useEffect(()=>{
		Dom.getNode(node).then(( { node } ) => {
			lockRef.current.setValue( Boolean(+node.getAttribute('lock')) )
		}, false)
	},[ node ])
	
	const onChange = React.useCallback( v => {
		Dom.getNode(node).then(( { node } ) => {
			node.setAttribute('lock',v ? 1 : 0)
			const $mark = Dom.children(node,'point-mark')
			if(v){
				Dom.addClass($mark,'lock')
			}else{
				Dom.removeClass($mark,'lock')
			}
		})
	}, [ node ])
	
	return (
		<>
			<div className='fxj'>
				<List.Switch label='锁定' ref={lockRef}  onChange={onChange}/>
			</div>
		</>
	)
}