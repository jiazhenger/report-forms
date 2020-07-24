/**
 * 格式化数据
 * */
import Dom from './dom'
import _ from './jzer'
import Table from './table'
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
	// 数据渲染
	renderData(data, rootUrl, $drag, isContent){
		if(isContent){
			$drag.finds('.x-bind-url').each(v=>{
				let url = v.attr('url')
				const type = v.attr('type')
				
				if(_.isString(url)){
					const arr = url.split('/')
					arr[0] = rootUrl
					url = arr.join('/')
					v.attr({ url })
					
					const rs = this.parse({ [rootUrl]: data },url)
						
					if( type === 'text' ){
						v.text(rs)
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
			
			$drag.finds('table').each(_table =>{
				const _drag = _table.parent('.drag').removeStyle('height')
				_table.find('tbody').find('tr').children().each(v=>{
					// 表格
					if(v.hasClass('x-bind-table')){
						let url = v.attr('url')
						
						if(_.isString(url)){
							const arr = url.split('/')
							arr[0] = rootUrl
							url = arr.join('/')
							
							const parentUrl = this.getParentUrl(url)
							const rs = this.parse({ [rootUrl]: data }, parentUrl)
							
							if(_.isArray(rs)){
								Table.bindData(v, _drag, rs, this.getUrlField(url), url, isContent)
							}
						}
					}
				})
				
			})
		}
		$drag.finds('.x-bind-url').each(v=>{
			const url = v.attr('url')
			if(_.isString(url)){
				const arr = url.split('/')
				arr[0] = rootUrl
				v.attr('url', arr.join('/'))
			}
		})
		$drag.finds('.drag').each(v=>{
			if(v.attr('rootUrl')){
				v.attr({rootUrl})
			}
		})
	}
}