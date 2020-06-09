/**
 * dom 操作
 * */
module.exports = {
	// 判断元素是否有 className
	hasClass(el,className){
		if(el instanceof HTMLElement){
			const c = el.className
			if(c){
				return c.indexOf(className) !== -1 
			}else{
				return false;
			}
		}else{
			return false
		}
	},
	// 查找父级有指定样式的元素
	parents(el,className){
		var parent = el.parentNode;
		while ( !this.hasClass(parent,className) && !(parent instanceof HTMLElement)) {
			parent = parent.parentNode
		}
		return this.hasClass(parent,className) ? parent : null
	},
}