import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode'

// import Html from './html'

import _ from './jzer'
import { barcode, qrcode, axesColor, axesActiveColor, axesSpace } from '../../js/public/config'

import CheckboxImage from '@img/icon/checkbox.png'
import checkedImage from '@img/icon/checked.png'

const { $fn } = window

export default {
	setMark(_this, $axes, left){
		const n = parseInt(left / axesSpace)
		_(_this.$axes).find($axes).children().each((v,i)=>{
			if(n === i){
				v.background(axesActiveColor)
			}else{
				v.background(axesColor)
			}
		})
	},
	// 获取样式
	getStyle(el,deep){
		if(deep) {
			return document.defaultView ? document.defaultView.getComputedStyle(el, null) : el.style
		}else{
			return el.style
		}
	},
	// 获取能够添加样式类型的节点的节点
	getNodeStyle(_node,opt, deep){
		if(_node.el){
			const _styleNode = _node.find('.x-com-style')
			if(_styleNode.el){
				opt.onAll && opt.onAll(_styleNode, _styleNode.getStyle(deep))
			}
		}
	},
	// 获取节点信息
	getNode(node, noToast){
		return new Promise(resolve=>{
			if(node){
				let model = {}
				const $temp = this.getStyleNode(node)
				const _drag = _( $temp ).parents('drag')
				const $bindText = _( node ).find('.x-bind-text')
				
				const type = _( node ).attr('type')
				model = { node, $temp, $drag:_drag.el, type, $bindText }
				if(_drag.el){
					const dragType = _drag.attr('type')
					const rootUrl = _drag.attr('rootUrl')
					
					const loop = Boolean(_drag.attr('loop'))
					const group = Boolean(_drag.attr('group'))
					model = { ...model, dragType, rootUrl, loop, group,  }
				}
				if($temp){
					const url = _( $temp ).attr('url')
					const isLoopNode =  _( $temp ).parents('loopNode')
					model = { ...model, url,  isLoopNode }
				}
				resolve(model)
			}else{
				noToast === false && window.$fn.toast('未选中目标')
			}
		})
	},
	// 获取节点信息
	getNodeInfo(_node, noToast){
		return new Promise(resolve=>{
			if(_node){
				let model = {}
				const _drag = _node.parents('.drag')
				const _temp = _node.children('.template')
				const _bindText = _node.find('.x-bind-text')
				const _bindUrl = _node.find('.x-bind-url')
				const _bindSrc = _node.find('.x-bind-src')
				const _bindTable = _node
				const type = _node.attr('type')
				const rootUrl = _drag.attr('rooturl')
				const bindUrl = _bindUrl.attr('url')
				
				model = { _drag, _temp, _bindText, _bindSrc, _bindUrl, _bindTable, type, rootUrl, bindUrl }
				
				resolve(model)
			}else{
				noToast === false && window.$fn.toast('未选中目标')
			}
		})
	},
	// 获取模板 node
	getStyleNode(node){ return _(node).hasClass('loopNode') ? node : node.querySelector('.template') },
	// 判断 node 是否有 template
	isTemplate(node){ return node.querySelector('.template') },
	// 清空数据
	reset({ _drag, _temp, _bindText, type, _bindSrc, _bindUrl}){
		
		if(_bindUrl.el){ _drag.removeAttr('rootUrl') }
		
		_bindUrl.removeAttr('url')
		
		if(['img','barcode','qrcode'].includes(type)){
			_( _temp.el ).find('img').src(`${window.location.origin}/assets/images/img.png`)
		}
		
		if(type === 'text'){
			_bindText.text('')
		}else if( type === 'barcode'){
			_(_drag.el).find('img').width(40).height(40)
		}
	},
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
		// const $drag = this.parents($temp,'drag')
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
				// li.className = 'loopNode'
				li.style.cssText = 'padding:5px 0;border-bottom:1px dashed #eee;'
				li.setAttribute('type','text')
				fragment.appendChild(li)
			}
		}
		ul.appendChild(fragment)
		// last
		$temp.appendChild(ul)
	},
	hasMark(node){
		return ( [].slice.call(node.children).some( v => _(v).hasClass('point-mark')) )
	},
	// 创建拖动标尺
	createPointMark(_node){
		if(_node.el){
			if(!this.hasMark(_node.el)){
				const point = document.createElement('div')
				const _point = _(point)
				_point.addClass('point-mark').html(`
					<p class='dir lt-wh'><s></s></p>
					<p class='dir rt-wh'><s></s></p>
					<p class='dir rb-wh'><s></s></p>
					<p class='dir lb-wh'><s></s></p>
					<p class='dir tc-h'><s></s></p>
					<p class='dir rc-w'><s></s></p>
					<p class='dir bc-h'><s></s></p>
					<p class='dir lc-w'><s></s></p>
				`).style('background','rgba(0,0,0,0.05)').bind('click',e=>{
					e.stopPropagation()
				})
				_node.append(point)
			}
		}
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
	createBarcode(_bindSrc,data){
		const _img = _bindSrc.find('img')
		_img.width('100%').height('100%').attr({
			temp:1,
			code:data,
			lineColor: barcode.lineColor,
			codeWidth: barcode.width,
			codeHeight: barcode.height,
			displayValue: barcode.displayValue,
			fontSize: barcode.fontSize
		})
		JsBarcode(_img.el,data, barcode)
	},
	createQrcode(_bindSrc,data){
		const _img = _bindSrc.find('img')
		_img.width('100%').height('100%').attr({
			temp:1,
			text:data,
			colorDark: barcode.colorDark,
			colorLight: barcode.colorLight,
			margin: barcode.margin,
		})
		QRCode.toDataURL(data, qrcode).then(url=>{
			_img.src(url)
		})
	}
}