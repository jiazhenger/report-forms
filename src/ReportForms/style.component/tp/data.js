import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import Format from '../../js/public/format'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data
const { $fn } = window
// ===================================================================== page component
export default ({ _node }) => {
	const [ read, setRead ] = React.useState(false)
	const dataRef = React.useRef() 
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node, false).then(( { rootUrl, url } ) => {
			const data = $fn.local('dataSource')
			if( data ){
				const rs = Format.parse(data, url)
				dataRef.current.setValue(rs)
			}
			if(url) setRead(true)
		})
	},[ _node ])
	
	const onChange = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(( { rootUrl, url } ) => {
			
		})
	}, [ _node ])
	
	return (
		<>
			<div>
				<List.Input ref={dataRef} label='数据' p='无数据' readOnly={read} onChange={onChange} />
			</div>
		</>
	)
}