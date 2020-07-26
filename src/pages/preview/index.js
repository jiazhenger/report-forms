import React from 'react'
// ===================================================================== public component
import _ from '@pages/draw/js/public/jzer'
import Format from '@pages/draw/js/public/format'
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
		const myHeight = $fn.local('myHeight')
		if(myHeight) this.paper.height = myHeight
		
		this.setState({ paperWidth: this.paper.width })
		this.__preview = _('#preview')
		this.preview()
	}
	// 预览内容
	preview(){
		const { mainHtml, headerHtml, footerHtml, headerHeight, footerHeight } = this.getLastHtml()
		const mainHeight = parseInt(this.paper.height) - headerHeight - footerHeight
		let index = 0
		const deep = html => {
			const node = document.createElement('div')
			const _node = _(node).addClass('paper-page bcf').style({
				width: this.paper.width,
				height: this.paper.height,
				padding: '10px',
				boxSizing: 'content-box',
				position: 'relative',
				display: 'flex',
				flexDirection: 'column'
			})
			if(index>0){ _node.style('marginTop','10px') }
			// header
			if(headerHtml !== ''){
				const _header = _.toNode(headerHtml).children(0)
				_header.appendTo(node)
			}
			// main
			const _main = _.toNode(html).children(0).style({flex:1}).background('yellow')
			_main.appendTo(node)
			// footer
			if(footerHtml !== ''){
				const _footer = _.toNode(footerHtml).children(0)
				_footer.appendTo(node)
			}
			this.__preview.append(node)
			// 分页
			const __main = _node.find('.main')
			const __page = __main.el ? __main : _node
			
			const { offsetTop } = __page.getOffset()
			index ++
			__page.finds('.drag').each(v=>{
				const type = v.attr('type')
				if(type === 'table'){
					if(v.outerHeight() > mainHeight){
						const _main = __page.clone()
						const _drag = v.clone()
						const _tbody = _drag.find('tbody').clear()
						v.finds('tr').each((tr,i)=>{
							const trInfo = tr.getInfo()
							const offset = trInfo.offsetTop + trInfo.offsetHeight - offsetTop 
							if(offset > mainHeight){
								_tbody.append(tr)
							}
						})
						_main.clear().append(_drag)
						deep(_main.htmls())
					}
				}
			})
		}
		deep(mainHtml)
	}
	// 获取数据
	getData(_node){
		// $http.pull(this,'',{}).then(data=>{
		// 	const isContent = $fn.local('bindWay')
		// })
		return _node.html()
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
		let mainHtml = this.getData(_node)
		let footerHtml = ''
		const scale = 0.713
		
		// 去掉循环的高
		_node.finds('table').each(v=>{
			const _drag = v.parents('.drag')
			if(_drag.attr('rootUrl')){
				_drag.removeStyle('height')
			}
		})
		
		if(_header.el){
			_header.style('position','relative').removeStyle('left,top,marginTop,marginBottom')
			headerHeight = _header.height()
			if(isPdf){
				_header.width(paper.width).style('transform', `scale(${scale})`)
			}
			headerHtml = _header.htmls()
		}
		if(_footer.el){
			_footer.style('position','relative').removeStyle('left,top,marginTop,marginBottom')
			footerHeight = _footer.height()
			if(isPdf){
				_footer.width(paper.width).style('transform', `scale(${scale})`)
			}
			footerHtml = _footer.htmls()
		}
		
		if(_main.el){
			_main.style('position','relative').removeStyle('height,left,top,marginTop,marginBottom')
			mainHeight = _main.height()
			mainHtml = _main.htmls()
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
					html,body{width:100%;height:100%;font:12px/20px 'Tahoma,Verdana,Arial,sans-serif'; color:#333}
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
		const { mainHtml, headerHtml, footerHtml, headerHeight, footerHeight } = this.getLastHtml(true)
		
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
	print = () => {
		const _node =  this.__preview.clone()
		_node.finds('.paper-page').removeStyle('marginTop')
		const pageHtml = _node.html()
		const html = `
		    <!DOCTYPE html>
		    <html lang='en'>
		    <head>
		    	<meta charset='utf-8' />
		    	<meta name='renderer' content='webkit' />
		    	<meta name='viewport' content='width=device-width,user-scalable=no,initial-scale=1.0,shrink-to-fit=no,minimum-scale=1.0,maximum-scale=1.0,minimal-ui,viewport-fit=cover'/>
		    	<title>${this.paper.name}</title>
		    	<style>
		    		html,body{width:100%;height:100%;font:12px/20px 'Tahoma,Verdana,Arial,sans-serif'; color:#333}
		    		*{margin:0;padding:0;box-sizing:border-box}
		    		img{border:0;display:block}
		    		table{width:100%;border-collapse:collapse;border-spacing:0}
		    		.fxmc{display:flex; align-items: center;justify-content: center}
		    	</style>
		    </head>
		    <body>
		        ${pageHtml}
		    </body>
		    </html>
		`
		_('#iframe').remove()
		const iframe = document.createElement('iframe')
		const _iframe = _(iframe).id('iframe').cssText('position:absolute;visibility:hidden').appendTo(document.body)
		const doc = iframe.contentDocument
		doc.open()
		doc.write(html)
		doc.close()
		iframe.contentWindow.focus()
		iframe.contentWindow.print()
	}
	render(){
		return (
			<div className='wh fv'>
				<header className='fxm plr10 bcf bbor1 nosel' style={{height:'30px'}}>
					<div className='ex h'>
						<ul className='fxmc h'>
							<IconButton label='生成 html' onClick={ this.createHtml }/>
							<IconButton label='生成 pdf' onClick={ this.createPdf } />
							<IconButton label='下载 pdf' onClick={ this.downloadPdf } />
							<IconButton label='下载 html' onClick={ this.downloadHtml }/>
							<IconButton label='打印' onClick={ this.print }/>
						</ul>
					</div>
				</header>
				<div className='ex rel'>
					<div className='abs_full scroll fxc f12 lh20'  style={{padding:'5px'}}>
						<div id='preview'></div>
					</div>
				</div>
			</div>
		)
	}
}