import React from 'react'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== global
const { $async } = window
// ===================================================================== style component
const Position  =  $async(()=>import('./tp/position'))
const Layout  =  $async(()=>import('./tp/layout'))
const Img  =  $async(()=>import('./tp/img'))
const Border  =  $async(()=>import('./tp/border'))
const Lock  =  $async(()=>import('./tp/lock'))
const Data  =  $async(()=>import('./tp/data'))
const Flex  =  $async(()=>import('./tp/flex'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ _node }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>图片</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1','2','3','4','5']}>
			<Panel header='常规选项'>
				<Data _node={_node}/>
				<Lock _node={_node}/>
			</Panel>
			<Panel header='图片配置'><Img _node={_node}/></Panel>
			<Panel header='边框'><Border _node={_node}/></Panel>
			<Panel header='页面布局'><Layout _node={_node}/></Panel>
			<Panel header='位置 && 大小'><Position _node={_node} /></Panel>
			{ _node.parent().style('display') === 'flex' && <Panel header='排版'><Flex _node={_node} /></Panel> }
		</Collapse>
	</div>
)