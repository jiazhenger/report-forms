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
export default ({ node, _node }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>主体</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1']}>
			<Panel header='常规选项'><Lock _node={_node} /></Panel>
			<Panel header='位置 && 大小'><Position node={node} _node={_node}/></Panel>
		</Collapse>
	</div>
)