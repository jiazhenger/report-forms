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
const { $fn } = window
// ===================================================================== page component
export default class extends React.Component {
	state = {
		model:{
			name:'dataSoruce1'
		},
		data:{ }
	}
	componentDidMount(){
		// 读取文件
		this.refs.file.onchange = e => {
			const file = e.target.files[0]
			if(file.type !== 'application/json'){ return $fn.toast('数据必须是 json 格式文件')}
			this.setState({model:{...this.state.model, url: file.name}})
			var reader = new FileReader()
			reader.readAsText(file)
			reader.onload = () => {
				this.data = JSON.parse(reader.result)
			}
		}
	}
	
	onAdd = e => {
		this.refs.modal.open()
		e.stopPropagation()
	}
	
	onChange = v => {
		this.setState({ model : {...this.state.model,...v} })
	}
	
	openFile = v => this.refs.file.click( )
	
	onOk = () => {
		if(this.data){
			const data = $fn.local('dataSource')
			const dataSource = {...data, [this.state.model.name]: this.data}
			$fn.local('dataSource', dataSource)
			this.setState({ data: dataSource})
		}else{
			$fn.toast('请先添加数据')
		}
		
	}
	
	onCancel = () => {
		
	}
	
	render(){
		const { model, data } = this.state
		return (
			<>
				<div className='abs_lt wh scroll'>
					<Collapse bordered={false} defaultActiveKey={['0']}>
						<Panel header='数据源' key={0} extra={<Button size='small' label='添加' onClick={this.onAdd} />}>
							<ul>
								
							</ul>
						</Panel>
					</Collapse>
				</div>
				<Modal ref='modal' title='新建数据源' width='40%' okText='添加数据' onOk={this.onOk} onCancel={this.onCancel} show={true}>
					<List.Input label='数据名称' value={model.name} labelWidth='100px' size='middle' name='name' onChange={this.onChange} />
					<List.Input label='外部文件或URI' value={model.url} labelWidth='100px' size='middle' onChange={this.onChange} suffix={<Button size='middle' label='打开文件' onClick={this.openFile} />} />
				</Modal>
				<input type='file' ref='file'/>
			</>
		)
	}
}