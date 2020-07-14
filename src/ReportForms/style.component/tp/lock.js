import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data

// ===================================================================== page component
export default ({ node,  tempStyle }) => {
	const lockRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNode(node).then(( { node } ) => {
			
		}, false)
	},[ tempStyle ])
	
	const onChange = React.useCallback( v => {
		Dom.getNode(node).then(( { node } ) => {
			
		})
	}, [ node ])
	
	return (
		<>
			<div className='fxj'>
				<List.Switch label='缩进' ref={lockRef}  name='textIndent' onChange={onChange}/>
			</div>
		</>
	)
}