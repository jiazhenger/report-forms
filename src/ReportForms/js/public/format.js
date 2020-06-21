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
	}
}