/**
 * 格式化数据
 * */
module.exports = {
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
	parse(root,str){
		if((typeof str) === 'string'){
			let arr = str.split('/')
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
	}
}