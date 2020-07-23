import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode'

// import Html from './html'
import _ from './jzer'
import Table from './table'
import { barcode, qrcode, axesColor, axesActiveColor, axesSpace } from '../../js/public/config'

import CheckboxImage from '@img/icon/checkbox.png'
import checkedImage from '@img/icon/checked.png'

const { $fn } = window

export default {
	// 设置移动标线
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
	// 清除 mark
	clearMark(_node){
		_node.find('.point-mark').removeClass('mark-show')
	},
	// 设置父级边框
	setParentBorder(__drag, _drag){
		__drag.parent().finds('.border-parent').removeClass('border-parent')
		
		_drag.parent('.drag').addClass('border-parent')
	},
	// 移动中添加的边框
	setMoveBorder(_drag){
		this.clearMark(_drag)
		_drag.addClass('drag-move')
	},
	// 重置所有边框
	resetBorder(__drag){
		const _mark = __drag.removeStyle('outline').find('.mark-show').removeClass('mark-show')
		if(_mark.el){
			const _drag = _mark.style('zIndex',0).parent().style('zIndex',1)
			_drag.removeClass('drag-move')
		}else{
			__drag.find('.drag-move').removeClass('drag-move')
		}
		__drag.parent().find('.border-parent').removeClass('border-parent')
	},
	// 隐藏 mark
	hideMark(__drag, _node){
		const _drag = __drag.find('.mark-show').parent('.drag')
		if(!_node.el.isSameNode(_drag.el)){
			this.resetBorder(__drag)
		}
	},
	// 显示 mark
	showMark(__drag, _drag){
		if(!_drag.attr('id')){ this.createPointMark(_drag) }
		this.hideMark(__drag, _drag)
		const _mark = _drag.style('zIndex',10).children('.point-mark').addClass('mark-show')
		this.setParentBorder(__drag,_drag)
		
		// 
		if(_drag.attr('fixed')){
			_mark.removeStyle('background').style('zIndex',0)
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
				const _temp = _node.hasClass('loopNode') ? _node : _node.children('.template')
				const url = _temp.attr('url')
				const type = _node.attr('type')
				const dragType = _drag.attr('type')
				const rootUrl = _drag.attr('rooturl')
				
				model = { _drag, _temp, type, dragType, url, rootUrl }
				
				resolve(model)
			}else{
				noToast !== false && window.$fn.toast('未选中目标')
			}
		})
	},
	// 获取模板 node
	getStyleNode(node){ return _(node).hasClass('loopNode') ? node : node.querySelector('.template') },
	// 清空数据
	reset({ _drag, _temp, type, dragType, isArrayUrl}){
		
		if(_drag.el){ _drag.removeAttr('rootUrl') }
		
		_temp.removeAttr('url').removeClass('x-bind-url')
		
		if(['img','barcode','qrcode'].includes(type)){
			_temp.find('img').src(`${window.location.origin}/assets/images/img.png`)
		}
		
		if( !_temp.hasClass('loopNode')){ _temp.removeAttr('type') }
		
		if(type === 'text'){
			_temp.html('')
		}else if( type === 'barcode'){
			_temp.find('img').width(40).height(40).removeAttr('temp,code,lineColor,codeWidth,codeHeight,displayValue,fontSize')
		}else if( type === 'qrcode'){
			_temp.find('img').removeAttr('temp,text,colorDark,colorLight,margin')
		}else if( type === 'checkbox'){
			_temp.find('img').src(CheckboxImage)
		}
		
		if(dragType === 'table'){
			Table.resetData(_temp)
		}else{
			
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
	createCheckbox(_temp, data){
		if(typeof data !== 'object'){
			_temp.find('img').src(Boolean(data)?checkedImage:CheckboxImage)
		}else if($fn.hasArray(data)){
			/*
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
			*/
		}
	},
	createBarcode(_node,data){
		const _img = _node.find('img')
		_img.width('100%').height('100%').attr({
			temp:1,
			code:data,
			lineColor: barcode.lineColor,
			codeWidth: barcode.width,
			codeHeight: barcode.height,
			displayValue: barcode.displayValue,
			fontSize: barcode.fontSize
		})
		if(_.isString(data) || _.isNumber(data)){
			JsBarcode(_img.el,data, barcode)
		}else{
			$fn.toast('条形码码必须是字符串或数字')
		}
	},
	createQrcode(_node,data){
		const _img = _node.find('img')
		_img.width('100%').height('100%').attr({
			temp:1,
			text:data,
			colorDark: qrcode.colorDark,
			colorLight: qrcode.colorLight,
			margin: qrcode.margin,
		})
		if(_.isString(data)){
			QRCode.toDataURL(data, qrcode).then(url=>{
				_img.src(url)
			})
		}else{
			$fn.toast('二维码必须是字符串')
		}
	},
	// 绑定字段格式
	bindField(name){
		return '<code><s>=</s><span>'+ name +'</span></code>'
	}
}