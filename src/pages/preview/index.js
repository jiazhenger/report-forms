import React from 'react'
// ===================================================================== public component
import _ from '@pages/draw/js/public/jzer'
import { paperParam } from '@pages/draw/js/public/config'
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
	componentDidMount(){
		this.html = this.getLocalHtml()
	}
	getLocalHtml(){
		return $fn.local('html')
	}
	getPdf = () => {
		// const style = `
		// 	<style>
		// 		*{margin:0;padding:0;box-sizing:border-box;color:Red}
		// 		body{font:12px/20px Microsoft YaHei;color:#333;}
		// 		img{border:0;display:block}
		// 		table{border:0,width:100%;border-collapse:collapse;border-spacing:0;}
		// 		.fxmc{display:flex;align-items: center;justify-content: center}
		// 	</style>
		// `
		// const clone = el.cloneNode(true)
		// // clone.style.removeProperty('position')
		// const _clone = _( clone )
		// _clone.style({
		// 	width: '100%',
		// 	position:'relative',
		// 	left: 0,
		// 	top: 0
		// })
		
		// if(_clone.attr('type') === 'main'){ clone.removeStyle('height') }
		// _clone.appendTo(node)
		// _node.finds('.more').removeStyle('height')
	}
	// 最终输出
	getLastHtml(paper){
		const _node = _.toNode(this.getLocalHtml())
		let _header = _node.find('.header')
		let _footer = _node.find('.footer')
		let _main = _node.find('.main')
		
		let headerHeight = 0
		let footerHeight = 0
		let mainHeight = 0
		
		let headerHtml = ''
		let mainHtml = _node.html()
		let footerHtml = ''
		if(_header.el){
			_header.style('position','relative').removeStyle('left,top')
			headerHeight = _header.height()
			headerHtml = _header.htmls()
			if(paper){
				_header.width(paper.width)
			}
		}
		if(_footer.el){
			_footer.style('position','relative').removeStyle('left,top')
			footerHeight = _footer.height()
			footerHtml = _footer.htmls()
			if(paper){
				_footer.width(paper.width)
			}
		}
		if(_main.el){
			_main.style('position','relative').removeStyle('left,top')
			mainHeight = _main.height()
			mainHtml = _main.htmls()
			if(paper){
				_main.removeStyle('height')
			}
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
	getHtml = paper => {
		const { mainHtml, headerHtml, footerHtml } = this.getLastHtml()
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
		const paper = $fn.local('paper') || paperParam
		
		const { mainHtml, headerHtml, footerHtml, headerHeight, footerHeight } = this.getLastHtml(paper)
		
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
		const paper = $fn.local('paper') || paperParam
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
		return (
			<div className='wh'>
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
			</div>
		)
	}
}