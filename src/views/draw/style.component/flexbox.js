import React from 'react'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== global
const { $async } = window
// ===================================================================== style component
const Position  =  $async(()=>import('./tp/position'))
const Lock  =  $async(()=>import('./tp/lock'))
const Flexbox  =  $async(()=>import('./tp/flexbox'))
const Flex  =  $async(()=>import('./tp/flex'))
const Border = $async(()=>import('./tp/border'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ _node }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>盒子</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1','2','3']}>
			<Panel header='常规选项'><Lock _node={_node}/></Panel>
			<Panel header='排版'><Flexbox _node={_node}/></Panel>
			<Panel header='边框'><Border _node={_node}/></Panel>
			<Panel header='位置 && 大小'><Position _node={_node}/></Panel>
			{ _node.parent().style('display') === 'flex' && <Panel header='子排版'><Flex _node={_node} /></Panel> }
		</Collapse>
	</div>
)