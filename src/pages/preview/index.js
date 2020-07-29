import React from 'react'
// ===================================================================== public component
import _ from '@pages/draw/js/public/jzer'
import Format from '@pages/draw/js/public/format'
// ===================================================================== antd

// ===================================================================== image
// ===================================================================== private component
const IconButton = ({ label, id, hasNode, onClick}) => (
	<li id={id} className={`tap cp h fxmc plr10`} onClick={onClick}>
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
		this.__preview = _('#preview')
		this.preview()
		_(document.body).unonce('mouseup')
	}
	// 获取本地 html
	getLocalHtml(){ 
		const html = $fn.local('html')
		return html ? html : `<div class='tc g9 pt30'>暂无内容</div>`
	}
	// 预览内容
	preview(){
		const { mainHtml, headerHtml, footerHtml, headerHeight, footerHeight } = this.getLastHtml()
		const mainHeight = parseInt(this.paper.height) - headerHeight - footerHeight
		
		let index = 0
		const deep = html => {
			const node = document.createElement('div')
			const _node = _(node).addClass('paper-page bcf').style({
				width: this.paper.width || '810px',
				height: this.paper.height || '100%',
				padding: '10px',
				boxSizing: 'content-box',
			})
			if(index>0){ _node.style('marginTop','10px') }
			// header
			if(headerHtml !== ''){
				_.toNode(headerHtml).children(0).appendTo(node)
			}
			
			// main
			const _html = _.toNode(html)
			// 分页
			const __main = _html.find('.main')
			if(__main.el){
				_html.children(0).appendTo(node).height( parseInt(this.paper.height) - headerHeight - footerHeight )
				_node.style({
					display: 'flex',
					flexDirection: 'column'
				})
				
			}else{
				_html.appendTo(node).style({position:'relative'})
				// _node.html(_main.html())
			}
			// footer
			if(footerHtml !== ''){
				_.toNode(footerHtml).children(0).appendTo(node)
			}
			
			this.__preview.append(node)
			
			const __page = __main.el ? __main : _node
			
			const { offsetTop } = __page.getOffset()
			index ++
			const _cloneMain = __page.clone().clear()
			
			__page.finds('.drag').each(v=>{
				const type = v.attr('type')
				const marginTop = v.marginTop()
				// 表格
				if(type === 'table' && v.find('.x-bind-table').el && v.outerHeight() + marginTop > mainHeight){
					const _drag = v.clone()
					const _tbody = _drag.find('tbody').clear()
					v.finds('tr').each((tr,i)=>{
						const trInfo = tr.getInfo()
						const offset = trInfo.offsetTop + trInfo.offsetHeight - offsetTop 
						if(offset > mainHeight){
							_tbody.append(tr)
						}
					})
					_cloneMain.append(_drag)
					deep(_cloneMain.htmls())
				}else{
					const dragInfo = v.getInfo()
					const offset = dragInfo.offsetTop + dragInfo.offsetHeight - offsetTop 
					if(offset > mainHeight + marginTop){ 
						_cloneMain.append(v)
					}
					if(_cloneMain.children().length() > 0){
						_cloneMain.children(0).removeStyle('marginTop')
						deep(_cloneMain.htmls())
					}
				}
			})
			
			_(document).finds('.pageNumber').each( v => v.text(v.parent('.paper-page').index() + 1))
			_(document).finds('.totalPages').each( v => v.text(this.__preview.children().length()))
		}
		deep(mainHtml)
	}
	// 获取数据
	getData(_node){
		const rootData = $fn.local('dataSource')
		
		// $http.pull(this,'',{}).then(data=>{
		// 	const isContent = $fn.local('bindWay')
		// })
		Format.renderData(rootData.dataSource1, 'dataSource1' , _node, true)
		return _node.html()
	}
	// 最终输出
	getLastHtml(isPdf){
		let _node = _.toNode(this.getLocalHtml())
		this.getData(_node)
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
				footerHeight = _footer.height() * scale
				_footer.width(paper.width).style('transform', `scale(${scale})`)
			}
			footerHtml = _footer.htmls()
		}
		
		if(_main.el){
			_main.style('position','relative').removeStyle('height,left,top,marginTop,marginBottom')
			if(isPdf){
				const _table = _main.children(0)
				if(_main.children().length() === 1 && _table.find('.x-bind-table')){
					_table.style('position','absolute')
				}
			}
			mainHeight = _main.height()
			mainHtml = _main.htmls()
		}else{
			if(_footer.el || _header.el){
				mainHtml = ''
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
					${headerHtml}</header>
					${mainHtml}
					${footerHtml}
				</div>
				<script>
					function resize(){
						const box = document.querySelector('.container');
						box.style.height = document.body.scrollHeight + 'px'
					}
					resize();
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
		// const { mainHtml, headerHtml, footerHtml, headerHeight, footerHeight } = this.getLastHtml(true)
		const _clone = this.__preview.clone()
		_clone.children().removeStyle('marginTop')
		$http.submit(null,'pdf',{ 
			param:{
				// header: headerHtml,
				// footer: footerHtml,
				// headerHeight,
				// footerHeight,
				main: _clone.html(),
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
		_(iframe).id('iframe').cssText('position:absolute;visibility:hidden').appendTo(document.body)
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
				<div className='ex rel' style={{margin:'5px'}}>
					<div className='abs_full scroll fxc f12 lh20'>
						<div id='preview'></div>
					</div>
				</div>
			</div>
		)
	}
}