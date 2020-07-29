import React from 'react'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== global
const { $async } = window
// ===================================================================== style component
const Position  =  $async(()=>import('./tp/position'))
const Lock  =  $async(()=>import('./tp/lock'))
const Layout  =  $async(()=>import('./tp/layout'))
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