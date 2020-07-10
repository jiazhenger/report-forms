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
export default ({ onSelectPaper, onChange }) => {
	const [ value, setValue ] = React.useState('A4')
	const heightRef = React.useRef()
	React.useEffect(()=>{
		const $paper = document.querySelector('#paper')
		if($paper){
			let height = 0
			const paper = $fn.local('paper')
			if($fn.hasObject(paper)){
				setValue(paper.format)
				height = paper.height
				$paper.style.width =  paper.width
			}
			
			height = $fn.local('myHeight')
			
			if(height){
				$paper.style.height = height
			}
			
			onChange && onChange()
			
			heightRef.current.setValue($paper.clientHeight)
		}
	},[ onChange ])
	const selectPaper = React.useCallback(v=>{
		const $paper = document.querySelector('#paper')
		const arr = v.split('*')
		if($fn.hasArray(arr)){
			const value = {format:arr[0], width: arr[1], height:arr[2]}
			
			$paper.style.width = value.width
			$paper.style.height = value.height
			$fn.remove('myHeight',value)
			heightRef.current.setValue(value.height)
			
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
			$fn.remove('myHeight')
		}else{
			const h = v + 'px'
			$paper.style.height = h
			$fn.local('myHeight', h)
		}
		onChange && onChange()
	}, [ onChange ])
	
	return (
		<div className='abs_lt wh scroll'>
			<h5 className='control-title'>报表</h5>
			<Collapse bordered={false} defaultActiveKey={['0','1','2','3']}>
				<Panel header='常规选项'>
					<div>
						<List.Select value={value} label='纸张' data={Paper} p='选择纸张' onChange={selectPaper} />
					</div>
					<div>
						<List.Input ref={heightRef} label='高度' p='选择纸张' onChange={selectHeight} />
					</div>
				</Panel>
			</Collapse>
		</div>
	)
}