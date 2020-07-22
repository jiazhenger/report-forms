import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data
const justifyContent = [
	{ label:'开始对齐', value:'flex-start' },
	{ label:'结束对齐', value:'flex-end	' },
	{ label:'居中对齐', value:'center' },
	{ label:'平均对齐', value:'space-between' },
	{ label:'两侧对齐', value:'space-around' },
]
const alignItems = [
	{ label:'开始对齐', value:'flex-start' },
	{ label:'结束对齐', value:'flex-end	' },
	{ label:'居中对齐', value:'center' },
	{ label:'基线对齐', value:'baseline' },
	{ label:'拉伸对齐', value:'stretch' },
]
// ===================================================================== page component
export default ({ _node }) => {
	const flexRef = React.useRef()
	const justifyContentRef = React.useRef()
	const alignItemsRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node, false).then(( { _drag } ) => {
			const style = _drag.style()
			flexRef.current.setValue(style.display === 'flex')
		})
	},[ _node ])
	
	const onDisplay = React.useCallback( bool => {
		Dom.getNodeInfo(_node).then(( { _drag } ) => {
			if(bool){
				_drag.style('display', 'flex')
			}else{
				_drag.removeStyle('display')
			}
		})
	}, [ _node ])
	
	const onChange = React.useCallback( name => {
		Dom.getNodeInfo(_node).then(( { _drag } ) => {
			const { key, value } = _.getKeyValue(name)
			_drag.style([key],value)
		})
	}, [ _node ])
	
	return (
		<>
			<div>
				<List.Switch label='横排' ref={flexRef} onChange={onDisplay}/>
			</div>
			<div className='fx'>
				<List.Select label='水平' ref={justifyContentRef} isHalf name='justifyContent' data={justifyContent} onChange={onChange}/>
				<List.Select label='垂直' ref={alignItems} isHalf name='alignItems' data={alignItems} onChange={onChange}/>
			</div>
		</>
	)
}