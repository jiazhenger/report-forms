import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
const Position  =  Async(()=>import('./tp/position'))
const Layout  =  Async(()=>import('./tp/layout'))
const Qrcode  =  Async(()=>import('./tp/qrcode'))
const Border  =  Async(()=>import('./tp/border'))
const Lock  =  Async(()=>import('./tp/lock'))
const Data  =  Async(()=>import('./tp/data'))
const Flex  =  Async(()=>import('./tp/flex'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ node, _node }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>二维码</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1','2','3','4','5']}>
			<Panel header='常规选项'>
				<Data _node={_node}/>
				<Lock _node={_node}/>
			</Panel>
			<Panel header='二维码'><Qrcode _node={_node}/></Panel>
			<Panel header='边框'><Border _node={_node}/></Panel>
			<Panel header='页面布局'><Layout _node={_node}/></Panel>
			<Panel header='位置 && 大小'><Position _node={_node}/></Panel>
			{ _node.parent().style('display') === 'flex' && <Panel header='排版'><Flex _node={_node} /></Panel> }
		</Collapse>
	</div>
)