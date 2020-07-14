import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode'

import Html from './html'
import { barcode, qrcode } from '../../js/public/config'

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
		if(el){
			var parent = el.parentElement
			while ( !this.hasClass(parent,className) && parent !== document.body && parent !== null) {
				parent = parent.parentElement
			}
		}
		return parent === document.body ? null : parent
	},
	parent(el,className){
		var parent = el.parentElement
		while ( !this.hasClass(parent,className) && parent !== document.body && parent !== null) {
			parent = parent.parentElement
		}
		return parent === document.body ? null : parent
	},
	// 判断是否有某个属性
	hasAttr(el,attr){
		if(el){
			return el.hasAttribute(attr)
		}else{
			return false
		}
	},
	// 查找有指定属性的父级元素
	parentAttr(el,attr){
		if(this.hasAttr(el,attr)){
			return el
		}
		if(el){
			var parent = el.parentElement
			while ( !this.hasAttr(parent,attr) && parent !== document.body && parent !== null) {
				parent = parent.parentElement
			}
		}
		return parent === document.body ? null : parent
	},
	isElement(node){ return node instanceof HTMLElement },
	isNodeList(node){ return node instanceof NodeList },
	// 获取样式
	getStyle(el){
		 return document.defaultView ? document.defaultView.getComputedStyle(el, null) : el.style
	},
	// 获取能够添加样式类型的节点的节点
	getComStyleNode(node,opt){
		if(node){
			const styleNode = node.querySelector('.x-com-style')
			if(styleNode){
				const style = this.getStyle(styleNode)
				opt.onAll && opt.onAll(styleNode, style)
			}
		}
	},
	// 获取节点信息
	getNode(node, callback, noToast){
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
				noToast === false && window.$fn.toast('未选中目标')
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
		table.style.cssText = 'width:100%;border-collapse:collapse;border-spacing:0'
		const tbody = document.createElement('tbody')
		const trFragment = document.createDocumentFragment()
		data.forEach( v => {
			const tr = document.createElement('tr')
			const tdFragment = document.createDocumentFragment()
			for(let i in v){
				const td = document.createElement('td')
				td.className = 'loopNode'
				td.style.cssText = 'border:1px solid #ddd;padding:2px 5px;'
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
			th.style.cssText = 'padding:2px 5px;background-color:#f5f5f5'
			th.setAttribute('type','text')
			th.textContent = '标题'
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
		const $drag = this.parents($temp,'drag')
		$temp.innerHTML = ''
		const ul = document.createElement('ul')
		ul.style.cssText = `width:100%;padding-left:2em;list-style:outside decimal`
		const fragment = document.createDocumentFragment()
		this.addClass($drag,'more')
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
	hasMark(node){
		return ( [].slice.call(node.children).some( v => this.hasClass(v,'point-mark')) )
	},
	// 创建拖动标尺
	createPointMark(node){
		if(node){
			if(!this.hasMark(node)){
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
	},
	// 查找字元素
	children(node,className){
		let rs = null
		for(let v of node.children){
			if(this.hasClass(v,className)){
				rs = v
			}
		}
		return rs
	},
	// 创建 checkbox
	createCheckbox($temp, data){
		if(typeof data !== 'object'){
			const $drag = this.parents($temp,'drag')
			$drag.style.width = '18px'
			$drag.style.height = '18px'
			$temp.innerHTML = `<img temp='1' src=${Boolean(data) ? checkedImage : CheckboxImage} style='width:100%;height:100%' draggable='false' />`
		}else if($fn.hasArray(data)){
			const $drag = this.parents($temp,'drag')
			$drag.style.removeProperty('width')
			$drag.style.removeProperty('height')
			this.addClass($drag,'more')
			const fragment = document.createElement('div')
			fragment.style.overflow = 'hidden'
			data.forEach((v,i)=>{
				const div = document.createElement('div')
				div.style.cssText = 'height:18px;line-height:18px;'
				div.style.margin = '0 10px 10px 0'
				const img = document.createElement('img')
				img.style.cssText = 'width:18px;height:100%;float:left'
				img.src = Boolean(v.value) ? checkedImage : CheckboxImage
				img.setAttribute('temp',1)
				img.draggable = false
				
				const label = document.createElement('label')
				label.textContent = v.label
				label.style.cssText = 'margin-left:5px;width:60px;float:left'
				div.appendChild(img)
				div.appendChild(label)
				fragment.appendChild(div)
			})
			$temp.innerHTML = ''
			$temp.appendChild(fragment)
		}
	},
	createBarcode($temp,data){
		const $img = $temp.querySelector('img')
		$img.style.width = '100%'
		$img.style.height = '100%'
		$img.setAttribute('temp',1)
		$img.setAttribute('code',data)
		$img.setAttribute('lineColor',barcode.lineColor)
		$img.setAttribute('codeWidth',barcode.width)
		$img.setAttribute('codeHeight',barcode.height)
		$img.setAttribute('displayValue',barcode.displayValue)
		$img.setAttribute('fontSize',barcode.fontSize)
		JsBarcode($temp.querySelector('img'),data, barcode)
	},
	createQrcode($temp,data){
		const $img = $temp.querySelector('img')
		$img.setAttribute('temp',1)
		$img.setAttribute('text',data)
		$img.setAttribute('colorDark',qrcode.colorDark)
		$img.setAttribute('colorLight',qrcode.colorLight)
		$img.setAttribute('margin',qrcode.margin)
		
		QRCode.toDataURL(data, qrcode).then(url=>{
			$img.src = url
		})
	}
}