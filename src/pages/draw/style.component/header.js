import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
const Position  =  Async(()=>import('./tp/position'))
const Lock  =  Async(()=>import('./tp/lock'))
const Layout  =  Async(()=>import('./tp/layout'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ _node }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>页眉</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1','2']}>
			<Panel header='常规选项'><Lock _node={_node}/></Panel>
			<Panel header='页面布局'><Layout _node={_node}/></Panel>
			<Panel header='位置 && 大小'><Position _node={_node}/></Panel>
		</Collapse>
	</div>
)