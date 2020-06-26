import React from 'react'
import Async from '@com/async'
// ===================================================================== image
import TableImage from '@img/icon/table.png'
import ImgImage from '@img/icon/img.png'
import TextImage from '@img/icon/text.png'
import ListImage from '@img/icon/list.png'
// ===================================================================== dom js
import MouseEvent from './js/index'
// ===================================================================== antd
// import { SlackOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
// const Tabs = ()=>import('@antd/tabs')
// ===================================================================== layout component
import ContentComponent from './layout.component/content'
import DataSourceComponent from './layout.component/dataSource'
// const DataSourceComponent = Async(()=>import('./layout.component/dataSource'))
// ===================================================================== style component
const Text  =  Async(()=>import('./style.component/text'))
const Image  =  Async(()=>import('./style.component/image'))
const Table = Async(()=>import('./style.component/table'))
const List = Async(()=>import('./style.component/list'))
// const Tabs = ()=>import('@antd/tabs')// ===================================================================== declare
const { TabPane } = Tabs
// const { $fn } = window
const rightWidth = '350px'
const leftWidth = '200px'
const { $fn, $http } = window
// ===================================================================== template
const IconButton = ({ label, id, hasNode, onClick}) => (
	<li id={id} className={`tap cp h fxmc plr10 ${hasNode?'':'activeNode'}`} onClick={onClick}>
		<div>
			{/*<div className='fxc f15'><img style={{width:'18px',height:'18px'}} src={icon} alt=''/></div>*/}
			<h3 className='f12 tc'>{label}</h3>
		</div>
	</li>
)
const IconButton2 = ({ icon, label, onDragStart}) => (
	<li className='tap cp ptb5 bor1 r5px' onMouseDown={onDragStart}>
		<div className='fxmc f15'><img draggable={false} style={{width:'20px',height:'20px'}} src={icon} alt=''/></div>
		<h3 className='tc f12'>{label}</h3>
	</li>
)
// ===================================================================== component
export default class extends React.Component {
	state = {
		node:null,
		dragStyle:{},
		tempStyle:{},
		tempAttr:{},
		key:0,
		activeKey: $fn.local('activeKey') || 0
	}
	componentDidMount(){
		this.$drag = document.querySelector('#dragContent') 		// HTML元素放置区域
		this.$scroll = document.querySelector('#scrollbox') 		// 滚动区域
		this.$paper = document.querySelector('#paper')				// 纸张区域
		this.$axes = document.querySelector('#axes')				// x 轴
		this.$control =  document.querySelector('#control') 		// 控制面版
		MouseEvent.init(this)
		// Size(this)
		this.$drag.innerHTML = $fn.local('html')
		
		setInterval(()=>{
			const html = $fn.local('html')
			if(this.$drag.innerHTML !== '' && this.$drag.innerHTML !== html ){
				$fn.local('html', this.$drag.innerHTML)
			}
		},5000)
	}
	// 开始拖动模板
	onDragStart = (e,type) => MouseEvent.DragStart(e,this,type)
	// tabs 控制
	onTabChange = v => {
		this.setState({ activeKey: v },()=>{
			$fn.local('activeKey',v)
			this.runNode()
		})
	}
	// 获取到 node 时执行
	runNode = () => {
		this.refs.dataSource && this.refs.dataSource.getNode()
		// console.log(this.refs.dataSource)
	}
	// 取消 node 时执行
	cancelNode = () => {
		this.refs.dataSource && this.refs.dataSource.cancelNode()
	}
	getHtml = isHtml => {
		const node = document.createElement('div')
		node.innerHTML = this.$drag.innerHTML
		const drag = node.querySelectorAll('.drag')
		if(drag){
			for(let v of drag){
				v.style.removeProperty('border')
				const mark = v.querySelector('.point-mark')
				const temp = v.querySelector('.template')
				mark.parentNode.removeChild(mark)
				if(temp.textContent === '' || temp.querySelector('img')){
					v.parentNode.removeChild(v)
				}
			}
		}
		if(node.innerHTML === ''){
			$fn.toast('还没有添加内容')
			return null
		}
		return `
			<!DOCTYPE html>
			<html lang='en'>
			<head>
				<meta charset='utf-8' />
				<meta name='renderer' content='webkit' />
				<meta name='viewport' content='width=device-width,user-scalable=no,initial-scale=1.0,shrink-to-fit=no,minimum-scale=1.0,maximum-scale=1.0,minimal-ui,viewport-fit=cover'/>
				<title>报表</title>
				<style>
					html,body{font:14px/24px Microsoft YaHei; color:#333}
					*{margin:0;padding:0;box-sizing:border-box}
					img{border:0;display:block}
					table{width:100%;border-collapse:collapse}
					.fxmc{display:flex;align-items: center;justify-content: center}
					${ isHtml ? 'body{padding:10px} #container{position:relative}' : ''}
				</style>
			</head>
			<body>
				<div id='container'>${node.innerHTML}</div>
			</body>
			</html>
		`
	}
	createPdf = () => {
		const html = this.getHtml()
		if(html){
			$http.submit(null,'pdf',{ param:{ html } }).then(data=>{
				$fn.toast('生成 pdf 成功')
			})
		}
		
	}
	createHtml = () => {
		const html = this.getHtml(true)
		if(html){
			$http.submit(null,'html',{ param:{ html } }).then(data=>{
				$fn.toast('生成 html 成功')
			})
		}
	}
	render( ) {
		const { hasNode, dragStyle, tempStyle, tempAttr, node, activeKey } = this.state
		const type = node ? node.getAttribute('type') : null
		return (
			<div className='wh fv'>
				{/* header */}
				<header className='fxm plr10 bcf bbor1 nosel' style={{height:'30px'}}>
					<h5 className='f12 b ml5 c0'>报表编辑器</h5>
					<div className='ex h'>
						<ul className='fxmc h'>
							<IconButton label='生成 html' onClick={e=>this.createHtml(e)} hasNode={true}/>
							<IconButton label='生成 pdf' onClick={e=>this.createPdf(e)} hasNode={true}/>
							<IconButton label='删除' id='del' hasNode={hasNode} />
							<IconButton label='删除全部' id='delAll' hasNode={hasNode} />
						</ul>
					</div>
				</header>
				<section className='ex fx'>
					{/*  左侧操作 */}
					<nav className='bcf rel' style={{width:leftWidth}}>
						<div className='abs_full scroll'>
							<ul className='fxw plr5 pt10 drag-list nosel'>
								<IconButton2 icon={TextImage} label='文本' onDragStart={e=>this.onDragStart(e,'text')}/>
								<IconButton2 icon={ImgImage} label='图片' onDragStart={e=>this.onDragStart(e,'img')}/>
								<IconButton2 icon={TableImage} label='表格' onDragStart={e=>this.onDragStart(e,'table')}/>
								<IconButton2 icon={ListImage} label='列表' onDragStart={e=>this.onDragStart(e,'ul')}/>
							</ul>
						</div>
					</nav>
					{/*  中心展示 */}
					<section className='ex rel nosel'>
						<div className='abs_full scrollXY' style={{padding:'15px'}} id='scrollbox'>
							<ContentComponent onDrop={this.onDrop}  onDragOver={this.onDragOver}/>
						</div>
					</section>
					{/*  控制面版 */}
					<div className='bcf nosel' style={{width:rightWidth}} id='control'>
						<Tabs defaultActiveKey={activeKey} onChange={this.onTabChange}>
							<TabPane tab='样式' key={0}>
								{
									+activeKey === 0 && (
										<>
											{ type === 'text' &&  <Text node={node} dragStyle={dragStyle} tempStyle={tempStyle} /> }
											{ type === 'img' &&  <Image node={node} dragStyle={dragStyle} tempStyle={tempStyle} tempAttr={tempAttr} /> }
											{ type === 'table' &&  <Table node={node} dragStyle={dragStyle} tempStyle={tempStyle} tempAttr={tempAttr} /> }
											{ type === 'ul' &&  <Table node={node} dragStyle={dragStyle} tempStyle={tempStyle} tempAttr={tempAttr} /> }
											{ type === 'ul' &&  <List node={node} dragStyle={dragStyle} tempStyle={tempStyle} tempAttr={tempAttr} /> }
										</>
									)
								}
							</TabPane>
							<TabPane tab='数据' key={1}>
								{ +activeKey === 1 && <DataSourceComponent ref='dataSource' node={node} />}
							</TabPane>
							<TabPane tab='报表' key={2}>
								
							</TabPane>
						</Tabs>
					</div>
				</section>
			</div>
		)
	}
}