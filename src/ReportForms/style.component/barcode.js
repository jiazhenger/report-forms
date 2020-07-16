import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
import List from '../public.component/list'

const Position  =  Async(()=>import('./tp/position'))
const Layout  =  Async(()=>import('./tp/layout'))
const Barcode  =  Async(()=>import('./tp/barcode'))
const Border  =  Async(()=>import('./tp/border'))
const Lock  =  Async(()=>import('./tp/lock'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default ({ node, dragStyle, tempStyle, tempAttr }) => (
	<div className='abs_lt wh scroll'>
		<h5 className='control-title'>条形码</h5>
		<Collapse bordered={false} defaultActiveKey={['0','1','2','3','4']}>
			<Panel header='常规选项'>
				<List.Input label='名称' value='条形码' />
				<List.Input label='数据' />
				<Lock node={node} />
			</Panel>
			<Panel header='条形码'><Barcode node={node}/></Panel>
			<Panel header='边框'><Border node={node}/></Panel>
			<Panel header='位置 && 大小'><Position node={node} /></Panel>
			<Panel header='页面布局'><Layout node={node}/></Panel>
		</Collapse>
	</div>
)