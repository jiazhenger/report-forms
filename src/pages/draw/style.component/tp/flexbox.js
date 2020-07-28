import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data
const flexDirection = [
	{ label:'横向排列', value:'row' },
	{ label:'纵向排列', value:'column' },
	{ label:'横向反转', value:'row-reverse' },
	{ label:'纵向反转', value:'column-reverse' },
]
const justifyContent = [
	{ label:'左对齐', value:'flex-start' },
	{ label:'右对齐', value:'flex-end	' },
	{ label:'中对齐', value:'center' },
	{ label:'平均对齐', value:'space-between' },
	{ label:'两侧对齐', value:'space-around' },
]
const alignItems = [
	{ label:'上对齐', value:'flex-start' },
	{ label:'下对齐', value:'flex-end	' },
	{ label:'中对齐', value:'center' },
	{ label:'基线对齐', value:'baseline' },
	{ label:'拉伸对齐', value:'stretch' },
]
// ===================================================================== page component
export default ({ _node }) => {
	const flexDirectionRef = React.useRef()
	const justifyContentRef = React.useRef()
	const alignItemsRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node, false).then(( { _drag } ) => {
			const style = _drag.getStyle(true)
			flexDirectionRef.current.setValue( style.flexDirection )
		})
	},[ _node ])
	
	const onChange = React.useCallback( name => {
		Dom.getNodeInfo(_node).then(( { _drag } ) => {
			const { key, value } = _.getKeyValue(name)
			if(key === 'flexDirection'){ _drag.style('display','flex') }
			if(value){
				_drag.removeStyle('display,flexDirection')
			}else{
				_drag.style([key],value)
			}
		})
	}, [ _node ])
	
	return (
		<>
			<div>
				<List.Select label='排列' p='选择方式' ref={flexDirectionRef} name='flexDirection' data={flexDirection} onChange={onChange}/>
			</div>
			<div className='fx'>
				<List.Select label='水平' ref={justifyContentRef} isHalf name='justifyContent' data={justifyContent} onChange={onChange}/>
				<List.Select label='垂直' ref={alignItemsRef} isHalf name='alignItems' data={alignItems} onChange={onChange}/>
			</div>
		</>
	)
}