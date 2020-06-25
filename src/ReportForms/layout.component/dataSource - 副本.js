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
// 重组判断列表数据
const getCheckList = (data, model, url) => {
	let rs = data
	if($fn.hasArray(data)){
		rs = data[0]
	}else if($fn.hasObject(data)){
		rs = data
	}
	
	if($fn.hasObject(rs)){
		for(let i in rs){
			const n = $fn.hasArray(rs[i]) ? '/0' : ''
			const urls = url + '/' + i + n
			model[i] = { FieldName: i, FieldUrl: urls.replace('/',''), checked:0  }
			if(typeof( rs[i] ) === 'object'){
				getCheckList(rs[i], model[i], urls )
			}
		}
	}
	return model
}
export default class extends React.Component {
	state = {
		model: JSON.parse(JSON.stringify(model)),
		firstSource:{},
		data:$fn.local('dataSource') || {},
		treeData:[],
		key:0
	}
	componentDidMount(){
		// 获取文件
		if(!this.props.node) return
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
	}
	/* ================================================== 获取 node 上的数据 ================================================== */
	getNodeData = () => {
		Dom.getNode(this.props.node).then(({ url, loop, node, rootUrl }) => {
			const drag = Dom.parents(node,'drag')
			const dragLoop = Boolean(drag.getAttribute('loop'))
			const dragUrl = drag.getAttribute('url')
			url = url ? url : dragUrl
			if(url){
				const firstField = Format.getRootUrl(url)
				const firstSource = this.state.data[firstField]
				$fn.leak(()=>{
					let copyData = JSON.parse(JSON.stringify({ [firstField] : this.state.data[firstField] }))
					let result = getCheckList(copyData,{},'')
					let checkData = this.setCheckList(result[firstField], url, dragUrl)
					this.setState({ firstField, firstSource, checkData, loop, dragLoop, key: this.state.key + 1  })
				})()
			}else if(rootUrl){  // 如果有根 url 
				console.log(rootUrl)
				const firstField = Format.getRootUrl(rootUrl)
				const firstSource = this.state.data[firstField]
				let copyData = JSON.parse(JSON.stringify({ [firstField] : this.state.data[firstField] }))
				let result = getCheckList(copyData,{},'')
				let checkData = this.setCheckList(result[firstField], rootUrl)
				this.setState({ firstField, firstSource, checkData, key: this.state.key + 1  })
			}
		})
	}
	// 设置 checked
	setCheckList = (data, currentUrl, dragUrl) => {
		for(let i in data){
			const FieldUrl = data[i].FieldUrl
			if($fn.hasObject(data[i])){
				
				if(currentUrl === FieldUrl){
					data[i].checked = !data[i].checked
				}else{
					data[i].checked = 0
				}
				
				if(dragUrl === FieldUrl){
					data[i].checked = 1
				}
				
				if($fn.hasObject(data[i])){
					this.setCheckList(data[i], currentUrl, dragUrl)
				}
			}
		}
		return data
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
	/* ================================================== 选择第一层数据 ================================================== */
	selectData(data, v){
		Dom.getNode(this.props.node).then(({ loop, group, node }) => {
			if(this.state.firstField !== v){
				const firstSource = data[v]
				// 递归重组数据
				let copyData = JSON.parse(JSON.stringify({ [v]: firstSource}))
				const result = getCheckList(copyData,{},'')
				// 添加根 url，并移出当前 url
				node.setAttribute('rootUrl',v)
				node.removeAttribute('url')
				
				this.setState({
					firstField: v, 
					firstSource,
					key: this.state.key + 1,
					checkData:result[v],
					loop
				})
			}else{
				this.setState({firstField:null, firstSource:{}, key: this.state.key - 1})
			}
		})
	}
	// 选择字段
	onTreeSelect = (currentUrl, checked) => {
		Dom.getNode(this.props.node).then(({ node, $temp, type })=>{
			const drag = Dom.parents(node,'drag')
			
			// 
			if(!checked){
				const bindData = Format.parse(this.state.data,currentUrl)
				node.setAttribute('url',currentUrl)
				if(type === 'text'){
					$temp.textContent = bindData
				}else if( type === 'img' ){
					$temp.querySelector('img').src =  $fn.isString(bindData) ? bindData : window.location.origin +'/assets/images/img.png'
				}
			}else{
				node.removeAttribute('url')
				if(type === 'text'){
					$temp.textContent = ''
				}else if( type === 'img' ){
					$temp.querySelector('img').src =  window.location.origin +'/assets/images/img.png'
				}
			}
			// 选择效果
			const checkData = this.setCheckList(this.state.checkData, currentUrl, drag.getAttribute('url'))
			this.setState({ checkData })
		})
	}
	
	render(){
		const { model, data, checkData, firstField, firstSource, key, loop, dragLoop } = this.state
		const TypeComponent = e => {
			if($fn.hasArray(firstSource)){
				return <i className='c0'>[ ]</i>
			}else if($fn.hasObject(firstSource)){
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
										<li key={i} className={`fxmj f12 cp ${v === firstField ? 'c0' : ''}`} style={{padding:'2px 0'}} onClick={this.selectData.bind(this,data,v)}>
											<h6>{v}</h6>
											<Button size='small' ghost icon={<DeleteOutlined />} onClick={ e=>this.onDel.bind(this,e,v)()} />
										</li>
									))
								}
							</ul>
						</Panel>
						{
							firstField && (
								<Panel header={firstField} extra={<TypeComponent />} key={1}>
									<Tree 
										key 		= { key }
										root 		= { data } 
										data 		= { firstSource } 
										url			= { firstField } 
										checkData	= { checkData }
										rootCheckData	= { checkData } 
										onSelect	= { this.onTreeSelect }
										loop		= { loop }
										dragLoop	= { dragLoop }
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