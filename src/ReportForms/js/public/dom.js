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
		if(this.hasClass(el,className)){
			return el
		}
		var parent = el.parentNode;
		while ( !this.hasClass(parent,className) && parent !== document.body && parent !== null) {
			parent = parent.parentNode
		}
		return parent === document.body ? null : parent
	},
	isElement(node){ return node instanceof HTMLElement },
	isNodeList(node){ return node instanceof NodeList },
	// 编辑节点
	editorNode(node){
		const editor = function(n){
			n.ondblclick = function(){
				this.contentEditable = true
				this.focus()
			}
			n.onblur = function(){
				this.contentEditable = false
			}
		}
		if(this.isElement(node)){
			editor(node)
		}else if(this.isNodeList(node)){
			for(let n of node){ editor(n) }
		}
		
	},
	// 获取节点信息
	getNode(node, callback){
		return new Promise(resolve=>{
			if(node){
				const $temp = node.querySelector('.template') || node
				const type = node.getAttribute('type')
				const loop = node.getAttribute('loop')
				const url = node.getAttribute('url')
				resolve({ node, $temp, type, loop, url })
			}else{
				window.$fn.toast('未选中目标')
			}
		})
	},
	// 获取添加样式的 node
	getStyleNode(node){ return this.hasClass(node,'loopNode') ? node : node.querySelector('.template') },
	// 判断 node 是否有 template
	isTemplate(node){ return node.querySelector('.template') }
}