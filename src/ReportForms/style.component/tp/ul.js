import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
// ===================================================================== template
import List from '../../public.component/list'
// ===================================================================== data
const { $fn } = window
const ListType = [
	{ label:'无', 			value:'none' },
	{ label:'实心圆', 		value:'disc' },
	{ label:'空心圆', 		value:'circle' },
	{ label:'数字', 			value:'decimal' },
	{ label:'小写字母', 		value:'lower-alpha' },
	{ label:'大写字母', 		value:'upper-alpha' },
	{ label:'汉字',			value:'cjk-ideographic' }
]
// ===================================================================== page component
export default ({ node }) => {
	const [ row, setRow] = React.useState(2)
	const [ value, setValue] = React.useState('decimal')
	// 选择列表样式
	const onSelectType = React.useCallback(v=>{
		if(node){
			const ul = node.querySelector('ul')
			if(ul){
				ul.style.listStyleType = v
			}
		}
		setValue(v)
	}, [node])
	// 动态创建列表
	const createList = React.useCallback(()=>{
		if(row <= 0){ return $fn.toast('行数必须大于 0')}
		Dom.getNode(node).then(({ node })=>{
			node.style.height = 'auto'
			const $temp = node.querySelector('.template')
			const ul = document.createElement('ul')
			ul.style.cssText = `width:100%;padding-left:2em;list-style:outside ${value}`
			const fragment = document.createDocumentFragment()
			for(let i=0; i<row; i++){
				const li = document.createElement('li')
				li.className = 'loopNode'
				li.style.cssText = 'padding:5px 0;border-bottom:1px dashed #eee;'
				li.setAttribute('type','text')
				fragment.appendChild(li)
			}
			ul.appendChild(fragment)
			// last
			$temp.innerHTML = ''
			$temp.appendChild(ul)
		})
	}, [node, row, value])
	return (
		<>
			<div className='fx'>
				<List.Input label='列数' value={row} onChange={v=>setRow(v)}  isHalf /> 
				<List.Select label='样式' value={value} data={ListType} p='选择样式' isHalf onChange={onSelectType} />
			</div>
			<div className='fx'>
				<List.Button label='' name='src' text='生成列表' onClick={createList} />
			</div>
		</>
	)
}