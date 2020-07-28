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
		// console.log('选择器不存在')
		return Init.prototype
	}
}
// 将 { a: 0 } 转换为 { key: 'a', value: 0}
$.getKeyValue = function(obj){
	let stack = {}
	for(let i in obj){
		stack = { key: i, value: obj[i] }
	}
	return stack
}
// 获取数字
$.getNum = function(value, flag){
	const r = parseInt(value)
	return isNaN(r) ? (flag?value:0) : r
}
// 将横杠线转换驼峰
// $.toHump = name => ( name.replace(/\-(\w)/g, (all, letter) => letter.toUpperCase() ) )
// 驼峰转换横杠线
$.toLine = name => ( name.replace(/([A-Z])/g, '-$1').toLowerCase() )
// 将字符串转为 node
$.toNode = function(str){
	const node = document.createElement('div')
	node.innerHTML = str
	return __(node)
}
// 鼠标
$.mouse = {
	getCoord(e){
		return {
			x: e.pageX || e.x || e.screenX || e.clientX,
			y: e.pageY || e.y || e.screenY || e.clientY
		}
	}
};
// 数据判断
(['String', 'Number', 'Array', 'Object', 'Boolean', 'Function', 'Undefined']).forEach(v => {
	$['is' + v] = obj => ( {}.toString.call(obj) === '[object '+ v +']' )
});

$.hasArray = d => $.isArray(d) && d.length > 0
$.hasObject = d => $.isObject(d) && Object.keys(d).length > 0

