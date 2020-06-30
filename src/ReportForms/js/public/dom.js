/**
 * dom 操作
 * */
import Html from './html'
const { $fn } = window
export default {
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
				const $drag = this.parents($temp,'drag')
				const dragType = $drag.getAttribute('type')
				const type = node.getAttribute('type')
				const loop = Boolean($drag.getAttribute('loop'))
				const group = Boolean($drag.getAttribute('group'))
				const url = $temp.getAttribute('url')
				const rootUrl = $drag.getAttribute('rootUrl')
				const isLoopNode = this.parents($temp,'loopNode')
				
				resolve({ node, $temp, type, dragType, loop, url, rootUrl, group, isLoopNode, $drag })
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
		$temp.appendChild(table)
	},
	// 创建 thead
	createThead(table){
		const col = table.querySelector('tr').querySelectorAll('td').length
		const thead = document.createElement('thead') 			// thead
		const trThead = document.createElement('tr')			// tr
		const thFragment = document.createDocumentFragment()	// th
		for(let i=0; i<col; i++){
			const th = document.createElement('th')
			th.className = 'loopNode'
			th.style.cssText = 'height:30px;padding:4px 5px;background-color:#f5f5f5'
			th.setAttribute('type','text')
			thFragment.appendChild(th)
		}
		trThead.appendChild(thFragment)
		thead.appendChild(trThead)
		table.insertBefore(thead, table.querySelector('tbody'))
	},
	// 设置表格边框
	setTableBorder($table, checked, color){
		let c = color || '#ddd'
		if($table){
			if(checked){
				for(let v of $table.querySelectorAll('th')){
					v.style.border = '1px solid ' + c
				}
				for(let v of $table.querySelectorAll('td')){
					v.style.border = '1px solid ' + c
				}
			}else{
				for(let v of $table.querySelectorAll('th')){
					v.style.border = 0
				}
				for(let v of $table.querySelectorAll('td')){
					v.style.border = 0
				}
			}
		}
	},
	// 创建列表
	createList($temp, data){
		if(typeof data !== 'object') return
		$temp.innerHTML = ''
		const ul = document.createElement('ul')
		ul.style.cssText = `width:100%;padding-left:2em;list-style:outside decimal`
		const fragment = document.createDocumentFragment()
		
		for(let i in data){
			let li =  null
			const value = data[i]
			
			if($fn.isString(value) || $fn.isNumber(value)){
				li = document.createElement('li')
				li.textContent =  value
			}else if($fn.isObject(value) && $fn.hasArray(data)){
				li = document.createElement('li')
				const arr = Object.keys(value)
				li.textContent =  value[arr[0]]
			}
			
			if(li){
				li.className = 'loopNode'
				li.style.cssText = 'padding:5px 0;border-bottom:1px dashed #eee;'
				li.setAttribute('type','text')
				fragment.appendChild(li)
			}
		}
		
		ul.appendChild(fragment)
		// last
		$temp.appendChild(ul)
	},
	// 清空数据
	reset($temp,type){
		const _type = Html[type]
		$temp.innerHTML = _type
	},
	// 移除 calssName
	removeClass(node,className){
		if(node instanceof NodeList){
			for(let v of node){
				const c = v.className.replace(' ' + className,'')
				v.className = c
			}
		}else{
			const c = node.className.replace(' ' + className,'')
			node.className = c
		}
	},
	createPointMark(node){
		if(!node.querySelector('.point-mark')){
			// 拖动标点
			const point = document.createElement('div')
			point.className = 'point-mark'
			point.innerHTML = `
				<p class='dir lt-wh'><s></s></p>
				<p class='dir rt-wh'><s></s></p>
				<p class='dir rb-wh'><s></s></p>
				<p class='dir lb-wh'><s></s></p>
				<p class='dir tc-h'><s></s></p>
				<p class='dir rc-w'><s></s></p>
				<p class='dir bc-h'><s></s></p>
				<p class='dir lc-w'><s></s></p>
			`
			point.style.background = 'rgba(0,0,0,0.05)'
			point.addEventListener('click',e=> e.stopPropagation())
			node.appendChild(point)
		}
	}
}