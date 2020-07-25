import React from 'react'
// ===================================================================== public component
import _ from '@pages/draw/js/public/jzer'
// ===================================================================== antd

// ===================================================================== image

// ===================================================================== private component
const IconButton = ({ label, id, hasNode, onClick}) => (
	<li id={id} className={`tap cp h fxmc plr10 ${hasNode?'':'activeNode'}`} onClick={onClick}>
		<div>
			{/*<div className='fxc f15'><img style={{width:'18px',height:'18px'}} src={icon} alt=''/></div>*/}
			<h3 className='f12 tc'>{label}</h3>
		</div>
	</li>
)
// ===================================================================== declare
const { $fn, $http } = window
// ===================================================================== component
export default class extends React.Component{
	state = {
		
	}
	componentDidMount(){
		this.html = this.getLocalHtml()
		this.paper = $fn.local('paper')
		this.setState({ paperWidth: this.paper.width })
		
		this.preview()
	}
	// 预览内容
	preview(){
		const { mainHtml, headerHtml, footerHtml, headerHeight, footerHeight } = this.getLastHtml()
		const node = document.createElement('div')
		_(node).addClass('fv paper-page bcf').style('height', this.paper.height)
		// header
		if(headerHtml !== ''){
			const _header = _.toNode(headerHtml).children(0)
			_header.appendTo(node)
		}
		// main
		const _main = _.toNode(mainHtml).children(0).addClass('ex').background('yellow')
		_main.appendTo(node)
		const mainHeight = parseInt(this.paper.height) - headerHeight - footerHeight
		console.log(mainHeight)
		// footer
		if(footerHtml !== ''){
			const _footer = _.toNode(footerHtml).children(0)
			_footer.appendTo(node)
		}
		
		console.log(node)
		
		_('#preview').append(node)
	}
	// 获取本地 html
	getLocalHtml(){ return $fn.local('html') }
	// 最终输出
	getLastHtml(isPdf){
		const _node = _.toNode(this.getLocalHtml())
		const paper = this.paper
		let _header = _node.find('.header')
		let _footer = _node.find('.footer')
		let _main = _node.find('.main')
		
		let headerHeight = 0
		let footerHeight = 0
		let mainHeight = 0
		
		let headerHtml = ''
		let mainHtml = _node.html()
		let footerHtml = ''
		const scale = 0.713
		if(_header.el){
			_header.style('position','relative').removeStyle('left,top')
			headerHeight = _header.height()
			if(isPdf){
				_header.width(paper.width).style('transform', `scale(${scale})`)
			}
			headerHtml = _header.htmls()
		}
		if(_footer.el){
			_footer.style('position','relative').removeStyle('left,top')
			footerHeight = _footer.height()
			if(isPdf){
				_footer.width(paper.width).style('transform', `scale(${scale})`)
			}
			footerHtml = _footer.htmls()
		}
		
		if(_main.el){
			_main.style('position','relative').removeStyle('left,top')
			mainHeight = _main.height()
			mainHtml = _main.htmls()
			if(isPdf){
				_main.removeStyle('height')
			}
		}
		if(isPdf){
			_node.finds('.more').removeStyle('height')
		}
		
		return {
			mainHtml,
			headerHtml,
			footerHtml,
			
			headerHeight,
			footerHeight,
			mainHeight,
		}
	}
	// 获取生成 html 的内容
	getHtml = () => {
		const { mainHtml, headerHtml, footerHtml } = this.getLastHtml()
		const paper = this.paper
		const width = parseInt(paper.width) + 20 + 'px'
		
		return `
			<!DOCTYPE html>
			<html lang='en'>
			<head>
				<meta charset='utf-8' />
				<meta name='renderer' content='webkit' />
				<meta name='viewport' content='width=device-width,user-scalable=no,initial-scale=1.0,shrink-to-fit=no,minimum-scale=1.0,maximum-scale=1.0,minimal-ui,viewport-fit=cover'/>
				<title>${paper.name}</title>
				<style>
					html,body{width:100%;height:100%;font:13px/20px 'Tahoma,Verdana,Arial,sans-serif'; color:#333}
					*{margin:0;padding:0;box-sizing:border-box}
					img{border:0;display:block}
					table{width:100%;border-collapse:collapse;border-spacing:0}
					.fxmc{display:flex; align-items: center;justify-content: center}
					footer,header,main{position:relative;}
					.container{position:relative;margin:0 auto;border:1px solid #999;padding:10px}
					[type='pages']{visibility:hidden}
				</style>
			</head>
			<body>
				<div class='container' name='${paper.name}' style='width:${width};min-height:100%;'>
					${headerHtml}
					${mainHtml}
					${footerHtml}
				</div>
				<script>
					function resize(){
						const box = document.querySelector('.container');
						box.style.height = document.body.scrollHeight + 'px'
					}
					
					window.onresize = resize
				</script>
			</body>
			</html>
		`
	}
	// 创建 pdf
	createPdf = () => {
		const html = this.getLocalHtml()
		if(!html) return $fn.toast('无内容')
		const paper = this.paper
		const { mainHtml, headerHtml, footerHtml, headerHeight, footerHeight } = this.getLastHtml()
		
		$http.submit(null,'pdf',{ 
			param:{
				header: headerHtml,
				footer: footerHtml,
				headerHeight,
				footerHeight,
				main: mainHtml,
				format: paper.format,
				name: paper.name,
				source: this.getSource(paper)
			}
		}).then(data=>{
			$fn.toast('生成 pdf 成功')
		})
	}
	// 获取源代码
	getSource = paper => {
		const myWidth = $fn.local('myWidth')
		const myHeight = $fn.local('myHeight')
		const html = this.getLocalHtml()
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
		const paper = this.paper
		let html = this.getHtml( paper )
		if(_.isString(html)){ html = html.replace(/[\n\r\t]/g,''); }
		$http.submit(null, 'html', { param:{ html, name: paper.name, source:this.getSource(paper) } }).then(data=>{
			$fn.toast('生成 html 成功')
		})
	}
	downloadPdf = () => {
		window.open(window.$config.api + 'downloadPdf?=' + this.reportName)
	}
	downloadHtml = () => {
		window.open(window.$config.api + 'downloadHtml?name' + this.reportName)
	}
	render(){
		const { paperWidth } = this.state
		return (
			<div className='wh fv'>
				<header className='fxm plr10 bcf bbor1 nosel' style={{height:'30px'}}>
					<div className='ex h'>
						<ul className='fxmc h'>
							<IconButton label='生成 html' onClick={ this.createHtml } hasNode={true}/>
							<IconButton label='生成 pdf' onClick={ this.createPdf } hasNode={true}/>
							<IconButton label='下载 pdf' onClick={ this.downloadPdf } hasNode={true}/>
							<IconButton label='下载 html' onClick={ this.downloadHtml } hasNode={true}/>
						</ul>
					</div>
				</header>
				<div className='ex rel'>
					<div className='abs_full scroll fxc' style={{padding:'5px'}}>
						<div id='preview' style={{width:paperWidth}}>
							
						</div>
					</div>
				</div>
			</div>
		)
	}
}