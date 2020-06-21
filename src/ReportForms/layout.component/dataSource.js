import React from 'react'
import Async from '@com/async'
// ===================================================================== public js
import Dom from '../js/public/dom'
import Format from '../js/public/format'
// ===================================================================== antd
import { Collapse } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
// ===================================================================== template
import Modal from '@antd/modal'
import Confirm from '@antd/confirm'
import List from '../public.component/list'
// ===================================================================== declare
const { Panel } = Collapse
const Button  =  Async(()=>import('@antd/button'))
const { $fn } = window

// ===================================================================== page component
const model = { name:'dataSoruce1', url:'' }
export default class extends React.Component {
	state = {
		model: JSON.parse(JSON.stringify(model)),
		firstSource:{},
		data:{}
	}
	componentDidMount(){
		// 读取文件
		this.refs.file.onchange = e => {
			const file = e.target.files[0]
			if(file.type !== 'application/json'){ return $fn.toast('数据必须是 json 格式文件')}
			this.setState({model:{...this.state.model, url: file.name}}, () => {
				this.refs.url.setValue(file.name)
			})
			
			var reader = new FileReader()
			reader.readAsText(file)
			reader.onload = () => {
				this.newData = JSON.parse(reader.result)
			}
		}
		this.setState({ data: $fn.local('dataSource') })
		// 清除查看数据
		document.addEventListener('mouseup',e=>{
			const t = Dom.parents(e.target,'drag')
			if(t){
				const field = Format.getField(t.getAttribute('data-url'))
				if(field){
					const a = field[0] ? field[0] : null
					const b = field[1] ? field[1] : null
					this.setState({
						firstField:a, 
						firstSource:this.state.data[a], 
						secondField:b, 
						secondData:this.state.firstSource[b],
					})
				}
			}else{
				this.setState({firstField:null, firstSource:{}, secondField:null, secondData:{}})
			}
		})
	}
	
	onAdd = e => {
		this.refs.modal.open()
		e.stopPropagation()
	}
	
	onChange = v => {
		this.setState({ model : {...this.state.model,...v} })
	}
	
	openFile = v => this.refs.file.click( )
	// 添加数据
	addNewData = () => {
		if(this.newData){
			const data = $fn.local('dataSource')
			const { name } = this.state.model
			
			if(data.hasOwnProperty(name)){
				return $fn.toast('数据源已存在')
			}
			
			const dataSource = {...data, [name]: this.newData}
			$fn.local('dataSource', dataSource)
			this.setState({ data: dataSource}, ()=>{
				this.refs.modal.close()
				this.onCancel()
			})
		}else{
			$fn.toast('请先添加数据')
		}
	}
	
	onCancel = () => {
		this.setState({ model }, ()=>{
			this.refs.name.setValue(model.name)
			this.refs.url.setValue(model.url)
		})
	}
	
	// 删除数据源
	onDel(e,v){
		console.log(e)
		this.refs.comfirm.open()
		this.delName = v
		e.stopPropagation()
	}
	onOk = () => {
		delete this.state.data[this.delName]
		this.refs.comfirm.close()
		$fn.local('dataSource', this.state.data)
		if(this.state.firstField === this.delName){
			this.setState({firstField:null, firstSource:{}, secondField:null, secondData:{}})
		}
		this.delName = null
	}
	// 选择数据
	selectData(v){
		this.setVisitUrl((node,type) =>{
			if(this.state.firstField !== v){
				const firstSource = this.state.data[v]
				this.setState({ 
					firstField: v, 
					firstSource: $fn.hasObject(firstSource) ? firstSource : firstSource[0],
					secondField:null, 
					secondData:{}
				})
				this.visitUrl = v
			}else{
				this.setState({firstField:null, firstSource:{}, secondField:null, secondData:{}})
				this.visitUrl = ''
			}
			if(type === 'text'){
				node.textContent = ''
			}else if(type === 'img'){
				node.querySelector('img').src = window.location.origin +'/assets/images/img.png'
			}
		})
	}
	// 选择字段
	selectField(v){
		this.setVisitUrl((node, type) =>{
			if(this.state.secondField !== v){
				this.setState({ secondField: v, secondData: this.state.data[v] })
				this.visitUrl = this.state.firstField + '/' + v
			}else{
				this.setState({ secondField: null, secondData: null })
				this.visitUrl = this.visitUrl.replace('/' + v, '')
			}
			const rs = Format.getData(this.state.data,this.visitUrl)
			if(type === 'text'){
				node.textContent = $fn.isString(rs) ? rs : ''
			}else if( type === 'img'){
				node.querySelector('img').src = $fn.isString(rs) ? rs : window.location.origin +'/assets/images/img.png'
			}
		})
	}
	// 设置访问路据路径
	setVisitUrl = (callback) => {
		const { node } = this.props
		if(node){
			callback(node.querySelector('.template'), node.getAttribute('type'))
			node.setAttribute('data-url', this.visitUrl)
		}else{
			$fn.toast('未选中目标')
		}
	}
	
	render(){
		const { model, data, firstField, firstSource, secondField } = this.state
		return (
			<>
				<div className='abs_lt wh scroll nosel'>
					<Collapse bordered={false} defaultActiveKey={['0','1']}>
						<Panel header='数据源' key={0} extra={<Button size='small' label='添加' onClick={this.onAdd} />}>
							<ul>
								{
									$fn.hasObject(data) && Object.keys(data).map( (v,i) =>(
										<li key={i} className={`fxmj f12 cp ${v === firstField ? 'c0' : ''}`} style={{padding:'2px 0'}} onClick={this.selectData.bind(this,v)}>
											<h6>{v}</h6>
											<Button size='small' ghost icon={<DeleteOutlined />} onClick={ e=>this.onDel.bind(this,e,v)()} />
										</li>
									))
								}
							</ul>
						</Panel>
						{
							firstField && (
								<Panel header={firstField} key={1}>
									<ul>
										{
											$fn.hasObject(firstSource) && Object.keys(firstSource).map((v,i)=>(
												<li className={`cp ${secondField === v ? 'c0' : ''}`} style={{padding:'2px 0'}} key={i} onClick={this.selectField.bind(this,v)}>{v}</li>
											))
										}
									</ul>
								</Panel>
							)
						}
					</Collapse>
				</div>
				<Modal ref='modal' title='新建数据源' width='40%' okText='添加数据' onOk={this.addNewData} onCancel={this.onCancel}>
					<List.Input label='数据名称' ref='name' value={model.name} labelWidth='100px' size='middle' name='name' onChange={this.onChange} />
					<List.Input label='外部文件或URI' ref='url' value={model.url} labelWidth='100px' size='middle' onChange={this.onChange} suffix={<Button size='middle' label='打开文件' onClick={this.openFile} />} />
				</Modal>
				<Confirm ref='comfirm' msg='确认删除此数据源?' onOk = {this.onOk} />
				<input type='file' ref='file'/>
			</>
		)
	}
}