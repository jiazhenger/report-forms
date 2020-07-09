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
export default ({ $paper, $drag, onSelectPaper }) => {
	const [ value, setValue ] = React.useState('A4')
	React.useEffect(()=>{
		const value = $fn.local('paper')
		if($fn.hasObject(value)){
			setValue(value.format)
		}
	},[ onSelectPaper ])
	const selectPaper = React.useCallback(v=>{
		const arr = v.split('*')
		if($fn.hasArray(arr)){
			const value = {format:arr[0], width: arr[1], height:arr[2]}
			onSelectPaper && onSelectPaper(value)
			$fn.local('paper',value)
		}
	}, [ onSelectPaper ])
	return (
		<div className='abs_lt wh scroll'>
			<h5 className='control-title'>报表</h5>
			<Collapse bordered={false} defaultActiveKey={['0','1','2','3']}>
				<Panel header='常规选项'>
					<div>
						{/*<List.Select value={ratio} label='分辨率' data={Ratio} p='选择屏幕分辨率' onChange={onSelectRatio} />*/}
						<List.Select value={value} label='纸张' data={Paper} p='选择纸张' onChange={selectPaper} />
					</div>
					{/*
						<div>
							<List.Switch label='页眉' ref={fixedHeaderRef}  onChange={onFixedHeader}/>
							<List.Switch label='页脚' ref={fixedFooterRef}  onChange={onFixedHeader}/>
						</div>
					*/}
				</Panel>
			</Collapse>
		</div>
	)
}