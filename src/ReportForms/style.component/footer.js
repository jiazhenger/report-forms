import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
const Position  =  Async(()=>import('./tp/position'))
const Lock  =  Async(()=>import('./tp/lock'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ node }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>页脚</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1']}>
			<Panel header='常规选项'><Lock node={node} /></Panel>
			<Panel header='位置 && 大小'><Position node={node} /></Panel>
		</Collapse>
	</div>
)