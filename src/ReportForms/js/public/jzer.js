function $(selector,all){
	return new Init(selector,all)
}
// 动态改变 this 的指向
function __(el){
	const f =  $( el )
	f.el = el
	return f
}
// 容错处理
$.listener = function(el,callback){
	if(el){
		return callback(el)
	}else{
		return Init.prototype
	}
}
// 鼠标
$.mouse = {
	getCoord(e){
		return {
			x: e.pageX || e.x || e.screenX || e.clientX,
			y: e.pageY || e.y || e.screenY || e.clientY
		}
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
				if(!$(el).hasClass(className)){
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
				if($(el).hasClass(className)){
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
			if(arguments.length === 0){
				return el.style
			}else if( arguments.length === 1 ){
				if($.isString(name)){
					return el.style[name]
				}else if($.isObject(name)){
					if( el instanceof HTMLCollection || el instanceof NodeList ){
						$(el).each( (v,i,n) => {
							for(let i in name){ n.style[i] = name[i] }
						})
					}else{
						for(let i in name){ el.style[i] = name[i] }
					}
					return this
				}
			}else if( arguments.length === 2 ){
				if( el instanceof HTMLCollection || el instanceof NodeList ){
					$(el).each( (v,i,n) => n.style[name]=value )
				}else{
					el.style[name] = value
				}
				return this
			}
		})
	},
	cssText(str){
		return $.listener(this.el, el => {
			if(arguments.length === 0){
				return el.style.cssText
			}else{
				el.style.cssText = str
				return this
			}
		})
	},
	removeStyle(name){
		return $.listener(this.el, el => {
			if(name.indexOf(',') === -1){
				if( el instanceof HTMLCollection || el instanceof NodeList ){
					$(el).each( (v,i,n) => n.style.removeProperty(name) )
				}else{
					el.style.removeProperty(name)
				}
			}else{
				const arr = name.split(',')
				arr.forEach(v=>{
					v.style.removeProperty(v)
				})
			}
			return this
		})
	}
};
(['width','height','lineHeight','left','top']).forEach(function(v){
	styleExtend[v] = function(value){
		return $.listener(this.el, el => {
			if(arguments.length === 0){
				const r = this.style(v)
				return r ? parseInt(r) : 0
			}else if(arguments.length === 1){
				if($.isNumber( parseInt(value) )){
					value = isNaN(+value) ? value : value + 'px'
					this.style(v, value)
				}
				return this
			}
		})
	}
});
(['background', 'border', 'borderColor', 'color']).forEach(function(v){
	styleExtend[v] = function(value){
		return $.listener(this.el, el => {
			if(arguments.length === 0){
				return this.style(v)
			}else if(arguments.length === 1){
				this.style(v, value)
				return this
			}
		})
	}
})
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
			if(arguments.length === 0){
				
			}else if(arguments.length === 1){
				if(attr.constructor === String){
					if(attr.indexOf(',') === -1){
						return el.getAttribute(attr)		// 获取单个属性
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
			}else if(arguments.length === 2){
				el.setAttribute(attr,value) 		// 设置单个属性
				return this
			}
		})
	},
	prop(attr,value){
		return $.listener(this.el, el => {
			if(arguments.length === 1){
				return el[attr]
			}else if(arguments.length === 2){
				el[attr] = value
				return this
			}
		})
	},
	removeAttr(attr){
		return $.listener(this.el, el => {
			el.removeAttribute(attr)
			return this
		})
	}
};
(['src','href','contentEditable']).forEach(function(v){
	attrExtend[v] = function(value){
		return $.listener(this.el, el => {
			if(arguments.length === 0){
				return el[v]
			}else if(arguments.length === 1){
				el[v] = value
				return this
			}
		})
	}
})
// 查找父级元素
const parentExtend = {
	// 查找父级，包含本身
	parent(str, isSelf){
		return $.listener(this.el, el => {
			if(str.indexOf('.') !== -1){ str = str.replace('.','') }
			
			if($(el).hasClass(str) && isSelf){ 
				// this.el = el
				return this
			}
			
			let parent = el.parentElement
			while ( !$(parent).hasClass(str) && parent !== document.body && parent !== null) {
				parent = parent.parentElement
			}
			return __( parent === document.body ? null : parent )
		})
	},
	parents(str){
		return this.parent(str, true)
	},
	find(s, all){
		return $.listener(this.el, el => {
			return __(all ? el.querySelectorAll(s) : el.querySelector(s))
		})
	},
	finds(s){ return this.find(s, true)},
	each(callback){
		return $.listener(this.el, el => {
			if(el instanceof HTMLCollection || el instanceof NodeList){
				Array.prototype.slice.call(el).forEach((v,i)=>{
					const _v = __(v)
					callback(_v, i, _v.el)
				})
			}
			return this
		})
	},
	children(name){
		return $.listener(this.el, el => {
			if(arguments.length === 0){
				return __(el.children)
			}else if(arguments.length === 1){
				if($.isString(name)){
					name = name.replace('.', '')
					let n = null
					$(el.children).each( v => {
						if(v.hasClass(name)){
							n = v
						}
					})
					return n ? n : __( )
				}else if($.isNumber(name)){
					return __( el.children[name] )
				}
			}
			
		})
	},
}
// 设置值
const valueExtend = {
	html(str){
		return $.listener(this.el, el => {
			if(arguments.length === 0){
				return el.innerHTML
			}else{
				el.innerHTML = str
				return this
			}
		})
	},
	text(str){
		return $.listener(this.el, el => {
			if(arguments.length === 0){
				// return e.innerText
				return el.textContent
			}else{
				// el.innerText = str
				el.textContent = str
				return this
			}
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
// 获取信息
const infoExtend = {
	getOffset(){
		return $.listener(this.el, el => {
			let offsetTop = el.offsetTop
			let offsetLeft = el.offsetLeft 
			let parent = el.offsetParent
			while(parent){
				offsetTop += parent.offsetTop
				offsetLeft += parent.offsetLeft 
				parent = parent.offsetParent
			}
			return { offsetTop, offsetLeft}
		})
	},
	getPos(){
		return $.listener(this.el, el => {
			return {
				left: $(el).left(),
				top: $(el).top(),
			}
		})
	},
	getInfo : function(s){
		return $.listener(this.el, el => {
			const r = el.getBoundingClientRect( )
			const { offsetTop, offsetLeft } = this.getOffset()
			return {
				offsetTop		: offsetTop,
				offsetLeft		: offsetLeft,
				offsetRight		: r.right,
				offsetBottom	: r.bottom,
				width 			: r.width,
				height 			: r.height,
				clientWidth 	: el.clientWidth,
				clientHeight 	: el.clientHeight,
				offsetWidth 	: el.offsetWidth,
				offsetHeight 	: el.offsetHeight,
				scrollWidth 	: el.scrollWidth,
				scrollHeight	: el.scrollHeight,
				scrollLeft 		: el.scrollLeft,	
				scrollTop 		: el.scrollTop,	
				posTop 			: el.offsetTop,	
				posLeft 		: el.offsetLeft,
				left			: el.style.left ? parseInt(el.style.left) : 0,
				top 			: el.style.top ? parseInt(el.style.top) : 0
			}
		})
	},
	
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
// 判断
const judgeExtend = {
	isElement(){ return this.el instanceof HTMLElement },
	isNodeList(){ return this.el instanceof NodeList },
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
	...eventExtend,
	...infoExtend,
	...judgeExtend
}

module.exports =  $