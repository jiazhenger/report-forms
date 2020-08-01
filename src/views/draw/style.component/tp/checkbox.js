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
			if($temp){
				switchRef.current.setValue( $temp.style.float === '' )
			}
		}
	},[node])
	
	const onChange = React.useCallback(v=>{
		Dom.getNode(node).then( ({ $temp }) => {
			if(v){
				[].slice.call($temp.children[0].childNodes).forEach((v,i)=>{
					v.style.removeProperty('float')
					v.style.removeProperty('margin')
					if(i>0){v.style.margin= '10px 0 0'}
				})
			}else{
				[].slice.call($temp.children[0].childNodes).forEach((v,i)=>{
					v.style.float = 'left'
					v.style.margin = '0 10px 10px 0'
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