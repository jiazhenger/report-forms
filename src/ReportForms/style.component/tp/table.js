import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import Table from '../../js/public/table'
import { tableConfig } from '../../js/public/config'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data
const { $fn } = window
const BorderStyle = [
	{ label:'下边实线', 			value:'solid' },
	{ label:'下边虚线', 			value:'dashed' },
	{ label:'下边点线', 			value:'dotted' },
]
const BorderFrame = [
	{ label:'上下无边框', 	value:'vsides' },
	{ label:'两侧无边框', 	value:'hsides' },
	{ label:'四边无边框', 	value:'box' },
]
// ===================================================================== page component
export default ({ node, _node }) => {
	const [ col, setCol] = React.useState(3)
	const [ row, setRow] = React.useState(1)
	const [ checked, setChecked] = React.useState(true)
	const [ border ] = React.useState(true)
	
	const rowRef = React.useRef()
	const colRef = React.useRef()
	const colorRef = React.useRef()
	const frameRef = React.useRef()
	const borderRef = React.useRef()
	const checkedRef = React.useRef()
	
	React.useEffect(()=>{
		if(node){
			const $table = node.querySelector('table')
			if($table){
				const $tbody = $table.querySelector('tbody')
				const $tr = $tbody.querySelector('tr')
				const trLen = $tbody.querySelectorAll('tr').length
				const tdLen = $tr.querySelectorAll('td').length
				const color = $tr.querySelector('td').style.borderColor
				const hasHead = Boolean($table.querySelector('thead'))
				rowRef.current.setValue(trLen)
				colRef.current.setValue(tdLen)
				colorRef.current.setValue(color)
				frameRef.current.setValue($table.getAttribute('xframe'))
				borderRef.current.setValue($table.getAttribute('xborder'))
				checkedRef.current.setValue(hasHead)
				
				setRow(trLen)
				setCol(tdLen)
				setChecked(hasHead)
			}
		}
	},[ node ])
	
	// 是否显示表头
	const onHeadChange = React.useCallback(v=>{
		Dom.getNodeInfo(_node).then(({ _drag } ) => {
			const _table = _drag.find('table')
			if(v){
				const thead = Table.createThead({
					col: _table.find('tr').children().el.length,
					th:{
						style:{
							...tableConfig.style,
							border: '1px solid ' + colorRef.current.getValue(),
							background:'#f5f5f5',
						},
						attr:{ type:'text' },
						className:'loopNode',
					}
				})
				_table.append(thead)
			}else{
				_table.find('thead').remove()
			}
		})
	}, [ _node ])
	// 是否显示边框
	const onBorderChange = React.useCallback(v=>{
		Dom.getNodeInfo(_node).then(({ _drag } ) => {
			const _table = _drag.find('table')
			Table.showHideBorder(_table, v, colorRef.current.getValue())
		})
	}, [ _node ])
	// frame
	const onSelectFrame = React.useCallback(v=>{
		Dom.getNode(node).then(({ $drag } ) => {
			const $table = $drag.querySelector('table')
			$table.setAttribute('xframe', v)
			Dom.setTableBorder($table, border, colorRef.current.getValue())
			if(v === 'hsides' || v === 'box'){
				for(let v of $table.querySelectorAll('tr')){
					if(v.firstElementChild) v.firstElementChild.style.borderLeft = 0
					if(v.lastElementChild) v.lastElementChild.style.borderRight = 0
				}
			}
			if(v === 'vsides' || v === 'box'){
				if(checked){
					for(let v of $table.querySelector('thead').querySelectorAll('th')){
						v.style.borderTop = 0
					}
				}else{
					for(let v of $table.querySelector('tbody').firstElementChild.querySelectorAll('td')){
						v.style.borderTop = 0
					}
				}
				for(let v of $table.querySelector('tbody').lastElementChild.querySelectorAll('td')){
					v.style.borderBottom = 0
				}
			}
		})
	}, [ node, border, checked ])
	// 设置下边框
	const onSelectStyle = React.useCallback(v => {
		Dom.getNodeInfo(_node).then(({ _drag } ) => {
			const _table = _drag.find('table').attr('xborder', v)
			const color = colorRef.current.getValue()
			Table.setBottomBorder(_table, borderRef.current.getValue(), color)
		})
	}, [ _node ])
	// 边框颜色
	const onColor = React.useCallback(v => {
		Dom.getNodeInfo(_node).then(({ _drag } ) => {
			Table.setBorderColor(_drag.find('table'), v)
		})
	}, [ _node ])
	// 动态创建表格
	const ceateTable = React.useCallback(()=>{
		if(row <= 0){ return $fn.toast('行数必须大于 0')}
		if(col <= 0){ return $fn.toast('列数必须大于 0')}
		Dom.getNodeInfo(_node).then(({ _drag, _temp })=>{
			_drag.removeStyle('height')
			const style = tableConfig.style
			const table = Table.create({
				row,
				col,
				thead: checkedRef.current.getValue() ? {
					th: {
						style:{
							background:'#f5f5f5',
							...style
						},
						className:'loopNode',
						attr:{ type:'text' }
					}
				} : null,
				tbody:{
					td:{
						style,
						className:'loopNode x-bind-table',
						attr:{ type:'text', }
					}
				}
			})
			Dom.setTableBorder(table, border, colorRef.current.getValue())
			// last
			_temp.html('').append(table)
		})
	}, [_node, col, row, border])
	return (
		<>
			<div className='fx'>
				<List.Input label='行' ref={rowRef} value={row} onChange={v=>setRow(v)}  isHalf />
				<List.Input label='列' ref={colRef} value={col} onChange={v=>setCol(v)}  isHalf />
			</div>
			<div className='fx'>
				<List.Select label='下边' ref={borderRef} data={BorderStyle} isHalf onChange={onSelectStyle} />
				<List.Select label='外侧框' ref={frameRef} data={BorderFrame} isHalf onChange={onSelectFrame} />
			</div>
			<div>
				<List.Input label='颜色' ref={colorRef} p='输入颜色' onChange={onColor}/>
			</div>
			<div className='fx'>
				<List.Switch ref={checkedRef} label='表头' onChange={onHeadChange}/>
				<List.Switch value={border} label='边框' onChange={onBorderChange}/>
			</div>
			<div className='fx'>
				<List.Button label='' name='src' text='生成表格' onClick={ceateTable} />
			</div>
		</>
	)
}