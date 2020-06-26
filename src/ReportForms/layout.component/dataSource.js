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
const Tree  =  Async(()=>import('../public.component/tree'))
const { $fn } = window
// ===================================================================== page component
const model = { name:'dataSoruce1', url:'' }
export default class extends React.Component {
	state = {
		model: JSON.parse(JSON.stringify(model)),
		rootData:{},
		data:$fn.local('dataSource') || {},
		treeData:[],
		key:0
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
		// 获取文件
		if(!this.props.node) return
	}
	/* ================================================== 弹窗 ================================================== */
	onAdd = e => {
		this.refs.modal.open()
		e.stopPropagation()
	}
	onChange = v => this.setState({ model : {...this.state.model,...v} })
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
	/* ================================================== 删除数据源 ================================================== */
	onDel(e,v){
		this.refs.comfirm.open()
		this.delName = v
		e.stopPropagation()
	}
	onOk = () => {
		delete this.state.data[this.delName]
		this.refs.comfirm.close()
		$fn.local('dataSource', this.state.data)
		if(this.state.rootField === this.delName){
			this.setState({rootField:null, rootData:{}, secondField:null, secondData:{}})
		}
		this.delName = null
	}
	/* ================================================== 获取 node 上的数据 ================================================== */
	getNode = () => {
		Dom.getNode(this.props.node).then(({ url, type, node, rootUrl, loop, isLoopNode }) => {
			if(url){
				const rootField = Format.getRootUrl(url)
				const rootData = this.state.data[rootField]
				let myData = Format.formatData(rootData, rootField, url, type, isLoopNode)
				this.setState({ rootField, rootData, myData })
			}else if(rootUrl){  // 如果有根 url
				const rootField = Format.getRootUrl(rootUrl)
				const rootData = this.state.data[rootField]
				const myData = Format.formatData(rootData,rootField, rootUrl, type, isLoopNode)
				this.setState({ rootField, rootData, myData })
			}else{
				this.cancelNode()
			}
		})
	}
	cancelNode = () => {
		this.setState({rootField:null, rootData:{}})
	}
	/* ================================================== 选择根数据 ================================================== */
	selectRoot(data, field){
		Dom.getNode(this.props.node).then(({ loop, type, node, $temp }) => {
			if(this.state.rootField !== field){
				const rootData = data[field]
				// 添加根 url，并移出当前 url
				node.setAttribute('rootUrl',field)
				$temp.removeAttribute('url')
				// 递归重组数据
				const myData = Format.formatData(rootData,field, field, type)
				this.setState({
					rootField: field, 
					rootData,
					myData,
					key: this.state.key + 1,
					loop
				})
				
				if(type === 'table'){
					Dom.createTable($temp, Format.parse(this.state.data, field))
				}else if( type === 'ul' ){
					Dom.createList($temp, Format.parse(this.state.data, field))
				}
			}else{
				this.cancelNode()
				node.removeAttribute('rootUrl')
				$temp.removeAttribute('url')
				
				Dom.reset($temp,type)
			}
		})
	}
	/* ================================================== 选择树上的数据 ================================================== */
	onTreeSelect = v => {
		Dom.getNode(this.props.node).then(({ node, $temp, dragType, type, group, loop, isLoopNode })=>{
			if(type === 'table' && !isLoopNode &&　!v.isArray){
				return $fn.toast('数据必须是数组')
			}
			
			if((type === 'text' || type === 'img') && !v.isString){
				return $fn.toast('数据必须是字符串')
			}
			
			v.checked = !v.checked
			const { checked, url, value, isArray, isObject, root } = v
			let myData = this.state.myData
			if(checked){
				myData = Format.formatCheckedData(myData,v)
				if(group && (isObject || isArray)){
					node.setAttribute('rootUrl',url)
					node.setAttribute('loop',1)
				}else{
					$temp.setAttribute('url',url)
				}
				
				if(type === 'text'){
					$temp.textContent = value
				}else if( type === 'img' ){
					$temp.querySelector('img').src =  $fn.isString(value) ? value : window.location.origin +'/assets/images/img.png'
				}else if( type === 'table' ){
					Dom.createTable($temp, Format.parse(this.state.data, url))
				}else if( type === 'ul' ){
					Dom.createList($temp, Format.parse(this.state.data, url))
				}
			}else{
				if(group && (isObject || isArray)){
					node.setAttribute('rootUrl',root)
					node.removeAttribute('loop')
				}else{
					$temp.removeAttribute('url')
				}
				
				Dom.reset($temp,type)
			}
			
			this.setState({ myData })
		})
	}
	
	render(){
		const { model, data, myData, rootField, rootData, key } = this.state
		const TypeComponent = e => {
			if($fn.hasArray(rootData)){
				return <i className='c0'>[ ]</i>
			}else if($fn.hasObject(rootData)){
				return <i className='c0'>｛ ｝</i>
			}else{
				return null
			}
		}
		return (
			<>
				<div className='abs_lt wh scroll'>
					<Collapse bordered={false} defaultActiveKey={['0','1']}>
						<Panel header='数据源' key={0} extra={<Button size='small' label='添加' onClick={this.onAdd} />}>
							<ul>
								{
									$fn.hasObject(data) && Object.keys(data).map( (v,i) =>(
										<li key={i} className={`fxmj f12 cp ${v === rootField ? 'c0' : ''}`} style={{padding:'2px 0'}} onClick={this.selectRoot.bind(this,data,v)}>
											<h6>{v}</h6>
											<Button size='small' ghost icon={<DeleteOutlined />} onClick={ e=>this.onDel.bind(this,e,v)()} />
										</li>
									))
								}
							</ul>
						</Panel>
						{
							rootField && (
								<Panel header={rootField} extra={<TypeComponent />} key={1}>
									<Tree
										key 		= { key }
										data 		= { myData } 
										onSelect	= { this.onTreeSelect }
									/>
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