import React from 'react'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data
const { $fn } = window
// ===================================================================== page component
export default ({ node, dragStyle }) => {
	const [ col, setCol] = React.useState(2)
	const [ row, setRow] = React.useState(2)
	// 动态创建表格
	const ceateTable = React.useCallback(()=>{
		if(row <= 0){ return $fn.toast('行数必须大于 0')}
		if(col <= 0){ return $fn.toast('列数必须大于 0')}
		if(node){
			node.style.height = 'auto'
			const $temp = node.querySelector('.template')
			const table = document.createElement('table')
			const tbody = document.createElement('tbody')
			tbody.style.cssText = 'border-collapse:collapse;'
			const trFragment = document.createDocumentFragment()
			for(let i=0; i< row; i++){
				const tr = document.createElement('tr')
				const tdFragment = document.createDocumentFragment()
				for(let j=0; j<col; j++){
					const td = document.createElement('td')
					td.style.cssText = 'border:1px solid #ddd;height:30px;padding:4px 5px;box-sizing:border-box;'
					tdFragment.appendChild(td)
				}
				tr.appendChild(tdFragment)
				trFragment.appendChild(tr)
			}
			tbody.appendChild(trFragment)
			table.appendChild(tbody)
			$temp.innerHTML = ''
			$temp.appendChild(table)
			
			const td = [].slice.call(table.querySelectorAll('td'))
			td.forEach(v=>{
				v.ondblclick = function(){
					this.contentEditable = true
					this.focus()
				}
				v.onblur = function(){
					this.contentEditable = false
				}
			})
			
		}else{
			window.$fn.toast('未选中目标')
		}
	}, [node, col, row])
	return (
		<>
			<div className='fx'>
				<List.Input label='行' value={row} onChange={v=>setRow(v)}  isHalf />
				<List.Input label='列' value={col} onChange={v=>setCol(v)}  isHalf />
			</div>
			<div className='fx'>
				<List.Button label='' name='src' text='生成表格' onClick={ceateTable} />
			</div>
		</>
	)
}