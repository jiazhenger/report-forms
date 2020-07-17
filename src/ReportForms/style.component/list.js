import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
import List from '../public.component/list'

const UL  =  Async(()=>import('./tp/ul'))
const Position  =  Async(()=>import('./tp/position'))
const Layout  =  Async(()=>import('./tp/layout'))
const Font  =  Async(()=>import('./tp/font'))
const Lock  =  Async(()=>import('./tp/lock'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ node, _node }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>列表</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1','2','3','4']}>
			<Panel header='常规选项'>
				<List.Input label='名称' value='列表' />
				<List.Input label='数据' />
				<Lock _node={_node}/>
			</Panel>
			<Panel header='生成列表'><UL node={node} _node={_node}/></Panel>
			<Panel header='文本字体'><Font node={node} _node={_node}/></Panel>
			<Panel header='位置 && 大小'><Position node={node} _node={_node}/></Panel>
			<Panel header='页面布局'><Layout node={node} _node={_node}/></Panel>
		</Collapse>
	</div>
)