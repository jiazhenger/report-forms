import React from 'react'
// ===================================================================== js
import Dom from '../../js/public/dom'
import _ from '../../js/public/jzer'
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
const BorderStyle = [
	{ label:'无', 			value:'none' },
	{ label:'实', 			value:'solid' },
	{ label:'虚线', 			value:'dashed' },
	{ label:'点线', 			value:'dotted' },
]
// ===================================================================== page component
export default ({ _node }) => {
	const [ row, setRow] = React.useState(2)
	const [ value, setValue] = React.useState('decimal')
	// 选择列表样式
	const onSelectType = React.useCallback(v=>{
		Dom.getNodeInfo(_node).then(({ _temp }) => {
			_temp.find('ul').style('listStyleType',v)
			setValue(v)
		})
	}, [_node])
	// 选择
	const onChange = React.useCallback(v => {
		Dom.getNodeInfo(_node).then(({ _temp }) => {
			const { key, value } = _.getKeyValue(v)
			_temp.find('li').style([key],value)
		})
	}, [_node])
	// 动态创建列表
	const createList = React.useCallback(()=>{
		if(row <= 0){ return $fn.toast('行数必须大于 0')}
		Dom.getNodeInfo(_node).then(({ _temp,_drag }) => {
			_drag.removeStyle('height')
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
			_temp.html('').append(ul)
		})
	}, [_node, row, value])
	return (
		<>
			<div className='fx'>
				<List.Input label='列数' value={row} onChange={v=>setRow(v)}  isHalf /> 
				<List.Select label='样式' value={value} data={ListType} p='选择样式' isHalf onChange={onSelectType} />
			</div>
			<div className='fx'>
				<List.Select label='下边线' value='dashed' data={BorderStyle} p='选择样式' isHalf name='borderBottomStyle' onChange={onChange} />
				<List.Input label='颜色' p='颜色' isHalf name='borderBottomColor' onChange={onChange} />
			</div>
			<div className='fx'>
				<List.Button label='' name='src' text='生成列表' onClick={createList} />
			</div>
		</>
	)
}