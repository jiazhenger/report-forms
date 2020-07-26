import React from 'react'
import Async from '@com/async'
// ===================================================================== public component
import _ from './js/public/jzer'
import { paperParam } from './js/public/config'
// import Dom from './js/public/dom'
// ===================================================================== image
import TableImage from '@img/icon/table.png'
import ImgImage from '@img/icon/img.png'
import TextImage from '@img/icon/text.png'
import ListImage from '@img/icon/list.png'
import DeviderImage from '@img/icon/devider.png'
import CheckboxImage from '@img/icon/checkbox.png'
// ===================================================================== dom js
import MouseEvent from './js/index'
// ===================================================================== antd
// import { SlackOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
// const Tabs = ()=>import('@antd/tabs')
// ===================================================================== layout component
import ContentComponent from './layout.component/content'
import DataSourceComponent from './layout.component/dataSource'
const PaperComponent = Async(()=>import('./layout.component/paper'))
// const DataSourceComponent = Async(()=>import('./layout.component/dataSource'))
// ===================================================================== style component
const Text  =  Async(()=>import('./style.component/text'))
const Image  =  Async(()=>import('./style.component/image'))
const Table = Async(()=>import('./style.component/table'))
const List = Async(()=>import('./style.component/list'))
const Devider = Async(()=>import('./style.component/devider'))
const Checkbox = Async(()=>import('./style.component/checkbox'))
const Barcode = Async(()=>import('./style.component/barcode'))
const Qrcode = Async(()=>import('./style.component/qrcode'))
const Header = Async(()=>import('./style.component/header'))
const Main = Async(()=>import('./style.component/main'))
const Footer = Async(()=>import('./style.component/footer'))
const Flexbox = Async(()=>import('./style.component/flexbox'))
// const Tabs = ()=>import('@antd/tabs')
// ===================================================================== declare
const { TabPane } = Tabs
// const { $fn } = window
const rightWidth = '350px'
const leftWidth = '200px'
const { $fn } = window
let clear
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
		_node:null,
		dragStyle:{},
		tempStyle:{},
		paperParam:{},
		key:0,
		activeKey: $fn.local('activeKey') || 0,
	}
	componentDidMount(){
		this.$drag = document.querySelector('#dragContent') 		// HTML元素放置区域
		this.$scroll = document.querySelector('#scrollbox') 		// 滚动区域
		this.$paper = document.querySelector('#paper')				// 纸张区域
		this.$axes = document.querySelector('#axes')				// x 轴
		this.$control =  document.querySelector('#control') 		// 控制面版
		
		this.__drag = _( this.$drag )
		this.__scroll = _( this.$scroll )
		this.__paper = _( this.$paper )
		this.__axes = _( this.$axes )
		this.__control = _( this.$control )
		
		this.setPaper()
		MouseEvent.init(this)
		// Size(this)
		const local = $fn.local('html')
		this.__drag.html( local ? $fn.local('html') : '' )
		
		clear = setInterval(()=>{
			const html = $fn.local('html')
			const formatHtml = this.formatHtml()
			if(this.__drag.html() !== '' && html !==  formatHtml){
				$fn.local('html', formatHtml)
			}
		},3000)
		
		// 读取文件
		this.refs.importFileRef.onchange = e => {
			const file = e.target.files[0]
			if(file.type !== 'text/plain'){ return $fn.toast('数据必须是 .txt 格式文件')}
			var reader = new FileReader()
			reader.readAsText(file)
			reader.onload = () => {
				const importNode = document.createElement('div')
				importNode.innerHTML = reader.result
				const sourceNode = importNode.children[0]
				const info = sourceNode ?  JSON.parse(sourceNode.getAttribute('data')) : null
				if(info){
					$fn.local('paper',info)
					info.myWidth && $fn.local('myWidth',info.myWidth)
					info.myHeight && $fn.local('myHeight',info.myHeight)
					this.setPaper()
					this.__drag.html( sourceNode.innerHTML )
					$fn.local('html',sourceNode.innerHTML)
					window.location.reload()
				}
			}
		}
		// 预览
		_('#preview').mouseup({stop:true}).bind('click', e=>{
			this.props.history.push('/preview')
		})
	}
	componentWillUnmount(){
		clearInterval(clear)
	}
	// 纸张设置
	setPaper = () =>{
		// 纸张设置
		let paperWidth = paperParam.width
		let paperHeight = paperParam.height
		const paper = $fn.local('paper')
		if($fn.hasObject(paper)){
			paperHeight = paper.height
			paperWidth = paper.width
		}else{
			$fn.local('paper', paperParam)
		}
		const myHeight = $fn.local('myHeight')
		const myWidth = $fn.local('myWidth')
		if(myHeight){ paperHeight = myHeight }
		if(myWidth) { paperWidth = myWidth}
		console.log(paperWidth)
		this.__paper.width(paperWidth).height(paperHeight)
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
	}
	// 取消 node 时执行
	cancelNode = () => {
		this.refs.dataSource && this.refs.dataSource.cancelNode()
	}
	// 格式化多余的修饰
	formatHtml = () => {
		const node = document.createElement('div')
		const _node = _( node ).html(this.__drag.html())
	
		_node.finds('.loopNode').removeClass('activeLoop')
		_node.finds('.tableSpan').removeClass('tableSpan')
		_node.finds('.no-border').removeClass('no-border')
		_node.finds('.hide').removeClass('hide')
		_node.finds('.point-mark').remove()
		
		_node.finds('.drag').removeAttr('mergeTable').each(v=>{
			const _temp = v.find('.template')
			if(_temp.el){
				const _img = _temp.find('img')
				if( _img.el && !_img.attr('temp') ){
					v.remove()
				}
			}
		})
	
		let html = _node.html()
		return html
	}
	
	// 导入 html
	importHtml = () => {
		this.refs.importFileRef.click()
	}
	render( ) {
		const { hasNode, node, _node, activeKey, refreshKey } = this.state
		const type = node ? node.getAttribute('type') : null
		return (
			<div className='wh fv'>
				{/* header */}
				<header className='fxm plr10 bcf bbor1 nosel' style={{height:'30px'}}>
					<h5 className='f12 b ml5 c0'>报表编辑器</h5>
					<div className='ex h'>
						<ul className='fxmc h'>
							<IconButton label='预览' id='preview' hasNode={true}/>
							<IconButton label='导入' onClick={ this.importHtml } hasNode={true}/>
							<IconButton label='删除' id='del' hasNode={hasNode} />
							<IconButton label='删除全部' id='delAll' hasNode={true} />
						</ul>
					</div>
				</header>
				<section className='ex fx'>
					{/*  左侧操作 */}
					<nav className='bcf rel' style={{width:leftWidth}}>
						<div className='abs_full scroll pt10'>
							<h2 className='plr10 b f12'>元素</h2>
							<ul className='fxw plr5 pt10 drag-list nosel'>
								<IconButton2 icon={TextImage} label='文本' onDragStart={e=>this.onDragStart(e,'text')}/>
								<IconButton2 icon={ImgImage} label='图片' onDragStart={e=>this.onDragStart(e,'img')}/>
								<IconButton2 icon={TableImage} label='表格' onDragStart={e=>this.onDragStart(e,'table')}/>
								<IconButton2 icon={ListImage} label='列表' onDragStart={e=>this.onDragStart(e,'ul')}/>
								<IconButton2 icon={CheckboxImage} label='选择框' onDragStart={e=>this.onDragStart(e,'checkbox')}/>
								<IconButton2 icon={DeviderImage} label='分隔线' onDragStart={e=>this.onDragStart(e,'devider')}/>
								<IconButton2 icon={CheckboxImage} label='弹性盒' onDragStart={e=>this.onDragStart(e,'flexbox')}/>
							</ul>
							<h2 className='plr10 b f12'>码</h2>
							<ul className='fxw plr5 pt10 drag-list nosel'>
								<IconButton2 icon={CheckboxImage} label='二维码' onDragStart={e=>this.onDragStart(e,'qrcode')}/>
								<IconButton2 icon={CheckboxImage} label='条形码' onDragStart={e=>this.onDragStart(e,'barcode')}/>
							</ul>
							<h2 className='plr10 b f12'>布局</h2>
							<ul className='fxw plr5 mt10 drag-list nosel'>
								<IconButton2 icon={CheckboxImage} label='页眉' onDragStart={e=>this.onDragStart(e,'header')}/>
								<IconButton2 icon={CheckboxImage} label='主体' onDragStart={e=>this.onDragStart(e,'main')}/>
								<IconButton2 icon={CheckboxImage} label='页脚' onDragStart={e=>this.onDragStart(e,'footer')}/>
								<IconButton2 icon={CheckboxImage} label='分页' onDragStart={e=>this.onDragStart(e,'pages')}/>
							</ul>
						</div>
					</nav>
					{/*  中心展示 */}
					<section className='ex rel nosel'>
						<div className='abs_full scrollXY fxc' style={{padding:'15px'}} id='scrollbox'>
							<ContentComponent onDrop={this.onDrop}  onDragOver={this.onDragOver}/>
						</div>
					</section>
					{/*  控制面版 */}
					<div className='bcf nosel' style={{width:rightWidth}} id='control' key={refreshKey}>
						<Tabs defaultActiveKey={activeKey} onChange={this.onTabChange}>
							<TabPane tab='样式' key={0}>
								{
									+activeKey === 0 && (
										<>
											{ (type === 'text' || type === 'pages') &&  <Text node={node} _node={_node} /> }
											{ type === 'img' &&  <Image node={node} _node={_node}/> }
											{ type === 'table' &&  <Table node={node} _node={_node}/> }
											{ type === 'ul' &&  <List node={node} _node={_node}/> }
											{ type === 'devider' &&  <Devider node={node} _node={_node}/> }
											{ type === 'checkbox' &&  <Checkbox node={node} _node={_node}/> }
											{ type === 'barcode' &&  <Barcode node={node} _node={_node}/> }
											{ type === 'qrcode' &&  <Qrcode node={node} _node={_node}/> }
											{ type === 'header' &&  <Header node={node} _node={_node}/> }
											{ type === 'main' &&  <Main node={node} _node={_node}/> }
											{ type === 'footer' &&  <Footer node={node} _node={_node}/> }
											{ type === 'flexbox' &&  <Flexbox node={node} _node={_node}/> }
										</>
									)
								}
							</TabPane>
							<TabPane tab='数据' key={1}>
								{ +activeKey === 1 && <DataSourceComponent ref='dataSource' node={node} _node={_node} />}
							</TabPane>
							<TabPane tab='报表' key={2}>
								{ 
									+activeKey === 2 && <PaperComponent
										paperParam = { paperParam }
										onChange = { ()=> MouseEvent.axes() }
									/>
								}
							</TabPane>
						</Tabs>
					</div>
				</section>
				<input type='file' ref='importFileRef'/>
			</div>
		)
	}
}