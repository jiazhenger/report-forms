import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
const Font  =  Async(()=>import('./tp/font'))
const Position  =  Async(()=>import('./tp/position'))
const Layout  =  Async(()=>import('./tp/layout'))
const Checkbox  =  Async(()=>import('./tp/checkbox'))
const Lock  =  Async(()=>import('./tp/lock'))
const Data  =  Async(()=>import('./tp/data'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ node, _node}) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>文本</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1','2','3']}>
			<Panel header='常规选项'>
				<Data _node={_node}/>
				<Lock _node={_node}/>
			</Panel>
			<Panel header='选择框'><Checkbox node={node} _node={_node}/></Panel>
			<Panel header='文本字体'><Font node={node} _node={_node}/></Panel>
			<Panel header='位置 && 大小'><Position node={node} _node={_node}/></Panel>
			<Panel header='页面布局'><Layout node={node} _node={_node}/></Panel>
		</Collapse>
	</div>
)