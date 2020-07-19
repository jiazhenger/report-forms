import _ from './jzer'
import { tableConfig } from '../../js/public/config'
// 绑定属性
const addAttr = ( el, { className, style, attr } ) => {
	// 添加 class
	if(className){ el.className += className }
	// 添加 style 样式 
	if(_.isObject(style)){ for(let i in style){ el.style[i] = style[i] } }
	// 添加属性
	if(_.isObject(attr)){ for(let i in attr){ el.setAttribute(i, attr[i]) } }
}
// 创建 tbody
const Tbody = (option, isFoot) => {
	const opt = {
		row:2,
		col:2,
		tr:{ },
		td:{ },
		...option
	}
	
	const tbody = document.createElement( isFoot ? 'tfoot' : 'tbody' )
	const trFragment = document.createDocumentFragment()
	
	if({ }.toString.call(opt.row) === '[object Array]' && { }.toString.call(opt.col) === '[object Array]'){
		opt.row.forEach(v => {
			const tr = document.createElement('tr')
			const tdFragment = document.createDocumentFragment()
			addAttr(tr,{className:opt.tr.className, style: opt.tr.style, attr: opt.tr.attr})
			opt.col.forEach(p => {
				const td = document.createElement('td')
				addAttr(td,{className:opt.td.className, style: opt.td.style, attr: opt.td.attr}) // 默认样式
				addAttr(td,{style: p.style}) // 数据上的样式
				
				if(p.align){ td.style.textAlign = p.align }
				
				if(p.render){
					td.innerHTML = p.render(v[p.field], v)
				}else{
					td.textContent = v[p.field]
				}
				tdFragment.appendChild(td)
			})
			tr.appendChild(tdFragment)
			trFragment.appendChild(tr)
		})
	}else{
		const row = opt.row || 0
		const col = opt.col || 0
		// 创建 tr
		for(let i=0; i< row; i++){
			const tr = document.createElement('tr')
			const tdFragment = document.createDocumentFragment()
			addAttr(tr,{className:opt.tr.className, style: opt.tr.style, attr: opt.tr.attr})
			// 创建 td
			for(let j=0; j<col; j++){
				const td = document.createElement('td')
				addAttr(td,{className:opt.td.className, style: opt.td.style, attr: opt.td.attr})
				// td 添加内容
				if(opt.td.text){ td.textContent = opt.td.text }
				
				tdFragment.appendChild(td)
			}
			tr.appendChild(tdFragment)
			trFragment.appendChild(tr)
		}
	}
	tbody.appendChild(trFragment)
	return tbody
}

/*
const col = [
	{ field: 'name', title:'姓名', width:100, align:'center', style:{color:'red'}, render:(text,row)=> text, sort:true },
	{ field: 'age', title:'年龄', width:100, align:'left', style:{color:'blue'}, sort:true },
	{ field: 'phone', title:'电话', width:100, align:'right', render:(text,row)=> row.name + row.phone, style:{color:'green'}, sort:true }
]

const data = [
	{ name: '小明', age:'123', phone:'1584567894' },
	{ name: '小明', age:'123', phone:'1584567894' },
	{ name: '小明', age:'123', phone:'1584567894' },
]
*/

