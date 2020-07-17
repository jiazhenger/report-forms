import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
import List from '../public.component/list'

const Position  =  Async(()=>import('./tp/position'))
const Layout  =  Async(()=>import('./tp/layout'))
const Img  =  Async(()=>import('./tp/img'))
const Border  =  Async(()=>import('./tp/border'))
const Lock  =  Async(()=>import('./tp/lock'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ node, _node }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>图片</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1','2','3','4']}>
			<Panel header='常规选项'>
				<List.Input label='名称' value='图片' />
				<List.Input label='数据' />
				<Lock _node={_node}/>
			</Panel>
			<Panel header='图片配置'><Img node={node} _node={_node}/></Panel>
			<Panel header='边框'><Border node={node} _node={_node}/></Panel>
			<Panel header='页面布局'><Layout node={node} _node={_node}/></Panel>
			<Panel header='位置 && 大小'><Position node={node} _node={_node} /></Panel>
		</Collapse>
	</div>
)