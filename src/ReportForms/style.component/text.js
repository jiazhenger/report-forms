import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
import List from '../public.component/list'

const Font  =  Async(()=>import('./tp/font'))
const Position  =  Async(()=>import('./tp/position'))
const Layout  =  Async(()=>import('./tp/layout'))
const Lock  =  Async(()=>import('./tp/lock'))
const Border  =  Async(()=>import('./tp/border'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ node, tempStyle }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>文本</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1','2','3']}>
			<Panel header='常规选项'>
				<List.Input label='名称' value='文本框' />
				<List.Input label='数据' />
				<Lock node={node} />
			</Panel>
			<Panel header='文本字体'><Font node={node} /></Panel>
			<Panel header='边框'><Border node={node} /></Panel>
			<Panel header='位置 && 大小'><Position node={node} /></Panel>
			<Panel header='页面布局'><Layout node={node}  /></Panel>
		</Collapse>
	</div>
)