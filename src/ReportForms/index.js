import React from 'react'
import Async from '@com/async'
import _ from './js/public/jzer'
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
import { stopBorderColor  } from './js/public/config'
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
// const Tabs = ()=>import('@antd/tabs')// ===================================================================== declare
const { TabPane } = Tabs
// const { $fn } = window
const rightWidth = '350px'
const leftWidth = '200px'
const { $fn, $http } = window
// 默认纸张
const paperParam = {
	format: 'A4',
	width:'810px',
	height:'1160px',
	name:'报表'
}
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
		
		this._drag = _( this.$drag )
		this._paper = _( this.$paper )
		
		this.setPaper()
		MouseEvent.init(this)
		// Size(this)
		const local = $fn.local('html')
		this._drag.each(v=>{
			if(!v.hasClass('x-layout')){
				v.style.border = '1px dashed ' + stopBorderColor
			}
		}).html( local ? $fn.local('html') : '' )
		
		setInterval(()=>{
			const html = $fn.local('html')
			const formatHtml = this.formatHtml(this.$drag)
			if(this._drag.html() !== '' && html !==  formatHtml){
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
					this._drag.html( sourceNode.innerHTML )
					$fn.local('html',sourceNode.innerHTML)
					window.location.reload()
				}
			}
		}
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
		
		this._paper.width(paperWidth).height(paperHeight)
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
	formatHtml = (el,isPdf) => {
		if(!el) return null
		const node = document.createElement('div')
		const _node = _( node )
		if(el.id === 'dragContent'){ node.innerHTML = el.innerHTML }
		else {
			// el.style.removeProperty('position')
			if(isPdf){
				// const style = `
				// 	<style>
				// 		*{margin:0;padding:0;box-sizing:border-box;color:Red}
				// 		body{font:12px/20px Microsoft YaHei;color:#333;}
				// 		img{border:0;display:block}
				// 		table{border:0,width:100%;border-collapse:collapse;border-spacing:0;}
				// 		.fxmc{display:flex;align-items: center;justify-content: center}
				// 	</style>
				// `
				const clone = el.cloneNode(true)
				// clone.style.removeProperty('position')
				const _clone = _( clone )
				_clone.style({
					width: '100%',
					position:'relative',
					left: 0,
					top: 0
				})
				
				if(_clone.attr('type') === 'main'){ clone.removeStyle('height') }
				_clone.appendTo(node)
				_node.finds('.more').removeStyle('height')
			}else{
				_node.append(el.cloneNode(true))
			}
		}
		
		_node.finds('.loopNode').removeClass('activeLoop')
		_node.finds('.tableSpan').removeClass('tableSpan')
		_node.finds('.point-mark').remove()
		
		_node.finds('.drag').removeAttr('mergeTable').each(v=>{
			v.removeStyle('border')
			const _temp = v.find('.template')
			if(_temp.el){
				const _img = _temp.find('img')
				if(_temp.html() === '' || ( _img.el && !_img.attr('temp') )){
					v.remove()
				}
			}
			if(v.hasClass('flexbox')){
				v.removeStyle('outline')
			}
		})
		_node.finds('.wraper').each(v=>{
			if(!v.hasChild()){ 
				v.remove()
			}
		})
		return _node.html()
	}
	// 获取生成 html 的内容
	getHtml = title => {
		let $header = this.$drag.querySelector('.header')
		let $footer = this.$drag.querySelector('.footer')
		let $main = this.$drag.querySelector('.main')
		const headerHeight = $header ? $header.clientHeight : 0
		const footerHeight = $footer ? $footer.clientHeight: 0
		const mainHeight = $main ? $main.clientHeight: 0
		const width = this.$drag.clientWidth
		const height = headerHeight + footerHeight + mainHeight
		
		let headerHtml = ''
		let mainHtml = ''
		let footerHtml = ''
		if($header){
			$header = $header.cloneNode(true)
			$header.style.removeProperty('position')
			headerHtml = this.formatHtml( $header ) 
		}
		if($footer){
			$footer = $footer.cloneNode(true)
			$footer.style.removeProperty('position')
			footerHtml = this.formatHtml( $footer )
		}
		if($main){
			$main = $main.cloneNode(true)
			$main.style.removeProperty('position')
			$main.style.removeProperty('left')
			$main.style.removeProperty('top')
			mainHtml = this.formatHtml( $main )
		}
		
		return `
			<!DOCTYPE html>
			<html lang='en'>
			<head>
				<meta charset='utf-8' />
				<meta name='renderer' content='webkit' />
				<meta name='viewport' content='width=device-width,user-scalable=no,initial-scale=1.0,shrink-to-fit=no,minimum-scale=1.0,maximum-scale=1.0,minimal-ui,viewport-fit=cover'/>
				<title>${title}</title>
				<style>
					html,body{font:13px/20px 'Tahoma,Verdana,Arial,sans-serif'; color:#333}
					*{margin:0;padding:0;box-sizing:border-box}
					img{border:0;display:block}
					table{width:100%;border-collapse:collapse;border-spacing:0}
					.fxmc{display:flex; align-items: center;justify-content: center}
					footer,header,main{position:relative;}
					.container{position:relative;margin:0 auto;border:1px solid #666;padding:10px}
					[type='pages']{visibility:hidden}
				</style>
			</head>
			<body>
				<div class='container' name='${this.reportName}' style='width:${width+20}px;height:${height+20}px;'>
					<header>${headerHtml}</header>
					<main>${mainHtml}</main>
					<footer>${footerHtml}</footer>
				</div>
			</body>
			</html>
		`
	}
	// 创建 pdf
	createPdf = () => {
		if(this.$drag.innerHTML === '') return $fn.toast('无内容')
		const $header = this.$drag.querySelector('.header')
		const $footer = this.$drag.querySelector('.footer')
		const $main = this.$drag.querySelector('.main')
		const mainHtml = $main ? this.formatHtml($main, true) : this.formatHtml( this.$drag )
		const paper = $fn.local('paper') || paperParam
		const setScale = v => (`<div style='width:${this.$drag.clientWidth}px'>${this.formatHtml(v, true)}</div>`)
		$http.submit(null,'pdf',{ 
			param:{
				header: setScale($header),
				footer: setScale($footer),
				headerHeight: $header ? parseInt($header.style.height) : 0,
				footerHeight: $footer ? parseInt($footer.style.height) : 0,
				main: mainHtml,
				format: paper.format,
				name: paper.name,
				source: this.getSource(paper)
			}
		}).then(data=>{
			$fn.toast('生成 pdf 成功')
		})
	}
	getSource = paper => {
		const myWidth = $fn.local('myWidth')
		const myHeight = $fn.local('myHeight')
		const html = this.formatHtml(this.$drag)
		const infoNode = document.createElement('section')
		const node = document.createElement('div')
		const json = {
			format : paper.format,
			width : paper.width,
			height : paper.height,
			name : paper.name,
			myWidth,
			myHeight
		}
		infoNode.setAttribute('data',JSON.stringify(json))
		infoNode.innerHTML = html
		node.appendChild(infoNode)
		return node.innerHTML
	}
	// 创建 html
	createHtml = () => {
		if(this.$drag.innerHTML === '') return $fn.toast('无内容')
		const paper = $fn.local('paper') || paperParam
		const html = this.getHtml( paper.name )
		
		$http.submit(null,'html',{ param:{ html, name: paper.name, source:this.getSource(paper) } }).then(data=>{
			$fn.toast('生成 html 成功')
		})
	}
	downloadPdf = () => {
		window.open(window.$config.api + 'downloadPdf?=' + this.reportName)
	}
	downloadHtml = () => {
		window.open(window.$config.api + 'downloadHtml?name' + this.reportName)
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
							<IconButton label='生成 html' onClick={ this.createHtml } hasNode={true}/>
							<IconButton label='生成 pdf' onClick={ this.createPdf } hasNode={true}/>
							<IconButton label='下载 pdf' onClick={ this.downloadPdf } hasNode={true}/>
							<IconButton label='下载 html' onClick={ this.downloadHtml } hasNode={true}/>
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