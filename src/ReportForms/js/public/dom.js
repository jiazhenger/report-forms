/**
 * dom 操作
 * */
const { $fn } = window
module.exports = {
	// 判断元素是否有 className
	hasClass(el,className){
		if(el){
			const c = el.className
			if(c){
				return c.indexOf(className) !== -1 
			}else{
				return false
			}
		}else{
			return false
		}
	},
	// 查找有指定样式的父级元素
	parents(el,className){
		if(this.hasClass(el,className)){
			return el
		}
		var parent = el.parentNode;
		while ( !this.hasClass(parent,className) && parent !== document.body && parent !== null) {
			parent = parent.parentNode
		}
		return parent === document.body ? null : parent
	},
	isElement(node){ return node instanceof HTMLElement },
	isNodeList(node){ return node instanceof NodeList },
	// 编辑节点
	/*
	editorNode(node){
		const editor = function(n){
			n.ondblclick = function(){
				this.contentEditable = true
				this.focus()
			}
			n.onblur = function(){
				this.contentEditable = false
			}
		}
		if(this.isElement(node)){
			editor(node)
		}else if(this.isNodeList(node)){
			for(let n of node){ editor(n) }
		}
	},
	*/
	// 获取节点信息
	getNode(node, callback){
		return new Promise(resolve=>{
			if(node){
				const $temp = this.getStyleNode(node)
				const drag = this.parents($temp,'drag')
				const dragType = drag.getAttribute('type')
				const type = node.getAttribute('type')
				const loop = Boolean(drag.getAttribute('loop'))
				const group = Boolean(drag.getAttribute('group'))
				const url = $temp.getAttribute('url')
				const rootUrl = drag.getAttribute('rootUrl')
				const isLoopNode = this.parents($temp,'loopNode')
				
				resolve({ node, $temp, type, dragType, loop, url, rootUrl, group, isLoopNode })
			}else{
				window.$fn.toast('未选中目标')
			}
		})
	},
	// 获取模板 node
	getStyleNode(node){ return this.hasClass(node,'loopNode') ? node : node.querySelector('.template') },
	// 判断 node 是否有 template
	isTemplate(node){ return node.querySelector('.template') },
	// 创建表格
	createTable($temp, data){
		if(!$fn.hasArray(data)) return
		$temp.innerHTML = ''
		const tr = document.createElement('tr')
		const table = document.createElement('table')
		const tbody = document.createElement('tbody')
		const trFragment = document.createDocumentFragment()
		data.forEach( v => {
			const tr = document.createElement('tr')
			const tdFragment = document.createDocumentFragment()
			for(let i in v){
				const td = document.createElement('td')
				td.className = 'loopNode'
				td.style.cssText = 'border:1px solid #ddd;height:28px;padding:4px 5px;'
				td.setAttribute('type','text')
				td.textContent = v[i]
				tdFragment.appendChild(td)
			}
			tr.appendChild(tdFragment)
			trFragment.appendChild(tr)
		})
		tbody.appendChild(trFragment)
		table.appendChild(tbody)
		$temp.innerHTML = ''
		$temp.appendChild(table)
	}
}