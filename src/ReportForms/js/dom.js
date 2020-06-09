/**
 * dom 操作
 * */
module.exports = {
	// 判断元素是否有 className
	hasClass(el,className){
		const c = el.className
		if(c){
			return c.indexOf(className) !== -1 
		}else{
			return false;
		}
	},
	// 查找父级有指定样式的元素
	parents(el,className){
		var parent = el.parentNode;
		while ( !this.hasClass(parent,className) && parent !== document.body) {
			parent =  parent.parentNode
		}
		return parent === document.body ? null : parent
	},
}