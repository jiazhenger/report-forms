import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
import List from './tp/list'


const Position  =  Async(()=>import('./tp/position'))
const Layout  =  Async(()=>import('./tp/layout'))
const Img  =  Async(()=>import('./tp/img'))
// ===================================================================== declare
const { Panel } = Collapse
// ===================================================================== page component
export default class extends React.Component {	
	componentDidMount(){
		
	}
	
	render(){
		const { parent, dragStyle, tempStyle } = this.props
		return (
			<div className='abs_lt wh scroll'>
				<h5 className='control-title'>图片</h5>
				<Collapse bordered={false} defaultActiveKey={['0','1','2','3']}>
					<Panel header='常规选项'>
						<List.Input label='名称' value='图片' />
						<List.Input label='数据' />
					</Panel>
					<Panel header='图片配置'><Img parent={parent} /></Panel>
					<Panel header='位置 && 大小'><Position parent={parent} dragStyle={dragStyle} /></Panel>
					<Panel header='页面布局'><Layout parent={parent}  tempStyle={tempStyle}/></Panel>
				</Collapse>
			</div>
		)
	}
}