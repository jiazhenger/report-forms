import Html from './html'

import CheckboxImage from '@img/icon/checkbox.png'
import checkedImage from '@img/icon/checked.png'

const { $fn } = window

export default {
	// 判断元素是否有 className
	hasClass(el,className){
		if(el){
			const c = el.className
			if($fn.isString(c)){
				return c.indexOf(className) !== -1 
			}else{
				return false
			}
		}else{
			return false
		}
	},
	addClass(el,className){
		if(!this.hasClass(el,className)){
			el.className += ' ' + className
		}
	},
	// 移除 calssName
	removeClass(el,className){
		if(el instanceof NodeList){
			for(let v of el){
				const c = v.className.replace(' ' + className,'')
				v.className = c
			}
		}else{
			if(this.hasClass(el,className)){
				const c = el.className.replace(' ' + className,'')
				el.className = c
			}
		}
	},
	// 查找有指定样式的父级元素
	parents(el,className){
		if(this.hasClass(el,className)){
			return el
		}
		var parent = el.parentNode
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
				let model = {}
				const $temp = this.getStyleNode(node)
				const $drag = this.parents($temp,'drag')
				const type = node.getAttribute('type')
				model = { node, $temp, $drag, type }
				if($drag){
					const dragType = $drag.getAttribute('type')
					const rootUrl = $drag.getAttribute('rootUrl')
					const loop = Boolean($drag.getAttribute('loop'))
					const group = Boolean($drag.getAttribute('group'))
					model = { ...model, dragType, rootUrl, loop, group,  }
				}
				if($temp){
					const url = $temp.getAttribute('url')
					const isLoopNode = this.parents($temp,'loopNode')
					model = { ...model, url,  isLoopNode }
				}
				
				resolve(model)
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
			
			this.addClass(this.parents($temp,'drag'),'more')
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
		if(type === 'devider'){ return }
		if(type === 'table' || type === 'ul'){
			const $drag = this.parents($temp,'drag')
			$drag.style.height = 'auto'
			this.removeClass($drag,'more')
		}
		$temp.innerHTML = Html[type]
	},
	// 创建拖动标尺
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
	},
	// 创建 checkbox
	createCheckbox($temp, data){
		if(typeof data !== 'object'){
			const $drag = this.parents($temp,'drag')
			$drag.style.width = '20px'
			$drag.style.height = '20px'
			$temp.innerHTML = `<img temp='1' src=${Boolean(data) ? checkedImage : CheckboxImage} style='width:100%;height:100%' draggable='false' />`
		}else if($fn.hasArray(data)){
			const $drag = this.parents($temp,'drag')
			$drag.style.removeProperty('width')
			$drag.style.removeProperty('height')
			const fragment = document.createElement('div')
			fragment.style.overflow = 'hidden'
			data.forEach((v,i)=>{
				const div = document.createElement('div')
				div.style.cssText = 'float:left;display:flex;align-items: center;'
				if(i>0){ div.style.marginLeft = '10px' }
				const img = document.createElement('img')
				img.style.cssText = 'width:20px;height:20px;'
				img.src = Boolean(v.value) ? checkedImage : CheckboxImage
				img.setAttribute('temp',1)
				const label = document.createElement('label')
				label.textContent = v.label
				label.style.cssText = 'margin-left:5px;'
				div.appendChild(img)
				div.appendChild(label)
				fragment.appendChild(div)
			})
			$temp.innerHTML = ''
			$temp.appendChild(fragment)
		}
	}
}