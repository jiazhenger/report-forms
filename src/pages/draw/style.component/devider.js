import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
const Position  =  Async(()=>import('./tp/position'))
const Layout  =  Async(()=>import('./tp/layout'))
const Devider  =  Async(()=>import('./tp/devider'))
const Lock  =  Async(()=>import('./tp/lock'))
const Flex  =  Async(()=>import('./tp/flex'))
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