import React from 'react'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== global
const { $async } = window
// ===================================================================== style component
const Position  =  $async(()=>import('./tp/position'))
const Layout  =  $async(()=>import('./tp/layout'))
const Devider  =  $async(()=>import('./tp/devider'))
const Lock  =  $async(()=>import('./tp/lock'))
const Flex  =  $async(()=>import('./tp/flex'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ node, _node }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>列表</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1','2','3','5']}>
			<Panel header='常规选项'>
				<Lock _node={_node}/>
			</Panel>
			<Panel header='分割线'><Devider node={node} _node={_node}/></Panel>
			<Panel header='页面布局'><Layout node={node} _node={_node}/></Panel>
			<Panel header='位置 && 大小'><Position node={node} _node={_node} /></Panel>
			{ _node.parent().style('display') === 'flex' && <Panel header='排版'><Flex _node={_node} /></Panel> }
		</Collapse>
	</div>
)