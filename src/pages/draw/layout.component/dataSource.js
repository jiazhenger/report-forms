import React from 'react'
import Async from '@com/async'
// ===================================================================== public js
import Table from '../js/public/table'
import Dom from '../js/public/dom'
import Format from '../js/public/format'
import _ from '../js/public/jzer'
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
const Data  =  Async(()=>import('../style.component/tp/data'))
const { $fn } = window
// ===================================================================== page component
const model = { name:'dataSource1', url:'' }
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
		const way = $fn.local('bindWay')
		this.refs.bindWayRef.setValue( way ? true : false)
		if(!this.props.node) return
	}
	/* ================================================== 弹窗 ================================================== */
	onAdd = e => {
		this.refs.modal.open()
		e.stopPropagation()
	}
	onChange = v => {
		if(v === ''){
			this.refs.file.value = ''
			this.newData = null
		}else{
			this.setState({ model : {...this.state.model,...v} })
		}
	}
	openFile = v => {
		this.refs.file.click( )
		this.refs.file.value = ''
	}
	// 添加数据
	addNewData = () => {
		const url = this.refs.url.getValue()
		
		if(url){
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
				$fn.toast('api 接口添加数据')
			}
		}else{
			$fn.toast('请先添加数据源')
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
		Dom.getNodeInfo(this.props._node, false).then(( { url, type, rootUrl } ) =>{
			if(url){
				const rootField = Format.getRootUrl(url)
				const rootData = this.state.data[rootField]
				let myData = Format.formatData(rootData, rootField, url, type)
				this.setState({ rootField, rootData, myData })
			}else if(rootUrl){  // 如果有根 url
				const rootField = Format.getRootUrl(rootUrl)
				const rootData = this.state.data[rootField]
				const myData = Format.formatData(rootData,rootField, rootUrl, type)
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
		const rootData = data[field]
		const isContent = $fn.local('bindWay')
		Dom.getNodeInfo(this.props._node, false).then( model => {
			const { _drag, type } = model
			// 分隔线不绑定数据
			if(type==='devider'){ return $fn.toast('此元素无法绑定数据') }
			// 当切换数据源时还原 dom 结构
			
			if(this.state.rootField !== field){
				// 添加根 url，并移出当前 url
				_drag.attr('rootUrl',field)
				// 递归重组数据
				const myData = Format.formatData(rootData, field, field, type)
				this.setState({
					rootField: field,
					rootData,
					myData,
					key: this.state.key + 1
				})
				Format.renderData(rootData, field, _('#dragContent'), isContent)
			}else{
				this.cancelNode()
				Dom.reset(model)
			}
		})
		// node 不存在时
		if(!this.props._node){
			const myData = Format.formatData(rootData, field, field, null)
			this.setState({
				rootField: field,
				rootData,
				myData,
				key: this.state.key + 1
			})
			Format.renderData(rootData, field, _('#dragContent'), isContent)
		}
	}
	/* ================================================== 选择树上的数据 ================================================== */
	onTreeSelect = v => {
		Dom.getNodeInfo(this.props._node).then( model => {
			const { _drag, _temp, type, rootUrl,dragType } = model
			const isContent = $fn.local('bindWay')
			if((type === 'text' || type === 'img') && !v.isString){
				return $fn.toast('数据必须是字符串')
			}
			
			v.checked = !v.checked
			const { checked, url, value, name } = v
			let myData = this.state.myData
			if(checked){
				myData = Format.formatCheckedData(myData,v)
				const rootUrl_ = Format.getRootUrl(url)
				// 在父级绑定数据
				if( rootUrl !== rootUrl_){ _drag.attr('rootUrl', Format.getRootUrl(url) ) }
				
				// 表格绑定
				if(dragType === 'table'){
					if(Format.isArrayChild(url)){
						Table.bindData(_temp, _drag, Format.parse(this.state.data, Format.getParentUrl(url)), name, url, isContent)
					}else{
						_temp.attr({ url }).addClass('x-bind-url')
						isContent ? _temp.text(value) : _temp.html(Dom.bindField(name))
					}
				}else{
					if( !_temp.hasClass('loopNode')){
						_temp.attr({ type })
					}
					_temp.attr({ url }).addClass('x-bind-url')
					// 个性绑定
					if( type === 'text'){
						isContent ? _temp.text(value) : _temp.html(Dom.bindField(name))
					}else if( type === 'img'){
						_temp.find('img').attr({temp:1}).src(value)
					}else if( type === 'barcode' ){
						_drag.height('auto')
						Dom.createBarcode(_temp, Format.parse(this.state.data, url))
					}else if( type === 'qrcode' ){
						Dom.createQrcode(_temp, Format.parse(this.state.data, url))
					}else if( type === 'checkbox'){
						Dom.createCheckbox(_temp, Format.parse(this.state.data, url))
					}
				}
			}else{
				Dom.reset({...model,isArrayUrl:Format.isArrayChild(url)})
			}
			this.setState({ myData })
		})
	}
	onBindChange = v => {
		v ? $fn.local('bindWay',1) : $fn.remove('bindWay') 
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
					<Collapse bordered={false} defaultActiveKey={['0','1','2']}>
					<Panel header='常规选项'>
						<Data _node={this.props._node} />
						<List.Switch label='内容' ref='bindWayRef'  onChange={this.onBindChange}/>
					</Panel>
						<Panel header='数据源' key={0} extra={<Button size='small' label='添加' onClick={this.onAdd} />}>
							{
								$fn.hasObject(data) ? (
									<ul>
										{
											Object.keys(data).map( (v,i) =>(
												<li key={i} className={`fxmj f12 cp ${v === rootField ? 'c0' : ''}`} style={{padding:'2px 0'}} onClick={this.selectRoot.bind(this,data,v)}>
													<h6>{v}</h6>
													<Button size='small' ghost icon={<DeleteOutlined />} onClick={ e=>this.onDel.bind(this,e,v)()} />
												</li>
											))
										}
									</ul>
								) : <div className='g9 tc f12 ptb20'>请先添加数据源</div>
							}
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
					<List.Input label='数据源名称' ref='name' value={model.name} labelWidth='100px' size='middle' name='name' onChange={this.onChange} />
					<List.Input label='数据源地址' p='请选择json文件或输入接口地址' ref='url' value={model.url} labelWidth='100px' size='middle' onChange={this.onChange} suffix={<Button size='middle' label='打开文件' onClick={this.openFile} />} />
				</Modal>
				<Confirm ref='comfirm' msg='确认删除此数据源?' onOk = {this.onOk} />
				<input type='file' ref='file'/>
			</>
		)
	}
}