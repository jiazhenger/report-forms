import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import Table from '../../js/public/table'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data

// ===================================================================== page component
export default ({ _node }) => {
	const openRef = React.useRef()
	const rowRef = React.useRef()
	const colRef = React.useRef()
	
	React.useEffect(()=>{
		Dom.getNodeInfo(_node, false).then(( { _drag } ) => {
			const isMerge = _drag.attr('mergeTable')
			openRef.current.setValue(isMerge?true:false)
			rowRef.current.setValue(false)
			colRef.current.setValue(false)
		})
	},[ _node ])
	
	const onChange = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(( { _drag, _temp } ) => {
			if(v){
				_drag.attr('mergeTable',1)
				_drag.finds('td').each(v=>{
					if(v.hasClass('activeLoop')){
						v.removeClass('activeLoop').addClass('tableSpan')
					}
				})
				_drag.finds('th').each(v=>{
					if(v.hasClass('activeLoop')){
						v.removeClass('activeLoop').addClass('tableSpan')
					}
				})
			}else{
				_drag.removeAttr('mergeTable').finds('td').removeClass('tableSpan')
				_drag.finds('th').removeClass('tableSpan')
			}
		})
	}, [ _node ])
	// 合并行
	const mergeRow = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(( { _drag, _temp } ) => {
			if(v){
				Table.mergeRow(_drag)
			}
		})
	}, [ _node ])
	// 合并列
	const mergeCol = React.useCallback( v => {
		Dom.getNodeInfo(_node).then(( { _drag} ) => {
			if(v){
				Table.mergeCol(_drag)
			}
		})
	}, [ _node ])
	
	return (
		<>
			<div className='fxmj'>
				<List.Switch label='启用' ref={openRef}  onChange={onChange}/>
				<List.Switch label='合并行' ref={rowRef}  onChange={mergeRow}/>
				<List.Switch label='合并列' ref={colRef}  onChange={mergeCol}/>
			</div>
		</>
	)
}