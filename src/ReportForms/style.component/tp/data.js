import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data

// ===================================================================== page component
export default ({ node }) => {
	const dataRef = React.useRef() 
	
	React.useEffect(()=>{
		Dom.getNode(node).then(( { node } ) => {
			
		}, false)
	},[ node ])
	
	const onChange = React.useCallback( v => {
		Dom.getNode(node).then(( { node } ) => {
			
		})
	}, [ node ])
	
	return (
		<>
			<div>
				<List.Input ref={dataRef} label='数据' onChange={onChange} />
			</div>
		</>
	)
}