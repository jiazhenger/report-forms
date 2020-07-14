import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
const Position  =  Async(()=>import('./tp/position'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ node }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>页眉</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1']}>
			<Panel header='常规选项'></Panel>
			<Panel header='位置 && 大小'><Position node={node} /></Panel>
		</Collapse>
	</div>
)