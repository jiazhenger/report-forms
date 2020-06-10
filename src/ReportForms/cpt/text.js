import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
import List from './tp/list'

const Font  =  Async(()=>import('./tp/font'))
const Position  =  Async(()=>import('./tp/position'))
const Layout  =  Async(()=>import('./tp/layout'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default class extends React.Component {	
	componentDidMount(){
		
	}
	
	render(){
		const { parent } = this.props
		return (
			<div className='abs_lt wh scroll'>
				<Collapse bordered={false} defaultActiveKey={['0','1','2','3']}>
					<Panel header='常规选项'>
						<List.Input label='名称' value='文本框' />
						<List.Input label='数据' />
					</Panel>
					<Panel header='文本字体'><Font parent={parent} /></Panel>
					<Panel header='位置 && 大小'><Position parent={parent} /></Panel>
					<Panel header='页面布局'><Layout parent={parent} /></Panel>
				</Collapse>
			</div>
		)
	}
}