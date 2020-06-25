import React from 'react'
import Async from '@com/async'
// ===================================================================== image
import TableImage from '@img/icon/table.png'
import ImgImage from '@img/icon/img.png'
import TextImage from '@img/icon/text.png'
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
// const Tabs = ()=>import('@antd/tabs')// ===================================================================== declare
const { TabPane } = Tabs
// const { $fn } = window
const rightWidth = '350px'
const leftWidth = '200px'
const { $fn } = window
// ===================================================================== template
const IconButton = ({ label, id, hasNode}) => (
	<li id={id} className={`tap cp h fxmc plr10 ${hasNode?'':'activeNode'}`}>
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
	render( ) {
		const { hasNode, dragStyle, tempStyle, tempAttr, node, key, activeKey } = this.state
		const type = node ? node.getAttribute('type') : null
		return (
			<div className='wh fv'>
				{/* header */}
				<header className='fxm plr10 bcf bbor1 nosel' style={{height:'30px'}}>
					<h5 className='f12 b ml5 c0'>报表编辑器</h5>
					<div className='ex h'>
						<ul className='fxmc h'>
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