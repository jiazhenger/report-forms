import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data
const alignSelf = [
	{ label:'自动', value:'auto' },
	{ label:'上对齐', value:'flex-start' },
	{ label:'下对齐', value:'flex-end	' },
	{ label:'中对齐', value:'center' },
	{ label:'基线对齐', value:'baseline' },
	{ label:'拉伸对齐', value:'stretch' },
]
// ===================================================================== page component
export default ({ _node }) => {
	const flexRef = React.useRef()
	const alignSelfRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node,false).then(({ _drag })=>{
			const style = _drag.getStyle(true)
			flexRef.current.setValue( _drag.hasStyle('flex') )
			alignSelfRef.current.setValue( style.alignSelf )
		})
	},[ _node ])
	// 自适应
	const onAuto = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(({ _drag })=>{
			if(v){
				_drag.style('flex',1)
			}else{
				_drag.removeStyle('flex')
			}
			if(_drag.parent().style('flex-direction') === 'column'){
				_drag.removeStyle('height')
			}else{
				_drag.removeStyle('width')
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
			<div className='fx'>
				<List.Switch label='自适应' ref={flexRef} onChange={onAuto}  isHalf />
			</div>
			<div>
				<List.Select label='对齐' ref={alignSelfRef} name='alignSelf' data={alignSelf} onChange={onChange}/>
			</div>
		</>
	)
}