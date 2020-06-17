/**
 * dom 操作
 * */
module.exports = {
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
		var parent = el.parentNode;
		while ( !this.hasClass(parent,className) && parent !== document.body) {
			parent =  parent.parentNode
		}
		return parent === document.body ? null : parent
	},
}