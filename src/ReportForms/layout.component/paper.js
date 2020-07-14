import React from 'react'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
import List from '../public.component/list'
import { Paper } from '../js/public/paper'
// ===================================================================== declare
const { Panel } = Collapse
const { $fn } = window
// ===================================================================== page component
export default ({ paperParam, onChange }) => {
	const [ value, setValue ] = React.useState()
	const heightRef = React.useRef()
	const nameRef = React.useRef()
	const widthRef = React.useRef()
	
	React.useEffect(()=>{
		let paperWidth = paperParam.width
		let paperHeight = paperParam.height
		let paperFormat = paperParam.format
		let paperName = paperParam.name
		const paper = $fn.local('paper')
		if($fn.hasObject(paper)){
			paperWidth = paper.width
			paperHeight = paper.height
			paperFormat = paper.format
			if(paper.name){
				paperName = paper.name
			}
		}
		
		const myHeight = $fn.local('myHeight')
		const myWidth = $fn.local('myWidth')
		if(myHeight){ paperHeight = myHeight }
		if(myWidth) { paperWidth = myWidth}
		
		heightRef.current.setValue(parseInt(paperHeight))
		widthRef.current.setValue(parseInt(paperWidth))
		
		nameRef.current.setValue(paperName)
		setValue(paperFormat)
	},[ paperParam ])
	
	const selectPaper = React.useCallback(v=>{
		const $paper = document.querySelector('#paper')
		const arr = v.split('*')
		if($fn.hasArray(arr)){
			const value = {format:arr[0], width: arr[1], height:arr[2]}
			
			$paper.style.width = value.width
			$paper.style.height = value.height
			$fn.remove('myWidth',value)
			$fn.remove('myHeight',value)
			widthRef.current.setValue(parseInt(value.width))
			heightRef.current.setValue(parseInt(value.height))
			
			$fn.local('paper',value)
			onChange && onChange()
		}
	}, [ onChange ])
	
	const selectHeight = React.useCallback(v=>{
		const $paper = document.querySelector('#paper')
		if(isNaN(+v) || +v === 0){
			const paper = $fn.local('paper')
			if($fn.hasObject(paper)){
				$paper.style.height =  paper.height
			}
			heightRef.current.setValue(paper.height)
			$fn.remove('myWidth')
			$fn.remove('myHeight')
		}else{
			const h = v + 'px'
			$paper.style.height = h
			$fn.local('myHeight', h)
		}
		onChange && onChange()
	}, [ onChange ])
	
	const selectWidth = React.useCallback(v=>{
		const $paper = document.querySelector('#paper')
		if(isNaN(+v) || +v === 0){
			const paper = $fn.local('paper')
			if($fn.hasObject(paper)){
				$paper.style.width =  paper.width
			}
			widthRef.current.setValue(paper.width)
			$fn.remove('myWidth')
			$fn.remove('myHeight')
		}else{
			const h = v + 'px'
			$paper.style.width = h
			$fn.local('myWidth', h)
		}
		onChange && onChange()
	}, [ onChange ])
	
	const onChangName = React.useCallback(v=>{
		const paper = $fn.local('paper') || {}
		paper.name = v
		$fn.local('paper',paper)
	}, [ ])
	
	return (
		<div className='abs_lt wh scroll'>
			<h5 className='control-title'>报表</h5>
			<Collapse bordered={false} defaultActiveKey={['0','1','2','3']}>
				<Panel header='常规选项'>
					<div>
						<List.Select value={value} label='纸张' data={Paper} p='选择纸张' onChange={selectPaper} />
					</div>
					<div>
						<List.Input ref={widthRef} label='宽度' onChange={selectWidth} />
						<List.Input ref={heightRef} label='高度' onChange={selectHeight} />
					</div>
					<div>
						<List.Input ref={nameRef} label='名称' p='报表名称' onChange={onChangName} />
					</div>
				</Panel>
			</Collapse>
		</div>
	)
}