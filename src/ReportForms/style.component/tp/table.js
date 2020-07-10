import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
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
const myBorder = (node, borderStyle, color) => {
	for(let v of node){
		if(borderStyle === 'none' ){
			v.style.border = borderStyle
		}else{
			v.style.removeProperty('border')
			v.style.borderBottom = '1px '+ borderStyle + (color || ' #ddd')
		}
	}
}
const myBorderColor = (node, color) => {
	for(let v of node){
		console.log(v)
		v.style.borderColor = color
	}
}
// ===================================================================== page component
export default ({ node, dragStyle }) => {
	const [ col, setCol] = React.useState(3)
	const [ row, setRow] = React.useState(1)
	const [ checked, setChecked] = React.useState(true)
	const [ border, setBorder] = React.useState(true)
	
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
	
	// 表头
	const onHeadChange = React.useCallback(v=>{
		Dom.getNode(node).then(({ $drag } ) => {
			const $table = $drag.querySelector('table')
			if($table){
				const $thead = $table.querySelector('thead')
				if($thead){
					$thead.parentNode.removeChild($thead)
				}
				if(v){ 
					Dom.createThead($table)
					for(let v of $table.querySelectorAll('th')){
						v.style.border = '1px solid ' + colorRef.current.getValue()
					}
				 }
			}else{
				setChecked(v)
			}
		})
	}, [ node ])
	const onBorderChange = React.useCallback(v=>{
		Dom.getNode(node).then(({ $drag } ) => {
			Dom.setTableBorder($drag.querySelector('table'), v)
			setBorder(v)
		})
	}, [ node ])
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
	// 设置边框
	const onSelectStyle = React.useCallback(v => {
		Dom.getNode(node).then(({ $drag } ) => {
			const $table = $drag.querySelector('table')
			$table.setAttribute('xborder', v)
			myBorder($drag.querySelectorAll('td'), v)
			myBorder($drag.querySelectorAll('th'), v)
		})
	}, [ node ])
	// 边框颜色
	const onColor = React.useCallback(v => {
		Dom.getNode(node).then(({ $drag } ) => {
			myBorderColor($drag.querySelectorAll('td'), v)
			myBorderColor($drag.querySelectorAll('th'), v)
		})
	}, [ node ])
	// 动态创建表格
	const ceateTable = React.useCallback(()=>{
		if(row <= 0){ return $fn.toast('行数必须大于 0')}
		if(col <= 0){ return $fn.toast('列数必须大于 0')}
		Dom.getNode(node).then(({ node })=>{
			node.style.height = 'auto'
			const $temp = node.querySelector('.template')
			const table = document.createElement('table')
			table.style.cssText = 'width:100%;border-collapse:collapse;border-spacing:0'
			// tbody
			const tbody = document.createElement('tbody')
			const trFragment = document.createDocumentFragment()
			for(let i=0; i< row; i++){
				const tr = document.createElement('tr')
				const tdFragment = document.createDocumentFragment()
				for(let j=0; j<col; j++){
					const td = document.createElement('td')
					td.className = 'loopNode'
					td.style.cssText = 'padding:2px 5px;'
					// td.style.cssText = 'border:1px solid #ddd;padding:2px 5px;'
					td.setAttribute('type','text')
					td.textContent = '输入内容'
					tdFragment.appendChild(td)
				}
				tr.appendChild(tdFragment)
				trFragment.appendChild(tr)
			}
			tbody.appendChild(trFragment)
			table.appendChild(tbody)
			
			// thead
			if(checked){ Dom.createThead(table) }
			Dom.setTableBorder(table, border, colorRef.current.getValue())
			// last
			$temp.innerHTML = ''
			$temp.appendChild(table)
			
			// Dom.editorNode(table.querySelectorAll('td'))
			// Dom.editorNode(table.querySelectorAll('th'))
		})
	}, [node, col, row, checked, border])
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