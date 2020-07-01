import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data
// const { $fn } = window
// ===================================================================== page component
export default ({ node }) => {
	const switchRef = React.useRef()
	React.useEffect(()=>{
		if(node){
			const $temp = node.querySelector('.template').children[0].childNodes[0]
			
			switchRef.current.setValue( $temp.style.float === '' )
		}
	},[node])
	
	const onChange = React.useCallback(v=>{
		Dom.getNode(node).then( ({ $temp }) => {
			if(v){
				[].slice.call($temp.children[0].childNodes).forEach((v,i)=>{
					v.style.removeProperty('float')
					v.style.removeProperty('margin-left')
					if(i>0){v.style.marginTop = '10px'}
				})
			}else{
				[].slice.call($temp.children[0].childNodes).forEach((v,i)=>{
					v.style.float = 'left'
					v.style.removeProperty('margin-top')
					if(i>0){v.style.marginLeft = '10px'}
				})
			}
		})
	}, [node])
	
	return (
		<>
			<div>
				<List.Switch label='换行' ref={switchRef} onChange={ onChange }/>
			</div>
		</>
	)
}