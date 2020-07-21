import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import Table from '../../js/public/table'
import _ from '../../js/public/jzer'
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
export default ({ _node }) => {
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
		if(_node){
			const _table = _node.find('table')
			if(_table.el){
				
				const $tbody = _table.find('tbody')
				const $tr = $tbody.find('tr')
				const trLen = $tbody.finds('tr').el.length
				const tdLen = $tr.finds('td').el.length
				const $td = $tr.find('td')
				let color = $td.style('borderColor')
				if(!color){
					color = $td.style('borderBottomColor')
				}
			
				const hasHead = Boolean(_table.find('thead').el)
				rowRef.current.setValue(trLen)
				colRef.current.setValue(tdLen)
				colorRef.current.setValue(color)
				frameRef.current.setValue(_table.attr('xframe'))
				borderRef.current.setValue(_table.attr('xborder'))
				checkedRef.current.setValue(hasHead)
				
				setRow(trLen)
				setCol(tdLen)
				setChecked(hasHead)
			}
		}
	},[ _node ])
	
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
		Dom.getNodeInfo(_node).then(({ _drag } ) => {
			const _table = _drag.find('table').attr('xframe', v)
			Table.showHideBorder(_table, borderRef.current.getValue(), colorRef.current.getValue())
			if(v === 'hsides' || v === 'box'){
				_table.find('tr').first().style('borderleft', 0)
				_table.find('tr').last().style('borderRight', 0)
			}
			if(v === 'vsides' || v === 'box'){
				if(checked){
					_table.find('thead').finds('th').style('borderTop', 0)
				}else{
					_table.first().finds('td').style('borderTop', 0)
				}
				_table.find('tbody').last().finds('td').style('borderBottom', 0)
			}
		})
	}, [ _node, checked ])
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
						className:'loopNode',
						attr:{ type:'text', }
					}
				}
			})
			// last
			_temp.html('').append(table)
			Table.showHideBorder(_(table), border, colorRef.current.getValue())
		})
	}, [_node, col, row, border])
	// 添加行
	const addRow = React.useCallback(v => {
		Dom.getNodeInfo(_node).then(({ _temp } ) => {
			const _table = _temp.find('table')
			Table.addRow(_table, {
				td:{
					style:{
						...tableConfig.style,
						borderColor: _table.find('tbody').find('td').style('borderColor')
					},
					className:'loopNode',
					attr:{ type:'text' }
				}
			})
		})
	}, [ _node ])
	// 添加行
	const delRow = React.useCallback(v => {
		Dom.getNodeInfo(_node).then(({ _temp } ) => {
			Table.delRow(_temp.find('table'))
		})
	}, [ _node ])
	// 添加列
	const addCol = React.useCallback(v => {
		Dom.getNodeInfo(_node).then(({ _temp } ) => {
			const _table = _temp.find('table')
			const style = tableConfig.style
			const borderColor = _table.find('tbody').find('td').style('borderColor')
			Table.addCol(_table, {
				thead:{
					th: {
						style:{
							background:'#f5f5f5',
							...style,
							borderColor
						},
						className:'loopNode',
						attr:{ type:'text' }
					}
				},
				tbody:{
					td:{
						style:{
							...style,
							borderColor
						},
						className:'loopNode',
						attr:{ type:'text' }
					}
				}
			})
		})
	}, [ _node ])
	
	// 删除列
	const delCol = React.useCallback(v => {
		Dom.getNodeInfo(_node).then(({ _temp } ) => {
			Table.delCol(_temp.find('table'))
		})
	}, [ _node ])
	
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
				<List.Button label='' text='生成表格' width={65} onClick={ceateTable} />
				<List.Button text='添加行' width={65} onClick={addRow} />
				<List.Button text='添加列' width={65} onClick={addCol} />
			</div>
			<div className='fx'>
				<List.Button label='' text='删除行' width={65} onClick={delRow} />
				<List.Button text='删除列' width={65} onClick={delCol} />
			</div>
		</>
	)
}