$.isHtmlNodeList = el => el instanceof HTMLCollection || el instanceof NodeList
$.isNode = el => el instanceof Node
$.isElement = el => el instanceof HTMLElement
$.isInit = el => el instanceof Init

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
			if(className.indexOf(',') === -1){
				if($.isHtmlNodeList(el)){
					$(el).each((v,i,n)=>{
						const c = n.className
						if(v.hasClass(className)){
							n.className = c.replace(' ' + className,'')
						}
					})
				}else{
					if($(el).hasClass(className)){
						const c = el.className.replace(' ' + className,'')
						el.className = c
					}
				}
			}else{
				const arr = className.split(',')
				arr.forEach( styleName =>{
					if($.isHtmlNodeList(el)){
						$(el).each((v,i,n)=>{
							const c = n.className
							if(v.hasClass(styleName)){
								n.className = c.replace(' ' + styleName,'')
							}
						})
					}else{
						if($(el).hasClass(styleName)){
							const c = el.className.replace(' ' + styleName,'')
							el.className = c
						}
					}
				})
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
	hasStyle(name){
		return $.listener(this.el, el => {
			return el.style[name] ? true : false
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
					if( $.isHtmlNodeList(el) ){
						$(el).each( (v,i,n) => {
							for(let i in name){ n.style[i] = name[i] }
						})
					}else{
						for(let i in name){ el.style[i] = name[i] }
					}
					return this
				}
			}else if( arguments.length === 2 ){
				if( $.isHtmlNodeList(el) ){
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
				if( $.isHtmlNodeList(el) ){
					$(el).each( (v,i,n) => n.style.removeProperty($.toLine(name)) )
				}else{
					el.style.removeProperty($.toLine(name))
				}
			}else{
				const arr = name.split(',')
				arr.forEach( styleName =>{
					if( $.isHtmlNodeList(el) ){
						$(el).each( (v,i,n) => n.style.removeProperty($.toLine(styleName)) )
					}else{
						el.style.removeProperty($.toLine(styleName))
					}
				})
			}
			return this
		})
	}
};
(['width','height','lineHeight','left','top','letterSpacing','fontSize','marginTop','marginLeft']).forEach(function(v){
	styleExtend[v] = function(value){
		return $.listener(this.el, el => {
			if(arguments.length === 0){
				return $.getNum( this.style(v) )
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
			if(attr.indexOf(',') === -1){
				if( $.isHtmlNodeList(el) ){
					$(el).each( (v,i,n) => n.removeAttribute(attr) )
				}else{
					el.removeAttribute(attr)
				}
			}else{ // 获取多个属性
				attr = attr.split(',')
				attr.forEach( attrName =>{
					if( $.isHtmlNodeList(el) ){
						$(el).each( (v,i,n) => n.removeAttribute(attrName) )
					}else{
						el.removeAttribute(attrName)
					}
				})
			}
			return this
		})
	}
};
(['src','href','contentEditable','draggable', 'id']).forEach(function(v){
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
	tag(tag){
		return $.listener(this.el, el => {
			if(arguments.length === 0){
				return el.tagName.toLowerCase()
			}else{
				return el.tagName.toLowerCase() === tag
			}
		})
	},
	// 查找父级，包含本身
	parent(str, isSelf){
		return $.listener(this.el, el => {
			if(arguments.length === 0){
				return __( el.parentElement )
			}else{
				let parent = el.parentElement
				if(str.indexOf('.') !== -1){ 
					str = str.replace('.','') 
					if($(el).hasClass(str) && isSelf){
						// this.el = el
						return this
					}
					
					while ( !$(parent).hasClass(str) && parent !== document.body && parent !== null) {
						parent = parent.parentElement
					}
				}else{
					if($(el).tag(str)  && isSelf){
						return this
					}
					
					while ( !$(parent).tag(str) && parent !== document.body && parent !== null) {
						parent = parent.parentElement
					}
				}
				return __( parent === document.body ? null : parent )
			}
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
			if($.isHtmlNodeList(el)){
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
	first(){
		return $.listener(this.el, el => {
			return __( el.firstElementChild )
		})
	},
	last(){
		return $.listener(this.el, el => {
			return __( el.lastElementChild )
		})
	},
	index(){
		return $.listener(this.el, el => {
			if(arguments.length === 0){
				let index = 0
				$(el).parent().children().each((v,i,n)=>{
					if(n.isSameNode(this.el)){
						index = i
					}
				})
				return index
			}else{
				return __(el.children)
			}
		})
	},
	length(){
		return $.listener(this.el, el => {
			return el.length
		})
	},
	clone(){
		return $.listener(this.el, el => {
			return __(el.cloneNode(true))
		})
	},
	hasChild(){
		return $.listener(this.el, el => {
			return el.hasChildNodes()
		})
	},
	isSame(elem){
		return $.listener(this.el, el => {
			if($.isNode(elem)){
				return el.isEqualNode(elem)
			}else if($.isInit(elem) && elem.el){
				return el.isEqualNode(elem.el)
			}
		})
	}
}
// 设置值
const valueExtend = {
	clear(){
		return $.listener(this.el, el => {
			el.innerHTML = ''
			return this
		})
	},
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
	// 获取包括自身的 html
	htmls(){
		return $.listener(this.el, el => {
			const node = document.createElement('div')
			node.appendChild(el)
			return node.innerHTML
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
	
	innerWidth(){
		return $.listener(this.el, el => {
			return el.clientWidth
		})
	},
	innerHeight(){
		return $.listener(this.el, el => {
			return el.clientHeight
		})
	},
	outerWidth(){
		return $.listener(this.el, el => {
			return el.offsetWidth
		})
	},
	outerHeight(){
		return $.listener(this.el, el => {
			return el.offsetHeight
		})
	}
}
// 添加元素
const appendExtend = {
	appendTo(elem){
		return $.listener(this.el, el => {
			if($.isNode(elem)){
				elem.appendChild(el)
			}else if($.isInit(elem) && elem.el){
				elem.el.appendChild(el)
			}
			return this
		})
	},
	append(elem){
		return $.listener(this.el, el => {
			if($.isNode(elem)){
				el.appendChild(elem)
			}else if($.isInit(elem) && elem.el){
				el.appendChild(elem.el)
			}
			return this
		})
	},
	before(elem){
		return $.listener(this.el, el => {
			if($.isNode(elem)){
				el.parentElement.insertBefore(elem,el)
			}else if($.isInit(elem) && elem.el){
				el.parentElement.insertBefore(elem.el,el)
			}
			return this
		})
	},
	remove(){
		return $.listener(this.el, el => {
			if($.isHtmlNodeList(el)){
				$(el).each((v,i,n)=>{
					if(n.parentElement){ n.parentElement.removeChild(n) }
				})
			}else{
				if(el.parentElement){ el.parentElement.removeChild(el) }
			}
			return this
		})
	},
	replace(node){
		return $.listener(this.el, el => {
			el.parentElement.replaceChild(node, el)
			return this
		})
	}
}
// 事件
$.stopEvent = function(e, isStop, isDef){
	if(isStop) e.stopPropagation()
	if(isDef) e.preventDefault()
}
$.getRunEvent = function(){
	let callback,stop,prevent
	const s0 = arguments[0]
	const s1 = arguments[1]
	const s2 = arguments[2]
	if( $.isFunction(s0) ){
		callback = s0
	}else if($.isBoolean(s0) ){
		stop = s0
		prevent = s2
		callback = s1
	}else if($.isObject(s0) ){
		stop = s0.stop
		prevent = s0.prevent
		callback = s2
	}
	return { callback, stop, prevent }
}
const eventExtend = {
	bind(event){
		return $.listener(this.el, el => {
			const { callback, stop, prevent } = $.getRunEvent(arguments[1],arguments[2], arguments[3] )
			if(stop || prevent) {
				el.addEventListener(event, function(e){
					if(callback){ callback.call(this, e) }
					$.stopEvent(e, stop, prevent)
				})
			}else{
				el.addEventListener(event, callback)
			}
			return this
		})
	},
	unbind(event,callback){
		return $.listener(this.el, el => {
			el.removeEventListener(event,callback)
			return this
		})
	},
	focus(){
		return $.listener(this.el, el => {
			el.focus()
			return this
		})
	},
	blur(){
		return $.listener(this.el, el => {
			el.blur()
			return this
		})
	},
	once(event){
		return $.listener(this.el, el => {
			const { callback, stop, prevent } = $.getRunEvent(arguments[1],arguments[2], arguments[3] )
			el['on' + event] = function(e){
				if(callback){ callback.call(this, e) }
				$.stopEvent(e, stop, prevent)
			}
			return this
		})
	},
	unonce(event){
		return $.listener(this.el, el => {
			el['on' + event] = null
			return this
		})
	}
};
(['click', 'mouseup', 'mousedown', 'submit', 'mousemove', 'dblclick']).forEach(function(v){
	eventExtend[v] = function(){
		return $.listener(this.el, el => {
			$(el).bind(v, arguments[0], arguments[1], arguments[2] )
			return this
		})
	}
})
// 判断
const judgeExtend = {
	isElement(){ return this.el instanceof HTMLElement },
	isNodeList(){ return this.el instanceof NodeList },
	isHtmlNodeList(){ return this.el instanceof HTMLCollection || this.el instanceof NodeList }
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

export default $