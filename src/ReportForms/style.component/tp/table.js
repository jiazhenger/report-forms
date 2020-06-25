import React from 'react'
// ===================================================================== js
// import Dom from '../../js/public/dom'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data
const { $fn } = window
// ===================================================================== page component
export default ({ node, dragStyle }) => {
	const [ col, setCol] = React.useState(3)
	const [ row, setRow] = React.useState(1)
	const [ checked, setChecked] = React.useState(true)
	const theadRef = React.useRef()
	//
	const onHeadChange = React.useCallback(v=>{
		setChecked(v)
	}, [ ])
	// 动态创建表格
	const ceateTable = React.useCallback(()=>{
		if(row <= 0){ return $fn.toast('行数必须大于 0')}
		if(col <= 0){ return $fn.toast('列数必须大于 0')}
		if(node){
			node.style.height = 'auto'
			const $temp = node.querySelector('.template')
			const table = document.createElement('table')
			table.style.cssText = 'border-collapse:collapse;'
			// thead
			if(checked){
				const thead = document.createElement('thead') 			// thead
				const trThead = document.createElement('tr')			// tr
				const thFragment = document.createDocumentFragment()	// th
				for(let i=0; i<col; i++){
					const th = document.createElement('th')
					th.style.cssText = 'border:1px solid #ddd;height:30px;padding:4px 5px;background:#f5f5f5'
					th.setAttribute('type','text')
					thFragment.appendChild(th)
				}
				trThead.appendChild(thFragment)
				thead.appendChild(trThead)
				table.appendChild(thead)
			}
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
			// last
			$temp.innerHTML = ''
			$temp.appendChild(table)
			
			// Dom.editorNode(table.querySelectorAll('td'))
			// Dom.editorNode(table.querySelectorAll('th'))
		}else{
			window.$fn.toast('未选中目标')
		}
	}, [node, col, row, checked])
	return (
		<>
			<div className='fx'>
				<List.Input label='行' value={row} onChange={v=>setRow(v)}  isHalf />
				<List.Input label='列' value={col} onChange={v=>setCol(v)}  isHalf />
			</div>
			<div className='fx'>
				<List.Switch value={checked} label='表头' ref={theadRef} onChange={onHeadChange}/>
			</div>
			<div className='fx'>
				<List.Button label='' name='src' text='生成表格' onClick={ceateTable} />
			</div>
		</>
	)
}