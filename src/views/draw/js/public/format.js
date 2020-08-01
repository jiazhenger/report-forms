/**
 * 格式化数据
 * */
import Dom from './dom'
import _ from './jzer'
import Table from './table'
import { tableConfig } from '../../js/public/config'
const { $fn } = window
export default {
	// 重新格式化数组源
	formatData(data, field, currentUrl, type){
		let index = 0
		const recursion = (data, arr, url) => {
			url = url ? url : field
			let root = false
			if(index === 0){
				root = $fn.hasArray(data) ? '/0' : false
				index ++
			}
		
			data = $fn.hasArray(data) ? data[0] : data
			if($fn.hasObject(data)){
				Object.keys(data).forEach((v,i)=>{
					// 生成 url
					const n = $fn.hasArray(data[v]) ? '/0' : ''
					const urls = root ? (url + root + '/' + v + n ) : (url + '/' + v + n)
					// 新数据组合
					const obj = { name: v, url: urls, root:field, checked: currentUrl === urls }
					// 获取数组父级 url
					obj.parentUrl = this.getParentUrl(urls)
					// 获取最后结果
					arr[i] = ( typeof data[v] === 'object' ) ? {...obj, children:[] } :  { ...obj, value: data[v], isString:1 }
					// 禁用
					if( type === 'table'){
						// if(!$fn.hasArray(data[v])){ arr[i].disabled = true }  // 组合节点禁用非数组
					}else if(type === 'ul'){
						if(typeof data[v] !== 'object'){ arr[i].disabled = true } // 对象节点禁用
					}else{
						if(typeof data[v] === 'object'){ arr[i].disabled = true } // 对象节点禁用
						if( this.isArray(urls) ){ arr[i].disabled = true } // 数组元素禁用
					}
					// 递归
					if( typeof data[v] === 'object' ){
						// 判断数据类型
						if($fn.isArray(data[v])){
							arr[i].isArray = 1
						}else if($fn.isObject(data[v])){
							arr[i].isObject = 1
						}
						recursion(data[v], arr[i].children, urls)
					}
				})
			}
			return arr
		}
		return recursion(data, [])
	},
	formatCheckedData(data, { url }, group){ 
		const recursion = (data, url) => {
			data.forEach((v,i)=>{
				if(v.url === url){
					v.checked = 1
				}else{
					v.checked = 0
				}
				if( $fn.hasArray(v.children) ){
					if(group){ v.disabled = true }
					recursion(v.children, url)
				}
			})
			return data
		}
		return recursion(data, url)
	},
	// 重组判断列表数据
	getField(str){
		return typeof str === 'string' ? str.split('/') : null
	},
	getData(data, str){
		if((typeof str) === 'string'){
			const arr = str.split('/')
			let result = data
			// data[][][][]
			// ['a','b']
			arr.forEach(v => {
				result = result[v]
			})
			return result
		}else{
			return null
		}
	},
	// 觖析 dataSoruce/icons/0/src 为 root['dataSoruce']['icons'][0]['src']
	parse(root,url){
		if((typeof url) === 'string'){
			let arr = url.split('/')
			if(!isNaN(+arr[arr.length-1])){ arr.pop() }  // 删除最后一个元素
			let index = 0
			while(index < arr.length){
				let n = arr[index]
					n = isNaN(+n) ? n : +n
					if(typeof root === 'object'){
						root = root[n]
					}
				index ++
			}
			return root
		}else{
			return null
		}
	},
	// 解析 dataSoruce/icons/0/src 为 root['icons']['src']
	parseParent(root,url){
		if((typeof url) === 'string'){
			let arr = url.split('/')
			arr = arr.filter( v => isNaN(+v))
			arr.shift()
			arr.pop()
			let index = 0
			while(index < arr.length){
				let n = arr[index]
				root = root[n] || { }
				index ++
			}
			return root
		}else{
			return { }
		}
	},
	// 判断 url 据是否是数组
	isArray(url){
		const arr = url.split('/')
		const len = arr.length
		return !isNaN(arr[len-1])
	},
	// 判断 url 是否是数组的元素
	isArrayChild(url){
		const arr = url.split('/')
		const len = arr.length
		return !isNaN(arr[len-2])
	},
	// 根据数组元素 url 推出父组数组的 url
	getParentUrl(url){
		if(_.isString(url)){
			let arr = url.split('/')
			if(this.isArray(url)){
				arr = arr.filter( v => isNaN(+v))
				arr.pop()
			}else{
				arr.pop()
			}
			return arr.join('/')
		}else{
			return ''
		}
	},
	// 获取字段名
	getUrlField(url){
		if(_.isString(url)){
			let arr = url.split('/')
			return arr[arr.length - 1]
		}else{
			return ''
		}
	},
	// 获取根数据 url
	getRootUrl(url){
		if(_.isString(url)){
			return url.split('/')[0]
		}else{
			return ''
		}
	},
	// 设置 url 并获取数据
	getUrlData(_node, option){
		const opt = {
			rootUrl:null,
			data:[],
			callback:null,
			...option
		}
		const rootUrl = opt.rootUrl
		const data = opt.data
		
		let url = _node.attr('url')
		
		if(_.isString(url)){
			const arr = url.split('/')
			arr[0] = rootUrl
			url = arr.join('/')
			_node.attr({url})
			
			const parentData = this.parse({ [rootUrl]: data }, this.getParentUrl(url) )
			const currentData = this.parse({ [rootUrl]: data }, url )
			if( _.hasArray(parentData) || _.hasObject(parentData)){
				opt.callback && opt.callback(currentData,parentData, url)
			}else{
				
			}
		}
	},
	// 判断绑定方式
	isContent(_node){ return _node.finds('code').length() === 0 },
	// 数据渲染
	renderData(data, rootUrl, $drag, isContent){
		$drag.finds('.x-bind-url').each(v=>{
			this.getUrlData(v,{
				data, 
				rootUrl,
				callback: (rs, parent, url) =>{
					const type = v.attr('type')
					if( type === 'text' ){
						if(isContent){
							v.text(rs)
						}else{
							v.html(Dom.bindField(this.getUrlField(url)))
						}
					}else if( type === 'img'){
						v.find('img').src(rs)
					}else if( type === 'barcode'){
						Dom.createBarcode(v,rs)
					}else if( type === 'qrcode'){
						Dom.createQrcode(v,rs)
					}else if( type === 'checkbox'){
						Dom.createCheckbox(v,rs)
					}
				}
			})
		})
		// 渲染表格数据
		$drag.finds('table').each(_table =>{
			if(_table.finds('.x-bind-table').length() === 0 && _table.finds('code').length() === 0) return 
			_table.parent('.drag').removeStyle('height')
			const _tbody = _table.find('tbody')
			const tdUrls = []
			_tbody.finds('td').each(v=>{
				if(v.attr('url')) {
					tdUrls.push( v.attr('url') )
				}
			})
			// 新建表格
			this.getUrlData( _tbody.find('td') ,{
				data, 
				rootUrl,
				isParent:true,
				callback: (rs, parent, url) =>{
					const col = _tbody.find('tr').children().length()
					const trLen = _tbody.children().length()
					if(_.hasArray(parent)){
						const row = isContent ? parent.length : 1
						const style = tableConfig.style
						if(+_table.attr('border') === 0){ delete style.border }
						if(row !== trLen){
							const tbody = Table.createTbody({
								row,
								col,
								td:{
									style,
									className:'loopNode x-bind-table',
									attr:{ type:'text' }
								}
							})
							_tbody.html(tbody.innerHTML)
						}
					}
				}
			})
			// 给表格重新加 url 属性及绑定内容
			_tbody.finds('tr').each( (_tr, j) =>{
				_tr.children().each( (_td, i)=>{
					if(_td.hasClass('x-bind-table')){
						_td.attr('url', tdUrls[i])
						this.getUrlData(_td,{
							data, 
							rootUrl,
							callback: (rs, parent, url) =>{
								const name = this.getUrlField(url)
								if(isContent){
									const p = parent[j]
									if(p) _td.text(p[name])
								}else{
									_td.html(Dom.bindField(name))
								}
							}
						})
					}
				})
			})
		})
		
		// 将所有 drag 上的 roourl 设置成统一
		$drag.finds('.drag').each( v => {
			if( v.attr('rootUrl') ){ v.attr({rootUrl}) }
		})
		return $drag
	}
}