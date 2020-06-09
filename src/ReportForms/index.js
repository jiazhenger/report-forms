import React from 'react'
// ===================================================================== private component
import Content from './cpt/content'
import Global from './js/global'
import Part from './js/part'
// ===================================================================== antd
// import { SlackOutlined } from '@ant-design/icons'
import { Collapse } from 'antd'
import { Tabs } from 'antd'
// ===================================================================== image
import TableImage from '@img/icon/table.png'
import ImgImage from '@img/icon/img.png'
import TextImage from '@img/icon/text.png'
// ===================================================================== declare
const Panel = Collapse.Panel
const { TabPane } = Tabs
// const { $fn } = window
const rightWidth = '350px'
const leftWidth = '200px'
// ===================================================================== template
const IconButton = ({ icon, label}) => (
	<li className='tap cp h fxmc' style={{width:'50px'}}>
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
	componentDidMount(){
		this.$drag = document.querySelector('#dragContent') 		// HTML元素放置区域
		this.$scroll = document.querySelector('#scrollbox') 		// 滚动区域
		this.$paper = document.querySelector('#paper')				// 纸张区域
		this.$axes = document.querySelector('#axes')				// x 轴
		Global.init(this)
		Part.init(this)
	}
	onDragStart = (e,type) => {
		Global.DragStart(e,this,type)
	}
	onDrop(e){
		
	}
	onDragOver(e){
		
	}
	render( ) {
		return (
			<div className='wh fv'>
				{/* header */}
				<header className='fxm plr10 bcf bbor1' style={{height:'30px'}}>
					<h5 className='f12 b ml5 c0'>报表编辑器</h5>
					<div className='ex h'>
						<ul className='fxmc h'>
							<IconButton label='退出' />
						</ul>
					</div>
				</header>
				<section className='ex fx'>
					{/*  左侧操作 */}
					<nav className='bcf rel' style={{width:leftWidth}}>
						<div className='abs_full scroll'>
							<ul className='fxw plr5 pt10 drag-list'>
								<IconButton2 icon={TextImage} label='文本' onDragStart={e=>this.onDragStart(e,'text')}/>
								<IconButton2 icon={ImgImage} label='图片' />
								<IconButton2 icon={TableImage} label='表格' />
							</ul>
						</div>
					</nav>
					{/*  中心展示 */}
					<section className='ex rel'>
						<div className='abs_full scrollXY' style={{padding:'15px'}} id='scrollbox'>
							<Content onDrop={this.onDrop}  onDragOver={this.onDragOver}/>
						</div>
					</section>
					{/*  控制面版 */}
					<div className='fv bcf' style={{width:rightWidth}}>
						<Tabs defaultActiveKey={1}>
							<TabPane tab='样式' key={1}>
								<Collapse bordered={false} defaultActiveKey={['1']}>
									<Panel header='scene.fog = new THREE.Fog( )'>
									
									</Panel>
								</Collapse>
							</TabPane>
							<TabPane tab='数据' key={2}>
								
							</TabPane>
							<TabPane tab='报表' key={3}>
								
							</TabPane>
						</Tabs>
					</div>
				</section>
				
				{/* template */}
				<div className='vh'>
					<div className='abs red h40' id='text'>45646</div>
				</div>
			</div>
		)
	}
}