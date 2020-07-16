function $(selector,all){
	return new Init(selector,all)
}
// 容错处理
$.listener = function(el,callback){
	if(el){
		return callback(el)
	}else{
		console.log('选择器不存在')
	}
}
// 数据判断
const dataType = ['String', 'Number', 'Array', 'Object']

dataType.forEach(v => {
	$['is' + v] = function(obj){
		return {}.toString.call(obj) === '[object '+ v +']'
	} 
})

function Init(selector,all){
	if( $.isString(selector) ){
		const el = all ? document.querySelectorAll(selector) : document.querySelector(selector)
		if( el ){
			this.el = el
		}
	}else{
		this.el = selector
	}
}

// 属性
const attrExtend = {
	// 判断是否有某个属性
	hasAttr(attr): function{
		return $.listener(this.el, el => {
			return el.hasAttribute(attr)
		})
	},
	// 获取设置 attr
	attr : function(attr,value){
		return $.listener(this.el, el => {
			if(attr.constructor === String){
				if(attr.indexOf(',') === -1){
					if(value){
						el.setAttribute(attr,value) 		// 设置单个属性
						return this
					}else{
						return el.getAttribute(attr)		// 获取单个属性
					}
				}else{ // 获取多个属性
					attr = attr.split(',')
					let stack = { }
					attr.forEach(v=>{
						stack = {
							...stack,
							[v]: el.getAttribute(v)
						}
					})
					return stack
				}
			}else if(attr.constructor === Object){  // 设置多个属性
				for(let i in attr){
					el.setAttribute(i,attr[i])
				}
				return this
			}
		})
	}
}
// 样式
const classExtend = {
	// 判断元素是否有 className
	hasClass(className){
		return $.listener(this.el, el => {
			const c = el.className
			if({ }.toString.call(c) === '[object String]'){
				return c.indexOf(className) !== -1 
			}else{
				return false
			}
		})
	},
	addClass(className, clear){
		return $.listener(this.el, el => {
			if(clear){
				el.className = className
			}else{
				if(!this.hasClass(el,className)){
					if(!el.className || el.className === ''){
						el.className = className
					}else{
						el.className += ' ' + className
					}
				}
			}
			return this
		})
	},
	// 移除 calssName
	removeClass(className){
		return $.listener(this.el, el => {
			if(el instanceof NodeList){
				for(let v of el){
					const c = v.className.replace(' ' + className,'')
					v.className = c
				}
			}else{
				if(this.hasClass(el,className)){
					const c = el.className.replace(' ' + className,'')
					el.className = c
				}
			}
			return this
		})
	}
}
// 获取设置样式
const styleExtend = {
	// 获取样式
	getStyle(deep){
		return $.listener(this.el, el => {
			if(deep) {
				return document.defaultView ? document.defaultView.getComputedStyle(el, null) : el.style
			}else{
				return el.style
			}
		})
	},
	style(name,value){
		return $.listener(this.el, el => {
			if(name.constructor === String){
				if(value){
					el.style[name] = value
				}else{
					return el.style[name]
				}
			}else if(name.constructor === Object){
				for(let i in name){
					el.style[i] = name[i]
				}
			}
			return this
		})
	},
	cssText(str){
		return $.listener(this.el, el => {
			el.style.cssText = str
			return this
		})
	},
	removeStyle(name){
		return $.listener(this.el, el => {
			if(name.indexOf(',') === -1){
				el.style.removeProperty(name)
			}else{
				const arr = name.split(',')
				arr.forEach(v=>{
					v.style.removeProperty(v)
				})
			}
			return this
		})
	}
}
// 查找父级元素
const parentExtend = {
	// 查找父级，包含本身
	parent(className, isSelf){
		return $.listener(this.el, el => {
			if($(el).hasClass(className) && isSelf){
				return el
			}
			var parent = el.parentElement
			while ( !$(parent).hasClass(className) && parent !== document.body && parent !== null) {
				parent = parent.parentElement
			}
			return parent === document.body ? null : parent
		})
	},
	parents(className){
		return this.parent(className, true)
	},
	find(s, all){
		return $.listener(this.el, el => {
			this.el =  all ? el.querySelectorAll(s) : el.querySelector(s)
			return this
		})
	},
	finds(s){ return this.find(s, true)},
	each(callback){
		return $.listener(this.el, el => {
			for(let v of el){
				callback(v)
			}
			return this
		})
	}
}
// 设置值
const valueExtend = {
	html(str){
		return $.listener(this.el, el => {
			el.innerHTML = str
			return this
		})
	},
	text(str){
		return $.listener(this.el, el => {
			el.innerText = str
			return this
		})
	},
}

// 可见性
const visibleExtend = {
	show(){
		return $.listener(this.el, el => {
			$(el).style('display','block')
			return this
		})
	},
	hide(){
		return $.listener(this.el, el => {
			$(el).style('display','none')
			return this
		})
		
	}
}
// 添加元素
const appendExtend = {
	appendTo(elem){
		return $.listener(this.el, el => {
			elem.appendChild(el)
			return this
		})
	},
	append(elem){
		return $.listener(this.el, el => {
			el.appendChild(elem)
			return this
		})
	},
	remove(){
		return $.listener(this.el, el => {
			if(el.parentElement){
				el.parentElement.removeChild(el)
			}
			return this
		})
	}
}
// 事件
const eventExtend = {
	bind(event,callback){
		return $.listener(this.el, el => {
			el.addEventListener(event,callback)
			return this
		})
	},
	unbind(event,callback){
		return $.listener(this.el, el => {
			el.removeEventListener(event,callback)
			return this
		})
	},
}


Init.prototype = {
	...Init.prototype,
	...classExtend,
	...styleExtend,
	...attrExtend,
	...parentExtend,
	...valueExtend,
	...visibleExtend,
	...appendExtend,
	...eventExtend
}

module.exports =  $