import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
const Position  =  Async(()=>import('./tp/position'))
const Layout  =  Async(()=>import('./tp/layout'))
const Barcode  =  Async(()=>import('./tp/barcode'))
const Border  =  Async(()=>import('./tp/border'))
const Lock  =  Async(()=>import('./tp/lock'))
const Data  =  Async(()=>import('./tp/data'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ node, _node }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>条形码</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1','2','3','4']}>
			<Panel header='常规选项'>
				<Data _node={_node}/>
				<Lock _node={_node}/>
			</Panel>
			<Panel header='条形码'><Barcode _node={_node}/></Panel>
			<Panel header='边框'><Border _node={_node}/></Panel>
			<Panel header='位置 && 大小'><Position _node={_node}/></Panel>
			<Panel header='页面布局'><Layout node={node} _node={_node}/></Panel>
		</Collapse>
	</div>
)