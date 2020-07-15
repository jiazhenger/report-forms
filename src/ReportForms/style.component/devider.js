import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
import List from '../public.component/list'

const Position  =  Async(()=>import('./tp/position'))
const Layout  =  Async(()=>import('./tp/layout'))
const Devider  =  Async(()=>import('./tp/devider'))
const Lock  =  Async(()=>import('./tp/lock'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ node, dragStyle, tempStyle }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>列表</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1','2','3']}>
			<Panel header='常规选项'>
				<List.Input label='名称' value='列表' />
				<List.Input label='数据' />
				<Lock node={node} />
			</Panel>
			<Panel header='分割线'><Devider node={node} /></Panel>
			<Panel header='页面布局'><Layout node={node} tempStyle={tempStyle}/></Panel>
			<Panel header='位置 && 大小'><Position node={node} dragStyle={dragStyle} /></Panel>
		</Collapse>
	</div>
)