import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data
const { $fn } = window

// ===================================================================== page component
export default ({ node, dragStyle }) => {
	const [ col, setCol] = React.useState(3)
	const [ row, setRow] = React.useState(1)
	const [ checked, setChecked] = React.useState(true)
	const [ border, setBorder] = React.useState(true)
	//
	const onHeadChange = React.useCallback(v=>{
		setChecked(v)
		Dom.getNode(node).then(({ $drag } ) => {
			const $table = $drag.querySelector('table')
			if($table){
				if(v){
					Dom.createThead($table)
				}else{
					const $thead = $table.querySelector('thead')
					if($thead){
						$thead.parentNode.removeChild($thead)
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
	// 动态创建表格
	const ceateTable = React.useCallback(()=>{
		if(row <= 0){ return $fn.toast('行数必须大于 0')}
		if(col <= 0){ return $fn.toast('列数必须大于 0')}
		Dom.getNode(node).then(({ node })=>{
			node.style.height = 'auto'
			const $temp = node.querySelector('.template')
			const table = document.createElement('table')
			// tbody
			const tbody = document.createElement('tbody')
			const trFragment = document.createDocumentFragment()
			for(let i=0; i< row; i++){
				const tr = document.createElement('tr')
				const tdFragment = document.createDocumentFragment()
				for(let j=0; j<col; j++){
					const td = document.createElement('td')
					td.className = 'loopNode'
					td.style.cssText = 'border:1px solid #ddd;height:30px;padding:4px 5px;'
					td.setAttribute('type','text')
					tdFragment.appendChild(td)
				}
				tr.appendChild(tdFragment)
				trFragment.appendChild(tr)
			}
			tbody.appendChild(trFragment)
			table.appendChild(tbody)
			
			// thead
			if(checked){ Dom.createThead(table) }
			Dom.setTableBorder(table, border)
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
				<List.Input label='行' value={row} onChange={v=>setRow(v)}  isHalf />
				<List.Input label='列' value={col} onChange={v=>setCol(v)}  isHalf />
			</div>
			<div className='fx'>
				<List.Switch value={checked} label='表头' onChange={onHeadChange}/>
				<List.Switch value={border} label='边框' onChange={onBorderChange}/>
			</div>
			<div className='fx'>
				<List.Button label='' name='src' text='生成表格' onClick={ceateTable} />
			</div>
		</>
	)
}