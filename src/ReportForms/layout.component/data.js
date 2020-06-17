import React from 'react'
import Async from '@com/async'
// ===================================================================== antd
import { Collapse } from 'antd'
// ===================================================================== template
import Modal from '@antd/modal'
import List from '../public.component/list'
// ===================================================================== declare
const { Panel } = Collapse
const Button  =  Async(()=>import('@antd/button'))
// ===================================================================== page component
export default class extends React.Component {
	state = {
		model:{}
	}
	componentDidMount(){
		this.refs.file.onchange = e => {
			const path = e.target.files[0]
			console.log(path.pathname)
		}
	}
	
	onAdd = e => {
		this.refs.modal.open()
		e.stopPropagation()
	}
	
	onChange = v => {
		this.setState({...this.state.model,...v})
	}
	
	openFile = v => this.refs.file.click( )
	
	render(){
		return (
			<>
				<div className='abs_lt wh scroll'>
					<Collapse bordered={false} defaultActiveKey={['0']}>
						<Panel header='数据源' key={0} extra={<Button size='small' label='添加' onClick={this.onAdd} />}>
							
						</Panel>
					</Collapse>
				</div>
				<Modal ref='modal' title='新建数据源' width='40%' okText='添加数据' show={true}>
					<List.Input label='数据名称' labelWidth='100px' size='middle' name='name' onChange={this.onChange} />
					<List.Input label='外部文件或URI' labelWidth='100px' size='middle' onChange={this.onChange} suffix={<Button size='middle' label='打开文件' onClick={this.openFile} />} />
				</Modal>
				<input type='file' ref='file'/>
			</>
		)
	}
}