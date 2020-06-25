/**
 * 格式化数据
 * */
const { $fn } = window
module.exports = {
	// 重新格式化数组源
	formatData(data, field, currentUrl, group, isLoopNode){
		const recursion = (data, arr, url) => {
			url = url ? url : field
			data = $fn.hasArray(data) ? data[0] : data
			if($fn.hasObject(data)){
				Object.keys(data).forEach((v,i)=>{
					// 生成 url
					const n = $fn.hasArray(data[v]) ? '/0' : ''
					const urls = url + '/' + v + n
					// 新数据组合
					const obj = { name: v, url: urls, root:field, checked: currentUrl === urls }
					// 获取数组父级 url
					obj.parentUrl = this.getParentUrl(urls)
					// 获取最后结果
					arr[i] = ( typeof data[v] === 'object' ) ? {...obj, children:[] } :  { ...obj, value: data[v], isString:1 }
					if( typeof data[v] === 'object' ){
						// 判断数据类型
						if($fn.isArray(data[v])){
							arr[i].isArray = 1
						}else if($fn.isObject(data[v])){
							arr[i].isObject = 1
						}
						// arr[i].disabled = isLoopNode
						recursion(data[v], arr[i].children, urls)
					}else{
						// if(group){ arr[i].disabled = group }
						// arr[i].disabled = !isLoopNode	
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
			if(!isNaN(+arr[arr.length-1])){
				arr.pop()
			}
			let index = 0
			while(index < arr.length){
				let n = arr[index]
					n = isNaN(+n) ? n : +n
				root = root[n]	
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
		let arr = url.split('/')
		if(this.isArray(url)){
			arr = arr.filter( v => isNaN(+v))
			arr.pop()
		}else{
			arr.pop()
		}
		return arr.join('/')
	},
	// 获取根数据 url
	getRootUrl(url){
		return url.split('/')[0]
	}
}