export default {
	create(option){
		const opt = {
			/*
			col:2,
			row:2,
			wraper:{ },
			colgroup:{ cols:[200, 300, 400] },
			thead:{
				tr:{
					style:{},
					attr:{},
					className:'',
				},
				th:{
					style:{padding:'2px 5px'},
					attr:{},
					className:'',
					text:''
				}
			},
			tbody:{
				tr:{
					style:{color:'red'},
					attr:{},
					className:'tbody',
				},
				td:{
					style:{padding:'2px 5px'},
					attr:{},
					className:'',
					text:''
				}
			},
			*/
			...option
		}
		
		const table = document.createElement('table')
		const fragment = document.createDocumentFragment()
		fragment.appendChild( Tbody({ col:opt.col, row:opt.row, ...opt.tbody}) )
		table.style.cssText = 'width:100%;border-collapse:collapse;border-spacing:0'
		
		if(opt.colgroup){  fragment.appendChild( this.createColgroup(opt.colgroup) ) }
		if(opt.thead){ fragment.appendChild( this.createThead({ col:opt.col, ...opt.thead}) )  }
		if(opt.tfoot){ fragment.appendChild( Tbody({ col:2, row:2, ...opt.tfoot},true) ) }
		
		table.appendChild(fragment)
		
		if(opt.wraper){  
			const wraper = document.createElement('div')
			addAttr( wraper,{ className:wraper.className, style: wraper.style, attr: wraper.attr } )
			wraper.appendChild(table)
			return wraper
		}else{
			return table
		}
	},
	createThead(option){
		const opt = {
			col:2,
			tr:{ },
			th:{ },
			...option
		}
		
		const thead = document.createElement('thead')
		const tr = document.createElement('tr')
		const thFragment = document.createDocumentFragment()
		addAttr(tr,{className:opt.tr.className, style: opt.tr.style, attr: opt.tr.attr})
		if({ }.toString.call(opt.col) === '[object Array]'){
			opt.col.forEach(p => {
				const th = document.createElement('th')
				addAttr(th,{className:opt.th.className, style: opt.th.style, attr: opt.th.attr}) // 默认样式
				addAttr(th,{style: p.style}) // 数据上的样式
				
				if(p.align){ th.style.textAlign = p.align }
				
				th.textContent = p.title
				
				thFragment.appendChild(th)
			})
		}else{
			const col = opt.col || 0
			// 创建 tr
			for(let j=0; j<col; j++){
				const th = document.createElement('th')
				addAttr(th,{className:opt.th.className, style: opt.th.style, attr: opt.th.attr}) // 默认样式
				// th 添加内容
				if(opt.th.text){ th.textContent = opt.th.text }
				
				thFragment.appendChild(th)
			}
			tr.appendChild(thFragment)
		}
		tr.appendChild(thFragment)
		thead.appendChild(tr)
		return thead
	},
	createColgroup(option){
		const opt = {
			cols:[],
			...option
		}
		const colgroup = document.createElement('colgroup')
		const colFragment = document.createDocumentFragment()
		opt.cols.forEach(v=>{
			const col = document.createElement('col')
			col.style.width = isNaN(+v) ? v : v + 'px'
			colFragment.appendChild(col)
		})
		colgroup.appendChild(colFragment)
		return colgroup
	},
	addRow(table,option){
		const opt = {
			tr:{ },
			td:{ },
			...option
		}
		const tbody = table.querySelector('tbody')
		const children = tbody.children
		if(children.length > 0){
			const len = children[0].children.length
			const tr = document.createElement('tr')
			const tdFragment = document.createDocumentFragment()
			addAttr(tr,{className:opt.tr.className, style: opt.tr.style, attr: opt.tr.attr}) // 默认样式
			for(let j=0; j<len; j++){
				const td = document.createElement('td')
				addAttr(td,{className:opt.td.className, style: opt.td.style, attr: opt.td.attr})
				// td 添加内容
				if(opt.td.text){ td.textContent = opt.td.text }
				
				tdFragment.appendChild(td)
			}
			tr.appendChild(tdFragment)
			tbody.appendChild(tr)
			return tr
		}else{
			return false
		}
	},
	setBorderColor(_node, color){
		_node.finds('th').borderColor( color )
		_node.finds('td').borderColor( color )
		return this
	},
	// 设置下边框
	setBottomBorder(_table, borderStyle, color, checked){
		const style = {
			border: 0,
			borderBottom: '1px '+ borderStyle + ' ' + (color || '#ddd')
		}
		_table.finds('th').style(style)
		_table.finds('td').style(style)
		return this
	},
	// 设置表格边框
	showHideBorder(_table, checked, color){
		color = color || '#ddd'
		if(_table){
			if(checked){
				_table.finds('th').border('1px solid ' + color)
				_table.finds('td').border('1px solid ' + color)
			}else{
				_table.finds('th').border(0)
				_table.finds('td').border(0)
			}
		}
	},
	bindData(td, data, name, url){
		const row = data.length
		const index = td.index()
		const _tbody = td.parent('tbody')
		const trLen = _tbody.children().length()
		const col = _tbody.find('tr').children().length()
		if(row !== trLen){
			const tbody = Tbody({
				row,
				col,
				td:{
					style:tableConfig.style,
					className:'loopNode x-bind-table',
					attr:{ type:'text' }
				}
			})
			_tbody.html(tbody.innerHTML)
		}
		data.forEach((v,i) => {
			_tbody.children(i).children(index).text(v[name])
			_tbody.children(0).children(index).attr({url})
		})
	}
}